import { useEffect, useRef, useState, useCallback } from 'react'

/* ── JPG assets only ── */
import tuitionImg    from '../assets/solutions/tuition.jpg'
import schoolImg     from '../assets/solutions/scool.jpg'
import trainingImg   from '../assets/solutions/trainee.jpg'
import onlineImg     from '../assets/solutions/online.jpg'
import corporateImg  from '../assets/solutions/Corporate.jpg'
import individualImg from '../assets/solutions/Individual educators.jpg'

const PANEL_HEIGHT = 420

const items = [
  {
    img: tuitionImg,
    title: 'Tuition & Education Institutes',
    subtitle: 'The Learning Hub',
    text: 'Manage classes, batches, fee collection and attendance all in one place. Get real-time reports on student progress and never miss a payment.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
]

function useInView(threshold = 0.1) {
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

/* Spinner SVG */
function Spinner() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round"
      style={{ animation: 'solSpin .7s linear infinite', display: 'block' }}
    >
      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0" opacity=".25"/>
      <path d="M12 3a9 9 0 0 1 9 9"/>
    </svg>
  )
}

export default function Solutions() {
  const [sectionRef, inView] = useInView()
  const [active, setActive]       = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [contentIn, setContentIn] = useState(true)   // content slide-in state
  const [btnLoading, setBtnLoading] = useState(false) // button spinner
  const [hoveredTab, setHoveredTab] = useState(null)

  /* Switch tab with content exit → swap → enter animation */
  const handleSelect = useCallback((i) => {
    if (i === active) return
    setContentIn(false)       // slide out
    setImgLoaded(false)
    setTimeout(() => {
      setActive(i)
      setContentIn(true)      // slide in new content
    }, 220)
  }, [active])

  /* Button loading mock */
  const handleLearnMore = () => {
    if (btnLoading) return
    setBtnLoading(true)
    setTimeout(() => setBtnLoading(false), 1800)
  }

  const item = items[active]

  return (
    <section
      id="solutions"
      className="sec"
      ref={sectionRef}
      style={{ background: 'linear-gradient(180deg,#fff 0%,#fffaf5 100%)' }}
    >
      {/* keyframes injected once */}
      <style>{`
        @keyframes solSpin { to { transform: rotate(360deg); } }
        @keyframes solSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes solFadeImg {
          from { opacity: 0; transform: scale(1.025); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmerSol {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .sol-tab-btn:hover .sol-tab-bg    { opacity: 1 !important; }
        .sol-tab-btn:hover .sol-tab-label  { color: #C2410C !important; }
        .sol-tab-btn:hover .sol-tab-icon   { color: #C2410C !important; }

        /* ── Image container animations ── */
        @keyframes solCurtain {
          from { clip-path: inset(0 0 0 100%); }
          to   { clip-path: inset(0 0 0 0); }
        }
        @keyframes solCurtainBar {
          0%   { transform: translateX(0);    opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes solKenBurns {
          0%   { transform: scale(1)    translate(0, 0); }
          100% { transform: scale(1.12) translate(-2%, -1.5%); }
        }
        @keyframes solShineSweep {
          0%, 70% { left: -60%; }
          100%    { left: 130%; }
        }
        @keyframes solBadgeFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        @keyframes solProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .sol-img-side { isolation: isolate; }
        .sol-img-wrap {
          position: absolute; inset: 0; z-index: 2; overflow: hidden;
          animation: solCurtain .8s cubic-bezier(.77,0,.18,1) both;
        }
        .sol-img-wrap img {
          transition: filter .5s ease;
        }
        .sol-img-wrap.is-loaded img {
          animation: solFadeImg .65s cubic-bezier(.22,.68,0,1) both,
                     solKenBurns 14s ease-in-out .65s infinite alternate;
        }
        .sol-img-side:hover .sol-img-wrap img { filter: saturate(1.15) brightness(1.04); }
        .sol-img-zoom { position:absolute; inset:0; transition: transform .8s cubic-bezier(.2,.7,.2,1); }
        .sol-img-side:hover .sol-img-zoom { transform: scale(1.06); }
        .sol-curtain-bar {
          position: absolute; top: 0; bottom: 0; right: 0; width: 100%; z-index: 3; pointer-events: none;
          background: linear-gradient(90deg, #F97316, #C2410C);
          transform-origin: right;
          animation: solCurtainBar .8s cubic-bezier(.77,0,.18,1) both;
          clip-path: inset(0 0 0 calc(100% - 6px));
        }
        .sol-shine {
          position: absolute; top: 0; left: -60%; width: 45%; height: 100%; z-index: 4; pointer-events: none;
          background: linear-gradient(105deg, transparent, rgba(255,255,255,.35), transparent);
          transform: skewX(-18deg);
          animation: solShineSweep 5s ease-in-out 1s infinite;
        }
        .sol-badge-float { animation: solBadgeFloat 3.2s ease-in-out infinite; }
        .sol-progress {
          position: absolute; left: 0; right: 0; bottom: 0; height: 3px; z-index: 5;
          background: linear-gradient(90deg, #F97316, #C2410C);
          transform-origin: left;
          animation: solProgress 1.1s cubic-bezier(.2,.7,.2,1) .2s both;
        }
        @media (prefers-reduced-motion: reduce) {
          .sol-img-wrap, .sol-img-wrap.is-loaded img, .sol-shine, .sol-badge-float, .sol-curtain-bar, .sol-progress { animation: none !important; }
        }

        /* ── Mobile responsive ── */
        @media (max-width: 900px) {
          .sol-two-col { grid-template-columns: 1fr !important; }
          .sol-panel   {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
          .sol-img-side {
            border-radius: 0 0 20px 20px !important;
            height: auto !important;
            aspect-ratio: 16 / 9;
            min-height: unset !important;
          }
          .sol-img-side img {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center top !important;
          }
        }
        @media (max-width: 580px) {
          .sol-text-side { padding: 28px 22px !important; }
          .sol-img-side  { aspect-ratio: 4 / 3; }
        }
      `}</style>

      <div className="wrap">

        {/* ── Heading – scroll-in ── */}
        <div
          className="sec-head"
          style={{
            opacity:   inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity .7s ease, transform .7s ease',
          }}
        >
          <h2>
            Built for every{' '}
            <span style={{ color: '#C2410C' }}>learning environment.</span>
          </h2>
          <p>From small tuition centres to large corporate training divisions - 360 LMS adapts to how you teach.</p>
        </div>

        {/* ── Two-column layout – scroll-in ── */}
        <div
          className="sol-two-col"
          style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: '24px',
            alignItems: 'stretch',
            opacity:   inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(36px)',
            transition: 'opacity .75s ease .18s, transform .75s ease .18s',
          }}
        >

          {/* ══ LEFT: sidebar tabs ══ */}
          <div style={{
            background: '#fff',
            border: '1px solid #F1E4D8',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(60,30,10,.06)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {items.map(({ title, icon }, i) => {
              const isActive  = i === active
              const isHovered = hoveredTab === i

              return (
                <button
                  key={title}
                  className="sol-tab-btn"
                  onClick={() => handleSelect(i)}
                  onMouseEnter={() => setHoveredTab(i)}
                  onMouseLeave={() => setHoveredTab(null)}
                  style={{
                    flex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    padding: '0 20px',
                    borderBottom: i < items.length - 1 ? '1px solid #F5ECE4' : 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    border: 'none',
                    borderBottom: i < items.length - 1 ? '1px solid #F5ECE4' : 'none',
                    textAlign: 'left',
                    position: 'relative',
                    transition: 'background .18s',
                    minHeight: `${PANEL_HEIGHT / items.length}px`,
                  }}
                >
                  {/* Hover / active fill */}
                  <span
                    className="sol-tab-bg"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isActive
                        ? 'linear-gradient(90deg,#FFF1E6,#FFF8F2)'
                        : 'linear-gradient(90deg,#FFF8F4,#FFFCFA)',
                      opacity: isActive ? 1 : (isHovered ? 1 : 0),
                      transition: 'opacity .18s',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Active left accent bar */}
                  <span style={{
                    position: 'absolute',
                    left: 0, top: 0, bottom: 0,
                    width: isActive ? '3px' : '0px',
                    background: 'linear-gradient(180deg,#F97316,#C2410C)',
                    borderRadius: '0 2px 2px 0',
                    transition: 'width .2s ease',
                  }} />

                  <span
                    className="sol-tab-label"
                    style={{
                      fontSize: '14px',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#C2410C' : '#4A3C33',
                      fontFamily: "'SF Pro Display','Satoshi',sans-serif",
                      lineHeight: 1.35,
                      flex: 1,
                      position: 'relative',
                      transition: 'color .18s, font-weight .1s',
                    }}
                  >
                    {title}
                  </span>

                  <span
                    className="sol-tab-icon"
                    style={{
                      color: isActive || isHovered ? '#C2410C' : '#C4B3A7',
                      flexShrink: 0,
                      position: 'relative',
                      transition: 'color .18s',
                    }}
                  >
                    {icon}
                  </span>
                </button>
              )
            })}
          </div>

          {/* ══ RIGHT: content panel ══ */}
          <div
            className="sol-panel"
            style={{
              background: '#fff',
              border: '1px solid #F1E4D8',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(60,30,10,.06)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              height: `${PANEL_HEIGHT}px`,
            }}
          >
            {/* Text side */}
            <div
              className="sol-text-side"
              style={{
                padding: '40px 36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                animation: contentIn ? 'solSlideIn .32s cubic-bezier(.22,.68,0,1.2) both' : 'none',
                opacity: contentIn ? undefined : 0,
              }}
              key={`text-${active}`}
            >
              {/* Number */}
              <span style={{
                fontSize: '12px',
                fontWeight: 800,
                color: '#D4B8A8',
                letterSpacing: '.1em',
                fontFamily: "'SF Pro Display','Satoshi',sans-serif",
                marginBottom: '14px',
                textTransform: 'uppercase',
              }}>
                {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>

              {/* Subtitle / title */}
              <h3 style={{
                fontSize: 'clamp(20px,2vw,26px)',
                fontWeight: 800,
                color: '#1C1410',
                lineHeight: 1.15,
                letterSpacing: '-.025em',
                fontFamily: "'SF Pro Display','Satoshi',sans-serif",
                margin: 0,
              }}>
                {item.subtitle}
              </h3>

              {/* Category label */}
              <span style={{
                display: 'inline-block',
                marginTop: '10px',
                padding: '4px 12px',
                borderRadius: '999px',
                background: '#FFF1E6',
                color: '#C2410C',
                fontSize: '11.5px',
                fontWeight: 700,
                fontFamily: "'SF Pro Display','Satoshi',sans-serif",
                width: 'fit-content',
              }}>
                {item.title}
              </span>

              {/* Body text */}
              <p style={{
                fontSize: '14.5px',
                lineHeight: 1.72,
                color: '#57483F',
                marginTop: '16px',
                fontFamily: "'SF Pro Display','Satoshi',sans-serif",
              }}>
                {item.text}
              </p>

              {/* CTA button */}
              <button
                onClick={handleLearnMore}
                style={{
                  marginTop: '24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: btnLoading ? '12px 20px' : '12px 22px',
                  borderRadius: '12px',
                  background: btnLoading
                    ? 'linear-gradient(135deg,#E8873A,#A83509)'
                    : 'linear-gradient(135deg,#F97316,#C2410C)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 700,
                  fontFamily: "'SF Pro Display','Satoshi',sans-serif",
                  border: 'none',
                  cursor: btnLoading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 20px rgba(194,65,12,.28)',
                  width: 'fit-content',
                  transition: 'transform .15s, box-shadow .15s, background .2s',
                  minWidth: '140px',
                  justifyContent: 'center',
                }}
                onMouseEnter={e => {
                  if (!btnLoading) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 14px 30px rgba(194,65,12,.40)'
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(194,65,12,.28)'
                }}
              >
                {btnLoading ? (
                  <>
                    <Spinner />
                    Loading…
                  </>
                ) : (
                  <>
                    Learn more
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Image side */}
            <div
              className="sol-img-side"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '0 20px 20px 0',
              }}
            >
              {/* Shimmer skeleton while image loads */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(105deg, #F5ECE4 0%, #FDDCC4 35%, #FFF1E6 50%, #FDDCC4 65%, #F5ECE4 100%)',
                backgroundSize: '300% 100%',
                animation: imgLoaded ? 'none' : 'shimmerSol 1.6s ease-in-out infinite',
                opacity: imgLoaded ? 0 : 1,
                transition: 'opacity .5s ease',
                zIndex: 1,
                pointerEvents: 'none',
              }} />

              <div key={`wrap-${active}`} className={`sol-img-wrap ${imgLoaded ? 'is-loaded' : ''}`}>
                <div className="sol-img-zoom">
                  <img
                    src={item.img}
                    alt={item.title}
                    onLoad={() => setImgLoaded(true)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      display: 'block',
                      opacity: imgLoaded ? 1 : 0,
                    }}
                  />
                </div>
                <span className="sol-shine" aria-hidden="true" />
              </div>

              {/* Orange wipe edge that leads the curtain reveal */}
              <span key={`bar-${active}`} className="sol-curtain-bar" aria-hidden="true" />

              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 3,
                background: 'linear-gradient(180deg, rgba(249,115,22,.07) 0%, transparent 50%, rgba(28,20,16,.18) 100%)',
                pointerEvents: 'none',
              }} />

              {/* Item number badge on image */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                zIndex: 6,
                animation: imgLoaded ? 'solSlideIn .4s .3s ease both' : 'none',
                opacity: imgLoaded ? undefined : 0,
              }}>
                <div className="sol-badge-float" style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,.88)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#C2410C',
                  fontFamily: "'SF Pro Display','Satoshi',sans-serif",
                  border: '1px solid rgba(255,255,255,.9)',
                  boxShadow: '0 4px 12px rgba(60,30,10,.12)',
                }}>
                  {item.title}
                </div>
              </div>

              {/* Progress line along the bottom */}
              <span key={`prog-${active}`} className="sol-progress" aria-hidden="true" />
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}
