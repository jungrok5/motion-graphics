// Headless check of a player page (add --shots <dir> for full-page screenshots): no page errors, play advances time, chapter jump works,
// speed button cycles, notes render (count of chapter headings), no horizontal overflow at phone width.  Usage: node scripts/check-player.mjs <page.html>
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(path.join(execSync('npm root -g').toString().trim(), 'playwright'))); }

const page = process.argv[2];
if (!page) { console.error('usage: check-player.mjs <page.html>'); process.exit(1); }
const root = process.cwd();
const MIME = { '.html': 'text/html; charset=utf-8', '.woff2': 'font/woff2', '.js': 'text/javascript' };
const server = http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(0);
const url = `http://127.0.0.1:${server.address().port}/${path.relative(root, path.resolve(page))}`;

const browser = await chromium.launch();
const errors = [];
const desk = await browser.newPage({ viewport: { width: 1280, height: 860 } });
desk.on('pageerror', e => errors.push(String(e)));
await desk.goto(url);
await desk.evaluate(() => window.ready);
await desk.click('#big');
await desk.waitForTimeout(1200);
const afterPlay = await desk.textContent('#time');
const bigHidden = !(await desk.isVisible('#big'));
const chapters = await desk.$$('#chapters button');
await chapters[Math.min(2, chapters.length - 1)].click();
await desk.waitForTimeout(400);
const afterJump = await desk.textContent('#time');
await desk.click('#rate');
const rateAfterClick = await desk.textContent('#rate');
await desk.click('#rate'); await desk.click('#rate');
const notesShown = await desk.isVisible('#notes');
const notesChapters = await desk.$$eval('#notes article h3', els => els.length);

const phone = await browser.newPage({ viewport: { width: 400, height: 800 } });
phone.on('pageerror', e => errors.push(String(e)));
await phone.goto(url);
await phone.evaluate(() => window.ready);
const overflow = await phone.evaluate(() => document.documentElement.scrollWidth > innerWidth);

// --shots <dir>: full-page screenshots (desktop + phone) to eyeball the notes section
const shotsAt = process.argv.indexOf('--shots');
if (shotsAt > 0) {
  const dir = process.argv[shotsAt + 1]; fs.mkdirSync(dir, { recursive: true });
  await desk.screenshot({ path: path.join(dir, 'page-desktop.png'), fullPage: true });
  await phone.screenshot({ path: path.join(dir, 'page-phone.png'), fullPage: true });
}
console.log({ afterPlay, bigHidden, afterJump, rateAfterClick, notesShown, notesChapters, phoneOverflow: overflow, errors });
await browser.close();
server.close();
const ok = !errors.length && bigHidden && !overflow && afterPlay !== '0:00' && afterJump !== afterPlay && rateAfterClick === '0.75×';
process.exit(ok ? 0 : 1);
