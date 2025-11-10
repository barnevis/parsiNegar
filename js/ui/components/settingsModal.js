/**
 * کامپوننت مودال تنظیمات
 */
export const html = `
  <div id="settingsPanel" class="modal hidden">
    <div class="modal-content">
      <div class="modal-header">
        <h2>تنظیمات</h2>
        <button id="closeSettingsBtn"><i class="fas fa-times"></i></button>
      </div>
      
      <div class="modal-body">
        <div class="setting-group">
          <label>قالب</label>
          <div class="theme-options">
            <label>
              <input type="radio" name="theme" value="device" checked>
              <span>دستگاه</span>
            </label>
            <label>
              <input type="radio" name="theme" value="light">
              <span>روشن</span>
            </label>
            <label>
              <input type="radio" name="theme" value="dark">
              <span>تیره</span>
            </label>
            <label>
              <input type="radio" name="theme" value="sepia">
              <span>سپیا</span>
            </label>
          </div>
        </div>
        
        <div class="setting-group">
          <label>مفسر مارک‌داون</label>
          <select id="markdownParser">
            <option value="parsneshan" selected>پارس‌نشان</option>
            <option value="marked">Marked</option>
            <option value="shahneshan">شه‌نشان</option>
          </select>
        </div>
        
        <div class="setting-group">
          <label>اندازه فونت</label>
          <select id="fontSize">
            <option value="12">کوچک (12px)</option>
            <option value="14" selected>متوسط (14px)</option>
            <option value="16">بزرگ (16px)</option>
            <option value="18">خیلی بزرگ (18px)</option>
          </select>
        </div>
        
        <div class="setting-group">
          <label>نوع فونت</label>
          <select id="fontFamily">
            <option value="Vazirmatn" selected>وزیر متن</option>
            <option value="IRANYekan">ایران یکان</option>
          </select>
        </div>

        <div class="setting-group">
          <label>جهت متن</label>
          <div class="direction-options">
            <label>
              <input type="radio" name="direction" value="auto" checked>
              <span>خودکار</span>
            </label>
            <label>
              <input type="radio" name="direction" value="rtl">
              <span>راست به چپ</span>
            </label>
            <label>
              <input type="radio" name="direction" value="ltr">
              <span>چپ به راست</span>
            </label>
          </div>
        </div>

        <div class="setting-group">
          <label>پاک کردن داده‌ها</label>
          <button id="clearDBBtn" class="danger-btn">پاک کردن</button>
        </div>

        <div class="setting-footer">
          <div class="footer-branding">
            <div class="footer-logo" title="لوگوی پارسی‌نگار"></div>
            <span class="footer-app-name">پارسی‌نگار</span>
          </div>
          <div class="footer-links">
            <a href="https://github.com/alirho/parsiNegar" target="_blank" class="github-link" title="گیت‌هاب">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://github.com/alirho/parsiNegar/releases" target="_blank" class="version-link">نسخه ۲.۱۷.۰</a>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
