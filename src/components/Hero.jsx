import { useEffect, useRef, useState } from 'react'

/* ── lines to cycle through ── */
const LINES = [
  { prefix: 'Manage ', suffix: 'Learning' },
  { prefix: 'Manage ', suffix: 'Growth' },
  { prefix: 'Manage ', suffix: 'Success' },
  { prefix: 'Manage ', suffix: 'Everything' },
]

/* split a string into individual letter spans for the char-drop animation */
function SplitText({ text, baseDelay = 0, className = '' }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className={`inline-block ${className}`}
          style={{
            animation: `charDrop .55s cubic-bezier(.22,.68,0,1.2) both`,
            animationDelay: `${baseDelay + i * 28}ms`,
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </>
  )
}

export default function Hero() {
  const [idx, setIdx]       = useState(0)
  const [phase, setPhase]   = useState('in')   // 'in' | 'hold' | 'out'
  const [visible, setVisible] = useState(false)

  /* entrance */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  /* text cycling: in → hold → out → next → in */
  useEffect(() => {
    let tid
    if (phase === 'in')   tid = setTimeout(() => setPhase('hold'), 1800)
    if (phase === 'hold') tid = setTimeout(() => setPhase('out'),  1200)
    if (phase === 'out')  tid = setTimeout(() => {
      setIdx(i => (i + 1) % LINES.length)
      setPhase('in')
    }, 400)
    return () => clearTimeout(tid)
  }, [phase])

  const current = LINES[idx]

  return (
    <section className="relative overflow-hidden bg-[#FFF9F4]">

      {/* ── Ambient orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-48 -right-56 w-195 h-195 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,.18)_0%,transparent_70%)] animate-[orbDrift_10s_ease-in-out_infinite_alternate]" />
        <div className="absolute -bottom-32 -left-40 w-130 h-130 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,.12)_0%,transparent_70%)] animate-[orbDrift_14s_ease-in-out_infinite_alternate-reverse]" />
        <div className="absolute top-1/3 left-[55%] w-75 h-75 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,.07)_0%,transparent_70%)] animate-[orbDrift_18s_ease-in-out_infinite_alternate]" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-32 flex flex-col items-center text-center">



        {/* ── Animated headline ── */}
        <h1 className={`
          hero-h1-perspective
          font-['Sora',sans-serif] font-bold leading-[1.06] tracking-[-0.035em] select-none
          transition-all duration-700 ease-out delay-100
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}>

          {/* Cycling line — chars drop in / flip out */}
          <span
            className="block overflow-hidden"
            style={{ minHeight: 'calc(1.06 * clamp(52px,7.5vw,96px))' }}
          >
            <span
              className={`
                block text-[clamp(52px,7.5vw,96px)]
                transition-all duration-350 ease-in
                ${phase === 'out'
                  ? 'opacity-0 -translate-y-5 blur-[2px]'
                  : 'opacity-100 translate-y-0 blur-0'
                }
              `}
            >
              {phase !== 'out' ? (
                <>
                  <SplitText text={current.prefix} baseDelay={0} className="text-[#1C1410]" />
                  <SplitText text={current.suffix} baseDelay={current.prefix.length * 28} className="text-[#C2410C]" />
                </>
              ) : (
                <>
                  <span className="text-[#1C1410]">{current.prefix}</span>
                  <span className="text-[#C2410C]">{current.suffix}</span>
                </>
              )}
            </span>
          </span>
        </h1>

        {/* Lead */}
        <p className={`
          mt-8 text-[18px] leading-[1.7] text-[#57483F] font-medium max-w-2xl
          transition-all duration-700 ease-out delay-300
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}>
          Manage your classes and students smarter with an all-in-one platform built for modern educators and institutes.
        </p>

        <p className={`
          mt-3 text-[15px] leading-[1.75] text-[#6B5A4E] max-w-xl
          transition-all duration-700 ease-out delay-380
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}>
          From Student &amp; Staff Management to Fee Tracking, Automated SMS, and Course Materials — all in one place.
        </p>

        {/* CTAs */}
        <div className={`
          mt-10 flex flex-wrap justify-center gap-4
          transition-all duration-700 ease-out delay-460
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}>
          <a
            href="#cta"
            className="
              inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl
              bg-[#C2410C] text-white font-bold text-[16px]
              shadow-[0_14px_32px_rgba(194,65,12,.38)]
              hover:bg-[#9A3412] hover:-translate-y-0.75 hover:shadow-[0_20px_40px_rgba(194,65,12,.46)]
              active:translate-y-0 transition-all duration-200
            "
          >
            Get Started Free →
          </a>
          <a
            href="#platform"
            className="
              inline-flex items-center gap-2 px-9 py-4 rounded-2xl
              bg-white text-[#1C1410] font-semibold text-[16px]
              border border-[#F1E4D8]
              hover:border-[#F97316] hover:-translate-y-0.5
              transition-all duration-200
            "
          >
            Explore Platform
          </a>
        </div>

        {/* Trust */}
        <p className={`
          mt-5 text-[13px] text-[#6B5A4E] font-medium
          transition-all duration-700 ease-out delay-500
          ${visible ? 'opacity-100' : 'opacity-0'}
        `}>
          Built for modern educators, institutes, and learning communities.
        </p>

        {/* Stats strip */}
        <div className={`
          mt-10 inline-flex items-center
          bg-white/70 backdrop-blur-md border border-[#F1E4D8]
          rounded-2xl shadow-[0_8px_28px_rgba(60,30,10,.07)]
          transition-all duration-700 ease-out delay-560
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          {[
            { val: '1,200+', lbl: 'Students' },
            { val: '98%',    lbl: 'Satisfaction' },
            { val: '36+',    lbl: 'Institutes' },
            { val: '4.9★',   lbl: 'Rating' },
          ].map((s, i, arr) => (
            <span key={s.lbl} className="flex items-center">
              <span className="flex flex-col items-center px-7 py-3">
                <strong className="font-['Sora',sans-serif] text-[21px] font-extrabold text-[#C2410C] leading-tight">
                  {s.val}
                </strong>
                <span className="text-[11px] font-semibold text-[#6B5A4E] mt-0.5">{s.lbl}</span>
              </span>
              {i < arr.length - 1 && <span className="w-px h-9 bg-[#F1E4D8]" />}
            </span>
          ))}
        </div>

        {/* ── Dashboard mockup ── */}
        <div className={`
          mt-20 w-full max-w-4xl relative
          transition-all duration-1000 ease-out delay-640
          ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.97]'}
        `}>
          {/* glow */}
          <div className="absolute inset-x-16 -top-6 h-24 bg-[#F97316]/20 blur-2xl rounded-full" aria-hidden="true" />

          <div className="relative bg-white rounded-[22px] border border-[#EFE2D6] shadow-[0_48px_100px_rgba(60,30,10,.18),0_8px_24px_rgba(60,30,10,.06)] overflow-hidden">
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
                  <strong className="font-['Sora',sans-serif] text-[14px]">Institute Overview</strong>
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
                      <div className={`font-['Sora',sans-serif] text-[17px] font-bold mt-0.5 ${k.hot ? 'text-white' : ''}`}>{k.val}</div>
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

          {/* Floating badges */}



        </div>

      </div>
    </section>
  )
}
