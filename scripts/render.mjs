// Render a canvas animation page to MP4.
// Usage: node scripts/render.mjs <page.html> <out.mp4> [--fps 30] [--stills 3,10,20]
//   The page must expose window.ready (Promise), window.renderAt(t) and window.DURATION.
import { createRequire } from 'node:module';
import { spawn, execSync } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(path.join(execSync('npm root -g').toString().trim(), 'playwright'))); }

const args = process.argv.slice(2);
const flag = (name, def) => { const i = args.indexOf(name); return i >= 0 ? args.splice(i, 2)[1] : def; };
const fps = Number(flag('--fps', 30));
const stills = flag('--stills', null);
const [page, out] = args;
if (!page || !out) { console.error('usage: render.mjs <page.html> <out.mp4> [--fps 30] [--stills t1,t2]'); process.exit(1); }

const root = process.cwd();
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.woff2': 'font/woff2', '.css': 'text/css', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(0);
const url = `http://127.0.0.1:${server.address().port}/${path.relative(root, path.resolve(page))}?render`;

const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
tab.on('console', m => m.type() !== 'log' && console.log('[page]', m.text()));
tab.on('pageerror', e => { console.error('[page error]', e); process.exitCode = 1; });
await tab.goto(url);
await tab.evaluate(() => window.ready);
const duration = await tab.evaluate(() => window.DURATION);
const grab = t => tab.evaluate(t => { window.renderAt(t); return document.getElementById('c').toDataURL('image/png').split(',')[1]; }, t);

if (stills) {
  fs.mkdirSync(out, { recursive: true });
  for (const t of stills.split(',').map(Number)) {
    fs.writeFileSync(path.join(out, `t${String(t).padStart(5, '0')}.png`), Buffer.from(await grab(t), 'base64'));
  }
} else {
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const total = Math.round(duration * fps);
  for (let f = 0; f < total; f++) {
    const buf = Buffer.from(await grab(f / fps), 'base64');
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (f % fps === 0) process.stdout.write(`\r${f}/${total}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  console.log(`\nwrote ${out}`);
}
await browser.close();
server.close();
