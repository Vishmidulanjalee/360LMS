import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

/* ─── useInView hook ─── */
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

/* ─── Data ─── */
const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Perfect for new institutes getting started',
    badge: null,
    basePrice: 3500,
    perStudent: 25,
    maxStudents: 500,
    color: 'from-[#FFF9F4] to-[#FFF1E6]',
    border: 'border-[#EFE2D6]',
    accentBg: 'bg-[#FFF1E6]',
    accentText: 'text-[#C2410C]',
    btnClass: 'border border-[#C2410C] text-[#C2410C] hover:bg-[#C2410C] hover:text-white',
    features: [
      'Custom Subdomain (yourname.360lms.lk)',
      'Customised Website — Your Branding',
      'Up to 500 Active Students',
      'Unlimited Course & Lesson Creation',
      'Dedicated Teacher Dashboard',
      'Student Management & Enrolments',
      'MCQ & PDF Upload Exams',
      'QR & NFC Card Attendance',
      'Student Progress Tracking',
      'Bank Transfer Payments',
      'HD Download-Protected Video Player',
      'Live Zoom Class Integration',
      'Cloud Storage for Video & PDF',
      '24/7 Technical Support',
    ],
    addons: [
      { label: 'Staff Management', price: 350 },
      { label: 'Tute Shop', price: 400 },
      { label: 'SMS Notifications', price: 200 },
      { label: 'Video Piracy Watermark', price: 200 },
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'Most popular for growing institutes',
    badge: 'Most Popular',
    basePrice: 5750,
    perStudent: 20,
    maxStudents: 1000,
    color: 'from-[#C2410C] to-[#9A3412]',
    border: 'border-transparent',
    accentBg: 'bg-white/20',
    accentText: 'text-white',
    btnClass: 'bg-white text-[#C2410C] hover:bg-[#FFF1E6] font-extrabold',
    features: [
      'Everything in Starter',
      'Up to 1,000 Active Students',
      'Payment Gateway Integration',
      'Your Own SMS Gateway',
      'Integrations (Zoom, YouTube, Vimeo, WhatsApp)',
      'Student Login Limits',
      'Content View Limits',
      'Tute Delivery Management',
      'Staff Management (Included)',
      'SMS Notifications (Included)',
      'Video Piracy Watermark (Included)',
      'Priority Support — 4hr Response',
    ],
    addons: [],
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    tagline: 'White-label solution for large institutes',
    badge: 'Best Value',
    basePrice: 7000,
    perStudent: 15,
    maxStudents: 9999,
    color: 'from-[#1C1410] to-[#2D1A0E]',
    border: 'border-transparent',
    accentBg: 'bg-white/10',
    accentText: 'text-white',
    btnClass: 'bg-[#F97316] text-white hover:bg-[#EA580C] font-extrabold',
    features: [
      'Everything in Standard',
      'Unlimited Students',
      'Custom Domain Name (yourinstitute.lk)',
      'Customised Website — Branded Design',
      'Custom Email Server',
      'Online Payment Gateway Integration',
      'Integrate Own SMS Gateway',
      'Expenses Management System',
      'Multi-Platform Integrations',
      'Security & Content Control',
      'HD Download-Protected Player',
      'Tute Delivery Management',
      'Dedicated Account Manager',
      'Priority Support — 2hr Response',
    ],
    addons: [],
  },
]

const COMPARE_ROWS = [
  { feature: 'Custom Subdomain', starter: true, standard: true, pro: true },
  { feature: 'Custom Domain (yourinstitute.lk)', starter: false, standard: false, pro: true },
  { feature: 'Active Students', starter: '500', standard: '1,000', pro: 'Unlimited' },
  { feature: 'Unlimited Courses & Lessons', starter: true, standard: true, pro: true },
  { feature: 'Payment Gateway', starter: 'Bank Transfer', standard: true, pro: true },
  { feature: 'Own SMS Gateway', starter: false, standard: true, pro: true },
  { feature: 'SMS Notifications Add-on', starter: 'LKR 200/mo', standard: 'Included', pro: 'Included' },
  { feature: 'Staff Management', starter: 'LKR 350/mo', standard: 'Included', pro: 'Included' },
  { feature: 'Video Piracy Watermark', starter: 'LKR 200/mo', standard: 'Included', pro: 'Included' },
  { feature: 'Expenses Management', starter: false, standard: false, pro: true },
  { feature: 'QR & NFC Attendance', starter: true, standard: true, pro: true },
  { feature: 'Live Zoom Integration', starter: true, standard: true, pro: true },
  { feature: 'Support Response Time', starter: '24hr', standard: '4hr', pro: '2hr' },
  { feature: 'Dedicated Account Manager', starter: false, standard: false, pro: true },
]

/* ─── Pricing FAQ Item (must be component, not inline hook) ─── */
function PricingFaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#EFE2D6] rounded-2xl bg-white overflow-hidden hover:border-[#F97316]/40 hover:shadow-[0_8px_28px_rgba(194,65,12,.07)] transition-all duration-300">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className={`font-['Satoshi',sans-serif] font-semibold text-[15px] text-[#1C1410] ${open ? 'text-[#C2410C]' : ''}`}>{q}</span>
        <span className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${open ? 'bg-[#C2410C] text-white rotate-45' : 'bg-[#FFF1E6] text-[#C2410C]'}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-60' : 'max-h-0'}`}>
        <p className="px-6 pb-5 text-[14.5px] leading-[1.75] text-[#57483F]">{a}</p>
      </div>
    </div>
  )
}

/* ─── Sub-components ─── */
function CheckIcon({ ok }) {
  if (ok === true)
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[#C2410C]"><circle cx="9" cy="9" r="9" fill="currentColor" fillOpacity=".12"/><path d="M5 9l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  if (ok === false)
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[#D1C4BB]"><circle cx="9" cy="9" r="9" fill="currentColor" fillOpacity=".08"/><path d="M6 6l6 6M12 6l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
  return <span className="text-[13px] font-semibold text-[#57483F]">{ok}</span>
}

function PlanCard({ plan, delay = 0, inView }) {
  const [students, setStudents] = useState(0)
  const isLight = plan.id === 'starter'
  const isDark = !isLight

  const totalFee = plan.basePrice + Math.min(students, plan.maxStudents) * plan.perStudent

  return (
    <div
      className={`
        relative flex flex-col h-full rounded-3xl overflow-hidden
        bg-gradient-to-b ${plan.color}
        border ${plan.border}
        shadow-[0_24px_60px_rgba(60,30,10,.12)]
        transition-all duration-700 ease-out
        ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.97]'}
        ${plan.id === 'standard' ? 'shadow-[0_32px_80px_rgba(194,65,12,.22)] ring-2 ring-[#C2410C]/20' : ''}
        hover:-translate-y-1
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute top-4 right-4">
          <span className={`
            px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase
            ${plan.id === 'standard' ? 'bg-white text-[#C2410C]' : 'bg-[#F97316] text-white'}
          `}>
            {plan.badge}
          </span>
        </div>
      )}

      <div className="p-7 flex flex-col flex-1">
        {/* Plan name */}
        <div className="mb-6">
          <h3 className={`font-['Satoshi',sans-serif] font-bold text-[22px] ${isDark ? 'text-white' : 'text-[#1C1410]'}`}>
            {plan.name}
          </h3>
          <p className={`text-[13px] mt-1 ${isDark ? 'text-white/70' : 'text-[#6B5A4E]'}`}>
            {plan.tagline}
          </p>
        </div>

        {/* Price */}
        <div className="mb-2">
          <div className={`text-[12px] font-semibold uppercase tracking-widest mb-1 ${isDark ? 'text-white/60' : 'text-[#6B5A4E]'}`}>
            Monthly Base Fee
          </div>
          <div className="flex items-end gap-1.5">
            <span className={`font-['Satoshi',sans-serif] font-extrabold text-[38px] leading-none ${isDark ? 'text-white' : 'text-[#C2410C]'}`}>
              LKR {plan.basePrice.toLocaleString()}
            </span>
          </div>
          <div className={`text-[12px] mt-1 ${isDark ? 'text-white/60' : 'text-[#6B5A4E]'}`}>
            + LKR {plan.perStudent} per active student / month
            {plan.maxStudents < 9999 ? ` (max ${plan.maxStudents.toLocaleString()})` : ''}
          </div>
        </div>

        {/* Student calculator */}
        <div className={`mt-5 rounded-2xl p-4 ${isDark ? 'bg-white/10' : 'bg-white border border-[#EFE2D6]'}`}>
          <div className={`text-[11px] font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-white/70' : 'text-[#6B5A4E]'}`}>
            Active Students
          </div>
          <input
            type="range"
            min={0}
            max={Math.min(plan.maxStudents, 1000)}
            step={10}
            value={students}
            onChange={e => setStudents(Number(e.target.value))}
            className="w-full h-1.5 rounded-full accent-[#C2410C] cursor-pointer"
          />
          <div className="flex justify-between mt-1.5">
            <span className={`text-[11px] ${isDark ? 'text-white/50' : 'text-[#A8978A]'}`}>0</span>
            <span className={`text-[13px] font-bold ${isDark ? 'text-white' : 'text-[#1C1410]'}`}>{students}</span>
            <span className={`text-[11px] ${isDark ? 'text-white/50' : 'text-[#A8978A]'}`}>{Math.min(plan.maxStudents, 1000)}</span>
          </div>

          <div className={`mt-3 pt-3 border-t ${isDark ? 'border-white/10' : 'border-[#EFE2D6]'} flex justify-between items-center`}>
            <span className={`text-[12px] font-semibold ${isDark ? 'text-white/60' : 'text-[#6B5A4E]'}`}>Total / Month</span>
            <span className={`font-['Satoshi',sans-serif] text-[20px] font-extrabold ${isDark ? 'text-white' : 'text-[#C2410C]'}`}>
              LKR {totalFee.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="mt-6 flex flex-col gap-2.5 flex-1">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`mt-0.5 shrink-0 ${isDark ? 'text-[#F97316]' : 'text-[#C2410C]'}`}>
                <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity=".14"/>
                <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className={`text-[13.5px] leading-snug ${isDark ? 'text-white/85' : 'text-[#4A3C33]'}`}>{f}</span>
            </li>
          ))}
        </ul>

        {/* Add-ons (Starter only) */}
        {plan.addons.length > 0 && (
          <div className="mt-5 pt-4 border-t border-[#EFE2D6]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B5A4E] mb-2.5">
              Optional Add-ons
            </div>
            {plan.addons.map((a, i) => (
              <div key={i} className="flex justify-between items-center text-[12.5px] mb-1.5">
                <span className="text-[#4A3C33]">{a.label}</span>
                <span className="font-bold text-[#C2410C]">+ LKR {a.price}/mo</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <a
          href="https://wa.me/94762140284"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            mt-7 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl
            font-bold text-[15px] border
            transition-all duration-200 hover:-translate-y-0.5
            ${plan.btnClass}
          `}
        >
          Get Started →
        </a>
      </div>
    </div>
  )
}

/* ─── Page ─── */
export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [heroRef,   heroIn]   = useInView(0.1)
  const [cardsRef,  cardsIn]  = useInView(0.05)
  const [helpRef,   helpIn]   = useInView(0.2)
  const [tableRef,  tableIn]  = useInView(0.05)
  const [faqRef,    faqIn]    = useInView(0.1)

  return (
    <div className="min-h-screen" style={{ background: '#FFF9F4' }}>
      <Header />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-16 text-center"
        style={{ background: 'radial-gradient(900px 500px at 50% 0%,rgba(249,115,22,.14),transparent 70%), #FFF9F4' }}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,.10)_0%,transparent_70%)]" />
        </div>
        <div ref={heroRef} className="relative max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className={`flex items-center justify-center gap-2 text-[13px] text-[#6B5A4E] mb-6 transition-all duration-500 ease-out ${heroIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a href="/" className="hover:text-[#C2410C] transition-colors">Home</a>
            <span className="text-[#C8B8AE]">/</span>
            <span className="text-[#C2410C] font-semibold">Pricing</span>
          </div>



          <h1 className={`font-['Satoshi',sans-serif] font-bold text-[clamp(36px,5vw,64px)] leading-[1.08] tracking-[-0.035em] text-[#1C1410] transition-all duration-700 ease-out delay-100 ${heroIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Simple, Honest{' '}
            <span className="text-[#C2410C]">Pricing</span>
          </h1>

          {/* Billing toggle */}
          <div className={`mt-7 inline-flex items-center gap-3 bg-white border border-[#EFE2D6] rounded-2xl p-1.5 shadow-sm transition-all duration-700 ease-out delay-200 ${heroIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-xl text-[13.5px] font-bold transition-all duration-200 ${!annual ? 'bg-[#C2410C] text-white shadow-[0_4px_12px_rgba(194,65,12,.30)]' : 'text-[#6B5A4E] hover:text-[#C2410C]'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-xl text-[13.5px] font-bold transition-all duration-200 flex items-center gap-2 ${annual ? 'bg-[#C2410C] text-white shadow-[0_4px_12px_rgba(194,65,12,.30)]' : 'text-[#6B5A4E] hover:text-[#C2410C]'}`}
            >
              Annual
              <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${annual ? 'bg-white/20 text-white' : 'bg-[#FFF1E6] text-[#C2410C]'}`}>
                Save 15%
              </span>
            </button>
          </div>

          {annual && (
            <p className="mt-3 text-[13px] text-[#6B5A4E]">
              Annual billing - prices shown reflect the 15% discount applied upfront.
            </p>
          )}
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section ref={cardsRef} className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan, i) => {
            const discounted = annual
              ? { ...plan, basePrice: Math.round(plan.basePrice * 0.85), perStudent: Math.round(plan.perStudent * 0.85) }
              : plan
            return <PlanCard key={plan.id} plan={discounted} delay={i * 120} inView={cardsIn} />
          })}
        </div>

        {/* Help strip */}
        <div
          ref={helpRef}
          className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 bg-white border border-[#EFE2D6] rounded-2xl py-5 px-8 shadow-sm text-center sm:text-left transition-all duration-700 ease-out ${helpIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div>
            <p className="font-['Satoshi',sans-serif] font-bold text-[15px] text-[#1C1410]">Not sure which plan is right for you?</p>
            <p className="text-[13px] text-[#6B5A4E] mt-0.5">Our team will help you find the perfect fit for your institute — for free.</p>
          </div>
          <a
            href="https://wa.me/94762140284"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-[14px] shadow-[0_6px_18px_rgba(37,211,102,.28)] hover:bg-[#20BB5A] hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* ── Feature Comparison ── */}
      <section ref={tableRef} className="relative py-20" style={{ background: 'linear-gradient(180deg,#fff 0%,#fffaf5 100%)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className={`text-center mb-12 transition-all duration-700 ease-out ${tableIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

            <h2 className="font-['Satoshi',sans-serif] font-bold text-[clamp(26px,3vw,42px)] leading-[1.12] tracking-[-0.03em] text-[#1C1410]">
              Everything side by side
            </h2>
          </div>

          <div className={`bg-white border border-[#EFE2D6] rounded-3xl overflow-hidden shadow-[0_16px_50px_rgba(60,30,10,.07)] transition-all duration-700 ease-out delay-100 ${tableIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Table header */}
            <div className="grid grid-cols-4 bg-[#FFF9F4] border-b border-[#EFE2D6]">
              <div className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-[#6B5A4E]">Feature</div>
              {PLANS.map(p => (
                <div key={p.id} className={`px-4 py-4 text-center ${p.id === 'standard' ? 'bg-[#FFF1E6]' : ''}`}>
                  <div className={`font-['Satoshi',sans-serif] font-extrabold text-[15px] ${p.id === 'standard' ? 'text-[#C2410C]' : 'text-[#1C1410]'}`}>{p.name}</div>
                  {p.badge && <span className="text-[10px] font-bold text-[#C2410C] bg-[#FDDCC4] px-2 py-0.5 rounded-full">{p.badge}</span>}
                </div>
              ))}
            </div>

            {/* Rows */}
            {COMPARE_ROWS.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-4 border-b border-[#F5ECE4] last:border-0 ${i % 2 === 0 ? '' : 'bg-[#FFFCFA]'}`}
              >
                <div className="px-6 py-3.5 text-[13.5px] font-medium text-[#4A3C33]">{row.feature}</div>
                {['starter', 'standard', 'pro'].map(planId => (
                  <div key={planId} className={`px-4 py-3.5 flex items-center justify-center ${planId === 'standard' ? 'bg-[#FFF1E6]/40' : ''}`}>
                    <CheckIcon ok={row[planId]} />
                  </div>
                ))}
              </div>
            ))}

            {/* CTA row */}
            <div className="grid grid-cols-4 bg-[#FFF9F4] border-t border-[#EFE2D6] py-5">
              <div />
              {PLANS.map(p => (
                <div key={p.id} className={`px-4 flex justify-center ${p.id === 'standard' ? 'bg-[#FFF1E6]/40' : ''}`}>
                  <a
                    href="https://wa.me/94762140284"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      px-5 py-2.5 rounded-xl font-bold text-[13.5px] transition-all duration-200 hover:-translate-y-0.5
                      ${p.id === 'standard'
                        ? 'bg-[#C2410C] text-white shadow-[0_6px_18px_rgba(194,65,12,.30)] hover:bg-[#9A3412]'
                        : 'border border-[#C2410C] text-[#C2410C] hover:bg-[#C2410C] hover:text-white'}
                    `}
                  >
                    Get {p.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={faqRef} className="relative py-20" style={{ background: '#FFF9F4' }}>
        <div className="max-w-2xl mx-auto px-6">
          <div className={`text-center mb-10 transition-all duration-700 ease-out ${faqIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

            <h2 className="font-['Satoshi',sans-serif] font-bold text-[clamp(26px,3vw,42px)] leading-[1.12] tracking-[-0.03em] text-[#1C1410]">
              Pricing <span className="text-[#C2410C]">Questions</span>
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { q: 'Is there a free trial?', a: 'Yes — 14 days, no credit card required. You get full access to all features during the trial so you can evaluate 360 LMS properly before committing.' },
              { q: 'Can I change my plan later?', a: 'Absolutely. You can upgrade or downgrade at any time from your admin dashboard. Billing adjusts at the next cycle — no penalties.' },
              { q: 'What happens if I exceed my student limit?', a: 'We will notify you before you hit the limit. You can upgrade your plan instantly or purchase an additional student block. We never cut off access without warning.' },
              { q: 'Are there setup or onboarding fees?', a: 'None. Setup, data migration, and onboarding support are all included at no extra charge for every plan.' },
              { q: 'Do you offer discounts for non-profits or schools?', a: 'Yes. We offer special rates for registered non-profit educational institutions and government schools. Contact us on WhatsApp to discuss your situation.' },
            ].map((item, i) => (
              <PricingFaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
