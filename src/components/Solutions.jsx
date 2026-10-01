import { useEffect, useRef, useState } from 'react'

import tuitionImg          from '../assets/solutions/tuition.png'
import schoolsImg          from '../assets/solutions/schools.png'
import trainingImg         from '../assets/solutions/trainingcenter.png'
import videoImg            from '../assets/solutions/video-tutorial.png'
import corporateImg        from '../assets/solutions/corporatetraining.png'
import individualImg       from '../assets/solutions/individualeducators.png'

const items = [
  { img: tuitionImg,    title: 'Tuition & Education Institutes', text: 'Classes, batches, fees and attendance' },
  { img: schoolsImg,    title: 'Schools',                        text: 'Students, staff and parent communication' },
  { img: trainingImg,   title: 'Professional Training Centers',  text: 'Programs, cohorts and certifications' },
  { img: videoImg,      title: 'Online Course Providers',        text: 'Sell and deliver courses online' },
  { img: corporateImg,  title: 'Corporate Training',             text: 'Upskill teams with tracked learning' },
  { img: individualImg, title: 'Individual Educators',           text: 'Run your own classes, your way' },
]

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

export default function Solutions() {
  const [ref, inView] = useInView()

  return (
    <section id="solutions" className="sec" ref={ref}>
      <div className="wrap">
        <div className={`sec-head transition-all duration-700 ease-out
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2>Built for every learning environment.</h2>
        </div>

        <div className="sol-grid">
          {items.map(({ img, title, text }, i) => (
            <article
              className="sol transition-all duration-700 ease-out"
              key={title}
              style={{
                transitionDelay: `${150 + i * 80}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)'
              }}
            >
              <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                <img src={img} alt={title} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
