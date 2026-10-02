import { memo, useEffect, useRef, useState } from 'react'

/* ── words that cycle (only the suffix animates) ── */
const SUFFIXES = ['Learning', 'Progress', 'Success', 'Everything']

/* Animates each character of a word */
function SplitText({ text, className = '', delay = 0 }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className={`inline-block ${className}`}
          style={{
            animation: `charDrop .55s cubic-bezier(.22,.68,0,1.2) both`,
            animationDelay: `${delay + i * 32}ms`,
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </>
  )
}

/* ─────────────────────────────────────────────────────────
   DashboardMockup — wrapped in memo so it NEVER re-renders
   when the parent Hero's phase/idx state changes.
───────────────────────────────────────────────────────── */
const DashboardMockup = memo(function DashboardMockup({ dashRef, dashVisible }) {
  return (
    <div
      ref={dashRef}
      className="mt-20 w-full max-w-4xl relative"
      style={{
        opacity: dashVisible ? 1 : 0,
        transform: 'none',
        transition: dashVisible ? 'opacity 0.6s ease' : 'none',
      }}
    >
      {/* Glow under card */}
      <div
        className="absolute inset-x-8 -top-4 h-28 blur-3xl rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.28) 0%, rgba(194,65,12,0.08) 70%, transparent 100%)' }}
        aria-hidden="true"
      />

      <div
        className="relative rounded-[22px] overflow-hidden"
        style={{ background: '#fff', border: '1.5px solid rgba(239,226,214,0.9)', boxShadow: '0 48px 100px rgba(60,30,10,.17), 0 8px 24px rgba(60,30,10,.06)' }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-5 h-11 bg-[#FFFCFA] border-b border-[#F5ECE4]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#F5C9B8]" />
            <div className="w-3 h-3 rounded-full bg-[#F6DDB0]" />
            <div className="w-3 h-3 rounded-full bg-[#C9E6CF]" />
          </div>
          <div className="flex-1 max-w-60 mx-auto h-6 rounded-md bg-[#FBF3EC] flex items-center px-3 gap-2 text-[11px] text-[#6B5A4E]">
            <span className="text-[#A8978A]">🔍</span> Search students, classes…
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-6 h-6 rounded-full bg-[#FBF3EC] flex items-center justify-center text-[11px]">🔔</div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#C2410C] text-white text-[7px] font-bold flex items-center justify-center">3</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#FDBA74] to-[#C2410C] text-white text-[10px] font-bold flex items-center justify-center">NP</div>
          </div>
        </div>

        {/* Body */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-14 border-r border-[#F5ECE4] flex flex-col items-center gap-3.5 pt-4 pb-4 bg-[#FFFCFA] shrink-0">
            {[
              { ic: '⊞', active: true },
              { ic: '👤' },
              { ic: '📖' },
              { ic: '💳' },
              { ic: '⬡' },
              { ic: '💬' },
            ].map((item, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-[9px] flex items-center justify-center text-[13px]
                  ${item.active ? 'bg-[#FFF1E6] text-[#C2410C]' : 'text-[#A8978A]'}`}
              >
                {item.ic}
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0 p-4 flex flex-col gap-3">
            <div className="flex justify-between items-baseline">
              <strong className="font-['Satoshi',sans-serif] text-[14px]">Institute Overview</strong>
              <span className="text-[10px] text-[#6B5A4E]">This term</span>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { lbl: 'Total Students', val: '1,248', sub: '+64 this month', subC: 'text-green-600' },
                { lbl: 'Active Courses',  val: '36',    sub: '8 online',       subC: 'text-[#C2410C]' },
                { lbl: 'Staff Members',   val: '42',    sub: '28 teachers',    subC: 'text-[#6B5A4E]' },
                { lbl: 'Fee Collection',  val: 'LKR 1.8M', sub: '86% collected', hot: true },
              ].map(k => (
                <div key={k.lbl}
                  className={`p-2.5 rounded-[10px] border ${k.hot
                    ? 'bg-linear-to-br from-[#F97316] to-[#C2410C] border-transparent text-white'
                    : 'border-[#F5ECE4]'}`}
                >
                  <div className={`text-[9.5px] ${k.hot ? 'text-white/80' : 'text-[#6B5A4E]'}`}>{k.lbl}</div>
                  <div className={`font-['Satoshi',sans-serif] text-[17px] font-bold mt-0.5 ${k.hot ? 'text-white' : ''}`}>{k.val}</div>
                  <div className={`text-[8.5px] font-semibold mt-0.5 ${k.hot ? 'text-white/90' : k.subC}`}>{k.sub}</div>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 border border-[#F5ECE4] rounded-[10px]">
                <div className="flex justify-between text-[10.5px] font-bold mb-2">
                  <span>Attendance</span><span className="text-green-600">94%</span>
                </div>
                <div className="flex items-end gap-2 h-17">
                  {[['Mo','66%',false],['Tu','72%',false],['We','69%',false],['Th','75%',true],['Fr','70%',false],['Sa','61%',false]].map(([lbl,h,pk],i)=>(
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className={`w-full rounded-t-sm ${pk ? 'bg-linear-to-b from-[#F97316] to-[#C2410C]' : 'bg-[#FDDCC4]'}`} style={{height:h}} />
                      <span className="text-[7.5px] text-[#6B5A4E]">{lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 border border-[#F5ECE4] rounded-[10px]">
                <div className="flex justify-between text-[10.5px] font-bold mb-2">
                  <span>Performance</span><span className="text-[#C2410C]">Avg 78%</span>
                </div>
                <svg width="100%" height="68" viewBox="0 0 260 68" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="perf2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#F97316" stopOpacity=".22" />
                      <stop offset="1" stopColor="#F97316" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 50 L37 42 L74 46 L111 28 L148 32 L185 14 L222 10 L260 0 L260 68 L0 68 Z" fill="url(#perf2)" />
                  <path d="M0 50 L37 42 L74 46 L111 28 L148 32 L185 14 L222 10 L260 0" fill="none" stroke="#C2410C" strokeWidth="2" strokeLinejoin="round" className="chart-line" />
                </svg>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 border border-[#F5ECE4] rounded-[10px]">
                <div className="text-[10px] font-bold mb-1.5">Upcoming Classes</div>
                {[['4:00','A/L Physics','Hall 02'],['5:30','O/L Maths','Online'],['7:00','English Lit.','Hall 05']].map(([t,n,loc])=>(
                  <div key={t} className="flex gap-2 items-center text-[9.5px] mb-1">
                    <span className="bg-[#FFF1E6] text-[#C2410C] font-bold px-1.5 py-0.5 rounded-[5px] shrink-0">{t}</span>
                    <span className="font-semibold truncate">{n}</span>
                    <span className="text-[#6B5A4E] shrink-0">{loc}</span>
                  </div>
                ))}
              </div>
              <div className="p-2.5 border border-[#F5ECE4] rounded-[10px]">
                <div className="text-[10px] font-bold mb-1.5">Recent Payments</div>
                {[['K. Perera','4,500'],['S. Fernando','6,000'],['M. Silva','3,200'],['R. Jayasinghe','Due']].map(([n,v])=>(
                  <div key={n} className="flex justify-between text-[9.5px] mb-1">
                    <span>{n}</span>
                    <span className={`font-bold ${v==='Due'?'text-[#C2410C]':'text-green-600'}`}>{v==='Due'?'Due':`Rs.${v}`}</span>
                  </div>
                ))}
              </div>
              <div className="p-2.5 border border-[#F5ECE4] rounded-[10px]">
                <div className="text-[10px] font-bold mb-1.5">Notifications</div>
                {[
                  {dot:'bg-[#F97316]',txt:'SMS sent to 312 parents'},
                  {dot:'bg-green-500',txt:'Chem Unit 4 uploaded'},
                  {dot:'bg-red-700',  txt:'18 fees due this week'},
                ].map((n,i)=>(
                  <div key={i} className="flex gap-1.5 items-start text-[9.5px] mb-1">
                    <span className={`mt-0.75 w-1.5 h-1.5 rounded-full shrink-0 ${n.dot}`} />
                    {n.txt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

/* ─────────────────────────────────────────────────────────
   Main Hero component
───────────────────────────────────────────────────────── */
export default function Hero() {
  const [idx, setIdx]       = useState(0)
  const [phase, setPhase]   = useState('in')   // 'in' | 'hold' | 'out'
  const [visible, setVisible] = useState(false)
  const [dashVisible, setDashVisible] = useState(false)
  const dashRef = useRef(null)

  /* entrance */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  /* fade dashboard in once, without any slide/scale motion */
  useEffect(() => {
    const el = dashRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDashVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* text cycling: in → hold → out → next → in */
  useEffect(() => {
    let tid
    if (phase === 'in')   tid = setTimeout(() => setPhase('hold'), 1800)
    if (phase === 'hold') tid = setTimeout(() => setPhase('out'),  1200)
    if (phase === 'out')  tid = setTimeout(() => {
      setIdx(i => (i + 1) % SUFFIXES.length)
      setPhase('in')
    }, 400)
    return () => clearTimeout(tid)
  }, [phase])

  return (
    <section
      className="relative overflow-hidden min-h-screen flex flex-col"
      style={{
        background: 'radial-gradient(ellipse 130% 90% at 65% -5%, #FFEDD5 0%, #FFF4E6 40%, #FFF9F4 70%, #FFFBF7 100%)',
      }}
    >

      {/* ── Ambient orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.22) 0%, rgba(251,146,60,0.08) 50%, transparent 75%)', animation: 'orbDrift 10s ease-in-out infinite alternate' }}
        />
        <div
          className="absolute -bottom-24 -left-32 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(253,186,116,0.25) 0%, rgba(249,115,22,0.06) 55%, transparent 75%)', animation: 'orbDrift 14s ease-in-out infinite alternate-reverse' }}
        />
        <div
          className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)', animation: 'orbDrift 18s ease-in-out infinite alternate' }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(rgba(194,65,12,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(194,65,12,0.025) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,249,244,0.6))' }} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-[130px] pb-16 flex flex-col items-center text-center flex-1">

        {/* ── Top Badge ── */}
        <div className={`
          group relative mb-8 inline-flex p-[1.5px] rounded-full overflow-hidden
          shadow-[0_0_30px_rgba(249,115,22,0.2)]
          hover:shadow-[0_0_50px_rgba(249,115,22,0.4)]
          transition-all duration-500 ease-out hover:-translate-y-1 cursor-default
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,transparent_0%,transparent_35%,#F97316_50%,#EA580C_55%,transparent_65%,transparent_100%)] animate-[spin_2.5s_linear_infinite] opacity-80"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F97316]/50 to-[#EA580C]/50 blur-sm opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/95 backdrop-blur-xl border border-[#FDBA74]/30 overflow-hidden w-full">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <span className="relative font-['Satoshi',sans-serif] text-[13px] sm:text-[13.5px] font-extrabold tracking-[0.04em] bg-[linear-gradient(110deg,#7C2D12,30%,#EA580C,50%,#C2410C,70%,#7C2D12)] bg-[length:250%_auto] animate-[shimmerText_4s_linear_infinite] bg-clip-text text-transparent">
              The No. 01 Learning Management Platform in Sri Lanka
            </span>
          </div>
        </div>

        {/* ── Animated headline ── */}
        <h1 className={`
          relative w-full max-w-4xl mx-auto
          font-['Satoshi',sans-serif] font-bold leading-[1.06] tracking-[-0.035em] select-none
          text-[clamp(24px,7.2vw,80px)]
          transition-opacity duration-700 ease-out delay-100
          ${visible ? 'opacity-100' : 'opacity-0'}
        `}>
          {/* Reserves width for the longest phrase so the dashboard does not shift */}
          <span className="invisible whitespace-nowrap" aria-hidden="true">
            Manage Everything
          </span>

          <span
            className={`
              absolute inset-0 flex flex-nowrap justify-center items-center gap-x-2 sm:gap-x-4
              transition-all duration-350 ease-in
              ${phase === 'out' ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}
            `}
          >
            {phase !== 'out' ? (
              <>
                <span className="text-[#3D1A08] whitespace-nowrap">
                  <SplitText key={`manage-${idx}`} text="Manage" />
                </span>
                <span className="whitespace-nowrap">
                  <SplitText
                    key={`suffix-${idx}`}
                    text={SUFFIXES[idx]}
                    delay={6 * 32}
                    className="text-transparent bg-clip-text bg-[linear-gradient(110deg,#C2410C,45%,#F97316,60%,#C2410C)] bg-[length:200%_auto] animate-[shimmerText_3s_linear_infinite]"
                  />
                </span>
              </>
            ) : (
              <>
                <span className="text-[#3D1A08] whitespace-nowrap">Manage</span>
                <span className="whitespace-nowrap text-transparent bg-clip-text bg-[linear-gradient(110deg,#C2410C,45%,#F97316,60%,#C2410C)]">
                  {SUFFIXES[idx]}
                </span>
              </>
            )}
          </span>
        </h1>

        {/* Lead */}
        <p className={`
          mt-8 text-[18px] leading-[1.72] text-[#57483F] font-medium max-w-2xl
          transition-all duration-700 ease-out delay-300
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}>
          Manage your classes and students smarter with an all-in-one platform built for{' '}
          <span className="font-bold text-[#9A3412]">modern educators</span> and institutes.
        </p>

        <p className={`
          mt-3 text-[15px] leading-[1.75] text-[#7A6055] max-w-xl
          transition-all duration-700 ease-out delay-380
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}>
          From Student &amp; Staff Management to Fee Tracking, Automated SMS, and Course Materials - all in one place.
        </p>

        {/* CTAs */}
        <div className={`
          mt-10 flex flex-wrap justify-center gap-4
          transition-all duration-700 ease-out delay-460
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}>
          <a
            href="#cta"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl font-bold text-[16px] text-white transition-all duration-200 hover:-translate-y-1 active:translate-y-0"
            style={{ background: 'linear-gradient(135deg, #C2410C, #9A3412)', boxShadow: '0 14px 32px rgba(194,65,12,.42), 0 4px 8px rgba(194,65,12,.2)' }}
          >
            Get Started Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a
            href="#platform"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl font-semibold text-[16px] transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(249,115,22,0.25)', color: '#3D1A08', boxShadow: '0 4px 14px rgba(194,65,12,0.08)' }}
          >
            Explore Platform
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </a>
        </div>

        {/* Stats strip */}
        <div
          className={`mt-10 inline-flex items-center rounded-2xl overflow-hidden transition-all duration-700 ease-out delay-560 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', border: '1.5px solid rgba(249,115,22,0.18)', boxShadow: '0 8px 32px rgba(194,65,12,0.09), 0 2px 8px rgba(60,30,10,0.06)' }}
        >
          {[
            { val: '1,200+', lbl: 'Students' },
            { val: '98%',    lbl: 'Satisfaction' },
            { val: '36+',    lbl: 'Institutes' },
            { val: '4.9★',   lbl: 'Rating' },
          ].map((s, i, arr) => (
            <span key={s.lbl} className="flex items-center">
              <span className="flex flex-col items-center px-7 py-3.5">
                <strong className="font-['Satoshi',sans-serif] text-[21px] font-extrabold text-[#C2410C] leading-tight">
                  {s.val}
                </strong>
                <span className="text-[11px] font-semibold text-[#7A6055] mt-0.5">{s.lbl}</span>
              </span>
              {i < arr.length - 1 && <span className="w-px h-10" style={{ background: 'rgba(249,115,22,0.2)' }} />}
            </span>
          ))}
        </div>

        {/* Dashboard — memo component, never re-renders from heading state */}
        <DashboardMockup
          dashRef={dashRef}
          dashVisible={dashVisible}
        />

      </div>
    </section>
  )
}
