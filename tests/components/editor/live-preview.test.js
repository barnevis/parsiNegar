// Verifies the live-preview extensions (real CodeMirror in jsdom).
import '../../setup-dom.js';
import assert from 'node:assert/strict';
import test from 'node:test';
import { createMarkdownView } from '../../../src/ui/components/editor/markdown-view.js';

function createEditor(documentText) {
  const host = document.createElement('div');
  document.body.append(host);
  return { host, editor: createMarkdownView(host, { document: documentText }) };
}

function destroy({ host, editor }) {
  editor.destroy();
  host.remove();
}

function computed(element, property) {
  return globalThis.getComputedStyle(element).getPropertyValue(property);
}

/**
 * Checks that an injected stylesheet rule targets a selector with a declaration.
 * @param {string} selector Fragment of the rule selector (e.g. '.parsi-h1').
 * @param {string} property CSS property name.
 * @param {string} expected Substring of the declared value.
 * @returns {boolean} True when such a rule exists.
 */
function hasRule(selector, property, expected) {
  for (const sheet of document.styleSheets) {
    let rules = [];
    try {
      rules = [...sheet.cssRules];
    } catch {
      continue;
    }
    for (const rule of rules) {
      if (rule.selectorText?.includes(selector) && rule.style?.getPropertyValue(property).includes(expected)) {
        return true;
      }
    }
  }
  return false;
}

test('should_remove_focus_outline_when_rendered', () => {
  const mounted = createEditor('متن');
  try {
    assert.ok(hasRule('.cm-focused', 'outline', 'none'));
  } finally {
    destroy(mounted);
  }
});

test('should_hide_marks_when_rendered', () => {
  const mounted = createEditor('متن\n\n# سلام');
  try {
    const marks = [...mounted.host.querySelectorAll('.parsi-mark')];
    assert.ok(marks.length > 0, 'expected mark spans');
    const hidden = marks.filter((mark) => computed(mark, 'display') === 'none');
    assert.ok(hidden.length > 0, 'expected hidden marks off the active line');
  } finally {
    destroy(mounted);
  }
});

test('should_style_heading_when_rendered', () => {
  const mounted = createEditor('# سلام');
  try {
    const heading = mounted.host.querySelector('.parsi-h1');
    assert.ok(heading, 'expected a heading span');
    assert.ok(hasRule('.parsi-h1', 'font-size', '1.7em'));
    assert.ok(hasRule('.parsi-heading', 'font-weight', '700'));
  } finally {
    destroy(mounted);
  }
});

test('should_decorate_quote_line_when_rendered', () => {
  const mounted = createEditor('> نقل‌قول');
  try {
    const line = mounted.host.querySelector('.cm-line.parsi-quote-line');
    assert.ok(line, 'expected a decorated quote line');
  } finally {
    destroy(mounted);
  }
});

test('should_replace_bullet_with_marker_when_rendered', () => {
  const mounted = createEditor('متن\n\n- مورد');
  try {
    const marker = mounted.host.querySelector('.parsi-list-marker');
    assert.ok(marker, 'expected a list marker widget');
    assert.equal(marker.textContent, '• ');
  } finally {
    destroy(mounted);
  }
});

test('should_keep_number_in_marker_when_ordered', () => {
  const mounted = createEditor('متن\n\n۱. نخست\n۲. دوم');
  try {
    const markers = [...mounted.host.querySelectorAll('.parsi-list-marker')];
    assert.ok(markers.length >= 1, 'expected marker widgets');
    assert.ok(markers[0].textContent.startsWith('۱'));
  } finally {
    destroy(mounted);
  }
});

test('should_reveal_marks_on_active_line_when_focused', () => {
  const mounted = createEditor('# سلام\n\nمتن');
  try {
    mounted.editor.focus();
    const firstLine = mounted.host.querySelector('.cm-line');
    assert.ok(firstLine?.classList.contains('cm-activeLine'), 'expected an active line');
    const mark = firstLine.querySelector('.parsi-mark');
    assert.ok(mark, 'expected a mark on the active line');
    assert.equal(computed(mark, 'display'), 'inline');
  } finally {
    destroy(mounted);
  }
});

test('should_decorate_code_block_when_fenced', () => {
  const mounted = createEditor('```\ncode\n```');
  try {
    const codeLine = mounted.host.querySelector('.cm-line.parsi-code-line');
    assert.ok(codeLine, 'expected a decorated code line');
  } finally {
    destroy(mounted);
  }
});
