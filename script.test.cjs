const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
function app() {
  const elements = new Map();
  function element() {
    return {
      textContent: '', value: '', src: '', alt: '', style: {}, children: [], listeners: {},
      set innerHTML(value) { this.children = []; this.textContent = value; },
      addEventListener(name, handler) { this.listeners[name] = handler; },
      appendChild(child) { this.children.push(child); },
      removeAttribute(name) { this[name] = ''; }
    };
  }
  const get = (id) => {
    if (!elements.has(id)) elements.set(id, element());
    return elements.get(id);
  };
  const alerts = [];
  vm.runInNewContext(source, {
    document: { getElementById: get, createElement: element },
    alert: (message) => alerts.push(message), console: { log() {} }
  });
  return { get, alerts, search(value) {
    get('search-input').value = value;
    get('search-button').listeners.click();
  } };
}
for (const [query, name, id] of [
  ['pikachu', 'PIKACHU', '#25'], ['25', 'PIKACHU', '#25'],
  ['gengar', 'GENGAR', '#94'], ['94', 'GENGAR', '#94'],
  ['  GeNgAr  ', 'GENGAR', '#94']
]) test(`search ${JSON.stringify(query)}`, () => {
  const a = app(); a.search(query);
  assert.equal(a.get('pokemon-name').textContent, name);
  assert.equal(a.get('pokemon-id').textContent, id);
  assert.equal(a.get('sprite').style.display, 'block');
  assert.equal(a.alerts.length, 0);
});
test('empty query gives validation message', () => {
  const a = app(); a.search('  ');
  assert.deepEqual(a.alerts, ['Please enter a Pokémon name or ID.']);
});
test('unknown query clears all previous details and sprite', () => {
  const a = app(); a.search('25'); a.search('missing');
  for (const id of ['pokemon-name','pokemon-id','weight','height','hp','attack','defense','special-attack','special-defense','speed']) {
    assert.equal(a.get(id).textContent, '', id);
  }
  assert.equal(a.get('types').children.length, 0);
  assert.equal(a.get('sprite').style.display, 'none');
  assert.equal(a.get('sprite').src, '');
  assert.deepEqual(a.alerts, ['Pokémon not found']);
});
for (const query of ['constructor', '__proto__', 'toString']) test(`reject object property ${query}`, () => {
  const a = app();
  assert.doesNotThrow(() => a.search(query));
  assert.deepEqual(a.alerts, ['Pokémon not found']);
});
test('types are replaced when searching twice', () => {
  const a = app(); a.search('94'); a.search('25');
  assert.deepEqual(a.get('types').children.map((e) => e.textContent), ['ELECTRIC']);
});
test('stylesheet link points to an existing file', () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const match = html.match(/rel="stylesheet" href="([^"]+)"/);
  assert.ok(match);
  assert.ok(fs.existsSync(path.join(__dirname, match[1])));
});
test('all displayed stats match the supported records', () => {
  const a = app();
  for (const [query, values] of [
    ['25', ['Weight: 60','Height: 4','35','55','40','50','50','90']],
    ['94', ['Weight: 405','Height: 15','60','65','60','130','75','110']]
  ]) {
    a.search(query);
    assert.deepEqual(['weight','height','hp','attack','defense','special-attack','special-defense','speed'].map((id) => a.get(id).textContent), values);
  }
});
