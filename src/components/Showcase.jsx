import { useEffect, useRef, useState } from 'react'
import { IconArrow, LogoMark } from './Icons.jsx'

const sideItems = ['Dashboard', 'Students', 'Staff', 'Classes', 'Online Store', 'Fees', 'Attendance', 'SMS Center', 'Materials', 'Reports']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
const courses = [
  { name: 'A/L Combined Maths', students: 184, pct: 72 },
  { name: 'O/L Science', students: 226, pct: 64 },
  { name: 'Spoken English', students: 98, pct: 81 },
  { name: 'ICT for Beginners', students: 142, pct: 57 },
]
const payments = [
  { name: 'Kavindi Perera',     cls: 'A/L Physics', amount: 'LKR 4,500', due: false },
  { name: 'Sahan Fernando',     cls: 'O/L Maths',   amount: 'LKR 6,000', due: false },
  { name: 'Malsha Silva',       cls: 'English Lit.', amount: 'LKR 3,200', due: false },
  { name: 'Ravindu Jayasinghe', cls: 'ICT',          amount: 'LKR 5,000', due: true },
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

export default function Showcase() {
  const [ref, inView] = useInView()

  return (
    <section className="sec showcase" ref={ref}>
      <div className="wrap">

        {/* ── Heading ── */}
        <div className={`
          sec-head transition-all duration-700 ease-out
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <h2>See everything. Manage everything.</h2>
        </div>

        {/* ── Dashboard preview ── */}
        <div
          className={`bigdash transition-all duration-1000 ease-out delay-150 ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[0.98]'}`}
          aria-label="360 LMS administration dashboard preview"
        >
          <aside className="side">
            <div className="logo"><img src="/360logo.png" alt="360 LMS Logo" className="h-15 w-auto" /></div>
            {sideItems.map((item, i) => (
              <div
                key={item}
                className={`item transition-all duration-500 ease-out ${item === 'Dashboard' ? 'on' : ''} ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}
                style={{ transitionDelay: `${300 + i * 50}ms` }}
              >
                {item}
              </div>
            ))}
          </aside>

          <div className="bd-main">
            <div className={`bd-head transition-all duration-700 ease-out delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div>
                <h3>Good morning, Admin</h3>
                <p>Here's what's happening across your institute today</p>
              </div>
              <div className="acts">
                <span className="chip">This month</span>
                <span className="chip dark">+ Add Student</span>
              </div>
            </div>

            {/* KPIs */}
            <div className="bkpis">
              {[
                { lbl: 'Total Students',   val: '1,248',    em: '▲ 5.4% vs last month' },
                { lbl: 'Fees Collected',   val: 'LKR 1.84M', em: '▲ 12.1% vs last month' },
                { lbl: 'Avg. Attendance',  val: '94.2%',    em: '▲ 1.8% vs last month' },
                { lbl: 'Outstanding Fees', val: 'LKR 296K', em: '48 students pending', w: true },
              ].map((k, i) => (
                <div
                  key={k.lbl}
                  className={`bkpi transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                  style={{ transitionDelay: `${400 + i * 80}ms` }}
                >
                  <small>{k.lbl}</small>
                  <strong>{k.val}</strong>
                  <em className={k.w ? 'w' : ''}>{k.em}</em>
                </div>
              ))}
            </div>

            <div className={`brow transition-all duration-700 ease-out delay-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="card">
                <div className="card-h">
                  <h4>Fee Collection</h4>
                  <div className="legend">
                    <span><i />2026</span>
                    <span><i className="l" />2025</span>
                  </div>
                </div>
                <svg width="100%" height="170" viewBox="0 0 600 170" preserveAspectRatio="none" style={{ marginTop: 14 }} aria-hidden="true">
                  <defs>
                    <linearGradient id="sf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#F97316" stopOpacity=".28" />
                      <stop offset="1" stopColor="#F97316" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 42H600M0 84H600M0 126H600" stroke="#F5ECE4" strokeWidth="1" />
                  <path d="M0 130 C50 120 70 104 110 108 S180 80 220 86 S300 60 340 66 S420 40 460 44 S540 22 600 16 L600 170 L0 170 Z" fill="url(#sf)" />
                  <path d="M0 130 C50 120 70 104 110 108 S180 80 220 86 S300 60 340 66 S420 40 460 44 S540 22 600 16" fill="none" stroke="#C2410C" strokeWidth="3" />
                  <path d="M0 142 C60 138 90 128 130 130 S210 112 250 116 S330 100 380 102 S470 86 520 84 S570 76 600 72" fill="none" stroke="#FDBA74" strokeWidth="2.5" strokeDasharray="6 5" />
                  <circle cx="460" cy="44" r="5" fill="#fff" stroke="#C2410C" strokeWidth="3" />
                </svg>
                <div className="months">{months.map((m) => <span key={m}>{m}</span>)}</div>
              </div>
              <div className="card">
                <h4>Attendance Today</h4>
                <div className="donut-wrap">
                  <div className="donut"><div><b>94%</b><small>present</small></div></div>
                  <div className="dl">
                    <div><i />QR scan<b>1,023</b></div>
                    <div><i className="l" />Manual<b>150</b></div>
                    <div><i className="x" />Absent<b>75</b></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`brow2 transition-all duration-700 ease-out delay-750 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="card">
                <h4>Course Activity</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Course</th><th>Students</th>
                      <th style={{ width: '40%' }}>Completion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c) => (
                      <tr key={c.name}>
                        <td className="n">{c.name}</td>
                        <td>{c.students}</td>
                        <td>
                          <div className="prog">
                            <span><i style={{ width: `${c.pct}%` }} /></span>
                            {c.pct}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card">
                <h4>Recent Payments</h4>
                <table>
                  <thead>
                    <tr><th>Student</th><th>Class</th><th>Amount</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.name}>
                        <td className="n">{p.name}</td>
                        <td>{p.cls}</td>
                        <td className="n">{p.amount}</td>
                        <td><span className={p.due ? 'tag due' : 'tag'}>{p.due ? 'Due' : 'Paid'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* CTA button */}
        <div className={`show-cta transition-all duration-700 ease-out delay-900 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a href="#cta" className="btn btn-white">Explore 360 LMS <IconArrow /></a>
        </div>
      </div>
    </section>
  )
}
