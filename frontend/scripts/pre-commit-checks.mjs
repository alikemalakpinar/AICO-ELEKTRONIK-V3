#!/usr/bin/env node

import { execSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const frontendRoot = process.cwd();
const repoRoot = path.resolve(frontendRoot, '..');
const eslintBin = path.join(
  frontendRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'eslint.cmd' : 'eslint'
);
const prettierBin = path.join(
  frontendRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'prettier.cmd' : 'prettier'
);

function run(command, args, cwd = frontendRoot) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function getStagedFiles() {
  const output = execSync('git diff --cached --name-only --diff-filter=ACMR', {
    cwd: repoRoot,
    encoding: 'utf8',
  });

  return output
    .split('\n')
    .map((filePath) => filePath.trim())
    .filter(Boolean);
}

const stagedFiles = getStagedFiles();
const stagedFrontendFiles = stagedFiles
  .filter((filePath) => filePath.startsWith('frontend/'))
  .map((filePath) => filePath.slice('frontend/'.length));

if (stagedFrontendFiles.length === 0) {
  console.log('No staged files in frontend/. Skipping frontend pre-commit checks.');
  process.exit(0);
}

const eslintExtensions = new Set(['.js', '.jsx', '.ts', '.tsx']);
const prettierExtensions = new Set([
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.json',
  '.css',
  '.md',
  '.yml',
  '.yaml',
]);

const eslintTargets = stagedFrontendFiles.filter((filePath) =>
  eslintExtensions.has(path.extname(filePath))
);
const prettierTargets = stagedFrontendFiles.filter((filePath) =>
  prettierExtensions.has(path.extname(filePath))
);

if (eslintTargets.length > 0) {
  console.log('Running ESLint on staged frontend files...');
  run(eslintBin, ['--max-warnings=0', '--fix', ...eslintTargets], frontendRoot);
}

if (prettierTargets.length > 0 && existsSync(prettierBin)) {
  console.log('Running Prettier on staged frontend files...');
  run(prettierBin, ['--write', ...prettierTargets], frontendRoot);
} else if (prettierTargets.length > 0) {
  console.log('Prettier is not installed. Skipping formatting step.');
}

run(
  'git',
  ['add', '--', ...stagedFrontendFiles.map((filePath) => `frontend/${filePath}`)],
  repoRoot
);

console.log('Running TypeScript typecheck...');
run('npm', ['run', 'typecheck'], frontendRoot);

