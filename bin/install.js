#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const VERSION = '0.2.0';
const PACKAGE_NAME = 'reciepts';

// Colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

function log(msg, color = '') {
  console.log(`${color}${msg}${colors.reset}`);
}

function banner() {
  console.log(`
${colors.bright}${colors.cyan}
  reciepts v${VERSION}
  ─────────────────────────────────────
  Citation verification for manuscripts
${colors.reset}
`);
}

function getClaudeDir() {
  return path.join(os.homedir(), '.claude');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function install() {
  const claudeDir = getClaudeDir();
  const commandsDir = path.join(claudeDir, 'commands', 'reciepts');
  const agentsDir = path.join(claudeDir, 'agents');

  const packageDir = path.resolve(__dirname, '..');
  const srcCommandsDir = path.join(packageDir, 'commands', 'reciepts');
  const srcAgentsDir = path.join(packageDir, 'agents');

  log('Installing...', colors.cyan);

  if (fs.existsSync(srcCommandsDir)) {
    log('  Installing commands...', colors.dim);
    copyDir(srcCommandsDir, commandsDir);
    log('  [OK] Commands -> ~/.claude/commands/reciepts/', colors.green);
  }

  if (fs.existsSync(srcAgentsDir)) {
    log('  Installing agents...', colors.dim);
    const agentFiles = fs.readdirSync(srcAgentsDir);
    ensureDir(agentsDir);
    for (const file of agentFiles) {
      if (file.startsWith('reciepts-')) {
        fs.copyFileSync(
          path.join(srcAgentsDir, file),
          path.join(agentsDir, file)
        );
      }
    }
    log('  [OK] Agents -> ~/.claude/agents/', colors.green);
  }

  log('\nInstallation complete.', colors.green);
  log('\nCommands:', colors.bright);
  log('  /reciepts:help     Show help', colors.dim);
  log('  /reciepts:init     Initialize paper', colors.dim);
  log('  /reciepts:verify   Run verification', colors.dim);
  log('  /reciepts:report   Generate report', colors.dim);
  log('\nRestart Claude Code to load commands.\n', colors.yellow);
}

function uninstall() {
  const claudeDir = getClaudeDir();
  const commandsDir = path.join(claudeDir, 'commands', 'reciepts');
  const agentsDir = path.join(claudeDir, 'agents');

  log('Uninstalling...', colors.yellow);

  if (fs.existsSync(commandsDir)) {
    fs.rmSync(commandsDir, { recursive: true });
    log('  [OK] Commands removed', colors.green);
  }

  if (fs.existsSync(agentsDir)) {
    const agentFiles = fs.readdirSync(agentsDir);
    for (const file of agentFiles) {
      if (file.startsWith('reciepts-')) {
        fs.unlinkSync(path.join(agentsDir, file));
      }
    }
    log('  [OK] Agents removed', colors.green);
  }

  log('\nUninstall complete.\n', colors.green);
}

// Main
const args = process.argv.slice(2);

banner();

if (args.includes('--uninstall') || args.includes('-u')) {
  uninstall();
} else if (args.includes('--help') || args.includes('-h')) {
  log('Usage: npx reciepts [options]', colors.bright);
  log('');
  log('Options:', colors.bright);
  log('  --help, -h       Show this help', colors.dim);
  log('  --uninstall, -u  Remove from Claude Code', colors.dim);
  log('');
} else {
  install();
}
