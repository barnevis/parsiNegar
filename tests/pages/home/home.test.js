// Verifies the home page renders the Persian shell and hosts the editor.
import '../../setup-dom.js';
import assert from 'node:assert/strict';
import test from 'node:test';
import { TAG } from '../../../src/ui/pages/home/home.js';
import catalog from '../../../src/ui/i18n/catalog.js';

function createEvents() {
  return {
    subscribe: () => () => {},
    publish: () => ({ success: true }),
  };
}

function flush() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function translate(key) {
  return catalog.fa[key] ?? key;
}

test('should_render_title_and_editor_when_mounted', async () => {
  const element = document.createElement(TAG);
  element.connect({ infrastructure: { events: createEvents() }, refs: { t: translate } });
  document.body.append(element);
  await flush();
  try {
    const title = element.shadowRoot.querySelector('[part="title"]');
    assert.equal(title?.textContent, 'پارسی‌نگار');
    assert.ok(element.shadowRoot.querySelector('[part="editor-host"] .cm-editor'));
    assert.ok(element.value.includes('پارسی‌نگار'));
  } finally {
    element.remove();
  }
});

test('should_emit_change_when_editor_content_changes', async () => {
  const element = document.createElement(TAG);
  element.connect({ infrastructure: { events: createEvents() }, refs: { t: translate } });
  document.body.append(element);
  await flush();
  try {
    const seen = [];
    element.addEventListener('parsi-page-home:change', (event) => seen.push(event.detail));
    element.setDocument('متن تازه');
    assert.equal(seen.length, 1);
    assert.equal(seen[0].value, 'متن تازه');
    assert.equal(element.value, 'متن تازه');
  } finally {
    element.remove();
  }
});
