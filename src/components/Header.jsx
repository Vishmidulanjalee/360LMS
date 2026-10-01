import { useState } from 'react'

const NAV_LINKS = [
  { href: '#platform',  label: 'Platform'    },
  { href: '#ecosystem', label: 'Features'    },
  { href: '#solutions', label: 'Solutions'   },
  { href: '#why',       label: 'Why 360 LMS' },
  { href: '#cta',       label: 'Contact'     },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      {/* ── Desktop bar ── */}
      <div
        className="wrap"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 76, position: 'relative' }}
      >
        {/* Logo — left */}
        <a href="/" className="flex items-center justify-self-start">
          <img src="/360logo.png" alt="360 LMS" className="h-15 w-auto" />
        </a>

        {/* Desktop nav — absolute center, hidden on mobile */}
        <nav aria-label="Main" className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-1 list-none m-0 p-0">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="relative px-4 py-2 rounded-xl text-[14.5px] font-semibold text-[#4A3C33]
                    transition-all duration-200 hover:text-[#C2410C] hover:bg-[#FFF1E6] group"
                >
                  {label}
                  <span className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-[#F97316]
                    scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side: Desktop CTAs + Hamburger */}
        <div className="flex items-center gap-2 justify-self-end">
          {/* Desktop CTA buttons */}
          <a href="#cta" className="hidden md:inline-flex px-4 py-2 rounded-xl text-[14px] font-semibold
            text-[#4A3C33] hover:text-[#C2410C] hover:bg-[#FFF1E6] transition-all duration-200">
            Sign in
          </a>
          <a href="#cta" className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl
            bg-[#C2410C] text-white font-bold text-[14px]
            shadow-[0_6px_20px_rgba(194,65,12,.32)]
            hover:bg-[#9A3412] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(194,65,12,.42)]
            transition-all duration-200">
            Get Started <span className="text-base">→</span>
          </a>

          {/* Hamburger — right side, mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl
              border border-[#EDE0D4] bg-white gap-1.5 transition-all duration-200
              hover:border-[#F97316]/40 hover:bg-[#FFF9F5]"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-[#1C1410] rounded-full transition-all duration-300 origin-center
              ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#1C1410] rounded-full transition-all duration-300
              ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#1C1410] rounded-full transition-all duration-300 origin-center
              ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
        ${open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white/95 backdrop-blur-md border-t border-[#F1E4D8] px-5 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-[15px] font-semibold text-[#4A3C33]
                hover:text-[#C2410C] hover:bg-[#FFF1E6] transition-all duration-200"
            >
              {label}
            </a>
          ))}
          <div className="mt-3 pt-3 border-t border-[#F1E4D8] flex flex-col gap-2">
            <a href="#cta" onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-[15px] font-semibold text-[#4A3C33]
                hover:text-[#C2410C] hover:bg-[#FFF1E6] transition-all duration-200 text-center">
              Sign in
            </a>
            <a href="#cta" onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl bg-[#C2410C] text-white font-bold text-[15px]
                text-center shadow-[0_6px_20px_rgba(194,65,12,.32)]
                hover:bg-[#9A3412] transition-all duration-200">
              Get Started →
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
