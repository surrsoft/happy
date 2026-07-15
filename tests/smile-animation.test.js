const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('birthday man smile scales around the center of its own path', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');
  const rule = css.match(/\.birthday-man\s+\.mouth\s*\{([^}]*)\}/);

  assert.ok(rule, 'expected a CSS rule for the birthday man mouth');
  assert.match(rule[1], /transform-box\s*:\s*fill-box\s*;/);
  assert.match(rule[1], /transform-origin\s*:\s*center\s*;/);
});
