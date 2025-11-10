/**
 * کامپوننت دیالوگ سفارشی (alert/confirm/prompt)
 */
export const html = `
  <div id="customDialog" class="modal hidden">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="dialogTitle"></h2>
        <button id="dialogCloseBtn"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <p id="dialogMessage"></p>
        <input type="text" id="dialogInput" class="hidden" spellcheck="false">
      </div>
      <div class="modal-footer" id="dialogButtons">
        <!-- Buttons will be dynamically inserted here -->
      </div>
    </div>
  </div>
`;
