# یادداشت‌های نسخهٔ ۱ (۰.۱.۰)

محدوده دقیقاً مطابق `imp/architecture.md` §۵ و §۱۰: یک صفحهٔ ساده با محیط
نوشتن Markdown. بدون نوار ابزار، پیش‌نمایش، تم، تنظیمات و مدیریت فایل.

## تصمیم‌های معماری

۱. **افزونهٔ `parsinegar.app` (نوع `product`):** مالک کاتالوگ مسیرهای نسخهٔ ۱
   (`/` و `/not-found`) و ثبت آن‌ها در `pey.router.service` هنگام `activate`.
   قرارداد روتر ثبت مسیر را فقط در `activate` مجاز می‌داند، نه در `prepare`.

۲. **مونت اولیهٔ مسیر در `src/ui/index.js`:** انتشار `router:changed` هنگام
   ثبت مسیرها در فاز `activate` رخ می‌دهد، یعنی پیش از اشتراک UI؛ بنابراین
   نقطهٔ ورود پس از ساخت page host مسیر جاری را صریحاً مونت می‌کند. این کار
   فقط از API عمومی کیت (`mountForRoute`/`getCurrentRoute`) استفاده می‌کند و
   کیت دست‌کاری نمی‌شود.

۳. **میزبانی CodeMirror در صفحهٔ خانه، نه کامپوننت تودرتو:** یک فرزند
   `PeyElement` را نمی‌توان به‌صورت declarative تودرتو کرد (الزام
   connect-before-insertion در برابر قانون «بدون mutation بیرون از render»).
   پس صفحهٔ `parsi-page-home` گرهٔ میزبان را در تمپلیت خود رندر می‌کند و ویو
   را از طریق کارخانهٔ سادهٔ `components/editor/markdown-view.js` می‌سازد.
   این کارخانه المنت نیست و سرویسی مصرف نمی‌کند.

۴. **بدون ابزار ساخت:** فقط ESM بومی + importmap در `index.html`. نگاشت‌های
   CodeMirror باید بستهٔ transitive واقعی (`@lezer/*` ،`@codemirror/*`
   ،`style-mod` ،`w3c-keyname` ،`crelt` ،`@marijn/find-cluster-break`) را
   پوشش دهند؛ پس از هر ارتقای CodeMirror پوشش را بازبینی کنید.

## گام‌های بعدی (خارج از نسخهٔ ۱)

- پردازش Markdown با Parsneshan از طریق افزونه (کپی سورس ممنوع).
- ذخیره‌سازی متن (سرویس + جریان فایل)؛ رویداد `parsi-page-home:change`
  و متد `setDocument` صفحهٔ خانه قلاب‌های آن هستند.
