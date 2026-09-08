# تاریخچهٔ تغییرات پارسی‌نگار

تمام تغییرات قابل‌توجه این پروژه در این فایل ثبت می‌شود.

## [Unreleased] (مقصد: 0.2.0)

### افزوده‌شده

- نمای زندهٔ تک‌صفحه‌ای ویرایشگر: پنهان‌سازی نشان‌های Markdown، رندر عنوان‌ها/نقل‌قول/فهرست/لینک/کد، کارت کاغذی صفحه و کلیک-برای-فوکوس.

### بهبود یافته

- بستار import استاتیک CodeMirror (`@codemirror/*` ،`@lezer/*` و وابسته‌ها) از نصب transitive به وابستگی مستقیم `package.json` ارتقا یافت؛ همه در importmap نگاشت شده‌اند.

## [0.1.0] — 1405-06-16


### افزوده‌شده

- **Runtime Host** در `src/app/`: `ConfigSource` (خواندن `bootstrap.json`)، `EnvSource` (مرورگری) و `ModuleLoader` (قرارداد دومرحله‌ای `loadManifest` بدون اجرای کد و سپس `loadEntry`) با فراخوانی `core.start()`.
- **`bootstrap.json`:** معماری `0.11`، آداپتر `router` با `BrowserHistoryAdapter`، افزونه‌های `pey.router` و `parsinegar.app`،
  پیکربندی فارسی UI (`fa`/`rtl`).
- **افزونهٔ `parsinegar.app`** در `src/plugins/app/`: مالک مسیرهای `/` و `/not-found` و ثبت آن‌ها در `pey.router.service` هنگام `activate`.
- **رابط کاربری** روی `pey.webui` در `src/ui/`: پوستهٔ برنامه، صفحهٔ خانه با ویرایشگر Markdown راست‌به‌چپ (CodeMirror 6 با حالت markdown)، صفحهٔ not-found با بازگشت از طریق `RouterService`، کاتالوگ فارسی و مونت صریح مسیر اولیه در نقطهٔ ورود.
- **فونت وزیرمتن** به‌صورت محلی در `public/fonts/` به‌همراه سند نمونهٔ فارسی پیش‌فرض.
- **`index.html`** با importmap کامل (بدون ابزار ساخت؛ فقط ESM بومی).
- **۲۳ آزمون** با `node:test` و `jsdom` در `tests/`.
- **مستندات** در `docs/`: `architecture.md` و `decisions.md`.

### وابستگی‌ها

- `@pey/core` از `peyjs/pey-core` (تگ `v0.2.2`)
- `pey.router` از `peyjs/pey-router` (تگ `v1.0.0`)
- `pey.webui` از `peyjs/pey-webui` (تگ `v1.0.0`)
- CodeMirror 6 و `@codemirror/lang-markdown` از npm (بستار import در
  importmap نگاشت شده بود)
