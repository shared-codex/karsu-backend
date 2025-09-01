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
   فایل `.env` را با مقادیر پایگاه داده تکمیل کنید:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=رمزعبور
   DB_NAME=karsu
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

## Authentication and Token Management

### Access vs. Refresh Flow

```
Client -- POST /auth/login --> Server
Client <-- access token (JSON) + refresh token (httpOnly cookie) -- Server
Client -- Authorization: Bearer <access token> --> Protected routes
Access token expires
Client -- POST /auth/refresh (with refresh cookie + X-CSRF header) --> Server
Client <-- new access token + rotated refresh cookie -- Server
Client -- POST /auth/logout --> Server (refresh token revoked, cookie cleared)
```

### Storage and Rotation Logic

- Refresh tokens are hashed in the database and linked to the user with a unique `jti`.
- Every refresh request rotates the token: a new refresh token is issued, the old one is marked revoked and `replacedBy` the new token.
- A `token_version` on the user invalidates existing tokens on logout.
- Access tokens are short lived and kept only in client memory.

### CORS and Cookie Setup

- `FRONTEND_ORIGIN` controls the allowed origin for CORS; cookies are sent with `credentials: true`.
- Refresh token cookie: `httpOnly`, `sameSite: lax`, path `/auth/refresh`, and `secure` in production.
- CSRF cookie: `httpOnly: false`, `sameSite: strict`, and `secure` in production.
- In development (`NODE_ENV=development`), cookies are sent over HTTP (not `secure`). In production (`NODE_ENV=production`), set `FRONTEND_ORIGIN` to your HTTPS domain and cookies become `secure`.

### Example `curl` Commands

```bash
# Register
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"pass"}'

# Login (saves refreshToken and csrfToken cookies)
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -c cookie.txt \
  -d '{"email":"alice@example.com","password":"pass"}'

# Access protected route
curl http://localhost:3000/auth/me \
  -H "Authorization: Bearer <ACCESS_TOKEN>"

# Refresh (rotates tokens)
csrf=$(grep csrfToken cookie.txt | cut -f7)
curl -X POST http://localhost:3000/auth/refresh \
  -H "X-CSRF: $csrf" \
  -b cookie.txt -c cookie.txt

# Logout
curl -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -b cookie.txt
```

> Access tokens are never stored in cookies or localStorage.

این مخزن پایه‌ای برای توسعهٔ قابلیت‌های بیشتر سامانهٔ پایش سلامت کارگران است.
