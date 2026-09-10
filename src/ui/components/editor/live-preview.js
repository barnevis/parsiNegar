// Live-preview extensions for the Persian Markdown editor.
//
// Single-pane rendering: formatting marks stay in the document (the source is
// still Markdown) but are visually hidden, while content tokens receive
// rendered styles. This module owns stable `parsi-*` classes via its own
// HighlightStyle plus line and marker decorations; it never relies on
// CodeMirror's generated hashed classes, which renumber with the extension
// set. No services, no events, no business logic — pure presentation.
import { EditorView } from 'codemirror';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { Decoration, ViewPlugin, WidgetType, highlightActiveLine } from '@codemirror/view';
import { tags } from '@lezer/highlight';
import { TASK_LINE_PATTERN } from './task-list.js';

const PERSIAN_FONT = "'Vazirmatn', Tahoma, sans-serif";
const MONO_FONT = "'Vazirmatn', ui-monospace, monospace";

/**
 * Stable highlight classes for Markdown tokens. Applied alongside the default
 * highlight style; only `parsi-*` classes are targeted by the theme below.
 */
const persianHighlight = HighlightStyle.define([
  { tag: tags.heading1, class: 'parsi-h1' },
  { tag: tags.heading2, class: 'parsi-h2' },
  { tag: tags.heading3, class: 'parsi-h3' },
  { tag: tags.heading4, class: 'parsi-h4' },
  { tag: tags.heading5, class: 'parsi-h5' },
  { tag: tags.heading6, class: 'parsi-h6' },
  { tag: tags.heading, class: 'parsi-heading' },
  { tag: tags.processingInstruction, class: 'parsi-mark' },
  { tag: tags.quote, class: 'parsi-quote' },
  { tag: tags.list, class: 'parsi-list' },
  { tag: tags.emphasis, class: 'parsi-em' },
  { tag: tags.strong, class: 'parsi-strong' },
  { tag: tags.strikethrough, class: 'parsi-strike' },
  { tag: tags.link, class: 'parsi-link' },
  { tag: tags.url, class: 'parsi-url' },
  { tag: tags.monospace, class: 'parsi-code' },
  { tag: tags.labelName, class: 'parsi-label' },
  { tag: tags.string, class: 'parsi-string' },
]);

/**
 * Hides every formatting mark (`#`, `>`, list and emphasis marks, brackets,
 * fences) and styles content as rendered Markdown. Marks reappear on the
 * active line so the text under the cursor stays editable in the open.
 */
const livePreviewTheme = EditorView.theme({
  // The base theme draws a dotted outline around the focused editor; on the
  // paper card it looks like a glitch, and the blinking caret already signals
  // focus — so it is explicitly removed.
  '&.cm-focused': { outline: 'none' },
  '& .parsi-mark': { display: 'none' },
  '& .parsi-url': { display: 'none' },
  '& .parsi-label': { display: 'none' },
  '& .cm-activeLine .parsi-mark': { display: 'inline' },
  '& .cm-activeLine .parsi-url': { display: 'inline' },
  '& .cm-activeLine .parsi-label': { display: 'inline' },
  '& .parsi-heading': { fontWeight: '700', textDecoration: 'none' },
  '& .parsi-h1': { fontSize: '1.7em', fontWeight: '700' },
  '& .parsi-h2': { fontSize: '1.5em', fontWeight: '700' },
  '& .parsi-h3': { fontSize: '1.3em', fontWeight: '700' },
  '& .parsi-h4': { fontSize: '1.18em', fontWeight: '700' },
  '& .parsi-h5': { fontSize: '1.08em', fontWeight: '700' },
  '& .parsi-h6': { fontSize: '1em', fontWeight: '700' },
  '& .parsi-quote-line': {
    borderInlineStart: '3px solid #b9b9c4',
    paddingInlineStart: '0.75em',
    color: '#55555f',
  },
  '& .parsi-list-line': { paddingInlineStart: '1em' },
  '& .parsi-list-marker': { color: '#6b6b78', fontWeight: '700' },
  '& .parsi-code-line': { backgroundColor: '#f1f1f4', fontFamily: MONO_FONT },
  '& .parsi-em': { fontStyle: 'italic' },
  '& .parsi-strong': { fontWeight: '700' },
  '& .parsi-strike': { textDecoration: 'line-through' },
  '& .parsi-link': { color: '#0b5bd3', textDecoration: 'underline' },
  '& .parsi-code': {
    fontFamily: MONO_FONT,
    backgroundColor: '#f1f1f4',
    borderRadius: '4px',
    paddingInline: '0.25em',
  },
});

const LIST_PATTERN = /^[ \t]*(?:([*+-])|([0-9\u06F0-\u06F9]+)[.)])\s+/;
const QUOTE_PATTERN = /^[ \t]*>/;
const FENCE_PATTERN = /^[ \t]*```/;

/**
 * Replaces a raw list marker with a rendered bullet or the original number.
 */
class ListMarkerWidget extends WidgetType {
  constructor(label) {
    super();
    this.label = label;
  }

  eq(other) {
    return other instanceof ListMarkerWidget && other.label === this.label;
  }

  toDOM() {
    const span = document.createElement('span');
    span.className = 'parsi-list-marker';
    span.textContent = this.label;
    return span;
  }
}

/**
 * Builds line decorations (quote/list/code-fence lines) for visible ranges.
 * Fence parity is resolved by scanning from the document start.
 * @param {object} view Active editor view.
 * @returns {object} Decoration set.
 */
function buildLineDecorations(view) {
  const builder = [];
  let inFence = false;
  let fenceCheckedUntil = 1;
  for (const { from, to } of view.visibleRanges) {
    const firstLine = view.state.doc.lineAt(from).number;
    for (let number = fenceCheckedUntil; number < firstLine; number += 1) {
      if (FENCE_PATTERN.test(view.state.doc.line(number).text)) {
        inFence = !inFence;
      }
    }
    fenceCheckedUntil = Math.max(fenceCheckedUntil, firstLine);
    for (let pos = from; pos <= to;) {
      const line = view.state.doc.lineAt(pos);
      if (FENCE_PATTERN.test(line.text)) {
        inFence = !inFence;
      } else if (inFence) {
        builder.push(Decoration.line({ class: 'parsi-code-line' }).range(line.from));
      } else if (QUOTE_PATTERN.test(line.text)) {
        builder.push(Decoration.line({ class: 'parsi-quote-line' }).range(line.from));
      } else if (LIST_PATTERN.test(line.text)) {
        builder.push(Decoration.line({ class: 'parsi-list-line' }).range(line.from));
      }
      pos = line.to + 1;
    }
  }
  return Decoration.set(builder);
}

/**
 * Builds marker widgets for list lines, skipping the line under the cursor
 * (its raw marker is revealed by the theme instead).
 * @param {object} view Active editor view.
 * @returns {object} Decoration set.
 */
function buildMarkerDecorations(view) {
  const activeLine = view.state.doc.lineAt(view.state.selection.main.head).number;
  const builder = [];
  for (const { from, to } of view.visibleRanges) {
    for (let pos = from; pos <= to;) {
      const line = view.state.doc.lineAt(pos);
      if (line.number !== activeLine && !TASK_LINE_PATTERN.test(line.text)) {
        const match = LIST_PATTERN.exec(line.text);
        if (match) {
          const markerStart = line.from + match[0].indexOf(match[1] ?? match[2]);
          const markerEnd = line.from + match[0].length;
          const label = match[1] ? '• ' : `${match[2]}. `;
          builder.push(
            Decoration.replace({ widget: new ListMarkerWidget(label) }).range(markerStart, markerEnd),
          );
        }
      }
      pos = line.to + 1;
    }
  }
  return Decoration.set(builder);
}

const lineDecorationPlugin = ViewPlugin.fromClass(
  class {
    constructor(view) {
      this.decorations = buildLineDecorations(view);
    }

    update(update) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = buildLineDecorations(update.view);
      }
    }
  },
  { decorations: (value) => value.decorations },
);

const markerDecorationPlugin = ViewPlugin.fromClass(
  class {
    constructor(view) {
      this.decorations = buildMarkerDecorations(view);
    }

    update(update) {
      if (update.docChanged || update.viewportChanged || update.selectionSet) {
        this.decorations = buildMarkerDecorations(update.view);
      }
    }
  },
  { decorations: (value) => value.decorations },
);

/**
 * Returns the live-preview extensions for the Markdown view.
 * @returns {Array} CodeMirror extensions (highlight, theme, decorations).
 */
export function livePreviewExtensions() {
  return [
    syntaxHighlighting(persianHighlight),
    highlightActiveLine(),
    livePreviewTheme,
    lineDecorationPlugin,
    markerDecorationPlugin,
  ];
}
