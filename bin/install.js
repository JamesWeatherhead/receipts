#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const VERSION = '0.6.1';
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
${colors.cyan}
    ┌────────────────────────────┐
    │                            │
    │       R E C I E P T S      │
    │    Citation Verification   │
    │    by: James Weatherhead   │
    │                            │
    │   ════════════════════     │
    │      VERIFICATION          │
    │   ════════════════════     │
    │                            │
    │   [1] Smith 2020   ✓ VALID │
    │   [2] Jones 2021   ✗ WRONG │
    │   [3] Chen 2019    ✓ VALID │
    │                            │
    │      THANK  YOU !          │
    │                            │
    └────────────────────────────┘
${colors.reset}
${colors.bright}  reciepts${colors.reset} v${VERSION} by James Weatherhead
  Verify your citations say what you claim.
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

  if (fs.existsSync(srcCommandsDir)) {
    copyDir(srcCommandsDir, commandsDir);
    log('  ✓ Installed commands/reciepts', colors.green);
  }

  if (fs.existsSync(srcAgentsDir)) {
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
    log('  ✓ Installed reciepts-verifier', colors.green);
  }

  log('');
  log(`${colors.green}Done!${colors.reset} Run ${colors.cyan}/reciepts <path>${colors.reset} to verify citations.`);
  log('');
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
