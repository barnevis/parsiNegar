// Runtime Host entry point: wires sources and starts Pey Core.
import { PeyCore } from '@pey/core';
import { createConfigSource } from './config-source.js';
import { createEnvSource } from './env-source.js';
import { createModuleLoader } from './module-loader.js';

/**
 * Boots the application: builds host sources and starts the Core.
 * @returns {Promise<object>} Core start result ({ shutdown }).
 * @throws {Error} When configuration loading or Core startup fails.
 */
export async function boot() {
  const core = new PeyCore({
    configSource: createConfigSource(),
    envSource: createEnvSource(),
    moduleLoader: createModuleLoader(),
  });
  return core.start();
}

boot().catch((error) => {
  console.error('[parsinegar] startup failed', error);
  document.body.append(renderStartupFailure());
});

/**
 * Renders a plain-language startup failure notice (fa).
 * @returns {HTMLElement} Failure notice element.
 */
function renderStartupFailure() {
  const paragraph = document.createElement('p');
  paragraph.setAttribute('role', 'alert');
  paragraph.textContent = 'پارسی‌نگار راه‌اندازی نشد. لطفاً صفحه را بازخوانی کنید.';
  return paragraph;
}
