import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const target = 'https://thelabcorner.github.io/decarboxulator/';

test('indexed GitHub user site retains a permanent-move redirect to V4', () => {
  assert.match(html, /<meta http-equiv="refresh" content="0;url=https:\/\/thelabcorner\.github\.io\/decarboxulator\/">/);
  assert.ok(html.includes('<link rel="canonical" href="' + target + '">'));
  assert.ok(html.includes('<meta property="og:url" content="' + target + '">'));
  assert.ok(html.includes('<a class="action" href="' + target + '">'));
  assert.doesNotMatch(html, /<meta[^>]*name="robots"[^>]*noindex/i, 'do not exclude moving indexed URLs');
  assert.doesNotMatch(html, /content="[1-9][0-9]*;url=/, 'redirect must be immediate for Google permanent-move signals');
});

test('fallback retains an exact V4-compatible premium design', () => {
  assert.match(html, /Upgrading your experience\./);
  assert.match(html, /Activation Delta/);
  assert.match(html, /M43 17 13 75h61L43 17Z/);
  assert.match(html, /#aaff00/i);
  assert.match(html, /prefers-color-scheme: dark/);
  assert.match(html, /prefers-reduced-motion: reduce/);
  assert.match(html, /width=device-width, initial-scale=1, viewport-fit=cover/);
  assert.match(html, /By Jackson Cummings/);
  assert.match(html, /https:\/\/thedabcorner\.site\//);
  assert.match(html, /https:\/\/github\.com\/thelabcorner\/decarboxulator/);
  assert.doesNotMatch(html, /bootstrap|5 seconds|click here/i);
});

test('the navigation cannot become an open redirect', () => {
  assert.match(html, /new URL\('https:\/\/thelabcorner\.github\.io\/decarboxulator\/'\)/);
  assert.match(html, /destination\.search = location\.search;/);
  assert.match(html, /location\.replace\(destination\.href\)/);
  assert.doesNotMatch(html, /URLSearchParams\(location\.search\)\.get\(['"](?:url|redirect|next)/);
});
