// Verifies the not-found page navigates home through the Router service.
import '../../setup-dom.js';
import assert from 'node:assert/strict';
import test from 'node:test';
import { TAG } from '../../../src/ui/pages/not-found/not-found.js';
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

test('should_render_message_when_mounted', async () => {
  const element = document.createElement(TAG);
  element.connect({ infrastructure: { events: createEvents() }, refs: { t: translate, services: {} } });
  document.body.append(element);
  await flush();
  try {
    const title = element.shadowRoot.querySelector('[part="title"]');
    assert.equal(title?.textContent, 'این صفحه پیدا نشد');
  } finally {
    element.remove();
  }
});

test('should_navigate_home_when_back_is_clicked', async () => {
  const navigated = [];
  const router = { navigate: (path) => navigated.push(path) };
  const element = document.createElement(TAG);
  element.connect({
    infrastructure: { events: createEvents() },
    refs: { t: translate, services: { 'pey.router.service': router } },
  });
  document.body.append(element);
  await flush();
  try {
    element.shadowRoot.querySelector('[part="back"]').click();
    await flush();
    assert.deepEqual(navigated, ['/']);
  } finally {
    element.remove();
  }
});
