/**
 * کامپوننت محتوای اصلی برنامه
 */

export const html = `
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
`;