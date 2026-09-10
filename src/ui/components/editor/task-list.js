// Task-list rendering for the Persian Markdown editor: `- [ ]` / `- [x]`
// boxes become clickable checkboxes (☐/☑). The raw box stays in the document
// and reappears on the active line, so the source remains plain Markdown.
// Pure presentation plus a view-local toggle; no services involved.
import { EditorView } from 'codemirror';
import { Decoration, ViewPlugin, WidgetType } from '@codemirror/view';

/**
 * Matches a task-list item line (unordered or ordered).
 */
export const TASK_LINE_PATTERN = /^[ \t]*(?:[*+-]|\d+[.)])\s+\[[ xX]\]/;

const CHECKED_GLYPH = '☑';
const UNCHECKED_GLYPH = '☐';

/**
 * Returns the toggled box content for a task marker character.
 * @param {string} state Current box content: ' ', 'x' or 'X'.
 * @returns {string} Toggled content: 'x' for open, ' ' for done.
 */
export function toggledBox(state) {
  return state === ' ' ? 'x' : ' ';
}

/**
 * Finds the `[ ]`/`[x]` box range inside a task line, if any.
 * @param {object} line CodeMirror line object.
 * @returns {object|null} `{ from, to, checked }` or null.
 */
function findTaskBox(line, lineStart) {
  const boxStart = line.text.indexOf('[');
  if (boxStart < 0 || boxStart + 3 > line.text.length) {
    return null;
  }
  const box = line.text.slice(boxStart, boxStart + 3);
  const match = /^\[([ xX])\]$/.exec(box);
  if (!match) {
    return null;
  }
  return { from: lineStart + boxStart, to: lineStart + boxStart + 3, checked: match[1] !== ' ' };
}

/**
 * Clickable checkbox replacing a raw task box. Carries its document position
 * so the toggle handler needs no DOM measurement (which has no layout to
 * read from in tests and is needlessly indirect in browsers).
 */
class TaskBoxWidget extends WidgetType {
  constructor(checked, from) {
    super();
    this.checked = checked;
    this.from = from;
  }

  eq(other) {
    return other instanceof TaskBoxWidget && other.checked === this.checked && other.from === this.from;
  }

  ignoreEvent() {
    // Let mousedown reach the editor so the toggle handler runs; the default
    // swallows widget events before any domEventHandler sees them.
    return false;
  }

  toDOM() {
    const span = document.createElement('span');
    span.className = 'parsi-task-marker';
    span.textContent = this.checked ? CHECKED_GLYPH : UNCHECKED_GLYPH;
    span.setAttribute('role', 'checkbox');
    span.setAttribute('aria-checked', String(this.checked));
    span.dataset.taskFrom = String(this.from);
    return span;
  }
}

/**
 * Builds checkbox widgets for task lines, skipping the line under the cursor
 * (its raw box is revealed by the theme instead).
 * @param {object} view Active editor view.
 * @returns {object} Decoration set.
 */
function buildTaskDecorations(view) {
  const activeLine = view.state.doc.lineAt(view.state.selection.main.head).number;
  const builder = [];
  for (const { from, to } of view.visibleRanges) {
    for (let pos = from; pos <= to;) {
      const line = view.state.doc.lineAt(pos);
      if (line.number !== activeLine && TASK_LINE_PATTERN.test(line.text)) {
        const box = findTaskBox(line, line.from);
        if (box) {
          builder.push(
            Decoration.replace({ widget: new TaskBoxWidget(box.checked, box.from) }).range(box.from, box.to),
          );
        }
      }
      pos = line.to + 1;
    }
  }
  return Decoration.set(builder);
}

const taskMarkerPlugin = ViewPlugin.fromClass(
  class {
    constructor(view) {
      this.decorations = buildTaskDecorations(view);
    }

    update(update) {
      if (update.docChanged || update.viewportChanged || update.selectionSet) {
        this.decorations = buildTaskDecorations(update.view);
      }
    }
  },
  { decorations: (value) => value.decorations },
);

const taskTheme = EditorView.theme({
  '& .parsi-task-marker': { cursor: 'pointer', color: '#0b5bd3', fontWeight: '700' },
});

/**
 * Returns the task-list extensions: checkbox widgets, click toggle, styles.
 * @returns {Array} CodeMirror extensions.
 */
export function taskListExtensions() {
  return [
    taskMarkerPlugin,
    taskTheme,
    EditorView.domEventHandlers({
      mousedown(event, view) {
        const marker = event.target?.closest?.('.parsi-task-marker');
        if (!marker) {
          return false;
        }
        const position = Number(marker.dataset?.taskFrom);
        if (!Number.isInteger(position)) {
          return false;
        }
        const box = view.state.doc.sliceString(position, position + 3);
        const match = /^\[([ xX])\]$/.exec(box);
        if (!match) {
          return false;
        }
        event.preventDefault();
        view.dispatch({
          changes: { from: position + 1, to: position + 2, insert: toggledBox(match[1]) },
        });
        return true;
      },
    }),
  ];
}
