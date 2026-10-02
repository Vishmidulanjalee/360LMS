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
    btnClass: 'bg-white border border-[#FDC094] text-[#C2410C] shadow-sm hover:bg-[#FFEAD9] hover:text-[#9A3412] hover:border-[#C2410C]',
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
  {
    feature: 'Custom Subdomain',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    starter: true, standard: true, pro: true,
  },
  {
    feature: 'Custom Domain (yourinstitute.lk)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    starter: false, standard: false, pro: true,
  },
  {
    feature: 'Active Students',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    starter: '500', standard: '1,000', pro: 'Unlimited',
  },
  {
    feature: 'Unlimited Courses & Lessons',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    starter: true, standard: true, pro: true,
  },
  {
    feature: 'Payment Gateway',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    starter: 'Bank Transfer', standard: true, pro: true,
  },
  {
    feature: 'Own SMS Gateway',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    starter: false, standard: true, pro: true,
  },
  {
    feature: 'SMS Notifications Add-on',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    starter: 'LKR 200/mo', standard: 'Included', pro: 'Included',
  },
  {
    feature: 'Staff Management',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    starter: 'LKR 350/mo', standard: 'Included', pro: 'Included',
  },
  {
    feature: 'Video Piracy Watermark',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    starter: 'LKR 200/mo', standard: 'Included', pro: 'Included',
  },
  {
    feature: 'Expenses Management',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    starter: false, standard: false, pro: true,
  },
  {
    feature: 'QR & NFC Attendance',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    starter: true, standard: true, pro: true,
  },
  {
    feature: 'Live Zoom Integration',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    starter: true, standard: true, pro: true,
  },
  {
    feature: 'Support Response Time',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    starter: '24hr', standard: '4hr', pro: '2hr',
  },
  {
    feature: 'Dedicated Account Manager',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1-.84a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    starter: false, standard: false, pro: true,
  },
]

/* ─── Row categories for visual grouping ─── */
const ROW_GROUPS = [
  { label: 'Platform', rows: [0, 1, 2, 3] },
  { label: 'Payments & Messaging', rows: [4, 5, 6] },
  { label: 'Add-ons & Features', rows: [7, 8, 9] },
  { label: 'Productivity', rows: [10, 11] },
  { label: 'Support', rows: [12, 13] },
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
function CheckIcon({ ok, isStandard = false, isPro = false }) {
  if (ok === true) {
    if (isStandard)
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C2410C]/10">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5 6.5-7" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )
    if (isPro)
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F97316]/10">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5 6.5-7" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6B5A4E]/8">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8l3.5 3.5 6.5-7" stroke="#6B5A4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )
  }
  if (ok === false)
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#EFE2D6]/60">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 2l8 8M10 2l-8 8" stroke="#C8B8AE" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>
    )
  /* string value */
  const isAddon = typeof ok === 'string' && ok.startsWith('LKR')
  const isIncluded = ok === 'Included'
  if (isAddon)
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF1E6] border border-[#F97316]/20 text-[11px] font-bold text-[#C2410C] whitespace-nowrap">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        {ok}
      </span>
    )
  if (isIncluded)
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F7EE] border border-[#16A34A]/20 text-[11px] font-bold text-[#16A34A] whitespace-nowrap">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        Included
      </span>
    )
  /* time / student count / other text */
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#FFF9F4] border border-[#EFE2D6] text-[12px] font-bold text-[#4A3C33] whitespace-nowrap">
      {ok}
    </span>
  )
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
        transition-all duration-700 ease-out
        ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.97]'}
        hover:-translate-y-1
        ${plan.id === 'standard'
          ? 'shadow-[0_32px_80px_rgba(194,65,12,.22)] ring-2 ring-[#C2410C]/30 animate-[standardGlow_3s_ease-in-out_infinite]'
          : plan.id === 'pro'
          ? 'shadow-[0_32px_80px_rgba(249,115,22,.18)] ring-2 ring-[#F97316]/25 animate-[proGlow_3s_ease-in-out_infinite]'
          : 'shadow-[0_24px_60px_rgba(60,30,10,.12)]'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Badge — ribbon label from top edge */}
      {plan.badge && (
        <div className="absolute top-0 right-6 z-10" style={{ animation: 'badgeFloat 2.8s ease-in-out infinite' }}>
          {/* Ribbon body */}
          <div className={`
            relative px-4 pt-2 pb-3.5 text-[10px] font-extrabold tracking-widest uppercase text-center min-w-[80px]
            ${plan.id === 'standard'
              ? 'bg-[linear-gradient(110deg,#ffffff,40%,#ffe4cc,55%,#ffffff)] bg-[length:200%_auto] animate-[shimmerText_2.5s_linear_infinite] text-[#C2410C]'
              : 'bg-[linear-gradient(110deg,#EA580C,40%,#FDE68A,55%,#EA580C)] bg-[length:200%_auto] animate-[shimmerText_2.5s_linear_infinite] text-white'}
            shadow-[0_4px_20px_rgba(0,0,0,0.24)]
          `}>
            {plan.badge}
            {/* Bottom notch — creates the folded ribbon tip */}
            <div className="absolute -bottom-[9px] left-0 right-0 flex">
              <div className={`w-1/2 h-[9px] ${plan.id === 'standard' ? 'bg-white' : 'bg-[#EA580C]'}`}
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
              <div className={`w-1/2 h-[9px] ${plan.id === 'standard' ? 'bg-white' : 'bg-[#EA580C]'}`}
                style={{ clipPath: 'polygon(0 0, 0 100%, 100% 0)' }} />
            </div>
          </div>
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
        <div className={`mt-5 rounded-2xl overflow-hidden ${isDark ? 'bg-white/10' : 'bg-[#FFF9F4] border border-[#EFE2D6]'}`}>
          {/* Header */}
          <div className={`px-4 pt-3.5 pb-2.5 flex items-center justify-between border-b ${isDark ? 'border-white/10' : 'border-[#EFE2D6]'}`}>
            <span className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-white/60' : 'text-[#6B5A4E]'}`}>
              Estimate Students
            </span>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-[#EFE2D6] shadow-[0_2px_8px_rgba(194,65,12,.04)]'}`}>
              <span className="relative flex h-1.5 w-1.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-white' : 'bg-[#C2410C]'}`}></span>
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isDark ? 'bg-white' : 'bg-[#C2410C]'}`}></span>
              </span>
              <span className={`text-[9px] font-bold uppercase tracking-widest ${isDark ? 'text-white/80' : 'text-[#C2410C]'}`}>
                Limit: {plan.maxStudents < 9999 ? plan.maxStudents.toLocaleString() : '∞'}
              </span>
            </div>
          </div>

          {/* Direct input + stepper */}
          <div className="px-4 py-3.5 flex items-center gap-2">
            <button
              onClick={() => setStudents(s => Math.max(0, s - 10))}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xl shrink-0 transition-all duration-150 active:scale-90 select-none
                ${isDark ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-white border border-[#EFE2D6] text-[#C2410C] hover:bg-[#FFF1E6] shadow-sm'}`}
            >−</button>

            <div className="flex-1 relative">
              <input
                type="number"
                min={0}
                max={plan.maxStudents < 9999 ? plan.maxStudents : 99999}
                value={students}
                onChange={e => {
                  const v = Math.max(0, Math.min(plan.maxStudents < 9999 ? plan.maxStudents : 99999, Number(e.target.value) || 0))
                  setStudents(v)
                }}
                className={`w-full text-center text-[22px] font-extrabold rounded-xl py-2 px-3 outline-none border-2 transition-colors duration-200
                  ${isDark
                    ? 'bg-white/10 border-white/20 text-white focus:border-white/50'
                    : 'bg-white border-[#EFE2D6] text-[#C2410C] focus:border-[#C2410C]'}
                  [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
              />
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold pointer-events-none ${isDark ? 'text-white/40' : 'text-[#A8978A]'}`}>
                students
              </span>
            </div>

            <button
              onClick={() => setStudents(s => Math.min(plan.maxStudents < 9999 ? plan.maxStudents : 99999, s + 10))}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xl shrink-0 transition-all duration-150 active:scale-90 select-none
                ${isDark ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-white border border-[#EFE2D6] text-[#C2410C] hover:bg-[#FFF1E6] shadow-sm'}`}
            >+</button>
          </div>

          {/* Quick presets */}
          <div className="px-4 pb-3 flex gap-1.5 flex-wrap">
            {[50, 100, 200, 500, ...(plan.maxStudents >= 1000 ? [1000] : [])].map(n => (
              <button
                key={n}
                onClick={() => setStudents(Math.min(n, plan.maxStudents < 9999 ? plan.maxStudents : 99999))}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all duration-150 active:scale-95
                  ${students === n
                    ? isDark ? 'bg-white text-[#C2410C]' : 'bg-[#C2410C] text-white'
                    : isDark ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-white border border-[#EFE2D6] text-[#6B5A4E] hover:border-[#C2410C] hover:text-[#C2410C]'
                  }`}
              >{n}</button>
            ))}
          </div>

          {/* Total */}
          <div className={`mx-4 mb-4 rounded-xl px-4 py-3 flex justify-between items-center
            ${isDark ? 'bg-white/10' : 'bg-white border border-[#EFE2D6] shadow-sm'}`}>
            <span className={`text-[12px] font-semibold ${isDark ? 'text-white/60' : 'text-[#6B5A4E]'}`}>Total / Month</span>
            <span className={`font-['Satoshi',sans-serif] text-[22px] font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#C2410C]'}`}>
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
          href="#whatsapp"
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
            <span className="relative inline-block text-transparent bg-clip-text bg-[linear-gradient(110deg,#C2410C,45%,#F97316,55%,#C2410C)] bg-[length:200%_auto] animate-[shimmerText_3s_linear_infinite]">
              Pricing
            </span>
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
            href="#whatsapp"
            className="group shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-[14px] shadow-[0_6px_18px_rgba(37,211,102,.28)] hover:bg-[#20BB5A] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(37,211,102,.40)] transition-all duration-200"
          >
            <span className="inline-flex transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-[1.35] group-hover:-rotate-12 group-hover:-translate-y-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </span>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* ── Feature Comparison ── */}
      <section ref={tableRef} className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(180deg,#fff 0%,#fffaf5 100%)' }}>
        {/* bg blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full opacity-40" style={{background:'radial-gradient(ellipse,rgba(249,115,22,.08) 0%,transparent 70%)'}} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          {/* Heading */}
          <div className={`text-center mb-14 transition-all duration-700 ease-out ${tableIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h2 className="font-['Satoshi',sans-serif] font-bold text-[clamp(28px,3.5vw,46px)] leading-[1.1] tracking-[-0.03em] text-[#1C1410]">
              Everything <span className="text-transparent bg-clip-text bg-[linear-gradient(110deg,#C2410C,45%,#F97316,55%,#C2410C)] bg-[length:200%_auto] animate-[shimmerText_3s_linear_infinite]">side by side</span>
            </h2>
          </div>

          {/* Table card */}
          <div className={`relative rounded-3xl overflow-hidden transition-all duration-700 ease-out delay-100 ${tableIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{
              background: 'linear-gradient(180deg, #FFF9F4 0%, #FFF1E6 100%)',
              border: '1px solid #FDC094',
              boxShadow: '0 24px 80px rgba(194,65,12,.12), 0 4px 16px rgba(194,65,12,.08)'
            }}>

            {/* ─── Sticky Plan Header ─── */}
            <div className="grid grid-cols-4 sticky top-0 z-20 shadow-[0_4px_12px_rgba(194,65,12,.05)]">
              {/* Feature label col */}
              <div className="px-6 py-6 flex items-end border-b border-r border-[#FDC094]/50" style={{background:'linear-gradient(180deg,#FFF5EC 0%,#FFF1E6 100%)'}}>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#C2410C]/60 mb-1">Feature</span>
              </div>

              {/* Starter */}
              <div className="px-4 py-6 flex flex-col items-center gap-1.5 border-b border-r border-[#FDC094]/50 relative" style={{background:'linear-gradient(180deg,#FFF5EC 0%,#FFF1E6 100%)'}}>
                <span className="font-['Satoshi',sans-serif] font-extrabold text-[16px] text-[#9A3412] mt-2 animate-pulse">Starter</span>
                <span className="text-[11px] text-[#C2410C]/80 font-semibold">LKR 3,500/mo</span>
              </div>

              {/* Standard — highlighted */}
              <div className="px-4 py-6 flex flex-col items-center gap-1.5 border-b border-r border-[#F97316]/30 relative overflow-hidden"
                style={{background:'linear-gradient(180deg,#FFEDD5 0%,#FFD8B5 100%)'}}>
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F97316] to-[#C2410C]" />
                
                {/* Ribbon Badge */}
                <div className="absolute top-0 right-4 z-10" style={{ animation: 'badgeFloat 2.8s ease-in-out infinite' }}>
                  <div className="relative px-2 pt-1.5 pb-2 text-[9px] font-extrabold tracking-widest uppercase text-center min-w-[70px] bg-[linear-gradient(110deg,#ffffff,40%,#ffe4cc,55%,#ffffff)] bg-[length:200%_auto] animate-[shimmerText_2.5s_linear_infinite] text-[#C2410C] shadow-[0_4px_12px_rgba(194,65,12,.2)]">
                     Most Popular
                    <div className="absolute -bottom-[6px] left-0 right-0 flex">
                      <div className="w-1/2 h-[6px] bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
                      <div className="w-1/2 h-[6px] bg-white" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 0)' }} />
                    </div>
                  </div>
                </div>

                <span className="font-['Satoshi',sans-serif] font-extrabold text-[17px] text-[#C2410C] mt-2 animate-pulse">Standard</span>
                <span className="text-[11px] text-[#9A3412] font-semibold">LKR 5,750/mo</span>
              </div>

              {/* Pro Pack */}
              <div className="px-4 py-6 flex flex-col items-center gap-1.5 border-b border-[#FDC094]/50 relative"
                style={{background:'linear-gradient(180deg,#FFF5EC 0%,#FFF1E6 100%)'}}>
                
                {/* Ribbon Badge */}
                <div className="absolute top-0 right-4 z-10" style={{ animation: 'badgeFloat 3.2s ease-in-out infinite' }}>
                  <div className="relative px-2 pt-1.5 pb-2 text-[9px] font-extrabold tracking-widest uppercase text-center min-w-[70px] bg-[linear-gradient(110deg,#EA580C,40%,#FDE68A,55%,#EA580C)] bg-[length:200%_auto] animate-[shimmerText_2.5s_linear_infinite] text-white shadow-[0_4px_12px_rgba(194,65,12,.2)]">
                     Best Value
                    <div className="absolute -bottom-[6px] left-0 right-0 flex">
                      <div className="w-1/2 h-[6px] bg-[#EA580C]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
                      <div className="w-1/2 h-[6px] bg-[#EA580C]" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 0)' }} />
                    </div>
                  </div>
                </div>

                <span className="font-['Satoshi',sans-serif] font-extrabold text-[16px] text-[#9A3412] mt-2 animate-pulse">Pro Pack</span>
                <span className="text-[11px] text-[#C2410C]/80 font-semibold">LKR 7,000/mo</span>
              </div>
            </div>

            {/* ─── Grouped Rows ─── */}
            {ROW_GROUPS.map((group) => (
              <div key={group.label}>
                {/* Category separator */}
                <div className="grid grid-cols-4 border-b border-[#FDC094]/40" style={{background:'linear-gradient(90deg,#FFEAD9 0%,#FFF5EC 100%)'}}>
                  <div className="col-span-4 px-6 py-2.5 flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C2410C]">{group.label}</span>
                  </div>
                </div>

                {/* Feature rows in this group */}
                {group.rows.map((rowIdx, j) => {
                  const row = COMPARE_ROWS[rowIdx]
                  const isEven = j % 2 === 0
                  return (
                    <div
                      key={rowIdx}
                      className="grid grid-cols-4 border-b border-[#FDC094]/30 last:border-0 group/row hover:bg-[#FFEAD9] transition-colors duration-150"
                      style={!isEven ? {background:'rgba(255,245,236,.6)'} : {}}
                    >
                      {/* Feature name + icon */}
                      <div className="px-6 py-4 flex items-center gap-3 border-r border-[#FDC094]/30">
                        <span className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[#C2410C] bg-[#FFD8B5]/50 group-hover/row:bg-[#FFD8B5] transition-colors duration-150">
                          {row.icon}
                        </span>
                        <span className="text-[13px] font-bold text-[#7C2D12] leading-snug">{row.feature}</span>
                      </div>

                      {/* Starter */}
                      <div className="px-4 py-4 flex items-center justify-center border-r border-[#FDC094]/30">
                        <CheckIcon ok={row.starter} />
                      </div>

                      {/* Standard — highlighted col */}
                      <div className="px-4 py-4 flex items-center justify-center border-r border-[#F97316]/30"
                        style={{background:'rgba(255,216,181,.3)'}}>
                        <CheckIcon ok={row.standard} isStandard />
                      </div>

                      {/* Pro */}
                      <div className="px-4 py-4 flex items-center justify-center">
                        <CheckIcon ok={row.pro} isPro />
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}

            {/* ─── CTA Row ─── */}
            <div className="grid grid-cols-4 border-t-2 border-[#FDC094]" style={{background:'linear-gradient(180deg,#FFF5EC 0%,#FFEAD9 100%)'}}>
              <div className="px-6 py-6 flex items-center">
                <p className="text-[13px] font-bold text-[#9A3412] leading-relaxed">Ready to grow your institute?</p>
              </div>

              {/* Starter CTA */}
              <div className="px-4 py-6 flex items-center justify-center border-r border-[#FDC094]/50">
                <a
                  href="#whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[13px] bg-white text-[#C2410C] hover:bg-[#FFD8B5] hover:text-[#9A3412] hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-[0_8px_20px_rgba(194,65,12,.15)] border border-[#FDC094]"
                >
                  Get Starter
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform duration-150"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>

              {/* Standard CTA — prominent */}
              <div className="px-4 py-6 flex items-center justify-center border-r border-[#F97316]/30" style={{background:'rgba(255,216,181,.4)'}}>
                <a
                  href="#whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-extrabold text-[14px] text-white hover:-translate-y-0.5 transition-all duration-200"
                  style={{
                    background:'linear-gradient(135deg,#F97316,#C2410C)',
                    boxShadow:'0 8px 22px rgba(194,65,12,.4)'
                  }}
                >
                  Get Standard
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform duration-150"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>

              {/* Pro CTA */}
              <div className="px-4 py-6 flex items-center justify-center">
                <a
                  href="#whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[13px] text-white hover:-translate-y-0.5 transition-all duration-200 border border-[#F97316]/20"
                  style={{
                    background:'linear-gradient(135deg,#F59E0B,#D97706)',
                    boxShadow:'0 8px 22px rgba(217,119,6,.25)'
                  }}
                >
                  Get Pro Pack
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform duration-150"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
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
