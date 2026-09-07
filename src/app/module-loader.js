// Runtime Host: resolves bootstrap path refs to manifests and entry modules.

const MANIFEST_FILE = 'manifest.json';
const ENTRY_FILE = 'index.js';

/**
 * Resolves a bootstrap path ref against the document base URL.
 * @param {string} ref Path ref from bootstrap.json (e.g. "./src/ui").
 * @returns {URL} Resolved directory URL with a trailing slash.
 * @throws {Error} When the ref is not a non-empty string.
 */
function resolveDirectory(ref) {
  if (typeof ref !== 'string' || ref.trim().length === 0) {
    throw new Error('ModuleLoader ref must be a non-empty string');
  }
  const normalized = ref.trim().replace(/\/+$/, '');
  return new URL(`${normalized}/`, document.baseURI);
}

/**
 * Creates the ModuleLoader injected into PeyCore (two-step contract).
 * loadManifest() only fetches and parses JSON and never executes code;
 * loadEntry() dynamically imports the entry module afterwards.
 * @returns {object} ModuleLoader with loadManifest(ref) and loadEntry(ref).
 */
export function createModuleLoader() {
  return {
    async loadManifest(ref) {
      const manifestUrl = new URL(MANIFEST_FILE, resolveDirectory(ref)).href;
      const response = await fetch(manifestUrl);
      if (!response.ok) {
        throw new Error(`ModuleLoader could not load manifest at ${manifestUrl}: HTTP ${response.status}`);
      }
      return response.json();
    },
    async loadEntry(ref) {
      const entryUrl = new URL(ENTRY_FILE, resolveDirectory(ref)).href;
      return import(entryUrl);
    },
  };
}
