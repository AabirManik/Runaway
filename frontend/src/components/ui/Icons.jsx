/**
 * Original glyph set — every path below is drawn for Runway.
 *
 * No third-party platform logos are used anywhere on this landing page.
 * Per FRONTEND.md + FRONTEND_PHASES.md, provider tiles stay generic until a
 * social platform is officially selected.
 */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ size = 20, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...stroke}
      {...rest}
    >
      {children}
    </svg>
  )
}

/* --- directional ------------------------------------------------- */
export const ArrowRight = (p) => (
  <Svg {...p}>
    <path d="M4 12h15M13 5.5 19.5 12 13 18.5" />
  </Svg>
)

export const ArrowLeft = (p) => (
  <Svg {...p}>
    <path d="M20 12H5M11 5.5 4.5 12 11 18.5" />
  </Svg>
)

export const ArrowDown = (p) => (
  <Svg {...p}>
    <path d="M12 4v15M5.5 12.5 12 19l6.5-6.5" />
  </Svg>
)

export const ChevronLeft = (p) => (
  <Svg {...p}>
    <path d="M14.5 5.5 8 12l6.5 6.5" />
  </Svg>
)

export const ChevronRight = (p) => (
  <Svg {...p}>
    <path d="M9.5 5.5 16 12l-6.5 6.5" />
  </Svg>
)

/* --- controls ---------------------------------------------------- */
export const Play = (p) => (
  <Svg {...p}>
    <path d="M8.5 5.6 18 12l-9.5 6.4Z" />
  </Svg>
)

export const Pause = (p) => (
  <Svg {...p}>
    <path d="M9.2 5.5v13M14.8 5.5v13" />
  </Svg>
)

export const Plus = (p) => (
  <Svg {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </Svg>
)

export const Minus = (p) => (
  <Svg {...p}>
    <path d="M5.5 12h13" />
  </Svg>
)

export const Menu = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
)

export const Close = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
)

/* --- product glyphs --------------------------------------------- */
export const IconDoc = (p) => (
  <Svg {...p}>
    <path d="M6 3.8h8.2L18.5 8v12.2H6Z" />
    <path d="M14 4v4.2h4.2M9 12.4h6M9 15.8h4" />
  </Svg>
)

export const IconClock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 7.4V12l3.1 2" />
  </Svg>
)

export const IconCalendar = (p) => (
  <Svg {...p}>
    <rect x="4" y="5.6" width="16" height="14.4" rx="2.4" />
    <path d="M4 10.2h16M8.6 3.6v3.6M15.4 3.6v3.6" />
  </Svg>
)

export const IconImage = (p) => (
  <Svg {...p}>
    <rect x="3.6" y="5" width="16.8" height="14" rx="2.4" />
    <circle cx="9" cy="10" r="1.8" />
    <path d="m4.4 17.4 4.6-4.6 3.4 3.4 2.8-2.8 4.4 4.4" />
  </Svg>
)

export const IconUser = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8.6" r="3.8" />
    <path d="M4.8 20c.9-3.6 3.7-5.6 7.2-5.6s6.3 2 7.2 5.6" />
  </Svg>
)

export const IconSliders = (p) => (
  <Svg {...p}>
    <path d="M4 8.4h16M4 15.6h16" />
    <circle cx="9.4" cy="8.4" r="2.5" />
    <circle cx="15" cy="15.6" r="2.5" />
  </Svg>
)

export const IconText = (p) => (
  <Svg {...p}>
    <path d="M4.5 7h15M4.5 12h11M4.5 17h7.5" />
  </Svg>
)

export const IconCheck = (p) => (
  <Svg {...p}>
    <path d="m5 12.6 4.6 4.6L19 7.4" />
  </Svg>
)

export const IconGrid = (p) => (
  <Svg {...p}>
    <rect x="4" y="4" width="7" height="7" rx="1.8" />
    <rect x="13" y="4" width="7" height="7" rx="1.8" />
    <rect x="4" y="13" width="7" height="7" rx="1.8" />
    <rect x="13" y="13" width="7" height="7" rx="1.8" />
  </Svg>
)

export const IconShield = (p) => (
  <Svg {...p}>
    <path d="M12 3.6 19 6.2v5.4c0 4.2-2.8 7.4-7 8.8-4.2-1.4-7-4.6-7-8.8V6.2Z" />
    <path d="m9.2 12.2 2 2 3.6-3.8" />
  </Svg>
)

export const IconSearch = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.4" />
    <path d="m15.8 15.8 4 4" />
  </Svg>
)

export const IconSpark = (p) => (
  <Svg {...p}>
    <path d="M12 3.5c.6 4.2 1.9 5.5 6.1 6.1-4.2.6-5.5 1.9-6.1 6.1-.6-4.2-1.9-5.5-6.1-6.1 4.2-.6 5.5-1.9 6.1-6.1Z" />
    <path d="M18.4 16.4c.3 1.9.9 2.5 2.8 2.8-1.9.3-2.5.9-2.8 2.8-.3-1.9-.9-2.5-2.8-2.8 1.9-.3 2.5-.9 2.8-2.8Z" />
  </Svg>
)

/* --- neutral provider tiles (deliberately brand-free) ----------- */
export const GlyphSocial = (p) => (
  <Svg {...p}>
    <rect x="5.4" y="5.4" width="13.2" height="13.2" rx="4" />
  </Svg>
)

export const GlyphVideo = (p) => (
  <Svg {...p}>
    <path d="M10 8.4 16 12l-6 3.6Z" />
  </Svg>
)

export const GlyphText = (p) => (
  <Svg {...p}>
    <path d="M5.5 8h13M5.5 12h13M5.5 16h9" />
  </Svg>
)

export const GlyphMore = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="9" r="1.9" />
    <circle cx="15" cy="9" r="1.9" />
    <circle cx="9" cy="15" r="1.9" />
    <circle cx="15" cy="15" r="1.9" />
  </Svg>
)

/* --- plane (footer wordmark accent) ----------------------------- */
export const PlaneMark = ({ size = 26, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M29.4 3.6 3.2 14.2c-.9.4-.8 1.7.1 1.9l9.4 2.4 2.6 9.3c.3 1 1.6 1.1 2.1.2l3.4-6.1 8.3 6.1c.7.5 1.7.1 1.9-.7L31.6 4.7c.2-.9-.8-1.6-2.2-1.1Z"
      fill="currentColor"
    />
  </svg>
)
