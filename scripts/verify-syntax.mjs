import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'vendor') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(js|mjs|cjs)$/i.test(entry.name)) files.push(full);
  }
}

walk(root);

let checked = 0;
for (const file of files) {
  execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  checked++;
}

console.log(`VIPBOT syntax check passed across ${checked} JavaScript modules.`);
