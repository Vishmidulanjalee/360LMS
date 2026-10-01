import { useEffect, useRef, useState } from 'react'

import studentImg from '../assets/platform/student.png'
import feesImg from '../assets/platform/fees.png'
import onlineClassImg from '../assets/platform/onlineclass.png'
import smsImg from '../assets/platform/sms.png'
import courseImg from '../assets/platform/online-course.png'
import qrImg from '../assets/platform/qr.png'

const features = [
  { img: studentImg,     title: 'Student & Staff Management', text: 'Manage students, teachers, staff, classes, and academic information from one centralized platform.' },
  { img: feesImg,        title: 'Fees Tracking',              text: 'Track payments, outstanding fees, transactions, and financial records with ease.' },
  { img: onlineClassImg, title: 'Online Class Store',         text: 'Create and manage online courses, classes, and digital learning programs.' },
  { img: smsImg,         title: 'Automated SMS',              text: 'Keep students and parents informed with automated SMS notifications and updates.' },
  { img: courseImg,      title: 'Course Materials',           text: 'Upload, organize, and distribute learning materials from one centralized platform.' },
  { img: qrImg,          title: 'QR Attendance',              text: 'Record attendance quickly and accurately using QR-based attendance technology.' },
]

/* Intersection Observer hook */
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

export default function Platform() {
  const [ref, inView] = useInView()

  return (
    <section id="platform" className="sec platform-sec" ref={ref}>
      <div className="wrap">
        <div className={`sec-head platform-head transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <h2>Everything your institute needs. In one platform.</h2>
          <p>360 LMS brings teaching, learning, administration, communication, and payments together in one powerful ecosystem.</p>
        </div>

        <div className="features">
          {features.map(({ img, title, text }, i) => (
            <article 
              className={`feature transition-all duration-700 ease-out`}
              style={{ 
                transitionDelay: `${150 + i * 100}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)'
              }}
              key={title}
            >
              <div className="feature-top">
                <div className="w-14 h-14 shrink-0 shadow-none bg-transparent">
                  <img src={img} alt={title} className="w-full h-full object-contain" />
                </div>
                <span className="feature-tag">Core feature</span>
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
