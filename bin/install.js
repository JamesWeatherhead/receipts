#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');

const VERSION = '0.1.0';
const PACKAGE_NAME = 'reciepts';

// Colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

function log(msg, color = '') {
  console.log(`${color}${msg}${colors.reset}`);
}

function banner() {
  console.log(`
${colors.bright}${colors.cyan}
  ██████╗ ███████╗ ██████╗██╗███████╗██████╗ ████████╗███████╗
  ██╔══██╗██╔════╝██╔════╝██║██╔════╝██╔══██╗╚══██╔══╝██╔════╝
  ██████╔╝█████╗  ██║     ██║█████╗  ██████╔╝   ██║   ███████╗
  ██╔══██╗██╔══╝  ██║     ██║██╔══╝  ██╔═══╝    ██║   ╚════██║
  ██║  ██║███████╗╚██████╗██║███████╗██║        ██║   ███████║
  ╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝╚══════╝╚═╝        ╚═╝   ╚══════╝
${colors.reset}
  ${colors.dim}Show me the receipts on your citations.${colors.reset}
  ${colors.dim}v${VERSION}${colors.reset}
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

  // Find the package directory
  const packageDir = path.resolve(__dirname, '..');
  const srcCommandsDir = path.join(packageDir, 'commands', 'reciepts');
  const srcAgentsDir = path.join(packageDir, 'agents');

  log('\n📦 Installing reciepts...', colors.cyan);

  // Install commands
  if (fs.existsSync(srcCommandsDir)) {
    log('  → Installing slash commands...', colors.dim);
    copyDir(srcCommandsDir, commandsDir);
    log('  ✓ Commands installed to ~/.claude/commands/reciepts/', colors.green);
  }

  // Install agents
  if (fs.existsSync(srcAgentsDir)) {
    log('  → Installing agent prompts...', colors.dim);
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
    log('  ✓ Agents installed to ~/.claude/agents/', colors.green);
  }

  log('\n✅ Installation complete!', colors.green);
  log('\n📋 Available commands:', colors.bright);
  log('  /reciepts:help     - Show help and usage', colors.dim);
  log('  /reciepts:init     - Initialize paper for verification', colors.dim);
  log('  /reciepts:verify   - Run verification swarm', colors.dim);
  log('  /reciepts:report   - Generate final report', colors.dim);

  log('\n🚀 Quick start:', colors.bright);
  log('  1. Open Claude Code', colors.dim);
  log('  2. Run: /reciepts:help', colors.dim);
  log('\n💡 Tip: Restart Claude Code to load new commands.\n', colors.yellow);
}

function uninstall() {
  const claudeDir = getClaudeDir();
  const commandsDir = path.join(claudeDir, 'commands', 'reciepts');
  const agentsDir = path.join(claudeDir, 'agents');

  log('\n🗑️  Uninstalling reciepts...', colors.yellow);

  // Remove commands
  if (fs.existsSync(commandsDir)) {
    fs.rmSync(commandsDir, { recursive: true });
    log('  ✓ Commands removed', colors.green);
  }

  // Remove agents
  if (fs.existsSync(agentsDir)) {
    const agentFiles = fs.readdirSync(agentsDir);
    for (const file of agentFiles) {
      if (file.startsWith('reciepts-')) {
        fs.unlinkSync(path.join(agentsDir, file));
      }
    }
    log('  ✓ Agents removed', colors.green);
  }

  log('\n✅ Uninstall complete!\n', colors.green);
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
  log('  --help, -h       Show this help message', colors.dim);
  log('  --uninstall, -u  Remove reciepts from Claude Code', colors.dim);
  log('');
} else {
  install();
}
