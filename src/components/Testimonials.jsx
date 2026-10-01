import { useEffect, useRef, useState } from 'react'

const TESTIMONIALS = [
  {
    name: 'Priya Jayasinghe',
    role: 'Principal, Apex Academy',
    avatar: 'PJ',
    rating: 5,
    text: '360 LMS completely transformed how we manage our institute. Fee tracking, SMS notifications, and student records — all in one place. Our staff now save hours every week.',
    tag: 'Institute Management',
  },
  {
    name: 'Kasun Perera',
    role: 'Director, BluePeak College',
    avatar: 'KP',
    rating: 5,
    text: 'The automated SMS alerts to parents have made a huge difference. Attendance drops instantly trigger notifications. Parents love the transparency and we love the time saved.',
    tag: 'Parent Communication',
  },
  {
    name: 'Nimesha Fernando',
    role: 'Administrator, Crest Learning',
    avatar: 'NF',
    rating: 5,
    text: 'Before 360 LMS, fee collection was a nightmare. Now our collection rate is at 92% and we can see exactly who owes what in real time. Absolutely brilliant platform.',
    tag: 'Fee Management',
  },
  {
    name: 'Tharaka Silva',
    role: 'Head Teacher, Future Horizon',
    avatar: 'TS',
    rating: 5,
    text: 'Uploading course materials and assignments has never been this easy. Students access everything from their phones. The engagement in our classes has gone up significantly.',
    tag: 'Course Materials',
  },
  {
    name: 'Dilani Rajapaksa',
    role: 'Co-founder, Pearl Academy',
    avatar: 'DR',
    rating: 5,
    text: 'We evaluated 5 platforms before choosing 360 LMS. None of them understood the Sri Lankan education context the way this platform does. Highly recommended for any institute.',
    tag: 'Platform Choice',
  },
  {
    name: 'Ruwan Bandara',
    role: 'CEO, Summit Institute',
    avatar: 'RB',
    rating: 5,
    text: 'The analytics dashboard gives us crystal-clear visibility into student performance across all branches. Making data-driven decisions has never been this straightforward.',
    tag: 'Analytics',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="15" height="15" viewBox="0 0 20 20" fill="none"
          className={i < count ? 'text-[#F97316]' : 'text-[#E5D6CC]'}
        >
          <path
            d="M10 1L12.39 7.26L19 7.64L14 12.14L15.62 19L10 15.77L4.38 19L6 12.14L1 7.64L7.61 7.26L10 1Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t }) {
  return (
    <div
      className="
        group relative shrink-0 w-[340px]
        bg-white border border-[#EFE2D6] rounded-2xl p-6
        shadow-[0_8px_28px_rgba(60,30,10,.06)]
        hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(194,65,12,.12)] hover:border-[#F97316]/30
        transition-all duration-300 cursor-default
      "
    >
      {/* Decorative quote */}
      <div
        className="absolute top-4 right-5 text-[64px] leading-none font-serif text-[#F97316]/10 select-none pointer-events-none"
        aria-hidden="true"
      >
        "
      </div>

      {/* Tag */}
      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#FFF1E6] border border-[#FDDCC4] text-[#C2410C] text-[10px] font-bold tracking-widest uppercase mb-4">
        {t.tag}
      </span>

      {/* Stars */}
      <Stars count={t.rating} />

      {/* Text */}
      <p className="mt-3 text-[14px] leading-[1.75] text-[#4A3C33] font-medium">
        "{t.text}"
      </p>

      {/* Author */}
      <div className="mt-5 pt-4 border-t border-[#F5ECE4] flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FDBA74] to-[#C2410C] flex items-center justify-center text-white text-[12px] font-extrabold shrink-0">
          {t.avatar}
        </div>
        <div>
          <strong className="block text-[13px] font-bold text-[#1C1410] leading-tight">{t.name}</strong>
          <span className="text-[12px] text-[#6B5A4E] font-medium">{t.role}</span>
        </div>
      </div>
    </div>
  )
}

function useInView(threshold = 0.1) {
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

export default function Testimonials() {
  const [ref, inView] = useInView()
  const [paused, setPaused] = useState(false)
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative overflow-hidden py-24"
      style={{
        background: 'linear-gradient(180deg, #FFFDF9 0%, #FFF8F2 60%, #FFFDF9 100%)',
      }}
    >
      {/* Dividers */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F1E4D8] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F1E4D8] to-transparent" />

      {/* Background orb glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,.09)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,.06)_0%,transparent_70%)]" />
      </div>

      {/* ── Section Header ── */}
      <div
        className={`
          max-w-3xl mx-auto px-6 text-center mb-14
          transition-all duration-700 ease-out
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >


        <h2 className="font-['Satoshi',sans-serif] font-bold text-[clamp(28px,3.5vw,46px)] leading-[1.12] tracking-[-0.03em] text-[#1C1410]">
          Trusted by institutes{' '}
          <span className="text-[#C2410C]">across Sri Lanka</span>
        </h2>

        {/* Overall rating pill */}
        <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-[#EFE2D6] shadow-[0_4px_16px_rgba(60,30,10,.06)]">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="17" height="17" viewBox="0 0 20 20" fill="none" className="text-[#F97316]">
                <path d="M10 1L12.39 7.26L19 7.64L14 12.14L15.62 19L10 15.77L4.38 19L6 12.14L1 7.64L7.61 7.26L10 1Z" fill="currentColor" />
              </svg>
            ))}
          </div>
          <span className="font-['Satoshi',sans-serif] font-extrabold text-[18px] text-[#C2410C]">4.9</span>
          <span className="text-[13px] text-[#6B5A4E] font-medium">Average rating · 36+ institutions</span>
        </div>
      </div>

      {/* ── Scrolling Carousel ── */}
      <div
        className={`
          relative transition-all duration-700 ease-out delay-200
          ${inView ? 'opacity-100' : 'opacity-0'}
        `}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade masks */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-40 z-10"
          style={{ background: 'linear-gradient(90deg,#FFFDF9 0%,transparent 100%)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-40 z-10"
          style={{ background: 'linear-gradient(270deg,#FFFDF9 0%,transparent 100%)' }}
        />

        {/* Row 1 */}
        <div className="overflow-hidden mb-4">
          <div
            className="flex gap-4 w-max py-2"
            style={{
              animation: 'marquee 42s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {doubled.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>

        {/* Row 2 — reverse */}
        <div className="overflow-hidden">
          <div
            className="flex gap-4 w-max py-2"
            style={{
              animation: 'marqueeRev 50s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {[...doubled].reverse().map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
