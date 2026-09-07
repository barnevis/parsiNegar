// Home page: application title plus the Persian Markdown editor.
// The page (connected by the kit page host) renders the editor host node in
// its template and mounts the CodeMirror view into it; CodeMirror needs a
// live DOM node, so mounting happens in connectedCallback and release in
// disconnectedCallback. This is the only lifecycle code here; all DOM event
// handling stays declarative on PeyElement.
import { PeyElement } from 'pey.webui/base/pey-element';
import { createMarkdownView } from '../../components/editor/markdown-view.js';
import SAMPLE_DOCUMENT from '../../sample-document.js';

const TAG = 'parsi-page-home';
const CHANGE_EVENT = 'parsi-page-home:change';

class ParsiPageHome extends PeyElement {
  #t = (key) => key;
  #editor = null;

  onConnect(refs = {}) {
    if (typeof refs.t === 'function') {
      this.#t = refs.t;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // The base class flushes render() in a microtask queued inside
    // connectedCallback, so the host node only exists afterwards.
    queueMicrotask(() => this.#mountEditor());
  }

  disconnectedCallback() {
    this.#unmountEditor();
    super.disconnectedCallback();
  }

  /**
   * Returns the current Markdown text.
   * @returns {string} Current document content.
   */
  get value() {
    return this.#editor?.getValue() ?? SAMPLE_DOCUMENT;
  }

  /**
   * Replaces the editor content (public API for future file flows).
   * @param {string} text New Markdown text.
   * @returns {void}
   */
  setDocument(text) {
    this.#editor?.setDocument(text);
  }

  render() {
    return `
      <style>
        :host {
          display: block;
          max-inline-size: 60rem;
          margin-inline: auto;
          padding: 1.5rem 1rem 3rem;
        }
        [part="title"] {
          font-size: 1.75rem;
          margin: 0 0 0.25rem;
        }
        [part="subtitle"] {
          margin: 0 0 1.5rem;
          opacity: 0.75;
        }
        [part="editor-host"] {
          border: 1px solid var(--pey-color-border, #c8c8c8);
          border-radius: 8px;
          overflow: hidden;
          background-color: var(--pey-color-canvas, #ffffff);
        }
        [part="editor-host"] .cm-editor {
          min-block-size: 60vh;
        }
      </style>
      <h1 part="title">${this.#t('parsinegar.app.title')}</h1>
      <p part="subtitle">${this.#t('parsinegar.app.subtitle')}</p>
      <div part="editor-host"></div>
    `;
  }

  #mountEditor() {
    if (this.#editor || !this.isConnected) {
      return;
    }
    const host = this.shadowRoot.querySelector('[part="editor-host"]');
    if (!host) {
      return;
    }
    this.#editor = createMarkdownView(host, {
      document: SAMPLE_DOCUMENT,
      label: this.#t('parsinegar.editor.label'),
      onChange: (value) => {
        this.dispatchEvent(
          new CustomEvent(CHANGE_EVENT, {
            bubbles: true,
            composed: true,
            detail: { value },
          }),
        );
      },
    });
  }

  #unmountEditor() {
    this.#editor?.destroy();
    this.#editor = null;
  }
}

customElements.define(TAG, ParsiPageHome);

export { ParsiPageHome, TAG };
