import { useEffect, useRef, useState } from 'react'

import simpleImg from '../assets/built/simple.jpg'
import connectedImg from '../assets/built/connected.jpg'
import automationImg from '../assets/built/automation.jpg'
import scalableImg from '../assets/built/scalable.jpg'

const items = [
  { img: simpleImg,     title: 'Simple',    text: 'Everything organized in one easy-to-use platform.' },
  { img: connectedImg,  title: 'Connected', text: 'Bring students, teachers, staff, and administrators together.' },
  { img: automationImg, title: 'Automated', text: 'Reduce repetitive administrative work with smart automation.' },
  { img: scalableImg,   title: 'Scalable',  text: 'Built to grow with your institute.' },
]

/* Intersection Observer hook */
function useInView(threshold = 0.2) {
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

/* Card with subtle 3D tilt that follows the cursor */
function WhyCard({ img, title, text, index, inView }) {
  const cardRef = useRef(null)
  const [settled, setSettled] = useState(false)
  const delay = 200 + index * 140

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setSettled(true), delay + 900)
    return () => clearTimeout(t)
  }, [inView, delay])

  const onMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(x * 6).toFixed(2)}deg`)
  }
  const onLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <article
      ref={cardRef}
      className={`why-card ${inView ? 'is-in' : ''} ${settled ? 'is-settled' : ''}`}
      style={{ '--d': `${delay}ms` }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="why-media">
        <img src={img} alt={title} loading="lazy" />
        <span className="why-shine" aria-hidden="true" />
        <span className="why-num">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="why-body">
        <h3>{title}</h3>
        <span className="why-bar" aria-hidden="true" />
        <p>{text}</p>
      </div>
    </article>
  )
}

export default function Why() {
  const [ref, inView] = useInView()

  return (
    <section id="why" className="sec why" ref={ref}>
      <span className="why-orb why-orb-a" aria-hidden="true" />
      <span className="why-orb why-orb-b" aria-hidden="true" />

      <div className="wrap relative">
        <div className={`sec-head transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2>Built for the way <span className="text-[#C2410C]">modern institutes work</span></h2>
        </div>

        <div className="why-grid">
          {items.map((item, i) => (
            <WhyCard key={item.title} {...item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
