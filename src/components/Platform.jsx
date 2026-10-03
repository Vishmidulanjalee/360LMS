import { useEffect, useRef, useState } from 'react'

import studentImg from '../assets/platform/student.jpg'
import feesImg from '../assets/platform/fees.jpg'
import onlineClassImg from '../assets/platform/onlinecource.jpg'
import smsImg from '../assets/platform/sms.jpg'
import courseImg from '../assets/platform/materials.jpg'
import qrImg from '../assets/platform/qr.jpeg'

const features = [
  { img: studentImg,     lead: 'Manage',   title: 'Student & Staff',  text: 'Manage students, teachers, staff, classes, and academic information from one centralized platform.' },
  { img: feesImg,        lead: 'Track',    title: 'Fees & Payments',  text: 'Track payments, outstanding fees, transactions, and financial records with ease.' },
  { img: onlineClassImg, lead: 'Create',   title: 'Online Classes',   text: 'Create and manage online courses, classes, and digital learning programs.' },
  { img: smsImg,         lead: 'Automate', title: 'SMS Alerts',       text: 'Keep students and parents informed with automated SMS notifications and updates.' },
  { img: courseImg,      lead: 'Organize', title: 'Course Materials', text: 'Upload, organize, and distribute learning materials from one centralized platform.' },
  { img: qrImg,          lead: 'Record',   title: 'QR Attendance',    text: 'Record attendance quickly and accurately using QR-based attendance technology.' },
]

/* Intersection Observer hook */
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

export default function Platform() {
  const [ref, inView] = useInView()

  return (
    <section id="platform" className={`pf-sec ${inView ? 'pf-in' : ''}`} ref={ref}>
      <div className="pf-blob pf-blob-1" />
      <div className="pf-blob pf-blob-2" />
      <div className="wrap">
        <div className="pf-head">
          <div className="pf-title">
            <span className="pf-eyebrow"><i /> Core platform</span>
            <h2>
              Everything your institute needs.
              <span> In one platform.</span>
            </h2>
          </div>
          <p>360 LMS brings teaching, learning, administration, communication, and payments together in one powerful ecosystem.</p>
        </div>

        <div className="pf-grid">
          {features.map(({ img, lead, title, text }, i) => (
            <article className="pf-card" style={{ '--d': `${150 + i * 110}ms` }} key={title}>
              <div className="pf-text">
                <span className="pf-num">0{i + 1}</span>
                <p><strong>{lead} {title}</strong> — {text}</p>
              </div>
              <div className="pf-shot">
                <img src={img} alt={title} loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
