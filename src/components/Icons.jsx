const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function Icon({ size = 24, children, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke} strokeWidth="2" {...props}>
      {children}
    </svg>
  )
}

export function IconArrow({ size = 18 }) {
  return (
    <Icon size={size} strokeWidth="2.2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  )
}

export function IconShieldCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function IconSearch({ size = 12 }) {
  return (
    <Icon size={size}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </Icon>
  )
}

export function IconBell({ size = 16 }) {
  return (
    <Icon size={size}>
      <path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.9 1.9 0 003.4 0" />
    </Icon>
  )
}

export function IconGrid({ size = 16 }) {
  return (
    <Icon size={size}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </Icon>
  )
}

export function IconUsers({ size = 16 }) {
  return (
    <Icon size={size}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5" />
      <path d="M16 4.5a3.5 3.5 0 010 7M18 14.8c1.9.7 3.1 2.4 3.5 5.2" />
    </Icon>
  )
}

export function IconBook({ size = 16 }) {
  return (
    <Icon size={size}>
      <path d="M4 5h11a3 3 0 013 3v11H7a3 3 0 01-3-3V5z" />
      <path d="M8 9h6M8 13h6" />
    </Icon>
  )
}

export function IconCard({ size = 16 }) {
  return (
    <Icon size={size}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M7 15h3" />
    </Icon>
  )
}

export function IconQr({ size = 16 }) {
  return (
    <Icon size={size}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3M21 14v7h-7" />
    </Icon>
  )
}

export function IconChat({ size = 16 }) {
  return (
    <Icon size={size}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </Icon>
  )
}

export function IconChatLines({ size = 24 }) {
  return (
    <Icon size={size}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      <path d="M8 9h8M8 13h5" />
    </Icon>
  )
}

export function IconStore({ size = 24 }) {
  return (
    <Icon size={size}>
      <path d="M4 9l1.5-5h13L20 9" />
      <path d="M4 9h16v2a3 3 0 01-5.3 1.9A3 3 0 0112 14a3 3 0 01-2.7-1.1A3 3 0 014 11V9z" />
      <path d="M5 14v6h14v-6" />
    </Icon>
  )
}

export function IconPlay({ size = 22 }) {
  return (
    <Icon size={size}>
      <rect x="2" y="5" width="14" height="14" rx="2" />
      <path d="M16 10l6-3v10l-6-3" />
    </Icon>
  )
}

export function IconCheckBox({ size = 24 }) {
  return (
    <Icon size={size}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  )
}

export function IconLink({ size = 24 }) {
  return (
    <Icon size={size}>
      <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />
    </Icon>
  )
}

export function IconBolt({ size = 24 }) {
  return (
    <Icon size={size}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </Icon>
  )
}

export function IconTrend({ size = 24 }) {
  return (
    <Icon size={size}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </Icon>
  )
}

export function IconCap({ size = 24 }) {
  return (
    <Icon size={size}>
      <path d="M22 9L12 4 2 9l10 5 10-5z" />
      <path d="M6 11v5c2 2 10 2 12 0v-5" />
    </Icon>
  )
}

export function IconSchool({ size = 24 }) {
  return (
    <Icon size={size}>
      <path d="M3 21h18M5 21V10l7-5 7 5v11" />
      <path d="M10 21v-5h4v5" />
    </Icon>
  )
}

export function IconBriefcase({ size = 24 }) {
  return (
    <Icon size={size}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      <path d="M3 13h18" />
    </Icon>
  )
}

export function IconMonitor({ size = 24 }) {
  return (
    <Icon size={size}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
      <path d="M10 8l4 2-4 2V8z" />
    </Icon>
  )
}

export function IconBuilding({ size = 24 }) {
  return (
    <Icon size={size}>
      <path d="M4 21V5a2 2 0 012-2h8a2 2 0 012 2v16" />
      <path d="M16 9h2a2 2 0 012 2v10M2 21h20M8 7h4M8 11h4M8 15h4" />
    </Icon>
  )
}

export function IconPerson({ size = 24 }) {
  return (
    <Icon size={size}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4.5 4.2-7 8-7s7 2.5 8 7" />
    </Icon>
  )
}

export function LogoMark() {
  return <span className="logo-mark">360</span>
}

export function Logo({ href = '#', extra }) {
  const inner = (
    <>
      <LogoMark />
      360 LMS
      {extra}
    </>
  )
  if (href) {
    return (
      <a href={href} className="logo" aria-label="360 LMS home">
        {inner}
      </a>
    )
  }
  return <div className="logo">{inner}</div>
}
