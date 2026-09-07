// Verifies bootstrap.json: the single place defining adapters, plugins, UI path.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const BOOTSTRAP_URL = new URL('../bootstrap.json', import.meta.url);

async function loadBootstrap() {
  return JSON.parse(await readFile(BOOTSTRAP_URL, 'utf8'));
}

test('should_contain_all_required_sections_when_loaded', async () => {
  const bootstrap = await loadBootstrap();
  for (const section of ['architecture', 'core', 'adapters', 'ui', 'plugins', 'config', 'app']) {
    assert.ok(section in bootstrap, `missing section: ${section}`);
  }
  assert.equal(bootstrap.architecture, '0.11');
  assert.equal(bootstrap.ui.path, './src/ui');
  assert.equal(bootstrap.app.name, 'parsinegar');
});

test('should_wire_router_adapter_and_plugins_when_loaded', async () => {
  const bootstrap = await loadBootstrap();
  assert.equal(bootstrap.adapters.router, 'BrowserHistoryAdapter');
  const names = bootstrap.plugins.map((plugin) => plugin.name);
  assert.ok(names.includes('pey.router'));
  assert.ok(names.includes('parsinegar.app'));
  assert.equal(bootstrap.plugins.length, 2);
});

test('should_carry_persian_ui_config_when_loaded', async () => {
  const bootstrap = await loadBootstrap();
  assert.equal(bootstrap.config.ui.language, 'fa');
  assert.equal(bootstrap.config.ui.direction, 'rtl');
});
