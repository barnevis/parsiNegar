// Verifies the parsinegar.app plugin contract (route ownership).
import assert from 'node:assert/strict';
import test from 'node:test';
import { activate, prepare } from '../../../src/plugins/app/index.js';

function createPrepareContext() {
  return {
    config: {},
    events: { subscribe: () => () => {}, publish: () => ({ success: true }) },
    onShutdown: null,
    onDeactivated: null,
    reportCriticalError: () => {},
  };
}

function createRouterService() {
  const registered = [];
  return {
    registered,
    registerRoutes(patterns) {
      registered.push(...patterns);
    },
  };
}

test('should_provide_no_services_when_prepared', async () => {
  const provided = await prepare(createPrepareContext());
  assert.deepEqual(provided, []);
});

test('should_register_owned_routes_when_activated', async () => {
  const router = createRouterService();
  await activate({ 'pey.router.service': router });
  assert.deepEqual(router.registered, ['/', '/not-found']);
});

test('should_fail_clearly_when_router_is_missing', async () => {
  await assert.rejects(activate({}), /pey\.router\.service/);
});
