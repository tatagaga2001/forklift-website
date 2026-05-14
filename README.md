# Apex Lift — Phase 1: Homepage

เว็บไซต์สำหรับธุรกิจขายและบริการโฟล์คลิฟท์ Corporate Premium

## Tech Stack
- React 18
- Vite 5
- Tailwind CSS 3

## โครงสร้างโปรเจก

```
src/
  components/
    layout/
      Navbar.jsx          ← Navbar + Language Toggle (TH/EN)
      Footer.jsx
    sections/
      Hero.jsx            ← Hero Section เต็มจอ
      Promotions.jsx      ← โปรโมชั่น 3 รายการ
      Categories.jsx      ← หมวดสินค้า 7 ประเภท
      Services.jsx        ← บริการ 6 อย่าง
      WhyUs.jsx           ← ทำไมต้องเลือกเรา + Brands
      ContactCTA.jsx      ← ปุ่มติดต่อ
  context/
    LanguageContext.jsx   ← React Context สำหรับระบบ 2 ภาษา
  locales/
    th.js                 ← ข้อความภาษาไทยทั้งหมด
    en.js                 ← ข้อความภาษาอังกฤษทั้งหมด
  data/
    mockData.js           ← Mock data (ข้อมูลบริษัท, brands)
  App.jsx
  main.jsx
  index.css
```

## การติดตั้งและรัน

```bash
npm install
npm run dev
```

## ระบบ 2 ภาษา

- Toggle ที่ Navbar ขวาบน ปุ่ม TH / EN
- เพิ่มข้อความในไฟล์ `src/locales/th.js` และ `src/locales/en.js`
- ทุก component ใช้ `useLanguage()` hook เพื่อดึงข้อความ

```jsx
import { useLanguage } from '../../context/LanguageContext'

function MyComponent() {
  const { t, lang } = useLanguage()
  return <h1>{t.hero.headline1}</h1>
}
```

## Phase ถัดไป (ยังไม่ทำ)
- [ ] Router + หน้าอื่นๆ (Products, Service, About, Contact)
- [ ] Backend / API
- [ ] Admin Panel
- [ ] Database
- [ ] Login / Auth
