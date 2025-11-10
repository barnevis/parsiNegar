import { elements } from '../utils/dom.js';
import { EventBus } from '../core/eventBus.js';
import * as storage from '../utils/storage.js';
import { customConfirm, customAlert } from './modal.js';
import { setHljsTheme, configureMermaidTheme } from '../markdown/highlighter.js';
import { state } from '../core/state.js';
import { uiManager } from '../ui/uiManager.js';

/**
 * ماژول مدیریت تنظیمات برنامه
 */

let settingsPanelInitialized = false;

/**
 * A simple getter to allow other modules to safely read settings.
 * @param {string} key - The setting key to retrieve.
 * @param {*} defaultValue - The value to return if the key is not found.
 * @returns {*} The value of the setting.
 */
export function getSetting(key, defaultValue) {
    const settings = JSON.parse(localStorage.getItem('parsiNegarSettings') || '{}');
    return settings[key] ?? defaultValue;
}


// تابع برای ذخیره تنظیمات فعلی در localStorage
function saveSettings() {
    // Get current settings to preserve values from unloaded components
    const currentSettings = JSON.parse(localStorage.getItem('parsiNegarSettings') || '{}');

    const activeSortItem = elements.fileSortMenu?.querySelector('.sort-dropdown-item.active');
    
    // Merge new settings over the old ones.
    const settings = {
        ...currentSettings,
        searchScope: elements.searchScope.value,
        fileSortOrder: activeSortItem ? activeSortItem.dataset.value : (currentSettings.fileSortOrder || 'modified-desc'),
        showToolbar: elements.showToolbarCheckbox.checked,
        showStatusBar: elements.showStatusBarCheckbox.checked,
        showSideBar: elements.showSideBarCheckbox.checked,
        showFilename: elements.showFilenameCheckbox.checked,
        isSidePanelOpen: state.isSidePanelOpen,
        activePanel: state.activePanel,
    };
    
    // Only update settings from the settings panel if it's currently in the DOM
    if (elements.settingsPanel) {
        settings.theme = elements.themeRadios?.find(r => r.checked)?.value || 'device';
        settings.fontSize = elements.fontSizeSelect?.value || '14';
        settings.fontFamily = elements.fontFamilySelect?.value || 'Vazirmatn';
        settings.direction = elements.directionRadios?.find(r => r.checked)?.value || 'auto';
        settings.markdownParser = elements.markdownParserSelect?.value || 'parsneshan';
    }

    localStorage.setItem('parsiNegarSettings', JSON.stringify(settings));
    return settings;
}

/**
 * Determines the system's preferred theme and applies it to the app.
 * Notifies other components of the effective theme change for re-rendering.
 */
function applyAndNotifySystemTheme() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    
    document.body.className = `theme-${systemTheme}`;
    setHljsTheme(systemTheme);
    configureMermaidTheme(systemTheme);

    EventBus.emit('settings:changed', { theme: systemTheme });
}

// تابع برای اعمال تنظیمات سراسری که نیازی به وجود پنل تنظیمات ندارند
function applyGlobalSettings(settings) {
    // اعمال قالب (Theme)
    const savedTheme = settings.theme || 'device';
    if (savedTheme === 'device') {
        applyAndNotifySystemTheme();
    } else {
        document.body.className = `theme-${savedTheme}`;
        setHljsTheme(savedTheme);
        configureMermaidTheme(savedTheme);
    }

    // اعمال جهت متن
    const savedDirection = settings.direction || 'auto';
    elements.editor.dir = savedDirection;
    elements.preview.dir = savedDirection;
    elements.editorBackdrop.dir = savedDirection;

    // اعمال اندازه فونت
    elements.editor.style.fontSize = `${settings.fontSize || '14'}px`;
    elements.editorBackdrop.style.fontSize = `${settings.fontSize || '14'}px`;

    // اعمال نوع فونت
    elements.editor.style.fontFamily = settings.fontFamily || 'Vazirmatn';
    elements.editorBackdrop.style.fontFamily = settings.fontFamily || 'Vazirmatn';

    // اعمال محدوده جستجو
    if (settings.searchScope) {
        elements.searchScope.value = settings.searchScope;
    }

    // اعمال تنظیمات نمایش
    elements.showToolbarCheckbox.checked = settings.showToolbar ?? false;
    elements.toolbar.style.display = elements.showToolbarCheckbox.checked ? 'flex' : 'none';

    elements.showStatusBarCheckbox.checked = settings.showStatusBar ?? true;
    elements.statusBar.style.display = elements.showStatusBarCheckbox.checked ? 'flex' : 'none';

    elements.showSideBarCheckbox.checked = settings.showSideBar ?? true;
    elements.content.classList.toggle('sidebar-hidden', !elements.showSideBarCheckbox.checked);
    
    elements.showFilenameCheckbox.checked = settings.showFilename ?? true;
    elements.filename.style.display = elements.showFilenameCheckbox.checked ? 'block' : 'none';
     
    // بازیابی وضعیت پنل کناری
    EventBus.emit('sidePanel:restore', {
        isSidePanelOpen: settings.isSidePanelOpen ?? true, // پیش‌فرض باز بودن
        activePanel: settings.activePanel || null,
    });
}

// تابع برای پر کردن مقادیر داخل پنل تنظیمات
function populateSettingsPanel(settings) {
    if (!elements.settingsPanel) return;
    
    const savedTheme = settings.theme || 'device';
    (elements.themeRadios.find(r => r.value === savedTheme) || {}).checked = true;

    const savedDirection = settings.direction || 'auto';
    (elements.directionRadios.find(r => r.value === savedDirection) || {}).checked = true;

    elements.fontSizeSelect.value = settings.fontSize || '14';
    elements.fontFamilySelect.value = settings.fontFamily || 'Vazirmatn';
    elements.markdownParserSelect.value = settings.markdownParser || 'parsneshan';
    
    if (settings.fileSortOrder && elements.fileSortMenu) {
        elements.fileSortMenu.querySelectorAll('.sort-dropdown-item').forEach(item => {
            item.classList.toggle('active', item.dataset.value === settings.fileSortOrder);
        });
    }
}


async function clearAllData() {
    const confirmed = await customConfirm('آیا مطمئن هستید؟ تمام پرونده‌های ذخیره شده برای همیشه پاک خواهند شد. این عمل بازگشت‌پذیر نیست.', 'پاک کردن تمام داده‌ها');
    if (confirmed) {
        try {
            await storage.clearFilesDB();
            localStorage.removeItem('parsiNegarLastState');
            await customAlert('تمام داده‌ها پاک شدند.', 'عملیات موفق');
            window.location.reload(); // بارگذاری مجدد صفحه برای شروع تازه
        } catch (error) {
            console.error("خطا در پاک کردن داده‌ها:", error);
            await customAlert('خطایی در پاک کردن داده‌ها رخ داد.', 'خطا');
        }
    }
}

function closeSettingsPanel() {
    if(elements.settingsPanel) {
        elements.settingsPanel.classList.add('hidden');
    }
}

async function openSettingsPanel() {
    await uiManager.ensureComponentLoaded('settingsModal');
    const settings = JSON.parse(localStorage.getItem('parsiNegarSettings') || '{}');
    populateSettingsPanel(settings);
    elements.settingsPanel.classList.remove('hidden');
    
    if (settingsPanelInitialized) return;

    elements.closeSettingsBtn.addEventListener('click', closeSettingsPanel);

    elements.themeRadios.forEach(radio => radio.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        if (selectedTheme === 'device') {
            applyAndNotifySystemTheme();
        } else {
            document.body.className = `theme-${selectedTheme}`;
            setHljsTheme(selectedTheme);
            configureMermaidTheme(selectedTheme);
            EventBus.emit('settings:changed', { theme: selectedTheme });
        }
        saveSettings();
    }));

    elements.directionRadios.forEach(radio => radio.addEventListener('change', () => {
        const savedSettings = saveSettings();
        applyGlobalSettings(savedSettings);
        EventBus.emit('editor:contentChanged', elements.editor.value);
    }));

    elements.fontSizeSelect.addEventListener('change', () => {
        const savedSettings = saveSettings();
        applyGlobalSettings(savedSettings);
    });

    elements.fontFamilySelect.addEventListener('change', () => {
        const savedSettings = saveSettings();
        applyGlobalSettings(savedSettings);
    });

    elements.markdownParserSelect.addEventListener('change', () => {
        EventBus.emit('settings:changed', { markdownParser: elements.markdownParserSelect.value });
        saveSettings();
    });

    elements.clearDBBtn.addEventListener('click', clearAllData);
    settingsPanelInitialized = true;
}

export function init() {
    const settings = JSON.parse(localStorage.getItem('parsiNegarSettings') || '{}');
    applyGlobalSettings(settings);

    elements.settingsBtn.addEventListener('click', openSettingsPanel);
    EventBus.on('settings:open', openSettingsPanel);
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const currentSettings = JSON.parse(localStorage.getItem('parsiNegarSettings') || '{}');
        if ((currentSettings.theme || 'device') === 'device') {
            applyAndNotifySystemTheme();
        }
    });

    // Listeners for checkboxes in main menu (not in modal)
    elements.showToolbarCheckbox.addEventListener('change', (e) => {
        elements.toolbar.style.display = e.target.checked ? 'flex' : 'none';
        saveSettings();
    });
    elements.showStatusBarCheckbox.addEventListener('change', (e) => {
        elements.statusBar.style.display = e.target.checked ? 'flex' : 'none';
        saveSettings();
    });
    elements.showFilenameCheckbox.addEventListener('change', (e) => {
        elements.filename.style.display = e.target.checked ? 'block' : 'none';
        saveSettings();
    });
    elements.showSideBarCheckbox.addEventListener('change', (e) => {
        elements.content.classList.toggle('sidebar-hidden', !e.target.checked);
        saveSettings();
    });

    EventBus.on('settings:save', saveSettings);
}
