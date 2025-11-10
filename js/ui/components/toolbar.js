/**
 * کامپوننت نوار ابزار
 */

export const html = `
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
`;