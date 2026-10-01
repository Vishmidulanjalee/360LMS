import { useEffect, useRef, useState } from 'react'

import simplicityImg from '../assets/simplicity.png'
import linkImg from '../assets/link.png'
import automationImg from '../assets/automation.png'
import scalabilityImg from '../assets/scalability.png'

const items = [
  { img: simplicityImg, title: 'Simple',    text: 'Everything organized in one easy-to-use platform.' },
  { img: linkImg,       title: 'Connected', text: 'Bring students, teachers, staff, and administrators together.' },
  { img: automationImg, title: 'Automated', text: 'Reduce repetitive administrative work with smart automation.' },
  { img: scalabilityImg,title: 'Scalable',  text: 'Built to grow with your institute.' },
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

export default function Why() {
  const [ref, inView] = useInView()

  return (
    <section id="why" className="sec why" ref={ref}>
      <div className="wrap">
        <div className={`sec-head transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2>Built for the way <span className="text-[#C2410C]">modern institutes work</span></h2>
        </div>
        
        <div className="why-grid">
          {items.map(({ img, title, text }, i) => (
            <article 
              className="why-card transition-all duration-700 ease-out" 
              key={title}
              style={{
                transitionDelay: `${150 + i * 100}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)'
              }}
            >
              <div className="w-16 h-16 mb-6">
                <img src={img} alt={title} className="w-full h-full object-contain" />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
