/**
 * کامپوننت نوار منو
 */

export const html = `
  <ul class="menu">
    <li><a href="#" class="logo-link"><div id="menuLogo" title="لوگوی پارسی‌نگار"></div></a></li>
    <li>
      <a href="#">پرونده</a>
      <ul class="submenu">
        <li><a href="#" id="newFileBtn"><i class="fas fa-file"></i><span>پرونده نو</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>N</kbd></span></a></li>
        <li><a href="#" id="loadFileBtn"><i class="fas fa-folder-open"></i><span>بارگذاری پرونده</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd></span></a></li>
        <li><a href="#" id="showFilesMenuBtn"><i class="fas fa-folder-tree"></i><span>پرونده‌ها</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F</kbd></span></a></li>
        <li class="has-submenu">
          <a href="#"><i class="fas fa-file-export"></i> خروجی گرفتن</a>
          <ul class="submenu">
            <li><a href="#" id="exportMdBtn"><i class="fas fa-file-alt"></i><span>Markdown</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>E</kbd></span></a></li>
            <li><a href="#" id="exportHtmlBtn"><i class="fas fa-file-code"></i> HTML</a></li>
            <li><a href="#" id="exportPdfBtn"><i class="fas fa-file-pdf"></i> PDF</a></li>
            <li><a href="#" id="exportAllZipBtn"><i class="fas fa-file-archive"></i> تمامی پرونده‌ها (zip)</a></li>
          </ul>
        </li>
        <li><a href="#" id="settingsBtn"><i class="fas fa-cog"></i> تنظیمات</a></li>
      </ul>
    </li>
    <li>
      <a href="#">ویرایش</a>
      <ul class="submenu">
        <li><a href="#" id="undoMenuBtn"><i class="fas fa-redo"></i><span>واگرد</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Z</kbd></span></a></li>
        <li><a href="#" id="redoMenuBtn"><i class="fas fa-undo"></i><span>ازنو</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Y</kbd></span></a></li>
        <li class="separator"><hr></li>
        <li><a href="#" id="cutMenuBtn"><i class="fas fa-cut"></i><span>برش</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>X</kbd></span></a></li>
        <li><a href="#" id="copyMenuBtn"><i class="fas fa-copy"></i><span>رونوشت</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>C</kbd></span></a></li>
        <li><a href="#" id="pasteMenuBtn"><i class="fas fa-paste"></i><span>چسباندن</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>V</kbd></span></a></li>
        <li class="separator"><hr></li>
        <li><a href="#" id="selectAllMenuBtn"><i class="fas fa-object-group"></i><span>انتخاب همه</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>A</kbd></span></a></li>
        <li class="separator"><hr></li>
        <li><a href="#" id="findMenuBtn"><i class="fas fa-search"></i><span>جست‌وجو</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>F</kbd></span></a></li>
        <li><a href="#" id="replaceMenuBtn"><i class="fas fa-exchange-alt"></i><span>جست‌وجو و جایگزینی</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>H</kbd></span></a></li>
      </ul>
    </li>
    <li>
      <a href="#">نمایش</a>
      <ul class="submenu">
        <li>
          <label>
            <input type="checkbox" id="showToolbar">
            <i class="fas fa-toolbox"></i> نوار ابزار
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" id="showStatusBar" checked>
            <i class="fas fa-info-circle"></i> نوار آمار
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" id="showSideBar" checked>
            <i class="fas fa-columns"></i> نوار کناری
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" id="showFilename" checked>
            <i class="fas fa-file-signature"></i> نام پرونده
          </label>
        </li>
      </ul>
    </li>
    <li>
      <a href="#">افزودن</a>
      <ul class="submenu">
        <li class="has-submenu">
          <a href="#"><i class="fas fa-heading"></i><span>عنوان‌ها</span></a>
          <ul class="submenu">
            <li><a href="#" data-format="heading1"><i class="fas fa-heading"></i><span>عنوان ۱</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>1</kbd></span></a></li>
            <li><a href="#" data-format="heading2"><i class="fas fa-heading"></i><span>عنوان ۲</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>2</kbd></span></a></li>
            <li><a href="#" data-format="heading3"><i class="fas fa-heading"></i><span>عنوان ۳</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>3</kbd></span></a></li>
            <li><a href="#" data-format="heading4"><i class="fas fa-heading"></i><span>عنوان ۴</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>4</kbd></span></a></li>
          </ul>
        </li>
        <li><a href="#" data-format="bold"><i class="fas fa-bold"></i><span>پررنگ</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>B</kbd></span></a></li>
        <li><a href="#" data-format="italic"><i class="fas fa-italic"></i><span>مورب</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>I</kbd></span></a></li>
        <li><a href="#" data-format="strike"><i class="fas fa-strikethrough"></i><span>خط زده</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>U</kbd></span></a></li>
        <li><a href="#" data-format="orderedList"><i class="fas fa-list-ol"></i><span>لیست مرتب</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd></span></a></li>
        <li><a href="#" data-format="unorderedList"><i class="fas fa-list-ul"></i><span>لیست نامرتب</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd></span></a></li>
        <li><a href="#" data-format="checklist"><i class="fas fa-tasks"></i><span>بازبینه</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd></span></a></li>
        <li><a href="#" data-format="quote"><i class="fas fa-quote-right"></i><span>نقل‌قول</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Q</kbd></span></a></li>
        <li><a href="#" data-format="code"><i class="fas fa-code"></i><span>کد</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>\`</kbd></span></a></li>
        <li><a href="#" data-format="table"><i class="fas fa-table"></i><span>جدول</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>I</kbd></span></a></li>
        <li><a href="#" data-format="image"><i class="fas fa-image"></i><span>تصویر</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd></span></a></li>
        <li><a href="#" data-format="link"><i class="fas fa-link"></i><span>پیوند</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>K</kbd></span></a></li>
        <li><a href="#" data-format="emoji"><i class="fas fa-smile"></i><span>شکلک</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd></span></a></li>
        <li><a href="#" data-format="highlight"><i class="fas fa-highlighter"></i><span>برجسته</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>H</kbd></span></a></li>
        <li><a href="#" data-format="poetry"><i class="fas fa-feather-alt"></i><span>شعر</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd></span></a></li>
        <li class="has-submenu">
          <a href="#"><i class="fas fa-box"></i><span>جعبه‌های توضیحی</span></a>
          <ul class="submenu">
            <li><a href="#" data-format="admonition-note"><i class="fas fa-info-circle"></i><span>جعبه توجه</span></a></li>
            <li><a href="#" data-format="admonition-warning"><i class="fas fa-exclamation-triangle"></i><span>جعبه هشدار</span></a></li>
            <li><a href="#" data-format="admonition-tip"><i class="fas fa-lightbulb"></i><span>جعبه نکته</span></a></li>
            <li><a href="#" data-format="admonition-important"><i class="fas fa-star"></i><span>جعبه مهم</span></a></li>
            <li><a href="#" data-format="admonition-caution"><i class="fas fa-shield-alt"></i><span>جعبه احتیاط</span></a></li>
          </ul>
        </li>
        <li><a href="#" data-format="chart"><i class="fas fa-sitemap"></i><span>نمودار</span></a></li>
        <li><a href="#" data-format="mindmap"><i class="fas fa-brain"></i><span>نقشه‌ذهنی</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd></span></a></li>
      </ul>
    </li>
    <li>
      <a href="#">راهنما</a>
      <ul class="submenu">
        <li><a href="#" id="userGuideBtn"><i class="fas fa-book"></i> راهنمای کاربر</a></li>
        <li><a href="#" id="markdownGuideBtn"><i class="fas fa-file-alt"></i> راهنمای مارک‌داون</a></li>
        <li><a href="#" id="technicalDocBtn"><i class="fas fa-file-code"></i> مستندات فنی</a></li>
        <li class="separator"><hr></li>
        <li><a href="#" id="keyboardShortcutsBtn"><i class="fas fa-keyboard"></i><span>راهنمای کلیدها</span><span class="shortcut-hint"><kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>K</kbd></span></a></li>
        <li class="separator"><hr></li>
        <li><a href="https://mermaid.js.org/intro/" target="_blank"><i class="fas fa-external-link-alt"></i> راهنمای Mermaid.js</a></li>
      </ul>
    </li>
    <li class="menu-right">
      <a href="#" id="copyAllBtn" title="رونوشت کل پرونده"><i class="fas fa-copy"></i></a>
      <a href="#" id="searchBtn" title="جست‌وجو"><i class="fas fa-search"></i></a>
      <a href="#" id="fullscreenBtn" title="تمام صفحه"><i class="fas fa-expand"></i></a>
      <div id="searchBar" class="hidden">
        <div class="search-top-row">
          <select id="searchScope" title="محدوده جست‌وجو">
            <option value="all" selected>همه جا</option>
            <option value="editor">نوشتن</option>
            <option value="preview">نمایش</option>
          </select>
          <input type="text" id="searchInput" placeholder="جست‌وجو..." spellcheck="false">
          <span class="divider"></span>
          <span id="searchCount">0/0</span>
          <button id="prevMatchBtn" title="مورد قبلی"><i class="fas fa-chevron-up"></i></button>
          <button id="nextMatchBtn" title="مورد بعدی"><i class="fas fa-chevron-down"></i></button>
          <button id="closeSearchBtn" title="بستن"><i class="fas fa-times"></i></button>
        </div>
        <div class="search-bottom-row">
          <input type="text" id="replaceInput" placeholder="جایگزینی با..." spellcheck="false">
          <button id="replaceBtn" title="جایگزینی" disabled><i class="fas fa-exchange-alt"></i></button>
          <button id="replaceAllBtn" title="جایگزینی همه" disabled><i class="fas fa-sync-alt"></i></button>
        </div>
      </div>
    </li>
  </ul>
`;