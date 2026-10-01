import { useEffect, useRef, useState } from 'react'

const FAQS = [
  {
    q: 'Does 360 LMS have a free trial?',
    a: 'Yes! You can get a 14-day free trial. No credit card is required. You can use all features during the trial period.',
  },
  {
    q: 'My student count changes each month — how does billing work?',
    a: 'Billing is based on active students at the start of each billing cycle. You can add or remove students anytime, and your invoice adjusts accordingly at the next cycle. No surprise charges.',
  },
  {
    q: 'Can I migrate from another LMS to 360 LMS?',
    a: 'Yes. Our team provides a free migration service. We import your student data, course materials, and fee records so you can switch without losing anything. Most migrations complete within 48 hours.',
  },
  {
    q: 'Is there a limit on the number of courses I can create?',
    a: 'No limits on courses or lessons. You can create unlimited courses, upload documents and videos, and organise them into structured modules — all included in every plan.',
  },
  {
    q: 'Do parents receive notifications automatically?',
    a: 'Yes. Our automated SMS gateway sends notifications to parents for attendance, fee reminders, exam results, and custom announcements. You can schedule or send instantly with one click.',
  },
  {
    q: 'Is 360 LMS data stored securely?',
    a: 'All data is encrypted in transit and at rest. We use enterprise-grade cloud infrastructure with daily backups and 99.9% uptime SLA. Your student data never leaves our secured Sri Lankan data centre.',
  },
  {
    q: 'Can I use my own domain name?',
    a: 'Starter and Pro Pack plans include a custom subdomain (e.g. yourinstitute.360lms.lk). Pro Pack users can also connect a fully custom domain (e.g. yourinstitute.lk) at no extra cost.',
  },
  {
    q: 'What kind of support is available?',
    a: '24/7 technical support via WhatsApp, email, and our ticket system is included in all plans. Pro Pack users also get a dedicated account manager and priority response within 2 hours.',
  },
]

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

function FaqItem({ q, a, idx, inView }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`
        border border-[#EFE2D6] rounded-2xl bg-white overflow-hidden
        transition-all duration-700 ease-out
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
        hover:border-[#F97316]/40 hover:shadow-[0_8px_28px_rgba(194,65,12,.07)]
        transition-[border-color,box-shadow] duration-300
      `}
      style={{ transitionDelay: `${idx * 60}ms` }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
        aria-expanded={open}
      >
        <span className={`font-['Sora',sans-serif] font-semibold text-[15.5px] leading-snug text-[#1C1410] group-hover:text-[#C2410C] transition-colors duration-200 ${open ? 'text-[#C2410C]' : ''}`}>
          {q}
        </span>
        {/* Plus / Minus icon */}
        <span
          className={`
            flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center
            transition-all duration-300
            ${open
              ? 'bg-[#C2410C] text-white rotate-45'
              : 'bg-[#FFF1E6] text-[#C2410C]'
            }
          `}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* Answer — animated height */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[300px]' : 'max-h-0'}`}
      >
        <p className="px-6 pb-5 text-[15px] leading-[1.75] text-[#57483F]">
          {a}
        </p>
      </div>
    </div>
  )
}

export default function Faq() {
  const [ref, inView] = useInView()

  return (
    <section
      id="faq"
      ref={ref}
      className="relative overflow-hidden py-24"
      style={{ background: 'linear-gradient(180deg,#FFFDF9 0%,#FFF8F2 60%,#FFFDF9 100%)' }}
    >
      {/* Dividers */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F1E4D8] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F1E4D8] to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 right-1/4 w-[500px] h-[300px] rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,.07)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#F1E4D8] text-[#C2410C] text-[11px] font-bold tracking-widest uppercase shadow-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]" />
            FAQ
          </span>
          <h2 className="font-['Sora',sans-serif] font-bold text-[clamp(28px,3.5vw,46px)] leading-[1.12] tracking-[-0.03em] text-[#1C1410]">
            Frequently Asked{' '}
            <span className="text-[#C2410C]">Questions</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#57483F] leading-relaxed">
            Everything you need to know about 360 LMS. Can't find the answer? Chat with us on WhatsApp.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} idx={i} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-10 text-center transition-all duration-700 ease-out delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="text-[15px] text-[#6B5A4E] mb-4">Still have questions? We're happy to help.</p>
          <a
            href="https://wa.me/94762140284"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl
              bg-[#25D366] text-white font-bold text-[15px]
              shadow-[0_8px_24px_rgba(37,211,102,.30)]
              hover:bg-[#20BB5A] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(37,211,102,.38)]
              transition-all duration-200
            "
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
