// Not-found page: message plus a router-driven return action.
import { PEY_ROUTER_SERVICE } from 'pey.webui/contracts';
import { PeyElement } from 'pey.webui/base/pey-element';

const TAG = 'parsi-page-not-found';
const HOME_PATTERN = '/';

class ParsiPageNotFound extends PeyElement {
  #t = (key) => key;
  #router = null;

  onConnect(refs = {}) {
    if (typeof refs.t === 'function') {
      this.#t = refs.t;
    }
    const router = refs.services?.[PEY_ROUTER_SERVICE] ?? null;
    if (router && typeof router.navigate === 'function') {
      this.#router = router;
    }
  }

  eventTypes() {
    return ['click'];
  }

  handleEvent(event) {
    if (event.target?.closest?.('[part="back"]')) {
      this.#router?.navigate(HOME_PATTERN);
    }
  }

  render() {
    return `
      <style>
        :host {
          display: block;
          max-inline-size: 60rem;
          margin-inline: auto;
          padding: 3rem 1rem;
          text-align: center;
        }
      </style>
      <h1 part="title">${this.#t('parsinegar.not-found.title')}</h1>
      <button part="back" type="button">${this.#t('parsinegar.not-found.action')}</button>
    `;
  }
}

customElements.define(TAG, ParsiPageNotFound);

export { ParsiPageNotFound, TAG };
