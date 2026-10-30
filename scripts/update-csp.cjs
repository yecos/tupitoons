// Run after editing inline scripts, then run the regression tests.
const fs = require('node:fs');
const crypto = require('node:crypto');
const html = fs.readFileSync('index.html', 'utf8');
const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const hashes = [...html.matchAll(/<script(?: [^>]*)?>([\s\S]*?)<\/script>/g)]
  .map(([, script]) => `'sha256-${crypto.createHash('sha256').update(script).digest('base64')}'`);
const csp = config.headers[0].headers.find(header => header.key === 'Content-Security-Policy');
csp.value = csp.value.replace(/script-src[^;]*/, `script-src 'self' https://www.googletagmanager.com ${hashes.join(' ')}`);
fs.writeFileSync('vercel.json', JSON.stringify(config, null, 2) + '\n');

