# Centered Smile Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Сохранить расширение улыбки именинника в конце начальной анимации, исключив смещение рта вправо.

**Architecture:** Статическая страница оставляет существующий SVG-контур и keyframes без изменений. CSS-селектор рта получает локальную систему отсчёта и центральную точку трансформации; отдельный тест на встроенном `node:test` защищает это поведение от регрессии.

**Tech Stack:** HTML, CSS, Node.js `node:test` и `node:assert` без сторонних зависимостей.

## Global Constraints

- Не менять SVG-разметку, геометрию лица, задержку, длительность и величину расширения улыбки `scaleX(1.3)`.
- Изменить только CSS-правило рта именинника и добавить сфокусированную регрессионную проверку.

---

### Task 1: Центрировать масштабирование улыбки

**Files:**
- Create: `tests/smile-animation.test.js`
- Modify: `styles.css:309`

**Interfaces:**
- Consumes: CSS-селектор `.birthday-man .mouth` и keyframes `smilePop`.
- Produces: проверяемый контракт — контур масштабируется в собственной рамке относительно центра.

- [x] **Step 1: Write the failing test**

```js
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
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --test tests/smile-animation.test.js`

Expected: FAIL because the mouth rule does not contain `transform-box: fill-box`.

- [x] **Step 3: Write minimal implementation**

Replace the existing mouth rule with:

```css
.birthday-man .mouth {
  animation: smilePop .5s 3.4s ease-out forwards;
  transform-box: fill-box;
  transform-origin: center;
}
```

- [x] **Step 4: Run focused and project checks**

Run: `node --test tests/smile-animation.test.js`

Expected: PASS with one passing test.

Run: `node --test`

Expected: PASS for every discovered test with no failures.

Run: `git diff --check`

Expected: no output and exit code 0.

- [x] **Step 5: Review the final diff**

Run: `git diff -- styles.css tests/smile-animation.test.js`

Expected: only the two centering declarations in the mouth rule and the focused regression test.

- [x] **Step 6: Commit**

```bash
git add styles.css tests/smile-animation.test.js docs/superpowers/plans/2026-07-15-centered-smile-animation.md
git commit -m "Fix centered smile animation"
```
