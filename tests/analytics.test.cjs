const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

test('GA4 queues one configuration and tracks only allowlisted section interactions', () => {
  const existing = [];
  const listeners = {};
  const context = {
    window: { dataLayer: existing },
    document: { addEventListener: (name, handler) => { listeners[name] = handler; } }
  };
  vm.runInNewContext(fs.readFileSync('scripts/analytics.js', 'utf8'), context);
  assert.equal(context.window.dataLayer, existing);
  assert.deepEqual(Array.from(existing[0]).slice(0, 1), ['js']);
  assert.equal(existing[1][0], 'config');
  assert.equal(existing[1][1], 'G-C94DMDNF0V');
  assert.notEqual(existing[1][2].send_page_view, false);
  const click = href => listeners.click({ target: {
    closest: () => href === null ? null : { getAttribute: () => href }
  } });
  click('#shop');
  click('#size-guide');
  click('#customer-email@example.com');
  click(null);
  assert.equal(existing.length, 4);
  assert.equal(existing[2][1], 'section_navigation');
  assert.deepEqual(JSON.parse(JSON.stringify(existing[2][2])), { section_id: 'shop' });
  assert.equal(existing[3][2].section_id, 'size-guide');
  assert.equal(existing.filter(args => args[0] === 'config').length, 1);
  assert.equal(existing.filter(args => args[1] === 'page_view').length, 0);
});

test('one Google loader follows initialization and CSP permits GA4 without unsafe scripts', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  assert.equal((html.match(/src="https:\/\/www.googletagmanager.com\/gtag\/js\?id=G-C94DMDNF0V"/g) || []).length, 1);
  assert.ok(html.indexOf('src="scripts/analytics.js"') < html.indexOf('src="https://www.googletagmanager.com'));
  const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  const csp = config.headers[0].headers.find(h => h.key === 'Content-Security-Policy').value;
  for (const [directive, origin] of [
    ['script-src', 'https://www.googletagmanager.com'],
    ['connect-src', 'https://*.google-analytics.com'],
    ['connect-src', 'https://*.google.com'],
    ['img-src', 'https://*.google-analytics.com']
  ]) assert.ok(csp.split(';').find(value => value.trim().startsWith(directive + ' ')).includes(origin));
  assert.ok(!csp.split(';').find(value => value.trim().startsWith('script-src ')).includes('unsafe-inline'));
});
