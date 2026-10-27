import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { footerColumns } from '../../data/landing'
import { paperPlane } from '../../data/images'
import { usePrefersReducedMotion } from '../../hooks/motion'
import { ArrowRight, PlaneMark } from '../ui/Icons'

/* One pass of the flight, then how long it waits before the next one.
   4s up and out, 2.2s of clear sky, then it comes back — a ~6s cycle. */
const PLANE_DUR_MS = 4000
const PLANE_PAUSE_MS = 2200

/**
 * The wake is generated from the band's real pixel size, and the <svg>'s
 * viewBox is set to that same size. So:
 *   - the trail spans the full width of the screen at any viewport,
 *   - nothing is scaled or letterboxed, and
 *   - the plane rides this exact string through `offset-path`, so it can
 *     never drift off its own wake the way a hand-tuned translate could.
 * The path deliberately bleeds past both edges so it reads as continuous.
 */
function buildTrail(w, h) {
  const n = (v) => v.toFixed(1)
  return [
    `M ${n(-w * 0.04)} ${n(h * 0.94)}`,
    `C ${n(w * 0.18)} ${n(h * 1.04)}, ${n(w * 0.32)} ${n(h * 0.8)}, ${n(w * 0.48)} ${n(h * 0.64)}`,
    `S ${n(w * 0.72)} ${n(h * 0.58)}, ${n(w * 0.84)} ${n(h * 0.32)}`,
    `S ${n(w * 0.96)} ${n(h * 0.1)}, ${n(w * 1.04)} ${n(h * 0.02)}`,
  ].join(' ')
}

export default function SiteFooter() {
  const stageRef = useRef(null)
  const pathRef = useRef(null)
  const [geo, setGeo] = useState({ w: 0, h: 0 })
  const [planeState, setPlaneState] = useState('rest')
  const [inView, setInView] = useState(false)
  const reduced = usePrefersReducedMotion()

  /* The band is a full-bleed absolute layer, so its size comes from the
     viewport rather than its contents — no measurement feedback loop. */
  useLayoutEffect(() => {
    const node = stageRef.current
    if (!node) return undefined

    const apply = () => {
      const w = Math.round(node.clientWidth)
      const h = Math.round(node.clientHeight)
      setGeo((prev) => (prev.w === w && prev.h === h ? prev : { w, h }))
    }
    apply()

    if (typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(apply)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const trail = useMemo(() => (geo.w ? buildTrail(geo.w, geo.h) : ''), [geo])

  /* A fixed 150px plane fills a phone-width band almost edge to edge, so it
     scales with the band — same share of the composition at every size. */
  const planeSize = Math.round(Math.min(150, Math.max(78, geo.w * 0.11)))

  /* Measure the drawn path so the reveal mask is exact at any size. */
  useLayoutEffect(() => {
    const path = pathRef.current
    if (!path || typeof path.getTotalLength !== 'function') return
    const length = Math.ceil(path.getTotalLength())
    const host = path.ownerSVGElement || path
    host.style.setProperty('--trail-len', String(length))
  }, [trail])

  /* Only while the band is actually on screen — no point animating off it. */
  useEffect(() => {
    const node = stageRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  /* The loop itself. Each state schedules the next, so leaving the viewport
     simply cancels the pending step and the cycle resumes on the way back. */
  useEffect(() => {
    if (reduced || !inView) {
      setPlaneState('rest')
      return undefined
    }
    const wait = planeState === 'flying' ? PLANE_DUR_MS : PLANE_PAUSE_MS
    const id = window.setTimeout(
      () => setPlaneState(planeState === 'flying' ? 'rest' : 'flying'),
      wait,
    )
    return () => window.clearTimeout(id)
  }, [reduced, inView, planeState])

  const flying = planeState === 'flying'

  return (
    <footer className="relative">
      {/* ---------------- closing block ---------------- */}
      <div className="shell pt-8 sm:pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="display text-[clamp(1.9rem,4.4vw,3.2rem)]">
            Give your next post a <span className="scribble">runway</span>.
          </h2>
          <p className="lede mt-4 text-[1.02rem]">
            Plan, shape, and schedule your content in one calm workspace.
          </p>
          <Link to="/app" className="btn btn-dark mt-7">
            Explore Runway
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Full-bleed flight band + the closing line. The band is a direct
          child of <footer>, so it spans the whole viewport width rather
          than sitting in a column of a grid. */}
      <div className="relative mt-12 pb-14 sm:mt-16 sm:pb-20">
        <div
          ref={stageRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {geo.w > 0 && (
            <svg
              className={`trail ${flying ? 'is-drawing' : ''}`}
              viewBox={`0 0 ${geo.w} ${geo.h}`}
              width="100%"
              height="100%"
              fill="none"
              stroke="#9fbf86"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="1 9"
            >
              <defs>
                {/* reveal mask: draws the trail along its own length */}
                <mask id="trail-reveal">
                  <path
                    className="trail-mask"
                    d={trail}
                    stroke="#fff"
                    strokeWidth="7"
                    fill="none"
                  />
                </mask>
              </defs>

              <path className="trail-dots" d={trail} mask="url(#trail-reveal)" ref={pathRef} />

              <image
                href={paperPlane}
                x={0}
                y={0}
                width={planeSize}
                height={planeSize}
                className={`plane ${flying ? 'is-flying' : ''}`}
                data-state={planeState}
                style={{ offsetPath: `path("${trail}")` }}
              />
            </svg>
          )}
        </div>

        <div className="shell relative">
          <h3 className="display max-w-[16ch] text-[clamp(1.75rem,3.6vw,2.7rem)]">
            Go make something <span className="scribble">worth sharing</span>.
          </h3>
          <Link to="/app" className="btn btn-dark mt-6">
            Open the workspace
          </Link>
        </div>
      </div>

      {/* ---------------- sage band ---------------- */}
      <div className="bg-sage">
        <div className="shell py-12 sm:py-14">
          <div
            className="wordmark-dotted select-none text-[clamp(3rem,15.5vw,11.5rem)] leading-none"
            aria-hidden="true"
          >
            RUNWAY
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
            <div>
              <div className="flex items-center gap-2 text-[1.05rem] font-semibold tracking-[0.3em] text-ink">
                RUNWAY
                <PlaneMark size={22} className="text-[#5f8a4a]" />
              </div>
              <p className="mt-3 max-w-[30ch] text-[0.95rem] leading-relaxed text-ink-2">
                An independent workspace for planning social content.
              </p>
            </div>

            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-ink">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[0.95rem] text-ink-2 transition-colors duration-200 hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-11 border-t border-ink/15 pt-5">
            <p className="text-[0.85rem] text-ink-2">A quieter place to plan what you share.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
