# پارسی‌نگار (Parsinegar)

ویرایشگر فارسی Markdown بر پایهٔ معماری Pey — سند معماری: `docs/architecture.md`.

نسخهٔ نخست (`0.1.0`) فقط یک صفحهٔ ساده با یک محیط نوشتن Markdown است
(CodeMirror درون لایهٔ UI). بدون نوار ابزار، پیش‌نمایش، تنظیمات و مدیریت فایل.

## ساختار

```text
parsinegar/
├── src/app/          # Runtime Host (ConfigSource / EnvSource / ModuleLoader + core.start)
├── src/ui/           # رابط کاربری روی pey.webui (کامپوننت ویرایشگر + CodeMirror)
├── src/plugins/app/ # افزونهٔ اختصاصی پارسی‌نگار (مالک مسیر `/`)
├── public/           # فایل‌های ایستا (فونت وزیرمتن)
├── tests/            # آزمون‌ها (node:test + jsdom)
├── bootstrap.json    # تنها محل تعریف Adapterها، Pluginها و مسیر UI
└── index.html        # لودر Host + importmap (بدون ابزار ساخت)
```

Pey و افزونه‌های آن (`@pey/core` ،`pey.router` ،`pey.webui`) وابستگی‌اند و
سورس آن‌ها در این مخزن قرار نمی‌گیرد — مستقیم از GitHub نصب می‌شوند.

## اجرا

```sh
npm install
npm start     # static server روی ریشهٔ پروژه، سپس باز کردن آدرس اعلام‌شده
```

نکته: سرور باید ریشهٔ پروژه را سرو کند تا `node_modules/` (برای importmap) و
`bootstrap.json` در دسترس باشند. `npm start` از `--single` استفاده می‌کند تا
مسیرهای SPA مثل `/not-found` هم به `index.html` برگردند.

## آزمون

```sh
npm test
```
