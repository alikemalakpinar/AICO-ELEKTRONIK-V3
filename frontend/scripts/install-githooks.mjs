#!/usr/bin/env node

import { execSync } from 'node:child_process';

try {
  const repoRoot = execSync('git rev-parse --show-toplevel', {
    cwd: process.cwd(),
    encoding: 'utf8',
  }).trim();

  execSync('git config core.hooksPath .githooks', {
    cwd: repoRoot,
    stdio: 'pipe',
  });

  console.log('Git hooks path configured to .githooks');
} catch {
  console.warn(
    'Could not configure core.hooksPath automatically. Run: git config core.hooksPath .githooks'
  );
  process.exit(0);
}
