import { useEffect, useRef, useState } from 'react'

/* Nodes defined as percentages of the 1040×610 visual box */
const nodes = [
  { n: '01', label: 'Students',      xPct: 40.4, yPct: 4.9  },
  { n: '02', label: 'Teachers',      xPct: 67.3, yPct: 16.4 },
  { n: '03', label: 'Classes',       xPct: 79.3, yPct: 42.6 },
  { n: '04', label: 'Courses',       xPct: 67.3, yPct: 69.7 },
  { n: '05', label: 'Payments',      xPct: 40.4, yPct: 79.5 },
  { n: '06', label: 'Attendance',    xPct: 12.0, yPct: 69.7 },
  { n: '07', label: 'Communication', xPct:  1.0, yPct: 42.6 },
  { n: '08', label: 'Analytics',     xPct: 12.0, yPct: 16.4 },
]

const flow = ['Students','Teachers','Classes','Courses','Payments','Attendance','Communication','Analytics']

function useInView(threshold = 0.15) {
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

export default function Ecosystem() {
  const [sectionRef, inView] = useInView(0.15)

  return (
    <section id="ecosystem" className="sec eco" ref={sectionRef}>
      <div className="wrap">

        {/* Header */}
        <div className={`sec-head eco-head transition-all duration-700 ease-out
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="eyebrow">Unified ecosystem</span>
          <h2>One platform. Every part of your institute</h2>
        </div>

        {/* Orbit visual — percentage-positioned nodes, fully responsive */}
        <div
          className={`ecosystem-visual transition-all duration-1000 ease-out delay-200
            ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.94]'}`}
          aria-label="360 LMS ecosystem overview"
        >
          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />
          <div className="orbit-ring ring-three" />
          <div className="halo" />

          {/* Core hub */}
          <div className={`core-hub bg-white! transition-all duration-700 ease-out delay-400
            ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.7]'}`}>
            <div className="core-glow" />
            <img src="/360logo.png" alt="360 LMS Logo" className="w-28 h-auto" />
          </div>

          {/* Nodes — percentage positioned so they scale with container */}
          {nodes.map((node, i) => (
            <div
              key={node.n}
              className={`eco-node transition-all ease-out
                ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{
                left: `${node.xPct}%`,
                top:  `${node.yPct}%`,
                transitionDuration: '600ms',
                transitionDelay: `${400 + i * 80}ms`,
              }}
            >
              <span className="eco-node-index">{node.n}</span>
              <span>{node.label}</span>
            </div>
          ))}
        </div>

        {/* Flow tags */}
        <div className={`flow transition-all duration-700 ease-out delay-900
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {flow.flatMap((item, i) => {
            const parts = [<span key={item}>{item}</span>]
            if (i < flow.length - 1) parts.push(<em key={`${item}-arrow`}>→</em>)
            return parts
          })}
        </div>

      </div>
    </section>
  )
}
