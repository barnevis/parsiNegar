import { elements } from '../utils/dom.js';

/**
 * ماژول مدیریت UI
 * این ماژول وظیفه بارگذاری پویا و عنداللزوم کامپوننت‌های UI را بر عهده دارد.
 */

const componentRegistry = {
  layout: {
    loader: () => import('./components/layout.js'),
    target: () => elements.appContainer,
    isLoaded: () => !!elements.menuBar,
    position: 'beforeend'
  },
  settingsModal: {
    loader: () => import('./components/settingsModal.js'),
    target: () => document.body,
    isLoaded: () => !!elements.settingsPanel,
    position: 'beforeend'
  },
  propertiesModal: {
    loader: () => import('./components/propertiesModal.js'),
    target: () => document.body,
    isLoaded: () => !!elements.filePropertiesModal,
    position: 'beforeend'
  },
  customDialog: {
    loader: () => import('./components/customDialog.js'),
    target: () => document.body,
    isLoaded: () => !!elements.customDialog,
    position: 'beforeend'
  },
  shortcutsHelpModal: {
    loader: () => import('./components/shortcutsHelpModal.js'),
    target: () => document.body,
    isLoaded: () => !!elements.shortcutsHelpModal,
    position: 'beforeend'
  },
};

class UIManager {
  async ensureComponentLoaded(name) {
    const component = componentRegistry[name];
    
    // اگر کامپوننت وجود نداشت یا از قبل بارگذاری شده بود، خارج شو
    if (!component || component.isLoaded()) {
      return;
    }

    try {
      const module = await component.loader();
      const targetElement = component.target();
      if (targetElement) {
        targetElement.insertAdjacentHTML(component.position, module.html);
      } else {
        console.error(`عنصر هدف برای کامپوننت '${name}' یافت نشد.`);
      }
    } catch (error) {
      console.error(`خطا در بارگذاری کامپوننت '${name}':`, error);
    }
  }
}

export const uiManager = new UIManager();
