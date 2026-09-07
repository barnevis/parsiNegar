// Runtime Host: exposes runtime environment values to Pey Core.

/**
 * Reads a query-string parameter from the current location.
 * @param {string} name Parameter name.
 * @returns {string|null} Parameter value or null when absent.
 */
function readQueryParam(name) {
  try {
    return new URLSearchParams(globalThis.location?.search ?? '').get(name);
  } catch {
    return null;
  }
}

/**
 * Creates the EnvSource injected into PeyCore.
 * Browser hosts have no process.env; supported overrides travel as
 * `?env_<NAME>=<value>` query parameters (useful for local debugging).
 * @returns {object} EnvSource with get(varName).
 */
export function createEnvSource() {
  return {
    get(varName) {
      if (typeof varName !== 'string' || varName.length === 0) {
        return '';
      }
      return readQueryParam(`env_${varName}`) ?? '';
    },
  };
}
