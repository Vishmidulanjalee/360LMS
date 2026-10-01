import { useEffect, useRef, useState } from 'react'

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

export default function Cta() {
  const [ref, inView] = useInView()

  return (
    <section id="cta" className="cta" ref={ref}>
      <div className="wrap">
        <div className={`
          cta-box
          transition-all duration-1000 ease-out
          ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[0.97]'}
        `}>
          <h2 className={`
            transition-all duration-700 ease-out delay-150
            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}>
            Take your institute to the next level.
          </h2>

          <p className={`
            transition-all duration-700 ease-out delay-300
            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
          `}>
            Join the modern way of managing learning, students, staff, payments, attendance, and communication.
          </p>

          <div className={`
            cta-actions
            transition-all duration-700 ease-out delay-450
            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            <a href="#" className="btn btn-white">Get Started with 360 LMS</a>
            <a href="#" className="btn btn-outline-white">Talk to Our Team</a>
          </div>
        </div>
      </div>
    </section>
  )
}
