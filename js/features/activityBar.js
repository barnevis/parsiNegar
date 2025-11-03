import { elements } from '../utils/dom.js';
import { EventBus } from '../core/eventBus.js';

/**
 * ماژول نوار فعالیت
 * این ماژول رابط کاربری و تعاملات نوار فعالیت را مدیریت می‌کند.
 * این ماژول رویدادهایی را برای کنترل پنل‌های دیگر مانند پنل کناری یا مودال تنظیمات منتشر می‌کند.
 */

/**
 * رسیدگی به کلیک روی دکمه‌های نوار فعالیت
 * @param {MouseEvent} e - رویداد کلیک
 */
function handleActivityBarClick(e) {
    const button = e.target.closest('.activity-bar-btn');
    if (!button) return;

    const panelName = button.dataset.panel;

    if (panelName === 'settings') {
        // درخواست برای بستن پنل کناری (در صورت باز بودن) و باز کردن تنظیمات
        EventBus.emit('sidePanel:close');
        EventBus.emit('settings:open');
    } else if (panelName) {
        // درخواست برای باز/بسته کردن یک بخش خاص از پنل کناری
        EventBus.emit('sidePanel:toggle', panelName);
    }
}

/**
 * به‌روزرسانی وضعیت فعال بودن دکمه‌های نوار فعالیت بر اساس وضعیت پنل
 * @param {string} openedPanelName - نام پنلی که باز شده است
 */
function updateActiveButton(openedPanelName) {
    elements.activityBarButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.panel === openedPanelName);
    });
}

/**
 * حذف وضعیت فعال از تمام دکمه‌های نوار فعالیت
 */
function clearActiveButtons() {
    elements.activityBarButtons.forEach(btn => {
        btn.classList.remove('active');
    });
}

/**
 * مقداردهی اولیه ماژول نوار فعالیت
 */
export function init() {
    // گوش دادن به کلیک‌ها روی خود نوار فعالیت
    elements.activityBar.addEventListener('click', handleActivityBarClick);

    // گوش دادن به رویدادها از ماژول‌های دیگر برای به‌روزرسانی رابط کاربری
    EventBus.on('sidePanel:opened', updateActiveButton);
    EventBus.on('sidePanel:closed', clearActiveButtons);
}