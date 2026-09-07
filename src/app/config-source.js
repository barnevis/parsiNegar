// Runtime Host: loads bootstrap.json content for Pey Core.
const BOOTSTRAP_URL = new URL('../../bootstrap.json', import.meta.url).href;

/**
 * Fetches and parses a JSON document, rejecting on HTTP or syntax errors.
 * @param {string} url Document URL.
 * @returns {Promise<object>} Parsed JSON content.
 * @throws {Error} When the fetch fails or the body is not valid JSON.
 */
async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`ConfigSource could not load ${url}: HTTP ${response.status}`);
  }
  return response.json();
}

/**
 * Creates the ConfigSource injected into PeyCore.
 * @param {string} [url] bootstrap.json URL (overridable for tests).
 * @returns {object} ConfigSource with getConfig().
 */
export function createConfigSource(url = BOOTSTRAP_URL) {
  return {
    async getConfig() {
      return fetchJson(url);
    },
  };
}
