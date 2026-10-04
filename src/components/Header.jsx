import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { href: '/#platform',  label: 'Platform'  },
  { href: '/#ecosystem', label: 'Features'  },
  { href: '/#solutions', label: 'Solutions' },
]

export default function Header() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  const isPricing = location.pathname === '/pricing'

  const pillStyle = {
    background: scrolled ? 'rgba(255,252,250,0.88)' : 'rgba(255,252,250,0.75)',
    backdropFilter: 'blur(28px) saturate(200%)',
    WebkitBackdropFilter: 'blur(28px) saturate(200%)',
    border: '1px solid rgba(241,228,216,0.75)',
    boxShadow: scrolled
      ? '0 8px 40px rgba(60,30,10,.15), 0 1px 0 rgba(255,255,255,.7) inset'
      : '0 4px 24px rgba(60,30,10,.09), 0 1px 0 rgba(255,255,255,.6) inset',
  }

  return (
    <>
      {/* ════════════════════════════════════════
          DESKTOP — floating pill, centered
          MOBILE  — full-width bar (logo L, toggle R)
         ════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none" style={{ paddingTop: '14px' }}>

        {/* ── Desktop: logo | pill | CTAs ── */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center px-10">
          {/* Logo — outside pill, left */}
          <Link to="/" className="pointer-events-auto flex items-center shrink-0 justify-self-start transition-transform duration-300 hover:scale-105">
            <img src="/360logo.png" alt="360 LMS" className="h-14 w-auto" />
          </Link>

          {/* Nav pill — center */}
          <div
            className="pointer-events-auto flex items-center gap-1 px-2.5 py-2 rounded-[999px] transition-all duration-300"
            style={pillStyle}
          >
            <nav aria-label="Main" className="flex items-center">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="px-4 py-1.5 rounded-full text-[14px] font-semibold text-[#4A3C33] transition-all duration-200 hover:text-[#C2410C] hover:bg-[#F97316]/10"
                >
                  {label}
                </a>
              ))}
              <Link
                to="/pricing"
                className={`px-4 py-1.5 rounded-full text-[14px] font-semibold transition-all duration-200 ${
                  isPricing
                    ? 'text-[#C2410C] bg-[#FFF1E6]'
                    : 'text-[#4A3C33] hover:text-[#C2410C] hover:bg-[#F97316]/10'
                }`}
              >
                Pricing
              </Link>
            </nav>
          </div>

          {/* CTAs — outside pill, right */}
          <div className="pointer-events-auto flex items-center gap-2 justify-self-end">
            <a
              href="/#cta"
              className="px-4 py-2 rounded-full text-[14px] font-semibold text-[#4A3C33] hover:text-[#C2410C] hover:bg-[#F97316]/10 transition-all duration-200"
            >
              Sign in
            </a>
            <a
              href="/#cta"
              className="px-5 py-2.5 rounded-full bg-[#C2410C] text-white font-bold text-[14px] shadow-[0_4px_14px_rgba(194,65,12,.35)] hover:bg-[#9A3412] hover:shadow-[0_6px_20px_rgba(194,65,12,.45)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started →
            </a>
          </div>
        </div>

        {/* ── Mobile bar (full-width, logo left, toggle right) ── */}
        <div className="lg:hidden pointer-events-auto mx-4 rounded-2xl transition-all duration-300" style={pillStyle}>
          <div className="flex items-center justify-between px-4 h-14">
            {/* Logo — LEFT */}
            <Link to="/" className="flex items-center shrink-0">
              <img src="/360logo.png" alt="360 LMS" className="h-10 w-auto" />
            </Link>

            {/* Hamburger — RIGHT */}
            <button
              className="flex flex-col justify-center items-center w-9 h-9 rounded-xl bg-[#FFF1E6] hover:bg-[#FDDCC4] gap-1.5 transition-all duration-200"
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span className={`block w-[18px] h-[2px] bg-[#C2410C] rounded-full transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[8px]' : ''}`} />
              <span className={`block w-[18px] h-[2px] bg-[#C2410C] rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-[18px] h-[2px] bg-[#C2410C] rounded-full transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[8px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Dropdown menu ── */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-40
          transition-all duration-300 ease-in-out pointer-events-none
          ${open ? 'translate-y-[86px] opacity-100' : 'translate-y-[72px] opacity-0'}
        `}
        style={{ padding: '4px 16px 0' }}
      >
        <div
          className={`pointer-events-auto rounded-3xl overflow-hidden ${open ? '' : 'pointer-events-none'}`}
          style={{
            background: 'rgba(255,252,250,0.97)',
            backdropFilter: 'blur(32px) saturate(200%)',
            WebkitBackdropFilter: 'blur(32px) saturate(200%)',
            border: '1px solid rgba(241,228,216,0.85)',
            boxShadow: '0 24px 60px rgba(60,30,10,.18)',
          }}
        >
          <div className="p-3 flex flex-col gap-0.5">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-[14.5px] font-semibold text-[#4A3C33] hover:text-[#C2410C] hover:bg-[#FFF1E6] transition-all duration-200"
              >
                {label}
              </a>
            ))}
            <Link
              to="/pricing"
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-xl text-[14.5px] font-semibold transition-all duration-200 ${isPricing ? 'text-[#C2410C] bg-[#FFF1E6]' : 'text-[#4A3C33] hover:text-[#C2410C] hover:bg-[#FFF1E6]'}`}
            >
              Pricing
            </Link>

            <div className="mt-2 pt-2.5 border-t border-[#F1E4D8] flex flex-col gap-1.5">
              <a
                href="/#cta"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-[14.5px] font-semibold text-[#4A3C33] hover:text-[#C2410C] hover:bg-[#FFF1E6] transition-all duration-200 text-center"
              >
                Sign in
              </a>
              <a
                href="/#cta"
                onClick={() => setOpen(false)}
                className="px-4 py-3.5 rounded-xl bg-[#C2410C] text-white font-bold text-[14.5px] text-center shadow-[0_6px_20px_rgba(194,65,12,.32)] hover:bg-[#9A3412] transition-all duration-200"
              >
                Get Started →
              </a>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
