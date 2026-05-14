import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { brands } from '../data/mockData'

const certs = [
  { icon: '🏆', title: { th: 'Toyota Authorized Dealer', en: 'Toyota Authorized Dealer' } },
  { icon: '✅', title: { th: 'ISO 9001:2015', en: 'ISO 9001:2015' } },
  { icon: '🔰', title: { th: 'ใบอนุญาตนำเข้า กระทรวงพาณิชย์', en: 'Import License — Ministry of Commerce' } },
  { icon: '👷', title: { th: 'ช่างผ่านการรับรอง OEM', en: 'OEM-Certified Technicians' } },
  { icon: '🛡️', title: { th: 'ประกันภัยธุรกิจ', en: 'Business Insurance' } },
  { icon: '📜', title: { th: 'ทะเบียนพาณิชย์ถูกต้อง', en: 'Registered Business Entity' } },
]

const team = [
  { name: 'คุณสมชาย วิศวกร', nameEn: 'Somchai Wisawakorn', role: { th: 'หัวหน้าช่างอาวุโส', en: 'Senior Lead Technician' }, exp: { th: '18 ปีประสบการณ์', en: '18 years experience' }, cert: 'Toyota Certified' },
  { name: 'คุณปรีชา มั่นคง', nameEn: 'Preecha Mankong',   role: { th: 'ช่างไฟฟ้าและแบตเตอรี่', en: 'Electrical & Battery Specialist' }, exp: { th: '12 ปีประสบการณ์', en: '12 years experience' }, cert: 'Crown Certified' },
  { name: 'คุณนภา ใจดี',    nameEn: 'Napa Jaidee',       role: { th: 'ผู้จัดการฝ่ายขาย', en: 'Sales Manager' }, exp: { th: '10 ปีประสบการณ์', en: '10 years experience' }, cert: 'Komatsu Certified' },
  { name: 'คุณวิชัย พร้อม', nameEn: 'Wichai Prom',       role: { th: 'ช่างประจำหน้างาน', en: 'Field Technician' }, exp: { th: '8 ปีประสบการณ์', en: '8 years experience' }, cert: 'Mitsubishi Certified' },
]

const projects = [
  { client: 'บริษัทโลจิสติกส์ชั้นนำ', clientEn: 'Leading Logistics Co.', desc: { th: 'จัดหารถโฟล์คลิฟท์ไฟฟ้า 12 คัน พร้อมสัญญา PM 3 ปี', en: '12 electric forklifts + 3-year PM contract' }, year: '2023' },
  { client: 'โรงงานอาหารแช่แข็ง', clientEn: 'Frozen Food Factory', desc: { th: 'Reach Truck สำหรับห้องเย็น -18°C จำนวน 5 คัน', en: '5 cold-room rated reach trucks for -18°C operation' }, year: '2023' },
  { client: 'ท่าเรือสินค้า', clientEn: 'Cargo Port Terminal', desc: { th: 'Diesel Counterbalance 10 ตัน สำหรับงาน Port 8 คัน', en: '8 units of 10-ton diesel counterbalance for port operations' }, year: '2022' },
  { client: 'ศูนย์กระจายสินค้า E-commerce', clientEn: 'E-commerce Distribution Center', desc: { th: 'Order Picker + Reach Truck รวม 20 คัน ระบบ Fleet Management', en: '20 units Order Picker + Reach Truck with fleet management' }, year: '2022' },
  { client: 'โรงงานยานยนต์', clientEn: 'Automotive Parts Factory', desc: { th: 'Tow Tractor ระบบ Milk Run 6 คัน + PM Contract', en: '6 tow tractors for milk-run + PM contract' }, year: '2021' },
  { client: 'คลังสินค้าห้องเย็น', clientEn: 'Cold Chain Warehouse', desc: { th: 'ออกแบบระบบ Forklift Fleet สำหรับ Cold Chain ครบวงจร', en: 'Full cold-chain forklift fleet system design & supply' }, year: '2021' },
]

export default function AboutPage() {
  const { t, lang } = useLanguage()
  const a = t.about

  const stats = [
    { val: a.stat1Val, lab: a.stat1Lab },
    { val: a.stat2Val, lab: a.stat2Lab },
    { val: a.stat3Val, lab: a.stat3Lab },
    { val: a.stat4Val, lab: a.stat4Lab },
    { val: a.stat5Val, lab: a.stat5Lab },
    { val: a.stat6Val, lab: a.stat6Lab },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">

      {/* Hero */}
      <div className="bg-industrial-900 border-b border-industrial-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-gold-500" />
            <span className="font-heading text-gold-500 text-xs tracking-[0.3em] uppercase">Apex Lift</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide mb-3">{a.pageTitle}</h1>
          <p className="font-body text-industrial-400 text-lg max-w-2xl">{a.pageSub}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">

        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-gold-500" />
              <span className="font-heading text-gold-600 text-xs tracking-[0.3em] uppercase">{a.missionTitle}</span>
            </div>
            <p className="font-body text-gray-600 text-lg leading-relaxed">{a.mission}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🤝', th: 'Partner ระยะยาว', en: 'Long-term partner' },
              { icon: '⚡', th: 'ตอบสนองรวดเร็ว', en: 'Fast response' },
              { icon: '🔧', th: 'ช่างผู้เชี่ยวชาญ', en: 'Expert technicians' },
              { icon: '📦', th: 'อะไหล่พร้อมสต็อก', en: 'Parts always ready' },
            ].map((v, i) => (
              <div key={i} className="bg-white border border-gray-200 p-5 flex items-start gap-3">
                <span className="text-2xl">{v.icon}</span>
                <span className="font-heading font-semibold text-gray-700 text-sm leading-tight">{v[lang]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div>
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-6 h-px bg-gold-500" />
            <span className="font-heading text-gold-600 text-xs tracking-[0.3em] uppercase">{a.statsTitle}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((st, i) => (
              <div key={i} className="bg-white border border-gray-200 p-5 text-center hover:border-gold-400 transition-colors">
                <div className="font-display text-3xl text-gold-600 leading-none mb-2">{st.val}</div>
                <div className="font-body text-gray-500 text-xs leading-tight">{st.lab}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-6 h-px bg-gold-500" />
            <span className="font-heading text-gold-600 text-xs tracking-[0.3em] uppercase">{a.workTitle}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((proj, i) => (
              <div key={i} className="bg-white border border-gray-200 p-6 hover:border-gold-400 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-heading font-bold text-gray-900 text-sm">
                    {lang === 'th' ? proj.client : proj.clientEn}
                  </span>
                  <span className="font-body text-gray-400 text-xs">{proj.year}</span>
                </div>
                <p className="font-body text-gray-500 text-sm leading-relaxed">{proj.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-6 h-px bg-gold-500" />
            <span className="font-heading text-gold-600 text-xs tracking-[0.3em] uppercase">{a.certTitle}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {certs.map((cert, i) => (
              <div key={i} className="bg-white border border-gray-200 p-5 text-center hover:border-gold-400 transition-colors">
                <div className="text-3xl mb-3">{cert.icon}</div>
                <div className="font-body text-gray-600 text-xs leading-tight">{cert.title[lang]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-6 h-px bg-gold-500" />
            <span className="font-heading text-gold-600 text-xs tracking-[0.3em] uppercase">{a.teamTitle}</span>
          </div>
          <p className="font-body text-gray-500 text-sm mb-8">{a.teamSub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <div key={i} className="bg-white border border-gray-200 p-6 hover:border-gold-400 transition-colors">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 bg-industrial-800 border border-industrial-700 rounded-full flex items-center justify-center text-2xl mb-4">
                  👷
                </div>
                <div className="font-heading font-bold text-gray-900 text-sm mb-1">
                  {lang === 'th' ? member.name : member.nameEn}
                </div>
                <div className="font-body text-gold-600 text-xs mb-1">{member.role[lang]}</div>
                <div className="font-body text-gray-400 text-xs mb-3">{member.exp[lang]}</div>
                <span className="inline-block font-heading text-[10px] tracking-wider bg-industrial-900 text-gold-400 border border-industrial-700 px-2 py-1">
                  {member.cert}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-6 h-px bg-gold-500" />
            <span className="font-heading text-gold-600 text-xs tracking-[0.3em] uppercase">{a.brandsTitle}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {brands.map((brand, i) => (
              <span key={i} className="font-heading font-semibold text-sm tracking-widest border border-gray-300 text-gray-600 px-5 py-2.5 hover:border-gold-400 hover:text-gold-600 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-industrial-900 p-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-gold-500" />
            <span className="font-heading text-gold-500 text-xs tracking-[0.3em] uppercase">{a.ctaTitle}</span>
            <div className="w-6 h-px bg-gold-500" />
          </div>
          <h3 className="font-display text-4xl text-white tracking-wide mb-3">{a.ctaSub}</h3>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-industrial-900 font-heading font-bold text-sm tracking-widest uppercase px-10 py-4 mt-6 transition-all hover:shadow-[0_0_30px_rgba(245,200,66,0.4)]"
          >
            {a.ctaBtn}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}