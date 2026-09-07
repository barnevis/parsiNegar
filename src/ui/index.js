// Parsinegar UI entry point (adapted from pey.webui application template).
import { PEY_ROUTER_SERVICE } from 'pey.webui/contracts';
import { createI18n } from 'pey.webui/i18n';
import { createPageHost } from 'pey.webui/routing/page-host';
import { createPageLoaderRegistry } from 'pey.webui/routing/page-loader';
import { TAG as APP_SHELL_TAG } from 'pey.webui/shell/app-shell';
import { createApplicationSetup } from 'pey.webui/shell/create-application-setup';
import appCatalog from './i18n/catalog.js';

/**
 * Starts the Parsinegar UI: single home route plus the not-found slot.
 * @param {object} context Pey Core UI context.
 * @returns {Promise<void>}
 */
export const setup = createApplicationSetup({
  assetBaseUrlBase: import.meta.url,
  requiredServices: [PEY_ROUTER_SERVICE],
  optionalServices: [],
  mountShell(resources) {
    const shell = document.createElement(APP_SHELL_TAG);
    shell.connect({
      infrastructure: { events: resources.events },
      refs: {
        theme: resources.config.theme,
        direction: resources.config.direction,
      },
    });
    document.body.append(shell);
    resources.shell = shell;

    const i18n = createI18n({
      language: resources.config.language,
      catalog: appCatalog,
    });

    const registry = createPageLoaderRegistry({
      routes: [
        {
          pattern: '/',
          load: () => import('./pages/home/home.js'),
          element: 'parsi-page-home',
        },
        {
          pattern: '/not-found',
          load: () => import('./pages/not-found/not-found.js'),
          element: 'parsi-page-not-found',
        },
      ],
      notFound: {
        load: () => import('./pages/not-found/not-found.js'),
        element: 'parsi-page-not-found',
      },
    });
    resources.pageHost = createPageHost({
      hostElement: shell,
      events: resources.events,
      router: resources.router,
      registry,
      infrastructure: { events: resources.events },
      refs: {
        services: resources.required,
        t: i18n.t,
        format: i18n.format,
      },
      config: resources.config,
    });

    // Initial mount: route registrations (and their router:changed publish)
    // happen during plugin activation, before the UI subscribes — so the
    // current route is mounted explicitly once at startup. Later navigations
    // arrive through the page host's router:changed subscription.
    try {
      const route = resources.router.getCurrentRoute();
      void Promise.resolve(resources.pageHost.mountForRoute(route)).catch(() => {
        console.error('[parsinegar] initial route mount failed');
      });
    } catch {
      console.error('[parsinegar] initial route read failed');
    }
  },
  cleanup(resources) {
    resources.pageHost?.dispose();
    resources.shell?.remove();
  },
  onCoreShutdown(resources) {
    void resources;
  },
});
