// Installs the shared jsdom environment for Web Component tests.
import { JSDOM, VirtualConsole } from 'jsdom';

const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', () => {});

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/ui/index.html',
  pretendToBeVisual: true,
  virtualConsole,
});

for (const [name, value] of Object.entries({
  window: dom.window,
  document: dom.window.document,
  customElements: dom.window.customElements,
  HTMLElement: dom.window.HTMLElement,
  Node: dom.window.Node,
  Event: dom.window.Event,
  CustomEvent: dom.window.CustomEvent,
  MutationObserver: dom.window.MutationObserver,
})) {
  globalThis[name] = value;
}

globalThis.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);

export { dom };
