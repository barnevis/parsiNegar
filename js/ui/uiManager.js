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
  constructor() {
    this.loadingPromises = new Map();
  }

  async ensureComponentLoaded(name) {
    const component = componentRegistry[name];
    
    // اگر کامپوننت وجود نداشت یا از قبل بارگذاری شده بود، خارج شو
    if (!component || component.isLoaded()) {
      return;
    }

    // اگر بارگذاری در حال انجام بود، منتظر آن بمان
    if (this.loadingPromises.has(name)) {
      await this.loadingPromises.get(name);
      return;
    }

    try {
      // بارگذاری را شروع کن و پرامیس آن را ذخیره کن
      const loadPromise = component.loader();
      this.loadingPromises.set(name, loadPromise);

      const module = await loadPromise;
      const targetElement = component.target();
      
      if (targetElement) {
        // دوباره چک کن که در این فاصله اضافه نشده باشد
        if (!component.isLoaded()) {
          targetElement.insertAdjacentHTML(component.position, module.html);
        }
      } else {
        console.error(`عنصر هدف برای کامپوننت '${name}' یافت نشد.`);
      }
    } catch (error) {
      console.error(`خطا در بارگذاری کامپوننت '${name}':`, error);
    } finally {
      // پس از اتمام (موفق یا ناموفق)، پرامیس را از کش حذف کن
      this.loadingPromises.delete(name);
    }
  }
}

export const uiManager = new UIManager();