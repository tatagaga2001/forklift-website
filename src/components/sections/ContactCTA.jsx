import { useLanguage } from '../../context/LanguageContext'

export default function ContactCTA() {
  const { t } = useLanguage()
  const c = t.cta

  return (
    <section id="contact" className="bg-industrial-900 py-24 relative overflow-hidden">

      {/* Gold glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/5 rounded-full blur-3xl" />

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="w-8 h-px bg-gold-500" />
          <span className="font-heading font-medium text-gold-500 text-xs tracking-[0.3em] uppercase">{c.badge}</span>
          <div className="w-8 h-px bg-gold-500" />
        </div>

        {/* Title */}
        <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide mb-6">
          {c.title}
        </h2>

        {/* Sub */}
        <p className="font-body text-industrial-300 text-lg leading-relaxed max-w-2xl mx-auto mb-12">
          {c.sub}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">

          {/* Phone */}
          <a
            href={`tel:${c.phoneNumber}`}
            className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-industrial-900 font-heading font-bold text-sm tracking-widest uppercase px-8 py-5 transition-all duration-200 hover:shadow-[0_0_40px_rgba(245,200,66,0.6)] min-w-[200px]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {c.phone} · {c.phoneNumber}
          </a>

          {/* Line */}
          <a
            href="https://line.me/ti/p/~apexlift"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#00B900] hover:bg-[#00a000] text-white font-heading font-bold text-sm tracking-widest uppercase px-8 py-5 transition-all duration-200 hover:shadow-[0_0_40px_rgba(0,185,0,0.4)] min-w-[200px]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
            </svg>
            {c.line}
          </a>

          {/* Quote */}
          <a
            href="mailto:info@apexlift.co.th"
            className="w-full sm:w-auto flex items-center justify-center gap-3 border-2 border-industrial-500 hover:border-gold-500 text-white hover:text-gold-400 font-heading font-bold text-sm tracking-widest uppercase px-8 py-5 transition-all duration-200 min-w-[200px]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {c.quote}
          </a>
        </div>

        {/* Hours */}
        <p className="font-body text-industrial-500 text-sm">{c.hours}</p>
      </div>
    </section>
  )
}
