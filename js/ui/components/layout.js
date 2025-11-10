/**
 * کامپوننت لایه‌بندی پایه برنامه
 */

export const html = `
  <div id="menuBar">
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
  </div>

  <div id="toolbar">
    <div class="toolbar-left">
      <button id="uploadBtn" title="بارگذاری"><i class="fas fa-upload"></i></button>
      <input type="file" id="fileInput" accept=".md,.markdown,.txt" hidden>
      <span class="divider"></span>
      <button id="undoBtn" title="واگرد"><i class="fas fa-redo"></i></button>
      <button id="redoBtn" title="از نو"><i class="fas fa-undo"></i></button>
      <span class="divider"></span>
      <button data-action="bold" title="پررنگ (Ctrl+B)"><i class="fas fa-bold"></i></button>
      <button data-action="italic" title="مورب (Ctrl+I)"><i class="fas fa-italic"></i></button>
      <button data-action="strike" title="خط‌زده (Ctrl+U)"><i class="fas fa-strikethrough"></i></button>
      <button data-action="highlight" title="برجسته (Ctrl+Shift+H)"><i class="fas fa-highlighter"></i></button>
      <button data-action="heading2" title="عنوان (Ctrl+2)"><i class="fas fa-heading"></i></button>
      <span class="divider"></span>
      <button data-action="unorderedList" title="لیست نامرتب (Ctrl+Shift+U)"><i class="fas fa-list-ul"></i></button>
      <button data-action="orderedList" title="لیست مرتب (Ctrl+Shift+L)"><i class="fas fa-list-ol"></i></button>
      <button data-action="checklist" title="بازبینه (Ctrl+Shift+T)"><i class="fas fa-tasks"></i></button>
      <span class="divider"></span>
      <button data-action="quote" title="نقل‌قول (Ctrl+Shift+Q)"><i class="fas fa-quote-right"></i></button>
      <button data-action="code" title="کد (Ctrl+\`)"><i class="fas fa-code"></i></button>
      <button data-action="poetry" title="شعر (Ctrl+Shift+P)"><i class="fas fa-feather-alt"></i></button>
      <span class="divider"></span>
      <button data-action="link" title="پیوند (Ctrl+K)"><i class="fas fa-link"></i></button>
      <button data-action="image" title="تصویر (Ctrl+Shift+I)"><i class="fas fa-image"></i></button>
      <button data-action="emoji" title="شکلک (Ctrl+Shift+E)"><i class="fas fa-smile"></i></button>
      <button data-action="table" title="جدول (Ctrl+Alt+I)"><i class="fas fa-table"></i></button>
      <span class="divider"></span>
      <div class="toolbar-dropdown-container">
        <button class="toolbar-dropdown-toggle" title="جعبه‌های توضیحی"><i class="fas fa-box"></i></button>
        <div class="toolbar-dropdown-menu hidden">
            <a href="#" data-action="admonition-note"><i class="fas fa-info-circle"></i> جعبه توجه</a>
            <a href="#" data-action="admonition-warning"><i class="fas fa-exclamation-triangle"></i> جعبه هشدار</a>
            <a href="#" data-action="admonition-tip"><i class="fas fa-lightbulb"></i> جعبه نکته</a>
            <a href="#" data-action="admonition-important"><i class="fas fa-star"></i> جعبه مهم</a>
            <a href="#" data-action="admonition-caution"><i class="fas fa-shield-alt"></i> جعبه احتیاط</a>
        </div>
      </div>
      <button data-action="chart" title="نمودار"><i class="fas fa-sitemap"></i></button>
      <button data-action="mindmap" title="نقشه‌ذهنی (Ctrl+Shift+M)"><i class="fas fa-brain"></i></button>
    </div>
    <div class="toolbar-right">
      <button id="downloadPdfBtn" title="دانلود PDF"><i class="fa-solid fa-file-pdf"></i></button>
      <button id="downloadHtmlBtn" title="دانلود HTML"><i class="fa-solid fa-file-code"></i></button>
      <button id="downloadMdBtn" title="دانلود Markdown"><i class="fa-solid fa-file-arrow-down"></i></button>
    </div>
  </div>

  <div id="content">
    <div id="mainContent">
      <div id="editorContainer">
        <div id="editorWrapper">
          <div id="editorBackdrop"></div>
          <textarea dir="auto" id="editor" spellcheck="false"></textarea>
        </div>
        <div id="shortcutsMenu"></div>
        <emoji-picker id="emojiPicker" class="hidden"></emoji-picker>
      </div>
          
      <div id="previewContainer">
        <div id="preview" class="markdown-preview" dir="auto"></div>
      </div>
    </div>
    
    <div id="sideBar" class="sidebar-container">
      <div id="activityBar">
        <div class="activity-bar-top">
          <button class="activity-bar-btn" data-panel="files" title="پرونده‌ها (Ctrl+Alt+F)">
            <i class="fas fa-folder-tree"></i>
          </button>
          <button class="activity-bar-btn" data-panel="toc" title="فهرست مطالب (Ctrl+Alt+T)">
            <i class="fas fa-list"></i>
          </button>
        </div>
        <div class="activity-bar-bottom">
          <button id="activitySettingsBtn" class="activity-bar-btn" data-panel="settings" title="تنظیمات">
            <i class="fas fa-cog"></i>
          </button>
        </div>
      </div>
      <div id="sidePanel">
        <div id="sidePanelHeader">
          <h3 id="sidePanelTitle"></h3>
          <button id="closeSidePanelBtn" title="بستن پنل"><i class="fas fa-times"></i></button>
        </div>
        <div id="sidePanelContent">
          <div id="filesPanel" class="side-panel-pane">
            <div class="files-controls">
              <button id="newFileSideBtn" class="new-file-side-btn" title="پرونده نو">
                <i class="fa-solid fa-file-circle-plus"></i>
              </button>
              <button id="openFileSearchBtn" class="file-control-btn" title="جست‌وجوی پرونده‌ها">
                <i class="fas fa-search"></i>
              </button>
              <div id="fileSortContainer" class="sort-dropdown-container">
                <button id="fileSortToggle" class="sort-dropdown-toggle" title="چینش پرونده‌ها">
                  <i class="fas fa-sort-amount-down"></i>
                </button>
                <div id="fileSortMenu" class="sort-dropdown-menu hidden">
                  <div class="sort-group-label">نام پرونده</div>
                  <a href="#" class="sort-dropdown-item" data-value="name-asc"><i class="fas fa-check"></i>الفبایی</a>
                  <a href="#" class="sort-dropdown-item" data-value="name-desc"><i class="fas fa-check"></i>عکس الفبایی</a>
                  <div class="sort-group-label">زمان ویرایش</div>
                  <a href="#" class="sort-dropdown-item active" data-value="modified-desc"><i class="fas fa-check"></i>نو به کهنه</a>
                  <a href="#" class="sort-dropdown-item" data-value="modified-asc"><i class="fas fa-check"></i>کهنه به نو</a>
                  <div class="sort-group-label">زمان ساخت</div>
                  <a href="#" class="sort-dropdown-item" data-value="created-desc"><i class="fas fa-check"></i>نو به کهنه</a>
                  <a href="#" class="sort-dropdown-item" data-value="created-asc"><i class="fas fa-check"></i>کهنه به نو</a>
                </div>
              </div>
              <div id="fileSearchContainer" class="file-search-container">
                <input type="text" id="fileSearchInput" placeholder="جست‌وجو..." spellcheck="false">
                <button id="clearFileSearchBtn" title="پاک کردن"><i class="fas fa-times"></i></button>
              </div>
            </div>
            <div class="files-list"></div>
          </div>
          <div id="tocPanel" class="side-panel-pane">
            <div class="toc-list"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="statusBar">
    <div class="status-left">
      <span id="charsCount">نویسه: 0</span>
      <span id="lettersCount">حرف: 0</span>
      <span id="wordsCount">واژه: 0</span>
      <span id="linesCount">خط: 0</span>
      <span id="fileSize">حجم: 0 بایت</span>
    </div>
    <div class="status-right">
      <input type="text" id="filename" value="نام پرونده" class="filename-input">
    </div>
  </div>
`;
