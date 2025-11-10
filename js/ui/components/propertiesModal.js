/**
 * کامپوننت مودال ویژگی‌های پرونده
 */
export const html = `
  <div id="filePropertiesModal" class="modal hidden">
    <div class="modal-content">
      <div class="modal-header">
        <h2>ویژگی‌های پرونده</h2>
        <button id="closePropertiesBtn"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div id="propertiesContainer">
            <div class="property-item">
                <span class="property-label">نام پرونده:</span>
                <span id="propFileName" class="property-value"></span>
            </div>
            <div class="property-item">
                <span class="property-label">حجم پرونده:</span>
                <span id="propFileSize" class="property-value"></span>
            </div>
            <div class="property-item">
                <span class="property-label">تاریخ ایجاد:</span>
                <span id="propCreationDate" class="property-value"></span>
            </div>
            <div class="property-item">
                <span class="property-label">آخرین ویرایش:</span>
                <span id="propLastModified" class="property-value"></span>
            </div>
            <div class="property-item">
                <span class="property-label">تعداد نویسه:</span>
                <span id="propCharsCount" class="property-value"></span>
            </div>
            <div class="property-item">
                <span class="property-label">تعداد واژه:</span>
                <span id="propWordsCount" class="property-value"></span>
            </div>
            <div class="property-item">
                <span class="property-label">تعداد خط:</span>
                <span id="propLinesCount" class="property-value"></span>
            </div>
        </div>
      </div>
    </div>
  </div>
`;
