// Creates a CodeMirror Markdown view inside a host element.
//
// This is a plain controller factory, not a custom element: a PeyElement child
// cannot be nested declaratively (connect-before-insertion plus the
// render-cycle rule forbid it), so the owning page renders the host node in
// its template and mounts the third-party view here. CodeMirror owns its own
// listeners until destroy() releases them.
import { EditorView, minimalSetup } from 'codemirror';
import { markdown } from '@codemirror/lang-markdown';

const PERSIAN_FONT = "'Vazirmatn', Tahoma, sans-serif";

/**
 * Creates a right-to-left Markdown editing view in the given host element.
 * @param {HTMLElement} host Container rendered by the owning component.
 * @param {object} [options] View options.
 * @param {string} [options.document] Initial Markdown text.
 * @param {string} [options.label] Accessible label for the editor.
 * @param {Function} [options.onChange] Called with the new text on every edit.
 * @returns {object} Controller with getValue(), setDocument(text), destroy().
 * @throws {Error} When host is not an element.
 */
export function createMarkdownView(host, options = {}) {
  const isElement = host !== null && typeof host === 'object' && typeof host.appendChild === 'function';
  if (!isElement) {
    throw new Error('createMarkdownView requires an element host');
  }
  const onChange = typeof options.onChange === 'function' ? options.onChange : null;
  let current = typeof options.document === 'string' ? options.document : '';
  let destroyed = false;

  const view = new EditorView({
    parent: host,
    doc: current,
    extensions: [
      minimalSetup,
      markdown(),
      EditorView.lineWrapping,
      EditorView.editorAttributes.of({ dir: 'rtl', 'aria-label': options.label ?? '' }),
      EditorView.theme({
        '&': {
          direction: 'rtl',
          textAlign: 'right',
          fontFamily: PERSIAN_FONT,
          fontSize: '1rem',
        },
        '& .cm-scroller': {
          fontFamily: PERSIAN_FONT,
        },
      }),
      EditorView.updateListener.of((update) => {
        if (!update.docChanged || destroyed) {
          return;
        }
        current = update.state.doc.toString();
        onChange?.(current);
      }),
    ],
  });

  return {
    /**
     * Returns the current Markdown text.
     * @returns {string} Current document content.
     */
    getValue() {
      if (!destroyed) {
        current = view.state.doc.toString();
      }
      return current;
    },
    /**
     * Replaces the editor content.
     * @param {string} text New Markdown text.
     * @returns {void}
     */
    setDocument(text) {
      if (typeof text !== 'string' || destroyed) {
        return;
      }
      current = text;
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: text },
      });
    },
    /**
     * Destroys the view and releases its listeners. Keeps the last text.
     * @returns {void}
     */
    destroy() {
      if (destroyed) {
        return;
      }
      current = view.state.doc.toString();
      destroyed = true;
      view.destroy();
    },
  };
}
