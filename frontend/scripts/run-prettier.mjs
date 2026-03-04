#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const prettierBin = path.join(
  process.cwd(),
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'prettier.cmd' : 'prettier'
);

if (!existsSync(prettierBin)) {
  console.error(
    'Prettier is not installed in frontend/. Install it with: npm install --save-dev prettier'
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const result = spawnSync(prettierBin, args, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

process.exit(result.status ?? 1);

