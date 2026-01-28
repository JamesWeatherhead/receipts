#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const VERSION = '0.9.0';
const PACKAGE_NAME = 'receiptscc';

// Colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

function log(msg, color = '') {
  console.log(`${color}${msg}${colors.reset}`);
}

function banner() {
  const now = new Date();
  const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const session = '#' + Math.random().toString(16).substring(2, 9);

  console.log(`
    ┌─────────────────────────────────┐
    │                                 │
    │  R E C E I P T S                │
    │  Citation  Verification         │
    │  by: James Weatherhead          │
    │                                 │
    │  ────────────────────────       │
    │     VERIFICATION                │
    │  ────────────────────────       │
    │                                 │
    │  * * * * * * * * * * * * * *    │
    │                                 │
    │  Citation            Status     │
    │  ────────────────────────       │
    │  Smith (2020)          ${colors.green}VALID${colors.reset}    │
    │  Jones (2021)        ${colors.red}INVALID${colors.reset}    │
    │  Chen (2019)           ${colors.green}VALID${colors.reset}    │
    │  Park (2022)          ${colors.yellow}ADJUST${colors.reset}    │
    │  Adams (2018)          ${colors.green}VALID${colors.reset}    │
    │                                 │
    │  * * * * * * * * * * * * * *    │
    │                                 │
    │  Total                      5   │
    │  Valid                      3   │
    │  Invalid                    1   │
    │  Adjust                     1   │
    │  ────────────────────────       │
    │  Accuracy               80.0%   │
    │                                 │
    │  * * * * * * * * * * * * * *    │
    │                                 │
    │  Date            ${date.padStart(12)}   │
    │  Time                ${time.padStart(8)}   │
    │  Session             ${session}   │
    │                                 │
    │    ██  █  █  ███  ██  █         │
    │                                 │
    │     THANK  YOU !                │
    │                                 │
    └─────────────────────────────────┘

${colors.bright}receiptscc${colors.reset} v${VERSION}
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
  const commandsDir = path.join(claudeDir, 'commands', 'receipts');
  const agentsDir = path.join(claudeDir, 'agents');

  const packageDir = path.resolve(__dirname, '..');
  const srcCommandsDir = path.join(packageDir, 'commands', 'receipts');
  const srcAgentsDir = path.join(packageDir, 'agents');

  if (fs.existsSync(srcCommandsDir)) {
    copyDir(srcCommandsDir, commandsDir);
    log('  ✓ Installed commands/receipts', colors.green);
  }

  if (fs.existsSync(srcAgentsDir)) {
    const agentFiles = fs.readdirSync(srcAgentsDir);
    ensureDir(agentsDir);
    for (const file of agentFiles) {
      if (file.startsWith('receipts-')) {
        fs.copyFileSync(
          path.join(srcAgentsDir, file),
          path.join(agentsDir, file)
        );
      }
    }
    log('  ✓ Installed receipts-verifier', colors.green);
  }

  log('');
  log(`${colors.green}Done!${colors.reset} Run ${colors.cyan}/receipts <path>${colors.reset} to verify citations.`);
  log('');
}

function uninstall() {
  const claudeDir = getClaudeDir();
  const commandsDir = path.join(claudeDir, 'commands', 'receipts');
  const agentsDir = path.join(claudeDir, 'agents');

  log('Uninstalling...', colors.yellow);

  if (fs.existsSync(commandsDir)) {
    fs.rmSync(commandsDir, { recursive: true });
    log('  [OK] Commands removed', colors.green);
  }

  if (fs.existsSync(agentsDir)) {
    const agentFiles = fs.readdirSync(agentsDir);
    for (const file of agentFiles) {
      if (file.startsWith('receipts-')) {
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
  log('Usage: npx receiptscc [options]', colors.bright);
  log('');
  log('Options:', colors.bright);
  log('  --help, -h       Show this help', colors.dim);
  log('  --uninstall, -u  Remove from Claude Code', colors.dim);
  log('');
} else {
  install();
}
