import { useEffect, useRef, useState } from 'react'

/* ── JPG assets only ── */
import tuitionImg    from '../assets/solutions/tuition.jpg'
import schoolImg     from '../assets/solutions/scool.jpg'
import trainingImg   from '../assets/solutions/trainee.jpg'
import onlineImg     from '../assets/solutions/online.jpg'
import corporateImg  from '../assets/solutions/Corporate.jpg'
import individualImg from '../assets/solutions/Individual educators.jpg'

const items = [
  {
    img: tuitionImg,
    title: 'Tuition & Education Institutes',
    subtitle: 'The Learning Hub',
    text: 'Manage classes, batches, fee collection and attendance all in one place. Get real-time reports on student progress and never miss a payment.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    img: schoolImg,
    title: 'Schools',
    subtitle: 'The Campus Command',
    text: 'Connect students, staff and parents on one platform. Streamline communication, track attendance and manage academics with ease.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    img: trainingImg,
    title: 'Professional Training Centers',
    subtitle: 'The Skills Accelerator',
    text: 'Design programs, manage cohorts and issue certifications. Track learner progress and deliver high-impact professional development.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
  {
    img: onlineImg,
    title: 'Online Course Providers',
    subtitle: 'The Digital Classroom',
    text: 'Sell and deliver courses online with a built-in store, video support and automated enrolments. Monetise your knowledge effortlessly.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    img: corporateImg,
    title: 'Corporate Training',
    subtitle: 'The Workforce Upskiller',
    text: 'Upskill entire teams with tracked learning paths and compliance modules. Measure ROI and keep your organisation ahead of the curve.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    img: individualImg,
    title: 'Individual Educators',
    subtitle: 'The Solo Teacher',
    text: 'Run your own classes your way — set your schedule, collect fees and manage students without the overhead of a full institution.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
]

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

export default function Solutions() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)
  const prev = useRef(0)

  /* reset imgLoaded on tab switch for fade effect */
  const handleSelect = (i) => {
    if (i === active) return
    prev.current = active
    setImgLoaded(false)
    setActive(i)
  }

  const item = items[active]

  return (
    <section id="solutions" className="sec" ref={ref}
      style={{ background: 'linear-gradient(180deg,#fff 0%,#fffaf5 100%)' }}>
      <div className="wrap">

        {/* ── Heading ── */}
        <div className={`sec-head transition-all duration-700 ease-out
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2>Built for every <span style={{ color: '#C2410C' }}>learning environment.</span></h2>
          <p>From small tuition centres to large corporate training divisions — 360 LMS adapts to how you teach.</p>
        </div>

        {/* ── Two-column layout ── */}
        <div
          className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: '24px',
            alignItems: 'start',
            transitionDelay: '150ms',
          }}
        >
          {/* ── LEFT: tab list ── */}
          <div style={{
            background: '#fff',
            border: '1px solid #F1E4D8',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(60,30,10,.06)',
          }}>
            {items.map(({ title, icon }, i) => {
              const isActive = i === active
              return (
                <button
                  key={title}
                  onClick={() => handleSelect(i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    padding: '18px 20px',
                    borderBottom: i < items.length - 1 ? '1px solid #F5ECE4' : 'none',
                    background: isActive ? '#FFF6EF' : 'transparent',
                    cursor: 'pointer',
                    border: 'none',
                    borderBottom: i < items.length - 1 ? '1px solid #F5ECE4' : 'none',
                    textAlign: 'left',
                    transition: 'background .2s',
                    position: 'relative',
                  }}
                >
                  {/* active left accent bar */}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      left: 0, top: 0, bottom: 0,
                      width: '3px',
                      background: 'linear-gradient(180deg,#F97316,#C2410C)',
                      borderRadius: '0 2px 2px 0',
                    }} />
                  )}

                  <span style={{
                    fontSize: '14.5px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#C2410C' : '#4A3C33',
                    fontFamily: "'SF Pro Display','Satoshi',sans-serif",
                    lineHeight: 1.3,
                    flex: 1,
                  }}>
                    {title}
                  </span>

                  <span style={{
                    color: isActive ? '#C2410C' : '#B8A89A',
                    flexShrink: 0,
                    transition: 'color .2s',
                  }}>
                    {icon}
                  </span>
                </button>
              )
            })}
          </div>

          {/* ── RIGHT: content panel ── */}
          <div style={{
            background: '#fff',
            border: '1px solid #F1E4D8',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(60,30,10,.06)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: '360px',
          }}>
            {/* Text side */}
            <div style={{
              padding: '40px 36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#B8A89A',
                letterSpacing: '.04em',
                fontFamily: "'SF Pro Display','Satoshi',sans-serif",
                marginBottom: '16px',
              }}>
                {String(active + 1).padStart(2, '0')}
              </span>

              <h3 style={{
                fontSize: 'clamp(22px,2.2vw,28px)',
                fontWeight: 800,
                color: '#1C1410',
                lineHeight: 1.15,
                letterSpacing: '-.025em',
                fontFamily: "'SF Pro Display','Satoshi',sans-serif",
                margin: 0,
              }}>
                {item.subtitle}
              </h3>

              <p style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#57483F',
                marginTop: '16px',
                fontFamily: "'SF Pro Display','Satoshi',sans-serif",
              }}>
                {item.text}
              </p>

              <button style={{
                marginTop: '28px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg,#F97316,#C2410C)',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 700,
                fontFamily: "'SF Pro Display','Satoshi',sans-serif",
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(194,65,12,.28)',
                width: 'fit-content',
                transition: 'transform .15s,box-shadow .15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(194,65,12,.38)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 20px rgba(194,65,12,.28)' }}
              >
                Learn more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            {/* Image side */}
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '0 20px 20px 0',
              minHeight: '300px',
            }}>
              <img
                key={active}
                src={item.img}
                alt={item.title}
                onLoad={() => setImgLoaded(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  opacity: imgLoaded ? 1 : 0,
                  transition: 'opacity .4s ease',
                }}
              />
              {/* subtle gradient overlay on image */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(249,115,22,.08) 0%, transparent 60%)',
                pointerEvents: 'none',
              }} />
            </div>
          </div>
        </div>

        {/* ── Responsive stacked on mobile ── */}
        <style>{`
          @media (max-width: 860px) {
            #solutions .sol-two-col {
              grid-template-columns: 1fr !important;
            }
            #solutions .sol-panel {
              grid-template-columns: 1fr !important;
            }
            #solutions .sol-img-side {
              border-radius: 0 0 20px 20px !important;
              min-height: 220px !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
