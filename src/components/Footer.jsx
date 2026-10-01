import { Logo } from './Icons.jsx'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="flex items-center gap-3">
          <img src="/360logo.png" alt="360 LMS Logo" className="h-13 w-auto" />
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[14px] text-[#6B5A4E]">
            © 2026 360 LMS. Made in Sri Lanka.
          </span>
        </div>
        <nav className="foot-links" aria-label="Footer">
          <a href="#platform">Platform</a>
          <a href="#solutions">Solutions</a>
          <a href="#cta">Contact</a>
          <a href="#">Privacy</a>
        </nav>
      </div>
    </footer>
  )
}
