// Verifies the browser ModuleLoader contract surface (two-step, no code on manifest).
import '../setup-dom.js';
import assert from 'node:assert/strict';
import test from 'node:test';
import { createModuleLoader } from '../../src/app/module-loader.js';

test('should_expose_two_step_contract_when_created', () => {
  const loader = createModuleLoader();
  assert.equal(typeof loader.loadManifest, 'function');
  assert.equal(typeof loader.loadEntry, 'function');
});

test('should_reject_manifest_when_ref_is_empty', async () => {
  await assert.rejects(createModuleLoader().loadManifest(''), /non-empty string/);
});

test('should_reject_entry_when_ref_is_empty', async () => {
  await assert.rejects(createModuleLoader().loadEntry('   '), /non-empty string/);
});
