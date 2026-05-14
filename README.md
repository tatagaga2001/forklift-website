# Apex Lift — เว็บไซต์ขายโฟล์คลิฟท์

เว็บไซต์สำหรับธุรกิจขายและบริการโฟล์คลิฟท์ครบวงจร ทั้งมือหนึ่ง มือสอง และแพ็กเกจเช่า

---

## ✅ Phase ที่ทำเสร็จแล้ว

### Phase 1 — Homepage
- Hero Slider 3 slides (Full Background Cinematic)
- Promotions / Categories / Services / Why Us / Contact CTA
- ระบบ 2 ภาษา TH/EN ผ่าน Language Toggle ที่ Navbar

### Phase 2 — Product System
- หน้า `/products` รายการสินค้าทั้งหมด + Filter Sidebar + Sort
- หน้า `/products/:id` รายละเอียดสินค้า + Gallery + Specs Table
- Mock data 12 รายการ ครอบคลุมทุกประเภท

### Phase 3 — Inner Pages
- `/services` รายการบริการทั้ง 6 อย่าง
- `/services/:slug` รายละเอียดแต่ละบริการ (ขาย/เช่า/ซ่อม/PM/อะไหล่/แบต)
- `/about` Trust page: ตัวเลข + ผลงาน + ใบรับรอง + ทีมช่าง
- `/contact` ฟอร์มติดต่อ + Line Notify integration

### Phase 4 — Used Forklift Page
- หน้า `/used` รถมือสองโดยเฉพาะ
- Filter: ยี่ห้อ / พลังงาน / ช่วงราคา / ชั่วโมงใช้งาน / ปีผลิต
- Mock data รถมือสอง 6 คัน พร้อม Inspection Report + Warranty
- Trade-in CTA

### Phase 5 — Quote System
- กดปุ่ม "ขอใบเสนอราคา" จาก Product Detail/Card/Used → ไปหน้า Contact พร้อมข้อมูลรถ pre-fill อัตโนมัติ
- Line Notify: ใส่ Token ใน .env แล้วส่งแจ้งเตือนทีมได้ทันที

### Phase 6 — Admin Panel (กำลังทำ)
- Supabase เชื่อมแล้ว (Database + Storage + Auth)
- `/admin/login` Login ด้วย Email/Password
- `/admin` Dashboard แสดงสถิติสินค้า
- `/admin/products` จัดการสินค้า (เพิ่ม/แก้ไข/ลบ/toggle)
- `/admin/products/new` ฟอร์มเพิ่มสินค้า + อัพโหลดรูป
- **ยังไม่ได้ทำ:** เชื่อม Supabase กับหน้าเว็บ Public (ยังใช้ mock data อยู่)

---

## ⚪ Phase ที่ยังไม่ได้ทำ

- **Phase 6 ต่อ** — ดึงสินค้าจาก Supabase แทน mock data ในหน้า Public
- **Deploy** — Push ขึ้น Vercel + ตั้งค่า Environment Variables

---

## 🛠 Tech Stack

- React 18 + Vite
- Tailwind CSS
- React Router DOM v6
- Supabase (Database + Storage + Auth)
- Line Notify (แจ้งเตือนใบเสนอราคา)
- Deploy: Vercel (planned)

---

## ⚙️ Environment Variables

สร้างไฟล์ `.env` ที่ root:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
VITE_LINE_NOTIFY_TOKEN=xxx (optional)
```

---

## 🚀 วิธีรัน

```bash
npm install
npm run dev
```

---

## 📁 โครงสร้างโปรเจก

```
src/
  components/
    admin/        → AdminLayout, AdminGuard
    layout/       → Navbar, Footer
    products/     → ProductCard, ProductFilter, FilterDrawer
    sections/     → Hero, Promotions, Categories, Services, WhyUs, ContactCTA
  context/
    AuthContext.jsx       → Supabase Auth
    LanguageContext.jsx   → TH/EN
  data/
    products.js   → Mock data สินค้า (ใช้ชั่วคราวก่อน Supabase พร้อม)
    services.js   → Mock data บริการ
    mockData.js   → ข้อมูลบริษัท
  lib/
    supabase.js   → Supabase client
    productApi.js → API functions (fetch/create/update/delete/upload)
  locales/
    th.js / en.js → ข้อความ 2 ภาษา
  pages/
    admin/        → AdminLogin, AdminDashboard, AdminProducts, AdminProductForm
    HomePage, ProductsPage, ProductDetailPage
    UsedPage, ServicesPage, ServiceDetailPage
    AboutPage, ContactPage
```