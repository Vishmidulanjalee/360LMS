import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { href: '/#platform',  label: 'Platform'    },
  { href: '/#ecosystem', label: 'Features'    },
  { href: '/#solutions', label: 'Solutions'   },
  { href: '/#why',       label: 'Why 360 LMS' },
  { href: '/#faq',       label: 'FAQ'         },
  { href: '/#cta',       label: 'Contact'     },
]

export default function Header() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  const isPricing = location.pathname === '/pricing'

  return (
    <>
      {/* ── Floating Pill Navbar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{ paddingTop: '14px' }}
      >
        <div
          className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-[999px] transition-all duration-300"
          style={{
            background: scrolled
              ? 'rgba(255,252,250,0.82)'
              : 'rgba(255,252,250,0.72)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(241,228,216,0.7)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(60,30,10,.14), 0 1px 0 rgba(255,255,255,.6) inset'
              : '0 4px 24px rgba(60,30,10,.08), 0 1px 0 rgba(255,255,255,.5) inset',
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 mr-1">
            <img src="/360logo.png" alt="360 LMS" className="h-9 w-auto" />
          </Link>

          {/* Desktop Nav Links */}
          <nav aria-label="Main" className="hidden lg:flex items-center">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="
                  relative px-3.5 py-1.5 rounded-full
                  text-[13.5px] font-semibold text-[#4A3C33]
                  transition-all duration-200
                  hover:text-[#C2410C] hover:bg-[#F97316]/8
                "
              >
                {label}
              </a>
            ))}

            {/* Pricing — React Router link */}
            <Link
              to="/pricing"
              className={`
                relative px-3.5 py-1.5 rounded-full
                text-[13.5px] font-semibold transition-all duration-200
                ${isPricing
                  ? 'text-[#C2410C] bg-[#FFF1E6]'
                  : 'text-[#4A3C33] hover:text-[#C2410C] hover:bg-[#F97316]/8'
                }
              `}
            >
              Pricing
            </Link>
          </nav>

          {/* Right CTAs (desktop) */}
          <div className="hidden lg:flex items-center gap-2 ml-2">
            <a
              href="/#cta"
              className="px-4 py-1.5 rounded-full text-[13.5px] font-semibold text-[#4A3C33] hover:text-[#C2410C] hover:bg-[#F97316]/8 transition-all duration-200"
            >
              Sign in
            </a>
            <a
              href="/#cta"
              className="
                px-5 py-2 rounded-full
                bg-[#C2410C] text-white font-bold text-[13.5px]
                shadow-[0_4px_14px_rgba(194,65,12,.35)]
                hover:bg-[#9A3412] hover:shadow-[0_6px_20px_rgba(194,65,12,.45)]
                hover:-translate-y-0.5
                transition-all duration-200
              "
            >
              Get Started →
            </a>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="
              lg:hidden flex flex-col justify-center items-center
              w-9 h-9 ml-1 rounded-full gap-1.5
              bg-[#FFF1E6] hover:bg-[#FDDCC4]
              transition-all duration-200
            "
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-4.5 h-0.5 bg-[#C2410C] rounded-full transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-4.5 h-0.5 bg-[#C2410C] rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-4.5 h-0.5 bg-[#C2410C] rounded-full transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* ── Mobile Dropdown ── */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-40 flex justify-center
          transition-all duration-300 ease-in-out pointer-events-none
          ${open ? 'translate-y-[72px] opacity-100' : 'translate-y-[60px] opacity-0'}
        `}
        style={{ paddingTop: '8px', paddingLeft: '16px', paddingRight: '16px' }}
      >
        <div
          className={`pointer-events-auto w-full max-w-sm rounded-3xl overflow-hidden transition-all duration-300 ${open ? '' : 'pointer-events-none'}`}
          style={{
            background: 'rgba(255,252,250,0.95)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            border: '1px solid rgba(241,228,216,0.8)',
            boxShadow: '0 24px 60px rgba(60,30,10,.18)',
          }}
        >
          <div className="p-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl text-[15px] font-semibold text-[#4A3C33] hover:text-[#C2410C] hover:bg-[#FFF1E6] transition-all duration-200"
              >
                {label}
              </a>
            ))}
            <Link
              to="/pricing"
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-2xl text-[15px] font-semibold transition-all duration-200 ${isPricing ? 'text-[#C2410C] bg-[#FFF1E6]' : 'text-[#4A3C33] hover:text-[#C2410C] hover:bg-[#FFF1E6]'}`}
            >
              Pricing
            </Link>

            <div className="mt-2 pt-3 border-t border-[#F1E4D8] flex flex-col gap-2">
              <a
                href="/#cta"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl text-[15px] font-semibold text-[#4A3C33] hover:text-[#C2410C] hover:bg-[#FFF1E6] transition-all duration-200 text-center"
              >
                Sign in
              </a>
              <a
                href="/#cta"
                onClick={() => setOpen(false)}
                className="px-4 py-3.5 rounded-2xl bg-[#C2410C] text-white font-bold text-[15px] text-center shadow-[0_6px_20px_rgba(194,65,12,.32)] hover:bg-[#9A3412] transition-all duration-200"
              >
                Get Started →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer so content doesn't hide under fixed navbar */}
      <div style={{ height: '76px' }} />
    </>
  )
}
