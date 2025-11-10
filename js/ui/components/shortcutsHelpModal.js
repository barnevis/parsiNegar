/**
 * کامپوننت مودال راهنمای کلیدهای میانبر
 */
export const html = `
  <div id="shortcutsHelpModal" class="modal hidden">
    <div class="modal-content">
      <div class="modal-header">
        <h2>راهنمای کلیدهای میانبر</h2>
        <button id="closeShortcutsHelpBtn"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div class="shortcuts-container">
          <div class="shortcuts-column">
            <h3>مدیریت پرونده</h3>
            <table class="shortcuts-table">
              <tr><td>پرونده نو</td><td>Ctrl + Shift + N</td></tr>
              <tr><td>بارگذاری پرونده</td><td>Ctrl + Shift + O</td></tr>
              <tr><td>خروجی Markdown</td><td>Ctrl + E</td></tr>
            </table>
            <h3>ویرایش</h3>
            <table class="shortcuts-table">
              <tr><td>واگرد</td><td>Ctrl + Z</td></tr>
              <tr><td>ازنو</td><td>Ctrl + Y</td></tr>
              <tr><td>برش</td><td>Ctrl + X</td></tr>
              <tr><td>رونوشت</td><td>Ctrl + C</td></tr>
              <tr><td>چسباندن</td><td>Ctrl + V</td></tr>
              <tr><td>انتخاب همه</td><td>Ctrl + A</td></tr>
              <tr><td>جست‌وجو</td><td>Ctrl + F</td></tr>
              <tr><td>جست‌وجو و جایگزینی</td><td>Ctrl + H</td></tr>
            </table>
            <h3>نمایش</h3>
            <table class="shortcuts-table">
              <tr><td>نمایش/پنهان کردن پیش‌نمایش</td><td>Ctrl + Alt + P</td></tr>
              <tr><td>نمایش/پنهان کردن پنل پرونده‌ها</td><td>Ctrl + Alt + F</td></tr>
              <tr><td>نمایش/پنهان کردن فهرست مطالب</td><td>Ctrl + Alt + T</td></tr>
              <tr><td>راهنمای کلیدها</td><td>Ctrl + Alt + K</td></tr>
            </table>
          </div>
          <div class="shortcuts-column">
            <h3>قالب‌بندی متن</h3>
            <table class="shortcuts-table">
              <tr><td>پررنگ</td><td>Ctrl + B</td></tr>
              <tr><td>مورب</td><td>Ctrl + I</td></tr>
              <tr><td>خط‌زده</td><td>Ctrl + U</td></tr>
              <tr><td>پیوند</td><td>Ctrl + K</td></tr>
              <tr><td>کد تک‌خطی</td><td>Ctrl + \`</td></tr>
              <tr><td>عنوان ۱</td><td>Ctrl + 1</td></tr>
              <tr><td>عنوان ۲</td><td>Ctrl + 2</td></tr>
              <tr><td>عنوان ۳</td><td>Ctrl + 3</td></tr>
              <tr><td>عنوان ۴</td><td>Ctrl + 4</td></tr>
              <tr><td>لیست مرتب</td><td>Ctrl + Shift + L</td></tr>
              <tr><td>لیست نامرتب</td><td>Ctrl + Shift + U</td></tr>
              <tr><td>بازبینه</td><td>Ctrl + Shift + T</td></tr>
              <tr><td>بلوک کد</td><td>Ctrl + Shift + C</td></tr>
              <tr><td>نقل‌قول</td><td>Ctrl + Shift + Q</td></tr>
              <tr><td>تصویر</td><td>Ctrl + Shift + I</td></tr>
              <tr><td>شکلک</td><td>Ctrl + Shift + E</td></tr>
              <tr><td>جدول</td><td>Ctrl + Alt + I</td></tr>
              <tr><td>نقشه‌ذهنی</td><td>Ctrl + Shift + M</td></tr>
              <tr><td>برجسته کردن</td><td>Ctrl + Shift + H</td></tr>
              <tr><td>شعر</td><td>Ctrl + Shift + P</td></tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
