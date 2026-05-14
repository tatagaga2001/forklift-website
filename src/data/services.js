// ─────────────────────────────────────────────────────────────────────────────
// Apex Lift — Services Data
// ─────────────────────────────────────────────────────────────────────────────

export const services = [
  {
    slug: 'sales',
    icon: '🏭',
    color: 'gold',
    name: { th: 'ขายรถโฟล์คลิฟท์', en: 'Forklift Sales' },
    tagline: { th: 'มือหนึ่งและมือสอง ครบทุกประเภท', en: 'New & Used — Every Type' },
    description: {
      th: 'จำหน่ายรถโฟล์คลิฟท์ทุกประเภท ทั้งมือหนึ่งและมือสองคัดคุณภาพ ครอบคลุมทุกยี่ห้อ Toyota, Komatsu, Mitsubishi, TCM, Crown และอื่นๆ พร้อมทีมขายที่ให้คำปรึกษาเลือกรถที่เหมาะสมกับงานและงบประมาณ',
      en: 'New and certified pre-owned forklifts across all major types and brands — Toyota, Komatsu, Mitsubishi, TCM, Crown, and more. Our sales team helps you select the right machine for your application and budget.',
    },
    features: {
      th: [
        'รถมือหนึ่งนำเข้าตรงจากผู้ผลิต',
        'รถมือสองผ่านการตรวจสอบ 100 จุด',
        'ทดลองขับก่อนตัดสินใจ',
        'มีตัวเลือก Financing และ Leasing',
        'บริการ Trade-in รถเก่า',
        'ส่งมอบพร้อมเอกสารครบ',
      ],
      en: [
        'New units imported directly from manufacturers',
        'Used units with 100-point inspection',
        'Test drive before you decide',
        'Financing and leasing options available',
        'Trade-in your old unit',
        'Full documentation on delivery',
      ],
    },
    process: {
      th: ['ปรึกษาทีมขาย', 'ทดลองขับ / ดูรถ', 'รับใบเสนอราคา', 'ทำสัญญาและชำระเงิน', 'ส่งมอบและ Commissioning'],
      en: ['Consult our team', 'Test drive / View unit', 'Receive quote', 'Contract & payment', 'Delivery & commissioning'],
    },
    faq: {
      th: [
        { q: 'รถมือสองมีประกันไหม?', a: 'มีประกันหลังการขาย 3 เดือน ครอบคลุมชิ้นส่วนหลัก' },
        { q: 'สามารถผ่อนได้ไหม?', a: 'ได้ ผ่านธนาคารพาร์ทเนอร์ ผ่อนได้สูงสุด 60 เดือน' },
        { q: 'Trade-in ได้ไหม?', a: 'รับ Trade-in ทุกยี่ห้อ ประเมินราคาฟรีภายใน 24 ชั่วโมง' },
      ],
      en: [
        { q: 'Do used units come with warranty?', a: '3-month after-sale warranty covering major components.' },
        { q: 'Can I finance the purchase?', a: 'Yes, through our banking partners, up to 60-month installment.' },
        { q: 'Do you accept trade-ins?', a: 'We accept all brands. Free valuation within 24 hours.' },
      ],
    },
  },
  {
    slug: 'rental',
    icon: '🔑',
    color: 'blue',
    name: { th: 'เช่ารถโฟล์คลิฟท์', en: 'Forklift Rental' },
    tagline: { th: 'รายวัน รายเดือน รายปี ยืดหยุ่นตามธุรกิจ', en: 'Daily, Monthly, Annual — Fully Flexible' },
    description: {
      th: 'บริการเช่ารถโฟล์คลิฟท์ครบวงจร ทั้งระยะสั้นและระยะยาว ไม่ต้องลงทุนสูง ค่าใช้จ่ายเป็น OPEX ไม่ใช่ CAPEX พร้อมบริการ PM และประกันอุบัติเหตุรวมอยู่ในแพ็กเกจ',
      en: 'Short and long-term forklift rental with no large upfront investment. Costs flow as OPEX rather than CAPEX. PM service and accident insurance are included in every package.',
    },
    features: {
      th: [
        'ไม่ต้องลงทุนซื้อรถ ลดภาระ CAPEX',
        'PM ฟรีตลอดสัญญา',
        'ประกันอุบัติเหตุรวมในแพ็กเกจ',
        'เพิ่ม/ลดจำนวนรถได้ตามฤดูกาล',
        'รถทดแทนกรณีเสียฉุกเฉิน',
        'ตัวเลือกระยะเวลา: 1 วัน / 1 เดือน / 1–3 ปี',
      ],
      en: [
        'No upfront purchase — reduce CAPEX burden',
        'Free PM throughout the contract',
        'Accident insurance included',
        'Scale fleet up or down by season',
        'Replacement unit in case of breakdown',
        'Term options: 1 day / monthly / 1–3 years',
      ],
    },
    packages: [
      { name: 'รายวัน', nameEn: 'Daily', price: 'ติดต่อสอบถาม', desc: { th: 'เหมาะงานชั่วคราว โปรเจกสั้น', en: 'Ideal for short-term projects' } },
      { name: 'รายเดือน', nameEn: 'Monthly', price: 'เริ่ม ฿12,000', desc: { th: 'ยืดหยุ่น ปรับตามฤดูกาล', en: 'Flexible, scale seasonally' } },
      { name: 'รายปี', nameEn: 'Annual', price: 'ราคาพิเศษ', desc: { th: 'ประหยัดสุด รวม PM + ประกัน', en: 'Best value — PM & insurance included' } },
    ],
    process: {
      th: ['แจ้งความต้องการ', 'เลือกแพ็กเกจและรถ', 'ทำสัญญา', 'ส่งมอบรถ', 'ใช้งาน + PM ตามรอบ'],
      en: ['Specify requirements', 'Choose package & unit', 'Sign contract', 'Unit delivery', 'Operate + scheduled PM'],
    },
    faq: {
      th: [
        { q: 'รถเสียกลางดึกทำอย่างไร?', a: 'มีบริการฉุกเฉิน 24/7 ช่างถึงที่ภายใน 4 ชั่วโมง' },
        { q: 'สัญญาขั้นต่ำกี่เดือน?', a: 'เช่ารายเดือนขั้นต่ำ 3 เดือน เช่ารายปีขั้นต่ำ 12 เดือน' },
        { q: 'ต้องจ่ายค่าซ่อมเองไหม?', a: 'การสึกหรอตามปกติอยู่ในแพ็กเกจ ความเสียหายจากอุบัติเหตุแยกต่างหาก' },
      ],
      en: [
        { q: 'What if the unit breaks down at night?', a: '24/7 emergency service — technician on-site within 4 hours.' },
        { q: 'What is the minimum rental term?', a: 'Monthly minimum 3 months, annual minimum 12 months.' },
        { q: 'Do I pay for repairs?', a: 'Normal wear and tear is covered. Accident damage is assessed separately.' },
      ],
    },
  },
  {
    slug: 'repair',
    icon: '🔧',
    color: 'orange',
    name: { th: 'ซ่อมรถโฟล์คลิฟท์', en: 'Forklift Repair' },
    tagline: { th: 'ช่างถึงหน้างาน แก้ปัญหาตรงจุด', en: 'On-site technicians — fast, accurate fixes' },
    description: {
      th: 'ทีมช่างผู้เชี่ยวชาญบริการซ่อมรถโฟล์คลิฟท์ถึงหน้างาน ทุกยี่ห้อ ทุกรุ่น ไม่ต้องนำรถเข้าศูนย์ ลด Downtime ให้น้อยที่สุด พร้อม SLA ชัดเจน',
      en: 'Certified technicians dispatched to your facility for all brands and models. No need to transport your machine. We minimize downtime with clear SLA commitments.',
    },
    features: {
      th: [
        'ช่างถึงหน้างานภายใน 4 ชั่วโมง (พื้นที่กรุงเทพฯ และปริมณฑล)',
        'ซ่อมได้ทุกยี่ห้อ: Toyota, Komatsu, Mitsubishi, TCM, Crown ฯลฯ',
        'อะไหล่แท้พร้อมสต็อก ไม่ต้องรอนาน',
        'ให้ใบรับรองหลังซ่อม',
        'บริการฉุกเฉิน 24/7',
        'รายงานผลการซ่อมให้ทุกครั้ง',
      ],
      en: [
        'On-site within 4 hours (Bangkok & surrounding areas)',
        'All brands: Toyota, Komatsu, Mitsubishi, TCM, Crown & more',
        'Genuine parts in stock — no long waits',
        'Post-repair certification issued',
        '24/7 emergency service',
        'Written repair report every time',
      ],
    },
    sla: [
      { label: 'กรุงเทพฯ / ปริมณฑล', labelEn: 'Bangkok & vicinity', time: '4 ชั่วโมง', timeEn: '4 hours' },
      { label: 'ต่างจังหวัด (รัศมี 200 กม.)', labelEn: 'Upcountry (200km radius)', time: 'ภายใน 1 วัน', timeEn: 'Within 1 day' },
      { label: 'ฉุกเฉิน 24/7', labelEn: 'Emergency 24/7', time: 'โทรได้ตลอด', timeEn: 'Always available' },
    ],
    process: {
      th: ['แจ้งอาการเสีย', 'วิเคราะห์และประเมินราคา', 'อนุมัติและสั่งอะไหล่', 'ซ่อมหน้างาน', 'ทดสอบและส่งมอบ'],
      en: ['Report the issue', 'Diagnose & quote', 'Approval & parts order', 'On-site repair', 'Test & handover'],
    },
    faq: {
      th: [
        { q: 'ซ่อมรถยี่ห้ออื่นได้ไหมที่ไม่ได้ซื้อจากร้าน?', a: 'ได้ทุกยี่ห้อ ทุกรุ่น ไม่จำเป็นต้องเป็นลูกค้าเก่า' },
        { q: 'มีค่า call-out ไหม?', a: 'ฟรีสำหรับลูกค้าที่มีสัญญา PM ลูกค้าทั่วไปมีค่าบริการตามระยะทาง' },
        { q: 'ถ้าซ่อมไม่หายทำอย่างไร?', a: 'รับประกันงานซ่อม 30 วัน ถ้ามีปัญหาเดิมกลับมา ซ่อมให้ใหม่ฟรี' },
      ],
      en: [
        { q: 'Can you repair units not purchased from you?', a: "Yes — all brands and models, no prior customer relationship needed." },
        { q: 'Is there a call-out fee?', a: 'Free for PM contract customers. Standard call-out fee applies otherwise.' },
        { q: 'What if the problem comes back?', a: '30-day repair warranty. Same issue returns? We fix it free.' },
      ],
    },
  },
  {
    slug: 'pm',
    icon: '📋',
    color: 'green',
    name: { th: 'PM (Preventive Maintenance)', en: 'Preventive Maintenance' },
    tagline: { th: 'ป้องกันก่อนเสีย ยืดอายุรถ ลด Downtime', en: 'Prevent before it breaks — extend lifespan, reduce downtime' },
    description: {
      th: 'บริการ Preventive Maintenance ตามรอบชั่วโมงหรือระยะเวลา โดยทีมช่างมีใบรับรอง ช่วยยืดอายุรถ ลดความเสี่ยงเสียฉุกเฉิน และประหยัดค่าซ่อมในระยะยาว',
      en: 'Scheduled preventive maintenance by hour-meter or calendar intervals, performed by certified technicians. Extends equipment life, reduces emergency breakdown risk, and lowers long-term repair costs.',
    },
    features: {
      th: [
        'กำหนดตารางล่วงหน้า ไม่รบกวนการทำงาน',
        'ตรวจสอบและเปลี่ยนน้ำมัน ฟิลเตอร์ ตามรอบ',
        'ตรวจระบบไฮดรอลิก ระบบเบรก ระบบไฟฟ้า',
        'รายงาน PM ทุกครั้ง พร้อมภาพถ่าย',
        'แจ้งเตือนล่วงหน้าก่อนถึงรอบ PM',
        'มีแพ็กเกจ PM รายปี ราคาคุ้มค่า',
      ],
      en: [
        'Scheduled in advance — no work disruption',
        'Oil, filter, and fluid changes per interval',
        'Hydraulic, brake, and electrical system checks',
        'PM report with photos every service',
        'Advance reminder before PM is due',
        'Annual PM package available at best value',
      ],
    },
    schedule: [
      { interval: '250 ชั่วโมง', intervalEn: '250 hours', items: { th: 'เปลี่ยนน้ำมันเครื่อง, ตรวจระบบไฮดรอลิก, ตรวจยาง', en: 'Engine oil change, hydraulic check, tire inspection' } },
      { interval: '500 ชั่วโมง', intervalEn: '500 hours', items: { th: 'เปลี่ยนฟิลเตอร์, ตรวจระบบเบรก, ตรวจแบตเตอรี่', en: 'Filter replacement, brake check, battery inspection' } },
      { interval: '1,000 ชั่วโมง', intervalEn: '1,000 hours', items: { th: 'ตรวจสอบใหญ่ทุกระบบ, ปรับแต่ง, ทดสอบโหลด', en: 'Full system inspection, tune-up, load test' } },
    ],
    process: {
      th: ['วางแผนตารางร่วมกัน', 'ช่างถึงหน้างานตามนัด', 'ตรวจสอบและซ่อมแซม', 'รายงาน PM พร้อมภาพ', 'นัดรอบถัดไป'],
      en: ['Plan schedule together', 'Technician arrives on time', 'Inspect & service', 'PM report with photos', 'Schedule next interval'],
    },
    faq: {
      th: [
        { q: 'PM บ่อยแค่ไหน?', a: 'ทุก 250 ชั่วโมงสำหรับรถเครื่องยนต์ ทุก 500 ชั่วโมงสำหรับรถไฟฟ้า' },
        { q: 'ถ้าไม่ทำ PM มีผลอะไรบ้าง?', a: 'เสี่ยงเสียฉุกเฉิน ค่าซ่อมสูงขึ้น และส่งผลต่อการรับประกัน' },
        { q: 'ทำ PM ต้องหยุดรถนานไหม?', a: 'PM ปกติใช้เวลา 2-4 ชั่วโมง สามารถนัดช่วง Shift เปลี่ยนได้' },
      ],
      en: [
        { q: 'How often is PM needed?', a: 'Every 250 hours for engine units; every 500 hours for electric units.' },
        { q: 'What happens if I skip PM?', a: 'Risk of emergency breakdown, higher repair costs, and warranty impact.' },
        { q: 'How long does PM take?', a: 'Standard PM takes 2–4 hours. We can schedule during shift changes.' },
      ],
    },
  },
  {
    slug: 'parts',
    icon: '⚙️',
    color: 'silver',
    name: { th: 'อะไหล่รถโฟล์คลิฟท์', en: 'Spare Parts' },
    tagline: { th: 'อะไหล่แท้ทุกยี่ห้อ สต็อกพร้อม จัดส่งเร็ว', en: 'Genuine parts for all brands — in stock, fast delivery' },
    description: {
      th: 'คลังอะไหล่ครอบคลุมทุกยี่ห้อและทุกรุ่น ทั้งอะไหล่แท้และอะไหล่เทียบเท่าคุณภาพสูง พร้อมบริการจัดส่งทั่วประเทศ ลด Downtime จากการรอชิ้นส่วน',
      en: 'Comprehensive parts inventory for all brands and models — genuine OEM and high-quality aftermarket options. Nationwide delivery to minimize downtime.',
    },
    features: {
      th: [
        'อะไหล่แท้ OEM ทุกยี่ห้อ',
        'อะไหล่เทียบเท่าคุณภาพสูง ราคาประหยัด',
        'สต็อกพร้อม: ฟิลเตอร์, น้ำมัน, ยาง, โซ่, ปั๊ม',
        'จัดส่งด่วนภายในวันสำหรับกรุงเทพฯ',
        'บริการหาอะไหล่หายาก',
        'ให้คำแนะนำเลือกอะไหล่ที่ถูกต้อง',
      ],
      en: [
        'Genuine OEM parts for all brands',
        'High-quality aftermarket options at lower cost',
        'Ready stock: filters, oils, tires, chains, pumps',
        'Same-day delivery within Bangkok',
        'Rare parts sourcing service',
        'Expert guidance on part selection',
      ],
    },
    brands: ['Toyota', 'Komatsu', 'Mitsubishi', 'TCM', 'Crown', 'Linde', 'Hyster', 'Yale', 'Nissan', 'BT'],
    process: {
      th: ['แจ้งรุ่นรถและอาการ', 'ทีมแนะนำชิ้นส่วนที่ถูกต้อง', 'ยืนยันราคาและสั่ง', 'จัดส่งหรือรับที่ร้าน'],
      en: ['Provide unit model & symptoms', 'Team identifies correct parts', 'Confirm price & order', 'Deliver or pick up in store'],
    },
    faq: {
      th: [
        { q: 'อะไหล่แท้กับเทียบเท่าต่างกันอย่างไร?', a: 'แท้ผลิตโดยผู้ผลิตรถ รับประกันคุณภาพเต็ม เทียบเท่าราคาถูกกว่า 20-40% คุณภาพใกล้เคียง' },
        { q: 'สั่งแล้วรอนานไหม?', a: 'อะไหล่ที่มีสต็อก จัดส่งภายในวัน อะไหล่สั่งพิเศษ 3-7 วันทำการ' },
        { q: 'ถ้าไม่รู้ชื่ออะไหล่ทำอย่างไร?', a: 'ส่งรูปหรือเบอร์รุ่นรถมา ทีมเราหาให้ได้' },
      ],
      en: [
        { q: 'OEM vs aftermarket — what is the difference?', a: 'OEM is made by the manufacturer with full quality guarantee. Aftermarket is 20–40% cheaper with similar performance.' },
        { q: 'How long does delivery take?', a: 'In-stock parts ship same day. Special-order parts: 3–7 business days.' },
        { q: "What if I don't know the part name?", a: 'Send us a photo or your unit model number and we will identify it.' },
      ],
    },
  },
  {
    slug: 'battery',
    icon: '🔋',
    color: 'teal',
    name: { th: 'แบตเตอรี่โฟล์คลิฟท์', en: 'Forklift Batteries' },
    tagline: { th: 'ตะกั่ว-กรด และลิเธียม พร้อมบริการเปลี่ยนและดูแล', en: 'Lead-acid & lithium — supply, swap & maintenance' },
    description: {
      th: 'จำหน่ายและบริการแบตเตอรี่รถโฟล์คลิฟท์ไฟฟ้าครบวงจร ทั้งแบตเตอรี่ตะกั่ว-กรด (PzS) และลิเธียมไออน พร้อมบริการติดตั้ง ชาร์จ และตรวจสอบสุขภาพแบตเตอรี่',
      en: 'Complete electric forklift battery service — lead-acid (PzS) and lithium-ion supply, installation, charging station setup, and battery health checks.',
    },
    features: {
      th: [
        'แบตเตอรี่ตะกั่ว-กรด PzS อายุ 5-7 ปี',
        'แบตเตอรี่ลิเธียม อายุ 8-10 ปี ชาร์จเร็ว',
        'บริการเปลี่ยนแบตเตอรี่ถึงหน้างาน',
        'ติดตั้งสถานีชาร์จ (Charging Station)',
        'ตรวจสุขภาพแบตเตอรี่และรายงาน',
        'รับซ่อมและ Recondition แบตเตอรี่',
      ],
      en: [
        'Lead-acid PzS batteries — 5–7 year lifespan',
        'Lithium-ion — 8–10 years, fast charging',
        'On-site battery swap service',
        'Charging station installation',
        'Battery health check & report',
        'Battery repair and reconditioning',
      ],
    },
    comparison: [
      { spec: 'อายุการใช้งาน', specEn: 'Lifespan', leadAcid: '5–7 ปี', lithium: '8–10 ปี' },
      { spec: 'เวลาชาร์จ', specEn: 'Charge time', leadAcid: '8–10 ชั่วโมง', lithium: '1–2 ชั่วโมง' },
      { spec: 'น้ำหนัก', specEn: 'Weight', leadAcid: 'หนัก', lithium: 'เบากว่า 40%' },
      { spec: 'การดูแล', specEn: 'Maintenance', leadAcid: 'ต้องเติมน้ำ', lithium: 'ไม่ต้องดูแล' },
      { spec: 'ราคา', specEn: 'Price', leadAcid: 'ถูกกว่า', lithium: 'สูงกว่า 2–3 เท่า' },
    ],
    process: {
      th: ['ประเมินความต้องการ', 'เลือกประเภทแบตเตอรี่', 'สั่งและจัดส่ง', 'ติดตั้งและทดสอบ', 'ฝึกการดูแลรักษา'],
      en: ['Assess requirements', 'Select battery type', 'Order & delivery', 'Install & test', 'Maintenance training'],
    },
    faq: {
      th: [
        { q: 'ควรเลือกตะกั่ว-กรด หรือลิเธียม?', a: 'ตะกั่ว-กรดเหมาะสำหรับงบจำกัด ลิเธียมเหมาะงาน Multi-shift ที่ต้องชาร์จเร็ว' },
        { q: 'แบตเตอรี่หมดอายุทำอย่างไร?', a: 'รับรีไซเคิลตามมาตรฐาน กฎหมายกำกับดูแลกากอุตสาหกรรม' },
        { q: 'ต้องเปลี่ยนแบตเตอรี่บ่อยไหม?', a: 'ดูแลรักษาดีอยู่ได้ 5-7 ปี ตรวจสุขภาพทุกปีเพื่อยืดอายุ' },
      ],
      en: [
        { q: 'Lead-acid or lithium — which to choose?', a: 'Lead-acid for budget-conscious operations; lithium for multi-shift facilities needing fast charging.' },
        { q: 'What happens at end-of-life?', a: 'We handle compliant recycling per industrial waste regulations.' },
        { q: 'How often do batteries need replacing?', a: 'With proper care, 5–7 years. Annual health checks extend lifespan.' },
      ],
    },
  },
]

export const getServiceBySlug = (slug) => services.find(s => s.slug === slug)