import { useEffect, useRef, useState } from 'react'

const brands = [
  'Apex Academy',
  'BluePeak College',
  'Nexa Institute',
  'Crest Learning',
  'Future Horizon',
  'Pearl Academy',
  'Sapphire Campus',
  'City Skills',
  'BrightPath',
  'Lanka Business College',
  'Summit Institute',
  'EduStar Academy',
]

const STATS = [
  { value: '36+',   label: 'Institutions'    },
  { value: '1.2K+', label: 'Active Students' },
  { value: '98%',   label: 'Satisfaction'    },
  { value: '4.9★',  label: 'App Rating'      },
]

/* useInView hook */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* A single brand card */
function BrandCard({ name }) {
  return (
    <div className="
      group relative flex items-center gap-2.5
      px-5 py-3 rounded-xl shrink-0
      bg-white border border-[#EDE0D4]
      shadow-[0_2px_10px_rgba(60,30,10,.04)]
      cursor-default select-none
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(194,65,12,.10)] hover:border-[#F97316]/30
    ">
      {/* Accent dot */}
      <span className="w-1.5 h-1.5 rounded-full bg-linear-to-b from-[#F97316] to-[#C2410C] shrink-0" />
      {/* Name */}
      <span className="text-[#2C1F18] text-[13.5px] font-semibold tracking-[-0.01em] whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

/* Infinite track */
function Track({ items, reverse = false, speed = '30s' }) {
  const [paused, setPaused] = useState(false)
  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex gap-2.5 w-max py-1"
        style={{
          animation: `${reverse ? 'marqueeRev' : 'marquee'} ${speed} linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {[...items, ...items].map((name, i) => (
          <BrandCard key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  )
}

export default function BusinessCarousel() {
  const [ref, inView] = useInView()

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFDF9 0%, #FFF8F2 50%, #FFFDF9 100%)',
        padding: '96px 0 80px',
      }}
      aria-label="Trusted institutions using 360 LMS"
      ref={ref}
    >
      {/* Top soft divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#F1E4D8] to-transparent" />

      {/* Background decorative glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-175 h-75 rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,.09)_0%,transparent_70%)]" />
      </div>

      {/* ── Header ── */}
      <div className={`
        max-w-2xl mx-auto px-6 text-center mb-14
        transition-all duration-700 ease-out
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}>


        <h2 className="font-['Sora',sans-serif] font-bold text-[clamp(26px,3vw,42px)] leading-[1.14] tracking-[-0.03em] text-[#1C1410]">
          Powering institutes that{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#C2410C]">love to grow</span>
            <span className="absolute bottom-1 left-0 w-full h-1.5 bg-[#F97316]/15 rounded-full" />
          </span>
        </h2>

        <p className="mt-4 text-[16px] text-[#6B5A4E] leading-relaxed">
          Join hundreds of educators and institutes already scaling smarter with 360 LMS.
        </p>
      </div>

      {/* ── Stats row ── */}
      <div className={`
        max-w-3xl mx-auto px-6 mb-14
        transition-all duration-700 ease-out delay-100
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}>
        <div className="grid grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="
                flex flex-col items-center gap-1.5 py-5 px-4
                bg-white rounded-2xl
                border border-[#EFE2D6]
                shadow-[0_4px_16px_rgba(60,30,10,.05)]
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(194,65,12,.09)] hover:border-[#F97316]/25
              "
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <strong className="font-['Sora',sans-serif] text-[28px] font-extrabold text-[#C2410C] leading-none">
                {s.value}
              </strong>
              <span className="text-[11.5px] font-semibold text-[#6B5A4E] text-center mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Marquee ── */}
      <div className={`
        relative
        transition-all duration-700 ease-out delay-200
        ${inView ? 'opacity-100' : 'opacity-0'}
      `}>
        {/* Fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-40 z-10"
          style={{ background: 'linear-gradient(90deg,#FFFDF9 0%,transparent 100%)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-40 z-10"
          style={{ background: 'linear-gradient(270deg,#FFFDF9 0%,transparent 100%)' }} />

        <div className="flex flex-col gap-3">
          <Track items={brands}                   reverse={false} speed="32s" />
          <Track items={[...brands].reverse()}     reverse={true}  speed="26s" />
        </div>
      </div>

      

      {/* Bottom soft divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#F1E4D8] to-transparent" />
    </section>
  )
}
