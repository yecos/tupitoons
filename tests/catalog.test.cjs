const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const html = fs.readFileSync('index.html', 'utf8');
const sorting = html.match(/const sortCatalog = [\s\S]*?\n      \}\);/)[0];
const selection = html.match(/const getProductSelection = [^\n]+/)[0];
const sort = vm.runInNewContext(`${sorting}; sortCatalog`);
const select = vm.runInNewContext(`${selection}; getProductSelection`);
const cards = [189000, 129000, 169000, 129000].map((price, index) => ({dataset:{price:String(price), catalogOrder:String(index)}}));
test('price sorting compares numeric COP values and preserves editorial ties', () => {
  assert.equal(sort(cards, 'price-asc').map(card=>card.dataset.catalogOrder).join(','), '1,3,2,0');
  assert.equal(sort(cards, 'price-desc').map(card=>card.dataset.catalogOrder).join(','), '0,2,1,3');
  assert.equal(cards.map(card=>card.dataset.catalogOrder).join(','), '0,1,2,3');
});
test('returning to the drop selection restores its original order', () => {
  const byPrice = sort(cards, 'price-asc');
  assert.equal(sort(byPrice, 'featured').map(card=>card.dataset.catalogOrder).join(','), '0,1,2,3');
});
test('a bag selection requires a product and an explicit supported size', () => {
  const product = {name:'Bottle Label Wide Leg',price:189000};
  for (const size of [undefined, null, '', 'XL']) assert.equal(select(product, size), null);
  assert.equal(select(null, 'M'), null);
  assert.equal(select(product, 'S').size, 'S');
  assert.equal(select(product, 'L').name, product.name);
  assert.equal(product.size, undefined);
});
