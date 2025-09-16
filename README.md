# سامانه پشتیبان کارسو

پروژهٔ کارسو یک سرویس پشتیبان نوشته‌شده با **Node.js**, **Express** و **TypeScript** است که داده‌های کارگران، دستگاه‌های پوشیدنی آن‌ها و رویدادهای مرتبط را در پایگاه دادهٔ **PostgreSQL** نگه‌داری می‌کند. این سامانه برای پایش وضعیت سلامت کارگران و مدیریت هشدارهای ایمنی طراحی شده است.

## قابلیت‌ها
- فراهم کردن API کامل برای انجام عملیات CRUD روی تمامی مدل‌ها
- انتساب دستگاه‌ها به کارگران و پیگیری تاریخچهٔ استفاده
- ثبت حضور و غیاب شیفت‌ها
- ثبت شرایط و رویدادهای سلامت کارگران
- ذخیره‌سازی قرائت‌های حسگر (نبض، گاز، گام، زمان بی‌حرکتی، شارژ باتری)
- تولید و مدیریت هشدارهای ایمنی بر اساس داده‌های حسگر و حدود تعریف‌شده در نقش‌ها
- مدیریت نقش‌ها و مجوزها برای کنترل دسترسی
- ارائه‌ی مستندات کامل API در مسیر `/api-docs`

## مدل‌ها و روابط
### Worker (کارگر)
اطلاعات هویتی و تماس اضطراری کارگر را نگه‌داری می‌کند.
روابط:
- `assignments` : یک کارگر می‌تواند چندین انتساب دستگاه داشته باشد.
- `shifts` : ثبت حضور شیفت‌های کارگر.
- `healthConditions` : شرایط مزمن سلامت.
- `healthIncidents` : رویدادهای سلامتی مانند حادثه یا بیماری.
- `alerts` : هشدارهای ثبت‌شده برای کارگر.

### Device (دستگاه)
نمایندهٔ دستگاه پوشیدنی با شناسهٔ یکتا و وضعیت فعلی است.
روابط:
- `assignments` : دستگاه می‌تواند در دوره‌های مختلف به کارگران مختلف اختصاص یابد.
- `sensorReadings` : مجموعهٔ قرائت‌های ثبت‌شده توسط حسگرهای دستگاه.

### WorkerDeviceAssignment (انتساب دستگاه)
پل ارتباطی بین کارگر و دستگاه به همراه تاریخ شروع و پایان استفاده است. با حذف کارگر یا دستگاه، رکوردها به صورت خودکار حذف می‌شوند.

### ShiftAttendance (حضور شیفت)
برای هر کارگر، تاریخ و زمان ورود و خروج در شیفت‌ها را ثبت می‌کند.

### WorkerHealthCondition (شرایط سلامت)
شرایط مزمن مانند بیماری‌ها با شدت و وضعیت مدیریت می‌شوند.

### WorkerHealthIncident (رویداد سلامت)
رویدادهای موقت یا حادثه‌های مرتبط با سلامت کارگر به همراه تاریخ وقوع، شدت و تاریخ رفع ثبت می‌شوند.

### SensorReading (داده‌ی حسگر)
اطلاعات لحظه‌ای سنسورها برای هر دستگاه در زمان مشخص شامل: `heart_rate`، `gas_level`، `step_count`، `stationary_time` و `battery_level`.

### Alert (هشدار)
هشدارهای تولید شده بر اساس قرائت‌ها. هر هشدار نوعی (`alert_type`) دارد و می‌تواند زمان رفع داشته باشد.

### Role (نقش) و Permission (مجوز)
نقش‌ها شامل حدود مجاز برای نبض، گاز و بی‌حرکتی هستند و با مجوزها ارتباط چندبه‌چند دارند. مجوزها عملیات قابل انجام در سیستم را مشخص می‌کنند.

## راه‌اندازی پروژه
1. **نصب پیش‌نیازها**
   - Node.js نسخهٔ 16 یا بالاتر
   - پایگاه داده PostgreSQL
2. **کلون و نصب وابستگی‌ها**
   ```bash
   git clone <آدرس-مخزن>
   cd karsu-backend
   npm install
   ```
3. **تنظیم متغیرهای محیطی**
   فایل `.env` را بر اساس `.env.example` تکمیل کنید. حداقل متغیرهای زیر باید مقداردهی شوند:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=رمزعبور
   DB_NAME=karsu

   ACCESS_TOKEN_SECRET=secret
   REFRESH_TOKEN_SECRET=secret
   ACCESS_TOKEN_TTL=10m
   REFRESH_TOKEN_TTL=7d
   FRONTEND_ORIGIN=http://localhost:3000
   NODE_ENV=development
   ```
4. **ایجاد پایگاه داده**
   یک دیتابیس خالی با نامی که در `.env` مشخص کردید بسازید.
5. **اجرای مهاجرت‌ها**
   ```bash
   npm run migration:run
   ```
6. **اجرای برنامه**
   ```bash
   npm start
   ```
   سرویس به طور پیش‌فرض روی پورت 3000 در دسترس است و مستندات API در مسیر `http://localhost:3000/api-docs` قابل مشاهده است.

## اسکریپت‌های مفید
- `npm run build` : کامپایل TypeScript به JavaScript
- `npm run swagger:validate` : اعتبارسنجی فایل Swagger تولید شده
- `npm run migration:generate --name=MigrationName` : ایجاد فایل مهاجرت جدید
- `npm run migration:run` : اعمال مهاجرت‌ها روی پایگاه داده

## آزمایش API با Postman
پوشه‌ی `docs/api` شامل یک کالکشن Postman و فایل‌های محیطی برای کار با سرویس است.

### وارد کردن کالکشن و محیط
1. در Postman روی **Import** کلیک کرده و فایل `docs/api/postman_collection.json` را انتخاب کنید.
2. یکی از فایل‌های محیط زیر را وارد کنید:
   - `docs/api/postman_env.dev.json` برای توسعهٔ محلی
   - `docs/api/postman_env.staging.json` برای محیط staging
   - `docs/api/postman_env.prod.json` برای محیط production

### تنظیم `baseUrl`
پس از وارد کردن محیط، آن را در Postman باز کرده و متغیر `baseUrl` را به آدرس پایه‌ی سرور خود (مثلاً `http://localhost:3000`) مقداردهی کنید.

### دریافت `bearerToken`
در کالکشن پوشه‌ای به نام **Auth Helpers** وجود دارد. درخواست `POST /auth/login` را در این پوشه با اطلاعات کاربری معتبر اجرا کنید. اسکریپت تست این درخواست، توکن دسترسی را در متغیر محیطی `bearerToken` ذخیره کرده و درخواست‌های بعدی به صورت خودکار آن را در هدر `Authorization` ارسال می‌کنند.

## احراز هویت و مدیریت توکن

### روند دسترسی و تازه‌سازی

```
کاربر -- POST /auth/login --> سرور
کاربر <-- access token (JSON) + refresh token (کوکی HttpOnly) -- سرور
کاربر -- Authorization: Bearer <access token> --> مسیرهای محافظت‌شده
انقضای access token
کاربر -- POST /auth/refresh (با کوکی refresh و هدر X-CSRF) --> سرور
کاربر <-- access token جدید + کوکی refresh چرخیده -- سرور
کاربر -- POST /auth/logout --> سرور (کوکی پاک و توکن‌ها باطل می‌شوند)
```

### منطق ذخیره‌سازی و چرخش

- توکن‌های تازه‌سازی به صورت هش در پایگاه داده ذخیره شده و با شناسهٔ یکتا `jti` به کاربر مرتبط می‌شوند.
- هر درخواست تازه‌سازی باعث صدور توکن جدید می‌شود؛ توکن قبلی باطل شده و شناسهٔ آن در فیلد `replacedBy` ثبت می‌گردد.
- مقدار `token_version` در مدل کاربر با خروج از حساب یا سوءاستفاده افزایش یافته و تمام توکن‌های قبلی را نامعتبر می‌کند.
- توکن‌های دسترسی عمر کوتاهی دارند و فقط در حافظهٔ کلاینت نگه‌داری می‌شوند.

### پیکربندی CORS و کوکی

- متغیر `FRONTEND_ORIGIN` مبدأ مجاز برای CORS را تعیین می‌کند؛ کوکی‌ها با گزینهٔ `credentials: true` ارسال می‌شوند.
- کوکی توکن تازه‌سازی: `httpOnly`، `sameSite: lax`، مسیر `/auth/refresh` و در محیط تولید `secure`.
- کوکی CSRF: با `httpOnly: false`، `sameSite: strict` و در محیط تولید `secure`.
- در حالت توسعه (`NODE_ENV=development`) کوکی‌ها بدون `secure` ارسال می‌شوند؛ در حالت تولید (`NODE_ENV=production`) باید `FRONTEND_ORIGIN` را به دامنهٔ HTTPS تنظیم کنید تا کوکی‌ها `secure` شوند.

### نمونه دستورات `curl`

```bash
# ثبت‌نام
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"pass"}'

# ورود (کوکی‌های refreshToken و csrfToken ذخیره می‌شود)
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -c cookie.txt \
  -d '{"email":"alice@example.com","password":"pass"}'

# دسترسی به مسیر محافظت‌شده
curl http://localhost:3000/auth/me \
  -H "Authorization: Bearer <ACCESS_TOKEN>"

# تازه‌سازی توکن‌ها
csrf=$(grep csrfToken cookie.txt | cut -f7)
curl -X POST http://localhost:3000/auth/refresh \
  -H "X-CSRF: $csrf" \
  -b cookie.txt -c cookie.txt

# خروج
curl -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -b cookie.txt
```

> توکن‌های دسترسی هرگز در کوکی یا localStorage ذخیره نمی‌شوند.

این مخزن پایه‌ای برای توسعهٔ قابلیت‌های بیشتر سامانهٔ پایش سلامت کارگران است.
