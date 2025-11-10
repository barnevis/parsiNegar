// ماژول ابزارهای کمکی برای کار با DOM

/**
 * یک انتخاب‌گر ساده مانند جی‌کوئری
 * @param {string} selector - انتخاب‌گر CSS
 * @param {Element} [scope=document] - المانی که جستجو در آن انجام می‌شود
 * @returns {Element|null}
 */
export const qs = (selector, scope = document) => scope.querySelector(selector);

/**
 * یک انتخاب‌گر ساده برای یافتن تمام المان‌ها
 * @param {string} selector - انتخاب‌گر CSS
 * @param {Element} [scope=document] - المانی که جستجو در آن انجام می‌شود
 * @returns {NodeListOf<Element>}
 */
export const qsa = (selector, scope = document) => scope.querySelectorAll(selector);

// آبجکتی برای نگهداری تمام المان‌های DOM که به طور مکرر استفاده می‌شوند
// با استفاده از getters، المان‌ها در زمان دسترسی از DOM خوانده می‌شوند که از
// بروز خطا در کامپوننت‌های بارگذاری شده به صورت پویا جلوگیری می‌کند.
export const elements = {
  // المان‌های اصلی
  get appContainer() { return document.querySelector('#app'); },
  get editor() { return document.querySelector('#editor'); },
  get preview() { return document.querySelector('#preview'); },
  get editorBackdrop() { return document.querySelector('#editorBackdrop'); },
  get editorContainer() { return document.querySelector('#editorContainer'); },
  get previewContainer() { return document.querySelector('#previewContainer'); },
  get content() { return document.querySelector('#content'); },

  // نوار منو
  get menuBar() { return document.querySelector('#menuBar'); },

  // نوار ابزار
  get toolbar() { return document.querySelector('#toolbar'); },
  get uploadBtn() { return document.querySelector('#uploadBtn'); },
  get downloadMdBtn() { return document.querySelector('#downloadMdBtn'); },
  get downloadHtmlBtn() { return document.querySelector('#downloadHtmlBtn'); },
  get downloadPdfBtn() { return document.querySelector('#downloadPdfBtn'); },
  get undoBtn() { return document.querySelector('#undoBtn'); },
  get redoBtn() { return document.querySelector('#redoBtn'); },
  
  // نوار وضعیت
  get statusBar() { return document.querySelector('#statusBar'); },
  get charsCount() { return document.querySelector('#charsCount'); },
  get lettersCount() { return document.querySelector('#lettersCount'); },
  get wordsCount() { return document.querySelector('#wordsCount'); },
  get linesCount() { return document.querySelector('#linesCount'); },
  get fileSize() { return document.querySelector('#fileSize'); },
  get filename() { return document.querySelector('#filename'); },

  // پنل کناری و نوار فعالیت
  get sideBar() { return document.querySelector('#sideBar'); },
  get activityBar() { return document.querySelector('#activityBar'); },
  get activityBarButtons() { return document.querySelectorAll('.activity-bar-btn'); },
  get activitySettingsBtn() { return document.querySelector('#activitySettingsBtn'); },
  get sidePanel() { return document.querySelector('#sidePanel'); },
  get sidePanelHeader() { return document.querySelector('#sidePanelHeader'); },
  get sidePanelTitle() { return document.querySelector('#sidePanelTitle'); },
  get closeSidePanelBtn() { return document.querySelector('#closeSidePanelBtn'); },
  get tocPanel() { return document.querySelector('#tocPanel'); },
  get filesPanel() { return document.querySelector('#filesPanel'); },
  get tocList() { return document.querySelector('.toc-list'); },
  get filesList() { return document.querySelector('.files-list'); },
  get filesControls() { return document.querySelector('.files-controls'); },
  get fileSortContainer() { return document.querySelector('#fileSortContainer'); },
  get fileSortToggle() { return document.querySelector('#fileSortToggle'); },
  get fileSortMenu() { return document.querySelector('#fileSortMenu'); },
  get newFileSideBtn() { return document.querySelector('#newFileSideBtn'); },
  get openFileSearchBtn() { return document.querySelector('#openFileSearchBtn'); },
  get fileSearchContainer() { return document.querySelector('#fileSearchContainer'); },
  get fileSearchInput() { return document.querySelector('#fileSearchInput'); },
  get clearFileSearchBtn() { return document.querySelector('#clearFileSearchBtn'); },

  // منو
  get addMenu() {
    const menuLinks = document.querySelectorAll('#menuBar .menu > li > a');
    const addLink = Array.from(menuLinks).find(a => a.textContent.trim() === 'افزودن');
    return addLink ? addLink.closest('li').querySelector('.submenu') : null;
  },
  get copyAllBtn() { return document.querySelector('#copyAllBtn'); },
  get fullscreenBtn() { return document.querySelector('#fullscreenBtn'); },
  get newFileBtn() { return document.querySelector('#newFileBtn'); },
  get loadFileBtn() { return document.querySelector('#loadFileBtn'); },
  get showFilesMenuBtn() { return document.querySelector('#showFilesMenuBtn'); },
  get exportMdBtn() { return document.querySelector('#exportMdBtn'); },
  get exportHtmlBtn() { return document.querySelector('#exportHtmlBtn'); },
  get exportPdfBtn() { return document.querySelector('#exportPdfBtn'); },
  get exportAllZipBtn() { return document.querySelector('#exportAllZipBtn'); },
  get userGuideBtn() { return document.querySelector('#userGuideBtn'); },
  get markdownGuideBtn() { return document.querySelector('#markdownGuideBtn'); },
  get technicalDocBtn() { return document.querySelector('#technicalDocBtn'); },
  get keyboardShortcutsBtn() { return document.querySelector('#keyboardShortcutsBtn'); },
  get undoMenuBtn() { return document.querySelector('#undoMenuBtn'); },
  get redoMenuBtn() { return document.querySelector('#redoMenuBtn'); },
  get cutMenuBtn() { return document.querySelector('#cutMenuBtn'); },
  get copyMenuBtn() { return document.querySelector('#copyMenuBtn'); },
  get pasteMenuBtn() { return document.querySelector('#pasteMenuBtn'); },
  get selectAllMenuBtn() { return document.querySelector('#selectAllMenuBtn'); },
  get findMenuBtn() { return document.querySelector('#findMenuBtn'); },
  get replaceMenuBtn() { return document.querySelector('#replaceMenuBtn'); },
  get fileInput() { return document.querySelector('#fileInput'); },

  // تنظیمات
  get settingsPanel() { return document.querySelector('#settingsPanel'); },
  get settingsBtn() { return document.querySelector('#settingsBtn'); },
  get closeSettingsBtn() { return document.querySelector('#closeSettingsBtn'); },
  get clearDBBtn() { return document.querySelector('#clearDBBtn'); },
  get themeRadios() { return Array.from(document.querySelectorAll('input[name="theme"]')); },
  get markdownParserSelect() { return document.querySelector('#markdownParser'); },
  get fontSizeSelect() { return document.querySelector('#fontSize'); },
  get fontFamilySelect() { return document.querySelector('#fontFamily'); },
  get showToolbarCheckbox() { return document.querySelector('#showToolbar'); },
  get showStatusBarCheckbox() { return document.querySelector('#showStatusBar'); },
  get showSideBarCheckbox() { return document.querySelector('#showSideBar'); },
  get showFilenameCheckbox() { return document.querySelector('#showFilename'); },
  get directionRadios() { return Array.from(document.querySelectorAll('input[name="direction"]')); },
  
  // جستجو
  get searchBtn() { return document.querySelector('#searchBtn'); },
  get searchBar() { return document.querySelector('#searchBar'); },
  get searchInput() { return document.querySelector('#searchInput'); },
  get replaceInput() { return document.querySelector('#replaceInput'); },
  get replaceBtn() { return document.querySelector('#replaceBtn'); },
  get replaceAllBtn() { return document.querySelector('#replaceAllBtn'); },
  get searchScope() { return document.querySelector('#searchScope'); },
  get searchCount() { return document.querySelector('#searchCount'); },
  get prevMatchBtn() { return document.querySelector('#prevMatchBtn'); },
  get nextMatchBtn() { return document.querySelector('#nextMatchBtn'); },
  get closeSearchBtn() { return document.querySelector('#closeSearchBtn'); },

  // میانبرهای نوشتاری
  get shortcutsMenu() { return document.querySelector('#shortcutsMenu'); },

  // مودال‌ها
  get customDialog() { return document.querySelector('#customDialog'); },
  get dialogTitle() { return document.querySelector('#dialogTitle'); },
  get dialogMessage() { return document.querySelector('#dialogMessage'); },
  get dialogInput() { return document.querySelector('#dialogInput'); },
  get dialogButtons() { return document.querySelector('#dialogButtons'); },
  get dialogCloseBtn() { return document.querySelector('#dialogCloseBtn'); },
  get filePropertiesModal() { return document.querySelector('#filePropertiesModal'); },
  get closePropertiesBtn() { return document.querySelector('#closePropertiesBtn'); },
  get propFileName() { return document.querySelector('#propFileName'); },
  get propFileSize() { return document.querySelector('#propFileSize'); },
  get propCreationDate() { return document.querySelector('#propCreationDate'); },
  get propLastModified() { return document.querySelector('#propLastModified'); },
  get propCharsCount() { return document.querySelector('#propCharsCount'); },
  get propWordsCount() { return document.querySelector('#propWordsCount'); },
  get propLinesCount() { return document.querySelector('#propLinesCount'); },
  get shortcutsHelpModal() { return document.querySelector('#shortcutsHelpModal'); },
  get closeShortcutsHelpBtn() { return document.querySelector('#closeShortcutsHelpBtn'); },

  // هایلایتر
  get hljsLightTheme() { return document.querySelector('#hljs-light-theme'); },
  get hljsDarkTheme() { return document.querySelector('#hljs-dark-theme'); },
};
