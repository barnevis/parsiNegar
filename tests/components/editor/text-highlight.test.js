// Verifies `==highlight==` rendering (real CodeMirror in jsdom).
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

test('should_highlight_text_when_delimited', () => {
  const mounted = createEditor('متن\n\n==برجسته==');
  try {
    const highlighted = mounted.host.querySelector('.parsi-highlight');
    assert.ok(highlighted, 'expected a highlight span');
    assert.equal(highlighted.textContent, 'برجسته');
  } finally {
    destroy(mounted);
  }
});

test('should_ignore_unclosed_delimiters_when_rendered', () => {
  const mounted = createEditor('متن\n\n==ناتمام');
  try {
    assert.equal(mounted.host.querySelector('.parsi-highlight'), null);
  } finally {
    destroy(mounted);
  }
});

test('should_keep_raw_delimiters_on_active_line_when_focused', () => {
  const mounted = createEditor('==برجسته==');
  try {
    mounted.editor.focus();
    assert.equal(mounted.host.querySelector('.parsi-highlight'), null);
  } finally {
    destroy(mounted);
  }
});
