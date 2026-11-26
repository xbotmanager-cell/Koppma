import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'vendor', '.base44', 'data', 'session'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(js|mjs|cjs)$/i.test(entry.name)) files.push(full);
  }
}

walk(process.cwd());

for (const f of files) {
  try {
    execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' });
  } catch (e) {
    console.error(`Syntax error in ${f}:`, e.message);
    process.exit(1);
  }
}

console.log(`VIPBOT syntax check passed across ${files.length} JavaScript modules.`);
