import { useEffect, useRef, useState } from 'react'
import { heroRows } from '../../data/landing'
import { heroPortrait, mediaAt } from '../../data/images'
import { CANVAS_HEIGHT, silhouetteAt } from '../../data/portrait'
import { usePageHidden, usePrefersReducedMotion } from '../../hooks/motion'
import {
  IconCalendar,
  IconCheck,
  IconClock,
  IconDoc,
  IconImage,
  IconSliders,
  IconText,
  IconUser,
} from '../ui/Icons'

/* ------------------------------------------------------------------
   How this carousel works

   Each row holds 4 cards but only 2 slots (left, right). Cards advance
   leftwards one position per step:

       right -> left -> prev(off-stage left) -> next(parked right) -> right

   `prev` and `next` are both opacity:0, so the invisible hop back across
   the stage never shows a card sliding through the middle. Only the four
   visible transitions ever run, which is what keeps it from looking cheap.

   There are deliberately no manual controls: the carousel runs on its own
   and pauses silently whenever the pointer rests on it or anything inside
   it holds keyboard focus, and stays still for reduced-motion users.

   Positioning is CSS-owned (--lx / --rx percentages); JS measures the
   stage to derive the pixel gap the transform needs, and picks each card's
   resting home from the outer margin unless that would crowd her outline.
   So it stays correct at every width and only ever animates `transform`
   + `opacity` (GPU).
------------------------------------------------------------------- */

const CARD_ICONS = {
  doc: IconDoc,
  clock: IconClock,
  calendar: IconCalendar,
  image: IconImage,
  user: IconUser,
  sliders: IconSliders,
  text: IconText,
  check: IconCheck,
}

const TONES = {
  accent: 'bg-accent',
  coral: 'bg-coral',
  sky: 'bg-sky',
  lilac: 'bg-lilac',
  line: 'bg-canvas-3',
}

const N = heroRows[0].cards.length
const DWELL_MS = 5600

/* decorative drift — deliberately different per card so the group reads as
   layered depth rather than one sheet moving together (FRONTEND.md) */
const FLOAT = [
  { dur: '11.5s', delay: '0s', dy: '8px', rot: '1.4deg' },
  { dur: '14s', delay: '-1.8s', dy: '11px', rot: '1deg' },
  { dur: '12.5s', delay: '-3.4s', dy: '7px', rot: '1.8deg' },
  { dur: '15.5s', delay: '-5.1s', dy: '12px', rot: '1.2deg' },
  { dur: '13s', delay: '-0.9s', dy: '9px', rot: '1.6deg' },
  { dur: '10.5s', delay: '-2.6s', dy: '6px', rot: '1.1deg' },
  { dur: '15s', delay: '-4.3s', dy: '12px', rot: '1.9deg' },
  { dur: '12s', delay: '-6s', dy: '8px', rot: '1.3deg' },
]

const BASE_ROT = ['-2deg', '1.8deg', '-1.5deg', '2.2deg', '-1.8deg', '2deg', '-2.2deg', '1.6deg']

/** Which of the four states this card is in for the current step. */
function stateFor(index, step) {
  const right = step % N
  const left = (step - 1 + N) % N
  const prev = (step - 2 + N) % N
  if (index === right) return 'right'
  if (index === left) return 'left'
  if (index === prev) return 'prev'
  return 'next'
}

function CardBody({ card }) {
  if (card.type === 'lines') {
    return (
      <>
        <div className="mt-2.5 space-y-1.5">
          {card.lines.map((line) => (
            <p key={line} className="text-[11px] leading-tight text-muted">
              {line}
            </p>
          ))}
        </div>
        {card.thumb !== undefined && (
          <img
            {...mediaAt(card.thumb)}
            alt=""
            loading="lazy"
            className="mt-2.5 h-[46px] w-full rounded-lg object-cover"
          />
        )}
      </>
    )
  }

  if (card.type === 'meta') {
    return (
      <>
        <div className="mt-2.5 h-1.5 w-[78%] rounded-full bg-line-2" />
        <p className="mt-2.5 text-[10.5px] leading-snug text-muted-2">{card.meta}</p>
        {card.thumb !== undefined && (
          <img
            {...mediaAt(card.thumb)}
            alt=""
            loading="lazy"
            className="mt-2.5 h-[46px] w-full rounded-lg object-cover"
          />
        )}
      </>
    )
  }

  if (card.type === 'rows') {
    return (
      <>
        <div className="mt-3 space-y-2">
          {['bg-accent', 'bg-coral', 'bg-line'].map((tone, i) => (
            <div key={tone} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${tone}`} />
              <span
                className="h-1.5 rounded-full bg-line-2"
                style={{ width: `${[64, 52, 44][i]}%` }}
              />
              <span className="ml-auto text-[9px] text-muted-2">›</span>
            </div>
          ))}
        </div>
        <p className="mt-2.5 text-[10.5px] text-muted-2">{card.meta}</p>
      </>
    )
  }

  if (card.type === 'thumbs') {
    return (
      <div className="mt-2.5 grid grid-cols-4 gap-1.5">
        {card.thumbs.map((index) => (
          <img
            key={index}
            {...mediaAt(index)}
            alt=""
            loading="lazy"
            className="h-11 w-full rounded-md object-cover"
          />
        ))}
        <span className="grid h-11 place-items-center rounded-md bg-canvas-3 text-muted-2">
          +
        </span>
      </div>
    )
  }

  /* glyphs — neutral, brand-free channel indicators */
  return (
    <>
      <div className="mt-2.5 h-1.5 w-[78%] rounded-full bg-line-2" />
      <div className="mt-2.5 flex items-center gap-2">
        {[
          ['bg-lilac', <IconImage key="a" size={13} />],
          ['bg-ink', <IconText key="b" size={13} />],
          ['bg-coral', <IconCalendar key="c" size={13} />],
          ['bg-sky', <IconUser key="d" size={13} />],
        ].map(([tone, icon]) => (
          <span
            key={tone}
            className={`grid h-7 w-7 place-items-center rounded-lg ${tone} ${
              tone === 'bg-ink' ? 'text-white' : 'text-ink'
            }`}
          >
            {icon}
          </span>
        ))}
      </div>
      <p className="mt-2 text-[10.5px] text-muted-2">{card.meta}</p>
    </>
  )
}

/**
 * Places the cards a fixed gap from her outline and draws the curved tethers
 * that reach from each card's resting home to the same outline.
 *
 * Doing this in JS rather than with per-breakpoint percentages is what keeps
 * the orbit balanced: her bounding box is not symmetric inside the stage, and
 * a fixed % spread drifts to one side as the stage resizes.
 */
function layoutOrbit(stage, portrait, svg, lxPct, rxPct, rows, cardW, cardH) {
  const W = stage.clientWidth
  const H = stage.clientHeight
  if (!W || !H) return

  const sRect = stage.getBoundingClientRect()
  const pRect = portrait.getBoundingClientRect()
  const pL = pRect.left - sRect.left
  const pW = pRect.width
  const pTop = pRect.top - sRect.top
  const pH = pRect.height
  if (!pW || !pH) return

  /* her left/right edge at a given stage y, in stage coordinates */
  const edgeAt = (y, side) => {
    const row = ((y - pTop) / pH) * CANVAS_HEIGHT
    const [l, r] = silhouetteAt(row)
    return pL + (side === 'left' ? l : r) * pW
  }

  svg.setAttribute('viewBox', `0 0 ${W} ${H}`)

  const lxPx = (lxPct / 100) * W
  const rxPx = (rxPct / 100) * W
  const gap = 16 /* keeps the terminal dot just clear of her outline */

  const paths = []
  const dots = []

  rows.forEach((row) => {
    ;['left', 'right'].forEach((side) => {
      const sy = row[side] + cardH / 2
      /* arcs converge on her face rather than running flat across the stage */
      const ey = sy + (H / 2 - sy) * 0.45

      const outward = side === 'left' ? 1 : -1
      const sx = (side === 'left' ? lxPx + cardW : rxPx) + outward * 7
      const ex = edgeAt(ey, side) - outward * gap

      if (side === 'left' && ex <= sx + 12) return /* no room — never draw backwards */
      if (side === 'right' && ex >= sx - 12) return

      const dx = ex - sx
      const dy = ey - sy
      /* pick the normal that bulges away from her, so the line never
         crosses the face or drops onto the text */
      let nx = -dy
      let ny = dx
      if (side === 'left' ? nx > 0 : nx < 0) {
        nx = dy
        ny = -dx
      }
      const nLen = Math.hypot(nx, ny) || 1
      const bow = 0.22 * Math.hypot(dx, dy)
      const cx = (sx + ex) / 2 + (nx / nLen) * bow
      const cy = (sy + ey) / 2 + (ny / nLen) * bow

      paths.push(
        `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,
      )
      dots.push([sx, sy], [ex, ey])
    })
  })

  svg.innerHTML =
    paths.map((d) => `<path d="${d}"></path>`).join('') +
    dots.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3"></circle>`).join('')
}

export default function HeroCarousel() {
  const stageRef = useRef(null)
  const portraitRef = useRef(null)
  const linksRef = useRef(null)
  const [step, setStep] = useState(0)
  const [interacting, setInteracting] = useState(false)

  const reduced = usePrefersReducedMotion()
  const pageHidden = usePageHidden()

  /* ---- derive the pixel gap CSS cannot express (transform % is element-relative) ---- */
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    const measure = () => {
      const portrait = portraitRef.current
      if (!portrait) return

      const W = stage.clientWidth
      const H = stage.clientHeight
      if (!W || !H) return

      const slot = stage.querySelector('.hero-slot')
      const card = stage.querySelector('.hero-card')
      const cardW = slot ? slot.offsetWidth : 160
      const cardH = card ? card.offsetHeight : 140

      /* Each row's right-hand card is nudged vertically by --gap-y so the two
         sides are never level. Sample her outline where each card actually
         sits, not where its row starts. */
      const rows = []
      const top = stage.querySelector('.hero-slot--top')
      const bottom = stage.querySelector('.hero-slot--bottom')
      ;[top, bottom].forEach((el) => {
        if (!el || getComputedStyle(el).display === 'none') return
        const dy = parseFloat(getComputedStyle(el).getPropertyValue('--gap-y')) || 0
        rows.push({ left: el.offsetTop, right: el.offsetTop + dy })
      })

      const sRect = stage.getBoundingClientRect()
      const pRect = portrait.getBoundingClientRect()
      const pL = pRect.left - sRect.left
      const pW = pRect.width
      const pTop = pRect.top - sRect.top
      const pH = pRect.height

      if (pW && pH && rows.length) {
        /* widest her outline gets anywhere a card sits */
        let hairL = Infinity
        let hairR = -Infinity
        rows.forEach((row) => {
          ;[row.left, row.right].forEach((y0, side) => {
            for (let s = 0; s <= 8; s += 1) {
              const y = y0 + (cardH * s) / 8
              const canvasRow = ((y - pTop) / pH) * CANVAS_HEIGHT
              const [l, r] = silhouetteAt(canvasRow)
              if (side === 0) hairL = Math.min(hairL, pL + l * pW)
              else hairR = Math.max(hairR, pL + r * pW)
            }
          })
        })

        if (Number.isFinite(hairL) && Number.isFinite(hairR)) {
          /* The slots are rotated, so their painted box is wider than
             offsetWidth — leave room for the corners. */
          const tilt = cardH * 0.06
          const minGap = (W < 768 ? 14 : 30) + tilt

          /* Cards want the outer margin, not a fixed distance from her: on a
             wide stage a constant gap would pull them inboard and leave the
             hero looking empty on both sides. Only retreat toward her when
             the outer position would crowd her outline. */
          const outer = W < 768 ? 0 : W * 0.035
          let lxPx = outer
          if (outer + cardW > hairL - minGap) lxPx = hairL - minGap - cardW
          let rxPx = W - outer - cardW
          if (rxPx < hairR + minGap) rxPx = hairR + minGap

          /* A rotated card paints slightly wider than its box, so nudge it in
             far enough to keep that corner inside the stage. Bounded by how
             much clear space actually exists: where there is none, a sliver
             of clipped corner beats covering her or the card's own label. */
          lxPx = Math.max(lxPx, Math.min(tilt, Math.max(0, hairL - cardW - 4)))
          rxPx = Math.min(rxPx, W - cardW - Math.min(tilt, Math.max(0, W - hairR - cardW - 4)))

          const lx = Math.max(0, (lxPx / W) * 100)
          const rx = Math.min(
            Math.max((rxPx / W) * 100, lx + (cardW / W) * 100 + 3),
            ((W - cardW) / W) * 100,
          )

          stage.style.setProperty('--lx', `${lx.toFixed(2)}%`)
          stage.style.setProperty('--rx', `${rx.toFixed(2)}%`)
          stage.style.setProperty('--gap', `${(((rx - lx) / 100) * W).toFixed(2)}px`)

          const links = linksRef.current
          if (links) layoutOrbit(stage, portrait, links, lx, rx, rows, cardW, cardH)
          return
        }
      }

      /* fall back to the CSS spread if the portrait has not laid out yet */
      const styles = getComputedStyle(stage)
      const lx = parseFloat(styles.getPropertyValue('--lx'))
      const rx = parseFloat(styles.getPropertyValue('--rx'))
      if (Number.isNaN(lx) || Number.isNaN(rx)) return
      stage.style.setProperty('--gap', `${((rx - lx) / 100) * W}px`)
    }

    measure()

    /* card width changes at a breakpoint without resizing the stage, so a
       plain resize listener is needed alongside the ResizeObserver */
    window.addEventListener('resize', measure)

    let observer
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measure)
      observer.observe(stage)
      const firstCard = stage.querySelector('.hero-card')
      if (firstCard) observer.observe(firstCard) /* catches font-load reflow */
    }
    if (document.fonts?.ready) document.fonts.ready.then(measure)

    return () => {
      window.removeEventListener('resize', measure)
      observer?.disconnect()
    }
  }, [])

  /* ---- auto-advance -------------------------------------------------
     No visible controls. The carousel simply runs, and stops silently when
     the pointer rests on it or anything inside it holds keyboard focus —
     which is also the pause mechanism that keeps it inside WCAG 2.2.2. */
  const canAutoPlay = !reduced && !pageHidden && !interacting

  useEffect(() => {
    if (!canAutoPlay) return undefined
    const timer = setInterval(() => setStep((value) => (value + 1) % N), DWELL_MS)
    return () => clearInterval(timer)
  }, [canAutoPlay, step])

  /* ---- subtle parallax on the portrait only (never touches layout) ---- */
  useEffect(() => {
    if (reduced) return undefined
    let frame = 0
    const update = () => {
      frame = 0
      const node = portraitRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)))
      node.style.setProperty('--parallax', `${(progress * -22).toFixed(1)}px`)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
      portraitRef.current?.style.removeProperty('--parallax')
    }
  }, [reduced])

  let cardCursor = -1

  return (
    <section
      className="hero-showcase"
      aria-roledescription="carousel"
      aria-label="Sample post preview cards"
      tabIndex={0}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false)
      }}
    >
      <div className="hero-stage" ref={stageRef}>
        {/* curved tethers — geometry written from the measured silhouette */}
        <svg className="hero-links" ref={linksRef} aria-hidden="true" />

        {/* central artwork — visually stable; only drifts slightly on scroll.
            Her torso dissolves into the page background via the mask in CSS,
            so the hero never ends on a hard horizontal cut. */}
        <div className="hero-portrait" ref={portraitRef}>
          <img
            src={heroPortrait}
            alt="A creator looking upward, shown as a black-and-white portrait"
            width={1024}
            height={1536}
            fetchPriority="high"
          />
        </div>

        <div className="hero-cards">
          {heroRows.map((row, rowIndex) =>
            row.cards.map((card, index) => {
              cardCursor += 1
              const cursor = cardCursor
              const Icon = CARD_ICONS[card.icon]
              const float = FLOAT[cursor]
              return (
                <div
                  key={card.id}
                  className={`hero-slot hero-slot--${row.id}`}
                  data-state={stateFor(index, step)}
                  style={{
                    '--rot': BASE_ROT[cursor],
                    '--slot-delay': `${rowIndex * 100 + index * 35}ms`,
                  }}
                >
                  <div
                    className="hero-float"
                    style={{
                      '--fdur': float.dur,
                      '--fdel': float.delay,
                      '--fdy': float.dy,
                      '--frot': float.rot,
                    }}
                  >
                    <article className="hero-card p-3.5">
                      <header className="flex items-center gap-2.5">
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${
                            TONES[card.tone]
                          }`}
                        >
                          <Icon size={15} />
                        </span>
                        <p className="text-[13.5px] font-semibold tracking-tight text-ink">
                          {card.title}
                        </p>
                      </header>
                      <CardBody card={card} />
                    </article>
                  </div>
                </div>
              )
            }),
          )}
        </div>
      </div>
    </section>
  )
}
