// Parsinegar application plugin: owns the version-1 route catalog.
const ROUTER_SERVICE = 'pey.router.service';
const HOME_PATTERN = '/';
const NOT_FOUND_PATTERN = '/not-found';

/**
 * Prepares the plugin. Version 1 provides no services.
 * @param {object} prepareContext Bonyan preparation context.
 * @returns {Promise<Array>} No service registrations.
 */
export async function prepare(prepareContext) {
  prepareContext.onDeactivated = () => undefined;
  prepareContext.onShutdown = async () => undefined;
  return [];
}

/**
 * Activates the plugin: registers owned route patterns with the router.
 * Registration is only allowed during local activation, after binding.
 * @param {Record<string, object>} services Bound declared dependencies.
 * @returns {Promise<void>}
 */
export async function activate(services) {
  const router = services[ROUTER_SERVICE];
  if (!router) {
    throw new Error(`Required service is unavailable: ${ROUTER_SERVICE}`);
  }
  router.registerRoutes([HOME_PATTERN, NOT_FOUND_PATTERN]);
}
