// ─────────────────────────────────────────────────────────────────────────────
// Apex Lift — Mock Product Data
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORIES = {
  ENGINE_CB:  'engine_cb',
  ELECTRIC_CB:'electric_cb',
  REACH_TRUCK:'reach_truck',
  ORDER_PICKER:'order_picker',
  HAND_LIFT:  'hand_lift',
  TOW_TRACTOR:'tow_tractor',
  BATTERY:    'battery',
}

export const POWER_TYPES = {
  DIESEL:   'diesel',
  LPG:      'lpg',
  ELECTRIC: 'electric',
  MANUAL:   'manual',
}

export const CONDITIONS = {
  NEW:    'new',
  USED:   'used',
  RENTAL: 'rental',
}

export const MAST_TYPES = {
  SIMPLEX:  '1-stage',
  DUPLEX:   '2-stage',
  TRIPLEX:  '3-stage',
  QUAD:     '4-stage',
}

export const TIRE_TYPES = {
  CUSHION:          'cushion',
  PNEUMATIC:        'pneumatic',
  SOLID_PNEUMATIC:  'solid_pneumatic',
  POLYURETHANE:     'polyurethane',
}

// ─────────────────────────────────────────────────────────────────────────────
// Category metadata (name_th, name_en, icon)
// ─────────────────────────────────────────────────────────────────────────────
export const categoryMeta = {
  [CATEGORIES.ENGINE_CB]:   { th: 'โฟล์คลิฟท์เครื่องยนต์',        en: 'Engine Forklift',        icon: '🏭' },
  [CATEGORIES.ELECTRIC_CB]: { th: 'โฟล์คลิฟท์ไฟฟ้า',              en: 'Electric Forklift',      icon: '⚡' },
  [CATEGORIES.REACH_TRUCK]: { th: 'Reach Truck / ยืนขับ',          en: 'Reach Truck',            icon: '📦' },
  [CATEGORIES.ORDER_PICKER]:{ th: 'Order Picker',                   en: 'Order Picker',           icon: '🛒' },
  [CATEGORIES.HAND_LIFT]:   { th: 'Hand Lift / Pallet Truck',       en: 'Hand Lift / Pallet',     icon: '🔧' },
  [CATEGORIES.TOW_TRACTOR]: { th: 'รถลากจูง (Tow Tractor)',         en: 'Tow Tractor',            icon: '🚛' },
  [CATEGORIES.BATTERY]:     { th: 'แบตเตอรี่ & อะไหล่',             en: 'Battery & Parts',        icon: '🔋' },
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: picsum placeholder with consistent seed per product
// ─────────────────────────────────────────────────────────────────────────────
const img = (seed, w = 800, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

// ─────────────────────────────────────────────────────────────────────────────
// Products
// ─────────────────────────────────────────────────────────────────────────────
export const products = [
  // ── 1. Engine CB Diesel ────────────────────────────────────────────────────
  {
    id: 'APX-CB-30-D-001',
    sku: 'APX-CB-30-D-001',
    category: CATEGORIES.ENGINE_CB,
    brand: 'Toyota',
    model: '8FD30',
    condition: CONDITIONS.NEW,
    year: 2024,
    name: {
      th: 'โฟล์คลิฟท์ดีเซล Toyota 8FD30 (3 ตัน)',
      en: 'Toyota 8FD30 Diesel Forklift (3-Ton)',
    },
    price: 980000,
    images: [img('diesel-forklift-1'), img('diesel-forklift-2'), img('diesel-forklift-3')],
    specs: {
      liftingCapacityKg: 3000,
      loadCenterMm: 500,
      liftHeightMm: 4500,
      mastType: MAST_TYPES.TRIPLEX,
      mastCollapsedHeightMm: 2100,
      freeLiftMm: 150,
      powerType: POWER_TYPES.DIESEL,
      tireType: TIRE_TYPES.PNEUMATIC,
      driveWheels: '4-wheel',
      aisleWidthMm: 3800,
      turningRadiusMm: 2300,
      travelSpeedKmh: 19,
      gradeabilityPct: 18,
      overallLengthMm: 4000,
      overallWidthMm: 1430,
      weightKg: 4650,
      environment: ['indoor', 'outdoor'],
      coldRoomRated: false,
      nonMarkingTire: false,
      exProof: false,
    },
    features: {
      th: ['เครื่องยนต์ดีเซล Toyoda 4Y ประหยัดน้ำมัน', 'ระบบ SAS (System of Active Stability)', 'เบาะนั่งปรับได้ พร้อม Suspension', 'เหมาะงาน Loading Dock และ Outdoor'],
      en: ['Toyoda 4Y diesel engine — fuel efficient', 'SAS (System of Active Stability)', 'Adjustable seat with suspension', 'Ideal for loading docks & outdoor yards'],
    },
    suitableFor: {
      th: ['ท่าเรือ / ยาร์ด', 'โรงงานอุตสาหกรรม', 'Loading Dock', 'วัสดุก่อสร้าง'],
      en: ['Port / Yard', 'Industrial factory', 'Loading dock', 'Construction materials'],
    },
    isFeatured: true,
    isAvailable: true,
  },

  // ── 2. Engine CB LPG ───────────────────────────────────────────────────────
  {
    id: 'APX-CB-20-L-002',
    sku: 'APX-CB-20-L-002',
    category: CATEGORIES.ENGINE_CB,
    brand: 'Komatsu',
    model: 'FG20T-17',
    condition: CONDITIONS.NEW,
    year: 2024,
    name: {
      th: 'โฟล์คลิฟท์ LPG Komatsu FG20T (2 ตัน)',
      en: 'Komatsu FG20T LPG Forklift (2-Ton)',
    },
    price: 720000,
    images: [img('lpg-forklift-1'), img('lpg-forklift-2')],
    specs: {
      liftingCapacityKg: 2000,
      loadCenterMm: 500,
      liftHeightMm: 3000,
      mastType: MAST_TYPES.TRIPLEX,
      mastCollapsedHeightMm: 1985,
      freeLiftMm: 150,
      powerType: POWER_TYPES.LPG,
      tireType: TIRE_TYPES.CUSHION,
      driveWheels: '4-wheel',
      aisleWidthMm: 3600,
      turningRadiusMm: 2100,
      travelSpeedKmh: 17,
      gradeabilityPct: 15,
      overallLengthMm: 3680,
      overallWidthMm: 1070,
      weightKg: 3200,
      environment: ['indoor', 'outdoor'],
      coldRoomRated: false,
      nonMarkingTire: false,
      exProof: false,
    },
    features: {
      th: ['LPG สะอาดกว่าดีเซล เหมาะโรงงานมีหลังคา', 'เครื่อง 4-stroke ทนทาน', 'ระบบเกียร์อัตโนมัติ', 'ราคาประหยัดกว่า Electric'],
      en: ['LPG — cleaner than diesel, ideal for covered factories', 'Durable 4-stroke engine', 'Automatic transmission', 'More affordable than electric'],
    },
    suitableFor: {
      th: ['โรงงานทั่วไป', 'โกดังมีหลังคา', 'อาหารและเครื่องดื่ม', 'Loading & Unloading'],
      en: ['General factory', 'Covered warehouse', 'Food & beverage', 'Loading & unloading'],
    },
    isFeatured: false,
    isAvailable: true,
  },

  // ── 3. Electric CB ─────────────────────────────────────────────────────────
  {
    id: 'APX-CB-15-E-003',
    sku: 'APX-CB-15-E-003',
    category: CATEGORIES.ELECTRIC_CB,
    brand: 'Mitsubishi',
    model: 'FB15NT',
    condition: CONDITIONS.NEW,
    year: 2024,
    name: {
      th: 'โฟล์คลิฟท์ไฟฟ้า Mitsubishi FB15NT (1.5 ตัน)',
      en: 'Mitsubishi FB15NT Electric Forklift (1.5-Ton)',
    },
    price: 650000,
    images: [img('electric-forklift-1'), img('electric-forklift-2'), img('electric-forklift-3')],
    specs: {
      liftingCapacityKg: 1500,
      loadCenterMm: 500,
      liftHeightMm: 4500,
      mastType: MAST_TYPES.TRIPLEX,
      mastCollapsedHeightMm: 2080,
      freeLiftMm: 155,
      powerType: POWER_TYPES.ELECTRIC,
      batteryVoltage: 48,
      batteryCapacityAh: 500,
      tireType: TIRE_TYPES.CUSHION,
      driveWheels: '3-wheel',
      aisleWidthMm: 3200,
      turningRadiusMm: 1500,
      travelSpeedKmh: 14,
      gradeabilityPct: 12,
      overallLengthMm: 3210,
      overallWidthMm: 1050,
      weightKg: 2700,
      environment: ['indoor'],
      coldRoomRated: true,
      nonMarkingTire: false,
      exProof: false,
    },
    features: {
      th: ['Zero Emission เหมาะห้องเย็นและ Food Grade', '3-Wheel คล่องตัวในพื้นที่แคบ', 'แบตเตอรี่ 48V 500Ah อึดทน', 'ระบบ Regenerative Braking ประหยัดพลังงาน'],
      en: ['Zero emission — ideal for cold rooms & food grade', '3-wheel design for tight spaces', '48V 500Ah battery for long shifts', 'Regenerative braking for energy savings'],
    },
    suitableFor: {
      th: ['ห้องเย็น', 'โรงงานอาหาร / GMP', 'โกดังในร่ม', 'ห้างสรรพสินค้า / Retail'],
      en: ['Cold storage', 'Food factory / GMP', 'Indoor warehouse', 'Retail / supermarket'],
    },
    isFeatured: true,
    isAvailable: true,
  },

  // ── 4. Electric CB Heavy ───────────────────────────────────────────────────
  {
    id: 'APX-CB-30-E-004',
    sku: 'APX-CB-30-E-004',
    category: CATEGORIES.ELECTRIC_CB,
    brand: 'TCM',
    model: 'FHB30-7',
    condition: CONDITIONS.NEW,
    year: 2024,
    name: {
      th: 'โฟล์คลิฟท์ไฟฟ้า TCM FHB30 (3 ตัน)',
      en: 'TCM FHB30 Electric Forklift (3-Ton)',
    },
    price: 1150000,
    images: [img('electric-heavy-1'), img('electric-heavy-2')],
    specs: {
      liftingCapacityKg: 3000,
      loadCenterMm: 500,
      liftHeightMm: 5000,
      mastType: MAST_TYPES.TRIPLEX,
      mastCollapsedHeightMm: 2240,
      freeLiftMm: 160,
      powerType: POWER_TYPES.ELECTRIC,
      batteryVoltage: 80,
      batteryCapacityAh: 700,
      tireType: TIRE_TYPES.CUSHION,
      driveWheels: '4-wheel',
      aisleWidthMm: 3800,
      turningRadiusMm: 2280,
      travelSpeedKmh: 16,
      gradeabilityPct: 13,
      overallLengthMm: 3895,
      overallWidthMm: 1300,
      weightKg: 5100,
      environment: ['indoor'],
      coldRoomRated: false,
      nonMarkingTire: false,
      exProof: false,
    },
    features: {
      th: ['Electric 3 ตัน กำลังสูง', 'แบตเตอรี่ 80V รองรับ Multi-shift', 'ระบบควบคุมอัจฉริยะ ประหยัดพลังงาน', 'เหมาะงานหนักในโกดังไม่มีควัน'],
      en: ['3-ton electric with high output', '80V battery for multi-shift operation', 'Smart controller for energy efficiency', 'Heavy-duty indoor warehouse work'],
    },
    suitableFor: {
      th: ['โกดังขนาดใหญ่', 'การผลิตที่ต้องการ Zero Emission', 'Distribution Center', 'สินค้าอุตสาหกรรม'],
      en: ['Large warehouse', 'Zero-emission manufacturing', 'Distribution center', 'Industrial goods'],
    },
    isFeatured: false,
    isAvailable: true,
  },

  // ── 5. Reach Truck ─────────────────────────────────────────────────────────
  {
    id: 'APX-RT-16-E-005',
    sku: 'APX-RT-16-E-005',
    category: CATEGORIES.REACH_TRUCK,
    brand: 'Crown',
    model: 'RR 5700',
    condition: CONDITIONS.NEW,
    year: 2024,
    name: {
      th: 'Reach Truck Crown RR5700 (1.6 ตัน)',
      en: 'Crown RR5700 Reach Truck (1.6-Ton)',
    },
    price: 890000,
    images: [img('reach-truck-1'), img('reach-truck-2'), img('reach-truck-3')],
    specs: {
      liftingCapacityKg: 1600,
      loadCenterMm: 500,
      liftHeightMm: 9600,
      mastType: MAST_TYPES.TRIPLEX,
      mastCollapsedHeightMm: 2210,
      freeLiftMm: 1020,
      powerType: POWER_TYPES.ELECTRIC,
      batteryVoltage: 48,
      batteryCapacityAh: 690,
      tireType: TIRE_TYPES.POLYURETHANE,
      driveWheels: '3-wheel',
      aisleWidthMm: 2740,
      turningRadiusMm: 1560,
      travelSpeedKmh: 12,
      gradeabilityPct: 8,
      overallLengthMm: 2780,
      overallWidthMm: 1150,
      weightKg: 3200,
      environment: ['indoor'],
      coldRoomRated: true,
      nonMarkingTire: true,
      exProof: false,
    },
    features: {
      th: ['ยกสูงได้ถึง 9.6 เมตร', 'ทางเดินแคบเพียง 2.74 เมตร', 'Free Lift 1020 มม. เหมาะเข้า Container', 'ระบบ PERC (Crown Proprietary) ประหยัดพลังงาน'],
      en: ['Lift height up to 9.6 meters', 'Works in 2.74m aisles', '1020mm free lift for container entry', 'PERC energy recovery system'],
    },
    suitableFor: {
      th: ['High-Bay Warehouse', 'โกดังทางเดินแคบ', 'ห้องเย็น High-Bay', 'E-commerce Fulfillment'],
      en: ['High-bay warehouse', 'Narrow aisle warehouse', 'Cold room high-bay', 'E-commerce fulfillment'],
    },
    isFeatured: true,
    isAvailable: true,
  },

  // ── 6. Order Picker ────────────────────────────────────────────────────────
  {
    id: 'APX-OP-10-E-006',
    sku: 'APX-OP-10-E-006',
    category: CATEGORIES.ORDER_PICKER,
    brand: 'Crown',
    model: 'PC 4500',
    condition: CONDITIONS.NEW,
    year: 2024,
    name: {
      th: 'Order Picker Crown PC4500 (1 ตัน)',
      en: 'Crown PC4500 Order Picker (1-Ton)',
    },
    price: 750000,
    images: [img('order-picker-1'), img('order-picker-2')],
    specs: {
      liftingCapacityKg: 1000,
      loadCenterMm: 600,
      liftHeightMm: 9000,
      mastType: MAST_TYPES.TRIPLEX,
      mastCollapsedHeightMm: 2400,
      freeLiftMm: 0,
      powerType: POWER_TYPES.ELECTRIC,
      batteryVoltage: 24,
      batteryCapacityAh: 420,
      tireType: TIRE_TYPES.POLYURETHANE,
      driveWheels: '3-wheel',
      aisleWidthMm: 1700,
      turningRadiusMm: 1100,
      travelSpeedKmh: 10,
      gradeabilityPct: 6,
      overallLengthMm: 2320,
      overallWidthMm: 820,
      weightKg: 2100,
      environment: ['indoor'],
      coldRoomRated: false,
      nonMarkingTire: true,
      exProof: false,
    },
    features: {
      th: ['ผู้ขับยกขึ้นพร้อมสินค้า เก็บทีละชิ้นได้', 'ทางเดินแคบเพียง 1.7 เมตร', 'Platform เปิดกว้าง ทำงานสะดวก', 'เหมาะ E-commerce และ Piece Picking'],
      en: ['Operator elevates with load for piece picking', 'Operates in 1.7m aisles', 'Open platform for easy access', 'Ideal for e-commerce & piece picking'],
    },
    suitableFor: {
      th: ['E-commerce Fulfillment', 'ชั้นวางสูง / High-Bay', 'โกดัง SKU หลากหลาย', 'Retail Distribution'],
      en: ['E-commerce fulfillment', 'High-bay racking', 'High-SKU warehouse', 'Retail distribution'],
    },
    isFeatured: false,
    isAvailable: true,
  },

  // ── 7. Electric Walkie Stacker ─────────────────────────────────────────────
  {
    id: 'APX-HL-10-E-007',
    sku: 'APX-HL-10-E-007',
    category: CATEGORIES.HAND_LIFT,
    brand: 'Apex Lift',
    model: 'WS-1000',
    condition: CONDITIONS.NEW,
    year: 2024,
    name: {
      th: 'Electric Walkie Stacker Apex WS-1000 (1 ตัน)',
      en: 'Apex WS-1000 Electric Walkie Stacker (1-Ton)',
    },
    price: 185000,
    images: [img('walkie-stacker-1'), img('walkie-stacker-2')],
    specs: {
      liftingCapacityKg: 1000,
      loadCenterMm: 500,
      liftHeightMm: 3000,
      mastType: MAST_TYPES.DUPLEX,
      mastCollapsedHeightMm: 1980,
      freeLiftMm: 100,
      powerType: POWER_TYPES.ELECTRIC,
      batteryVoltage: 24,
      batteryCapacityAh: 210,
      tireType: TIRE_TYPES.POLYURETHANE,
      driveWheels: '3-wheel',
      aisleWidthMm: 1800,
      turningRadiusMm: 1200,
      travelSpeedKmh: 6,
      gradeabilityPct: 5,
      overallLengthMm: 1780,
      overallWidthMm: 800,
      weightKg: 680,
      environment: ['indoor'],
      coldRoomRated: false,
      nonMarkingTire: true,
      exProof: false,
    },
    features: {
      th: ['ราคาประหยัด ลงทุนต่ำ', 'ไม่ต้องใบขับขี่พิเศษ', 'เงียบ สะอาด ไม่มีไอเสีย', 'เหมาะโกดังขนาดเล็ก-กลาง'],
      en: ['Budget-friendly, low investment', 'No special license required', 'Quiet, clean, no exhaust', 'Ideal for small-to-medium warehouses'],
    },
    suitableFor: {
      th: ['โกดังขนาดเล็ก', 'ค้าปลีก / Retail', 'ร้านวัสดุก่อสร้าง', 'สินค้า FMCG'],
      en: ['Small warehouse', 'Retail', 'Hardware store', 'FMCG goods'],
    },
    isFeatured: false,
    isAvailable: true,
  },

  // ── 8. Manual Hand Pallet ──────────────────────────────────────────────────
  {
    id: 'APX-HP-25-M-008',
    sku: 'APX-HP-25-M-008',
    category: CATEGORIES.HAND_LIFT,
    brand: 'Apex Lift',
    model: 'HP-2500',
    condition: CONDITIONS.NEW,
    year: 2024,
    name: {
      th: 'Hand Pallet Truck Apex HP-2500 (2.5 ตัน)',
      en: 'Apex HP-2500 Manual Hand Pallet (2.5-Ton)',
    },
    price: 8500,
    images: [img('hand-pallet-1'), img('hand-pallet-2')],
    specs: {
      liftingCapacityKg: 2500,
      loadCenterMm: 600,
      liftHeightMm: 200,
      mastType: null,
      mastCollapsedHeightMm: null,
      freeLiftMm: null,
      powerType: POWER_TYPES.MANUAL,
      tireType: TIRE_TYPES.POLYURETHANE,
      driveWheels: 'manual',
      aisleWidthMm: 1200,
      turningRadiusMm: 900,
      travelSpeedKmh: null,
      gradeabilityPct: 0,
      overallLengthMm: 1540,
      overallWidthMm: 540,
      weightKg: 65,
      environment: ['indoor'],
      coldRoomRated: false,
      nonMarkingTire: true,
      exProof: false,
    },
    features: {
      th: ['ราคาถูกที่สุด ลงทุนน้อย', 'ไม่ต้องชาร์จหรือเติมน้ำมัน', 'ซ่อมบำรุงง่ายมาก', 'น้ำหนักเบา พกพาง่าย'],
      en: ['Lowest cost, minimal investment', 'No charging or fuel needed', 'Extremely easy to maintain', 'Lightweight and portable'],
    },
    suitableFor: {
      th: ['Loading Dock', 'เคลื่อนย้ายระยะสั้น', 'ร้านค้าปลีก', 'สต็อกสินค้าขนาดเล็ก'],
      en: ['Loading dock', 'Short-distance transport', 'Retail store', 'Small stock area'],
    },
    isFeatured: false,
    isAvailable: true,
  },

  // ── 9. Tow Tractor ─────────────────────────────────────────────────────────
  {
    id: 'APX-TT-30-E-009',
    sku: 'APX-TT-30-E-009',
    category: CATEGORIES.TOW_TRACTOR,
    brand: 'Toyota',
    model: 'CBT30',
    condition: CONDITIONS.NEW,
    year: 2024,
    name: {
      th: 'Tow Tractor Toyota CBT30 (3 ตัน ลากจูง)',
      en: 'Toyota CBT30 Electric Tow Tractor (3-Ton Tow)',
    },
    price: 520000,
    images: [img('tow-tractor-1'), img('tow-tractor-2')],
    specs: {
      liftingCapacityKg: 0,
      loadCenterMm: null,
      liftHeightMm: 0,
      mastType: null,
      mastCollapsedHeightMm: null,
      freeLiftMm: null,
      powerType: POWER_TYPES.ELECTRIC,
      batteryVoltage: 48,
      batteryCapacityAh: 330,
      tireType: TIRE_TYPES.CUSHION,
      driveWheels: '3-wheel',
      aisleWidthMm: 2500,
      turningRadiusMm: 1650,
      travelSpeedKmh: 15,
      gradeabilityPct: 10,
      overallLengthMm: 2820,
      overallWidthMm: 1040,
      weightKg: 2200,
      towingCapacityKg: 3000,
      environment: ['indoor'],
      coldRoomRated: false,
      nonMarkingTire: false,
      exProof: false,
    },
    features: {
      th: ['ลากจูงสูงสุด 3,000 กก.', 'เงียบ Zero Emission', 'เหมาะระบบ Milk Run ในโรงงาน', 'บังคับง่าย ผู้ขับฝึกได้เร็ว'],
      en: ['Towing capacity up to 3,000 kg', 'Quiet zero-emission operation', 'Ideal for factory milk-run systems', 'Easy to operate, fast training'],
    },
    suitableFor: {
      th: ['โรงงาน Assembly Line', 'สนามบิน (ลากสัมภาระ)', 'โกดังขนาดใหญ่', 'Logistics Hub'],
      en: ['Assembly line factory', 'Airport baggage towing', 'Large warehouse', 'Logistics hub'],
    },
    isFeatured: false,
    isAvailable: true,
  },

  // ── 10. Used Forklift ──────────────────────────────────────────────────────
  {
    id: 'APX-CB-20-D-U10',
    sku: 'APX-CB-20-D-U10',
    category: CATEGORIES.ENGINE_CB,
    brand: 'Komatsu',
    model: 'FD20T-17',
    condition: CONDITIONS.USED,
    year: 2019,
    operatingHours: 4800,
    name: {
      th: 'โฟล์คลิฟท์ดีเซล Komatsu FD20 มือสอง (2 ตัน)',
      en: 'Komatsu FD20 Used Diesel Forklift (2-Ton)',
    },
    price: 320000,
    images: [img('used-forklift-1'), img('used-forklift-2'), img('used-forklift-3')],
    specs: {
      liftingCapacityKg: 2000,
      loadCenterMm: 500,
      liftHeightMm: 3000,
      mastType: MAST_TYPES.TRIPLEX,
      mastCollapsedHeightMm: 1980,
      freeLiftMm: 150,
      powerType: POWER_TYPES.DIESEL,
      tireType: TIRE_TYPES.PNEUMATIC,
      driveWheels: '4-wheel',
      aisleWidthMm: 3600,
      turningRadiusMm: 2150,
      travelSpeedKmh: 18,
      gradeabilityPct: 16,
      overallLengthMm: 3720,
      overallWidthMm: 1070,
      weightKg: 3500,
      environment: ['indoor', 'outdoor'],
      coldRoomRated: false,
      nonMarkingTire: false,
      exProof: false,
    },
    features: {
      th: ['ผ่านการตรวจสอบ 100 จุด', 'รับประกันหลังการขาย 3 เดือน', 'เปลี่ยนยางใหม่ก่อนส่งมอบ', 'ราคาประหยัด 60% จากรถใหม่'],
      en: ['100-point inspection certified', '3-month after-sale warranty', 'New tires before delivery', 'Save 60% vs new unit'],
    },
    suitableFor: {
      th: ['งบจำกัด', 'ธุรกิจ SME', 'งานที่ใช้งานไม่หนักมาก', 'ทดลองใช้ก่อนซื้อใหม่'],
      en: ['Budget-conscious buyer', 'SME business', 'Light-to-medium duty work', 'Try before buying new'],
    },
    isFeatured: true,
    isAvailable: true,
  },

  // ── 11. Rental Forklift ────────────────────────────────────────────────────
  {
    id: 'APX-CB-15-E-R11',
    sku: 'APX-CB-15-E-R11',
    category: CATEGORIES.ELECTRIC_CB,
    brand: 'Mitsubishi',
    model: 'FB15KT',
    condition: CONDITIONS.RENTAL,
    year: 2022,
    operatingHours: 2100,
    name: {
      th: 'เช่าโฟล์คลิฟท์ไฟฟ้า Mitsubishi (1.5 ตัน) รายเดือน',
      en: 'Rental Electric Forklift Mitsubishi 1.5T (Monthly)',
    },
    price: null,
    rentalMonthly: 14500,
    images: [img('rental-forklift-1'), img('rental-forklift-2')],
    specs: {
      liftingCapacityKg: 1500,
      loadCenterMm: 500,
      liftHeightMm: 3000,
      mastType: MAST_TYPES.TRIPLEX,
      mastCollapsedHeightMm: 2050,
      freeLiftMm: 150,
      powerType: POWER_TYPES.ELECTRIC,
      batteryVoltage: 48,
      batteryCapacityAh: 420,
      tireType: TIRE_TYPES.CUSHION,
      driveWheels: '4-wheel',
      aisleWidthMm: 3400,
      turningRadiusMm: 2050,
      travelSpeedKmh: 14,
      gradeabilityPct: 12,
      overallLengthMm: 3350,
      overallWidthMm: 1070,
      weightKg: 2850,
      environment: ['indoor'],
      coldRoomRated: false,
      nonMarkingTire: false,
      exProof: false,
    },
    features: {
      th: ['ไม่ต้องลงทุนสูง เริ่มใช้ได้เลย', 'PM ฟรีตลอดสัญญา', 'ประกันอุบัติเหตุรวม', 'ขยายหรือลดจำนวนได้ตามฤดูกาล'],
      en: ['No large upfront investment', 'Free PM throughout contract', 'Accident insurance included', 'Scalable fleet by season'],
    },
    suitableFor: {
      th: ['ธุรกิจที่ต้องการความยืดหยุ่น', 'Seasonal Peak', 'ทดลองก่อนซื้อ', 'งบ OPEX ไม่ใช่ CAPEX'],
      en: ['Businesses needing flexibility', 'Seasonal peaks', 'Try before you buy', 'OPEX vs CAPEX preference'],
    },
    isFeatured: false,
    isAvailable: true,
  },

  // ── 12. Battery & Parts ────────────────────────────────────────────────────
  {
    id: 'APX-BAT-48V-500-012',
    sku: 'APX-BAT-48V-500-012',
    category: CATEGORIES.BATTERY,
    brand: 'Apex Lift',
    model: 'PzS-500Ah',
    condition: CONDITIONS.NEW,
    year: 2024,
    name: {
      th: 'แบตเตอรี่ตะกั่วกรด 48V 500Ah สำหรับโฟล์คลิฟท์ไฟฟ้า',
      en: '48V 500Ah Lead-Acid Traction Battery for Electric Forklift',
    },
    price: 85000,
    images: [img('battery-1'), img('battery-2')],
    specs: {
      liftingCapacityKg: null,
      loadCenterMm: null,
      liftHeightMm: null,
      mastType: null,
      mastCollapsedHeightMm: null,
      freeLiftMm: null,
      powerType: null,
      batteryVoltage: 48,
      batteryCapacityAh: 500,
      tireType: null,
      driveWheels: null,
      aisleWidthMm: null,
      turningRadiusMm: null,
      travelSpeedKmh: null,
      gradeabilityPct: null,
      overallLengthMm: null,
      overallWidthMm: null,
      weightKg: 820,
      environment: [],
      coldRoomRated: false,
      nonMarkingTire: false,
      exProof: false,
    },
    features: {
      th: ['เซลล์ PzS คุณภาพสูง อายุ 5-7 ปี', 'รองรับโฟล์คลิฟท์ไฟฟ้าทุกยี่ห้อ', 'มีบริการติดตั้งและเทรน Water Check', 'รับประกัน 1 ปี'],
      en: ['PzS cells, 5-7 year lifespan', 'Compatible with all electric forklift brands', 'Installation & water check training included', '1-year warranty'],
    },
    suitableFor: {
      th: ['โฟล์คลิฟท์ไฟฟ้า 1-3 ตัน', 'Reach Truck', 'Walkie Stacker', 'Order Picker'],
      en: ['1-3 ton electric forklifts', 'Reach trucks', 'Walkie stackers', 'Order pickers'],
    },
    isFeatured: false,
    isAvailable: true,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
export const getProductById = (id) => products.find(p => p.id === id)

export const getProductsByCategory = (cat) =>
  cat ? products.filter(p => p.category === cat) : products

export const filterProducts = ({ category, condition, powerType, minCapacity, maxCapacity, mastType }) => {
  return products.filter(p => {
    if (category && p.category !== category) return false
    if (condition && p.condition !== condition) return false
    if (powerType && p.specs.powerType !== powerType) return false
    if (minCapacity && p.specs.liftingCapacityKg < minCapacity) return false
    if (maxCapacity && p.specs.liftingCapacityKg > maxCapacity) return false
    if (mastType && p.specs.mastType !== mastType) return false
    return true
  })
}
