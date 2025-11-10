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
  get appContainer() { return qs('#app'); },
  get editor() { return qs('#editor'); },
  get preview() { return qs('#preview'); },
  get editorBackdrop() { return qs('#editorBackdrop'); },
  get editorContainer() { return qs('#editorContainer'); },
  get previewContainer() { return qs('#previewContainer'); },
  get content() { return qs('#content'); },

  // نوار ابزار
  get toolbar() { return qs('#toolbar'); },
  get uploadBtn() { return qs('#uploadBtn'); },
  get downloadMdBtn() { return qs('#downloadMdBtn'); },
  get downloadHtmlBtn() { return qs('#downloadHtmlBtn'); },
  get downloadPdfBtn() { return qs('#downloadPdfBtn'); },
  get undoBtn() { return qs('#undoBtn'); },
  get redoBtn() { return qs('#redoBtn'); },
  
  // نوار وضعیت
  get statusBar() { return qs('#statusBar'); },
  get charsCount() { return qs('#charsCount'); },
  get lettersCount() { return qs('#lettersCount'); },
  get wordsCount() { return qs('#wordsCount'); },
  get linesCount() { return qs('#linesCount'); },
  get fileSize() { return qs('#fileSize'); },
  get filename() { return qs('#filename'); },

  // پنل کناری و نوار فعالیت
  get sideBar() { return qs('#sideBar'); },
  get activityBar() { return qs('#activityBar'); },
  get activityBarButtons() { return qsa('.activity-bar-btn'); },
  get activitySettingsBtn() { return qs('#activitySettingsBtn'); },
  get sidePanel() { return qs('#sidePanel'); },
  get sidePanelHeader() { return qs('#sidePanelHeader'); },
  get sidePanelTitle() { return qs('#sidePanelTitle'); },
  get closeSidePanelBtn() { return qs('#closeSidePanelBtn'); },
  get tocPanel() { return qs('#tocPanel'); },
  get filesPanel() { return qs('#filesPanel'); },
  get tocList() { return qs('.toc-list'); },
  get filesList() { return qs('.files-list'); },
  get filesControls() { return qs('.files-controls'); },
  get fileSortContainer() { return qs('#fileSortContainer'); },
  get fileSortToggle() { return qs('#fileSortToggle'); },
  get fileSortMenu() { return qs('#fileSortMenu'); },
  get newFileSideBtn() { return qs('#newFileSideBtn'); },
  get openFileSearchBtn() { return qs('#openFileSearchBtn'); },
  get fileSearchContainer() { return qs('#fileSearchContainer'); },
  get fileSearchInput() { return qs('#fileSearchInput'); },
  get clearFileSearchBtn() { return qs('#clearFileSearchBtn'); },

  // منو
  get addMenu() {
    const menuLinks = qsa('#menuBar .menu > li > a');
    const addLink = Array.from(menuLinks).find(a => a.textContent.trim() === 'افزودن');
    return addLink ? addLink.closest('li').querySelector('.submenu') : null;
  },
  get copyAllBtn() { return qs('#copyAllBtn'); },
  get fullscreenBtn() { return qs('#fullscreenBtn'); },
  get newFileBtn() { return qs('#newFileBtn'); },
  get loadFileBtn() { return qs('#loadFileBtn'); },
  get showFilesMenuBtn() { return qs('#showFilesMenuBtn'); },
  get exportMdBtn() { return qs('#exportMdBtn'); },
  get exportHtmlBtn() { return qs('#exportHtmlBtn'); },
  get exportPdfBtn() { return qs('#exportPdfBtn'); },
  get exportAllZipBtn() { return qs('#exportAllZipBtn'); },
  get userGuideBtn() { return qs('#userGuideBtn'); },
  get markdownGuideBtn() { return qs('#markdownGuideBtn'); },
  get technicalDocBtn() { return qs('#technicalDocBtn'); },
  get keyboardShortcutsBtn() { return qs('#keyboardShortcutsBtn'); },
  get undoMenuBtn() { return qs('#undoMenuBtn'); },
  get redoMenuBtn() { return qs('#redoMenuBtn'); },
  get cutMenuBtn() { return qs('#cutMenuBtn'); },
  get copyMenuBtn() { return qs('#copyMenuBtn'); },
  get pasteMenuBtn() { return qs('#pasteMenuBtn'); },
  get selectAllMenuBtn() { return qs('#selectAllMenuBtn'); },
  get findMenuBtn() { return qs('#findMenuBtn'); },
  get replaceMenuBtn() { return qs('#replaceMenuBtn'); },
  get fileInput() { return qs('#fileInput'); },

  // تنظیمات
  get settingsPanel() { return qs('#settingsPanel'); },
  get settingsBtn() { return qs('#settingsBtn'); },
  get closeSettingsBtn() { return qs('#closeSettingsBtn'); },
  get clearDBBtn() { return qs('#clearDBBtn'); },
  get themeRadios() { return Array.from(qsa('input[name="theme"]')); },
  get markdownParserSelect() { return qs('#markdownParser'); },
  get fontSizeSelect() { return qs('#fontSize'); },
  get fontFamilySelect() { return qs('#fontFamily'); },
  get showToolbarCheckbox() { return qs('#showToolbar'); },
  get showStatusBarCheckbox() { return qs('#showStatusBar'); },
  get showSideBarCheckbox() { return qs('#showSideBar'); },
  get showFilenameCheckbox() { return qs('#showFilename'); },
  get directionRadios() { return Array.from(qsa('input[name="direction"]')); },
  
  // جستجو
  get searchBtn() { return qs('#searchBtn'); },
  get searchBar() { return qs('#searchBar'); },
  get searchInput() { return qs('#searchInput'); },
  get replaceInput() { return qs('#replaceInput'); },
  get replaceBtn() { return qs('#replaceBtn'); },
  get replaceAllBtn() { return qs('#replaceAllBtn'); },
  get searchScope() { return qs('#searchScope'); },
  get searchCount() { return qs('#searchCount'); },
  get prevMatchBtn() { return qs('#prevMatchBtn'); },
  get nextMatchBtn() { return qs('#nextMatchBtn'); },
  get closeSearchBtn() { return qs('#closeSearchBtn'); },

  // میانبرهای نوشتاری
  get shortcutsMenu() { return qs('#shortcutsMenu'); },

  // مودال‌ها
  get customDialog() { return qs('#customDialog'); },
  get dialogTitle() { return qs('#dialogTitle'); },
  get dialogMessage() { return qs('#dialogMessage'); },
  get dialogInput() { return qs('#dialogInput'); },
  get dialogButtons() { return qs('#dialogButtons'); },
  get dialogCloseBtn() { return qs('#dialogCloseBtn'); },
  get filePropertiesModal() { return qs('#filePropertiesModal'); },
  get closePropertiesBtn() { return qs('#closePropertiesBtn'); },
  get propFileName() { return qs('#propFileName'); },
  get propFileSize() { return qs('#propFileSize'); },
  get propCreationDate() { return qs('#propCreationDate'); },
  get propLastModified() { return qs('#propLastModified'); },
  get propCharsCount() { return qs('#propCharsCount'); },
  get propWordsCount() { return qs('#propWordsCount'); },
  get propLinesCount() { return qs('#propLinesCount'); },
  get shortcutsHelpModal() { return qs('#shortcutsHelpModal'); },
  get closeShortcutsHelpBtn() { return qs('#closeShortcutsHelpBtn'); },

  // هایلایتر
  get hljsLightTheme() { return qs('#hljs-light-theme'); },
  get hljsDarkTheme() { return qs('#hljs-dark-theme'); },
};