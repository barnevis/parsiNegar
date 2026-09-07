// Verifies the Markdown view controller (real CodeMirror in jsdom).
import '../../setup-dom.js';
import assert from 'node:assert/strict';
import test from 'node:test';
import { createMarkdownView } from '../../../src/ui/components/editor/markdown-view.js';
import SAMPLE_DOCUMENT from '../../../src/ui/sample-document.js';

test('should_show_document_when_created_with_text', () => {
  const host = document.createElement('div');
  const editor = createMarkdownView(host, { document: SAMPLE_DOCUMENT });
  try {
    assert.equal(editor.getValue(), SAMPLE_DOCUMENT);
    assert.ok(host.querySelector('.cm-editor'));
    assert.equal(host.querySelector('.cm-editor').getAttribute('dir'), 'rtl');
  } finally {
    editor.destroy();
  }
});

test('should_replace_content_when_set_document_is_called', () => {
  const host = document.createElement('div');
  const editor = createMarkdownView(host, { document: 'before' });
  try {
    editor.setDocument('# سلام دنیا');
    assert.equal(editor.getValue(), '# سلام دنیا');
  } finally {
    editor.destroy();
  }
});

test('should_report_change_when_user_edits', () => {
  const host = document.createElement('div');
  const seen = [];
  const editor = createMarkdownView(host, {
    document: 'before',
    onChange: (value) => seen.push(value),
  });
  try {
    editor.setDocument('متن تازه');
    assert.deepEqual(seen, ['متن تازه']);
  } finally {
    editor.destroy();
  }
});

test('should_keep_last_value_when_destroyed', () => {
  const host = document.createElement('div');
  const editor = createMarkdownView(host, { document: 'before' });
  editor.setDocument('پیش از نابودی');
  editor.destroy();
  assert.equal(editor.getValue(), 'پیش از نابودی');
});

test('should_ignore_non_string_when_set_document_receives_invalid_input', () => {
  const host = document.createElement('div');
  const editor = createMarkdownView(host, { document: 'before' });
  try {
    editor.setDocument(null);
    assert.equal(editor.getValue(), 'before');
  } finally {
    editor.destroy();
  }
});

test('should_fail_clearly_when_host_is_not_an_element', () => {
  assert.throws(() => createMarkdownView(null), /element host/);
});
