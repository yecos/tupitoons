const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const html = fs.readFileSync('index.html','utf8');
const source = html.match(/const readStoredCart = \(\) => \{[\s\S]*?\n      \};/)[0];
const product = {name:'Trusted',price:189000,image:'assets/look-bottle-print-studio.jpeg'};
function restore(value) {
  return JSON.parse(JSON.stringify(vm.runInNewContext(`${source}; readStoredCart()`, {
    localStorage: {getItem:()=>value}, storageKey:'bag', catalog:new Map([['Trusted',product]])
  })));
}
test('corrupt or non-array storage does not crash the storefront',()=>{
  for (const value of ['{','null','{}','42','"hello"']) assert.deepEqual(restore(value),[]);
});
test('stored HTML, image URLs and prices never override trusted catalogue fields',()=>{
  assert.deepEqual(restore(JSON.stringify([{name:'Trusted',size:'M',quantity:2,price:1,image:'x" onerror="alert(1)'}])),[{...product,size:'M',quantity:2}]);
  assert.deepEqual(restore(JSON.stringify([{name:'<img onerror=alert(1)>',size:'M',quantity:1}])),[]);
});
test('invalid sizes/quantities are rejected and duplicates bounded',()=>{
  for (const quantity of [-1,0,1.5,'2',null]) assert.deepEqual(restore(JSON.stringify([{name:'Trusted',size:'M',quantity}])),[]);
  assert.deepEqual(restore(JSON.stringify([{name:'Trusted',size:'XL',quantity:1}])),[]);
  assert.equal(restore(JSON.stringify([{name:'Trusted',size:'M',quantity:80},{name:'Trusted',size:'M',quantity:80}]))[0].quantity,99);
});
test('CSP authorizes exactly the current inline scripts',()=>{
  const headers=JSON.parse(fs.readFileSync('vercel.json')).headers[0].headers;
  const csp=headers.find(h=>h.key==='Content-Security-Policy').value;
  assert.ok(!csp.split(';').find(x=>x.includes('script-src')).includes('unsafe-inline'));
  for (const [,script] of html.matchAll(/<script(?: [^>]*)?>([\s\S]*?)<\/script>/g)) {
    assert.ok(csp.includes(`'sha256-${crypto.createHash('sha256').update(script).digest('base64')}'`));
  }
});
test('customer orders are never written to persistent storage',()=>{
  assert.ok(!/localStorage\.setItem\(orderStorageKey/.test(html));
  assert.ok(html.includes("localStorage.removeItem('tupitoons-orders-v1')"));
});
