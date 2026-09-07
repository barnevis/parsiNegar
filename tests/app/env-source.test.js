// Verifies the browser EnvSource (query-param overrides, safe fallbacks).
import assert from 'node:assert/strict';
import test from 'node:test';
import { createEnvSource } from '../../src/app/env-source.js';

test('should_return_empty_when_variable_is_absent', () => {
  const source = createEnvSource();
  assert.equal(source.get('DEFINITELY_ABSENT_VAR'), '');
});

test('should_return_empty_when_name_is_invalid', () => {
  const source = createEnvSource();
  assert.equal(source.get(''), '');
  assert.equal(source.get(null), '');
});

test('should_return_override_when_query_param_is_present', () => {
  const previous = globalThis.location;
  globalThis.location = { search: '?env_DEBUG_VALUE=hello' };
  try {
    assert.equal(createEnvSource().get('DEBUG_VALUE'), 'hello');
  } finally {
    globalThis.location = previous;
  }
});
