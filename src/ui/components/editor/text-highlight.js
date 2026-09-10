// `==highlight==` rendering for the Persian Markdown editor.
//
// Double-equals highlighting is not part of Markdown/GFM, so it is handled as
// a view-local decoration instead of parser syntax: the inner text receives
// the highlight style and the `==` delimiters are hidden (reappearing on the
// active line, like other marks). Multiline spans are not supported.
import { EditorView } from 'codemirror';
import { Decoration, ViewPlugin } from '@codemirror/view';

const HIGHLIGHT_PATTERN = /==([^=\n]+?)==/g;

const highlightTheme = EditorView.theme({
  '& .parsi-highlight': { backgroundColor: '#fff3b0', borderRadius: '4px', paddingInline: '0.2em' },
  '& .parsi-delim': { display: 'none' },
  '& .cm-activeLine .parsi-delim': { display: 'inline' },
});

/**
 * Builds highlight decorations for `==...==` spans, skipping the line under
 * the cursor (its raw delimiters are revealed by the theme instead).
 * @param {object} view Active editor view.
 * @returns {object} Decoration set.
 */
function buildHighlightDecorations(view) {
  const activeLine = view.state.doc.lineAt(view.state.selection.main.head).number;
  const builder = [];
  for (const { from, to } of view.visibleRanges) {
    for (let pos = from; pos <= to;) {
      const line = view.state.doc.lineAt(pos);
      if (line.number !== activeLine) {
        HIGHLIGHT_PATTERN.lastIndex = 0;
        let match = null;
        while ((match = HIGHLIGHT_PATTERN.exec(line.text)) !== null) {
          const matchStart = line.from + match.index;
          const matchEnd = matchStart + match[0].length;
          builder.push(Decoration.mark({ class: 'parsi-delim' }).range(matchStart, matchStart + 2));
          builder.push(Decoration.mark({ class: 'parsi-highlight' }).range(matchStart + 2, matchEnd - 2));
          builder.push(Decoration.mark({ class: 'parsi-delim' }).range(matchEnd - 2, matchEnd));
        }
      }
      pos = line.to + 1;
    }
  }
  return Decoration.set(builder);
}

const highlightPlugin = ViewPlugin.fromClass(
  class {
    constructor(view) {
      this.decorations = buildHighlightDecorations(view);
    }

    update(update) {
      if (update.docChanged || update.viewportChanged || update.selectionSet) {
        this.decorations = buildHighlightDecorations(update.view);
      }
    }
  },
  { decorations: (value) => value.decorations },
);

/**
 * Returns the text-highlight extensions.
 * @returns {Array} CodeMirror extensions.
 */
export function textHighlightExtensions() {
  return [highlightPlugin, highlightTheme];
}
