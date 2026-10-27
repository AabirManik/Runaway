import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { demoPanels, steps } from '../../data/landing'
import { usePrefersReducedMotion } from '../../hooks/motion'
import { ArrowRight, IconDoc } from '../ui/Icons'
import Reveal from '../ui/Reveal'
import { MockChannels, MockComposer, MockSchedule } from './mockups'

const PANELS = [MockComposer, MockChannels, MockSchedule]

/**
 * The brief was explicit: show how the software actually works here —
 * no video, no autoplay showcase. Steps 01–03 are real tabs that swap a
 * working mock of the editor, the per-channel view and the scheduler.
 */
export default function HowItWorks() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef([])
  const reduced = usePrefersReducedMotion()

  const select = (index) => {
    const next = (index + steps.length) % steps.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (event) => {
    const keyMap = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: steps.length - 1,
    }
    if (!(event.key in keyMap)) return
    event.preventDefault()
    select(keyMap[event.key])
  }

  return (
    <section id="how-it-works" className="pt-14 pb-20 sm:pt-16 sm:pb-24">
      <div className="shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="display mt-4 text-[clamp(2.05rem,4.6vw,3.35rem)]">
            From idea to ready-to-publish.
          </h2>
          <p className="lede mt-4 text-[1.05rem]">
            Three simple steps to get your content out into the world.
          </p>
        </Reveal>

        {/* 01 / 02 / 03 — real tabs, keyboard operable */}
        <div
          role="tablist"
          aria-label="Publishing workflow steps"
          className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6"
          onKeyDown={onKeyDown}
        >
          {steps.map((step, index) => (
            <button
              key={step.n}
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              type="button"
              role="tab"
              id={`workflow-tab-${index}`}
              aria-selected={active === index}
              aria-controls={`workflow-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              className="group text-left focus:outline-none"
            >
              <span className="flex items-center gap-3">
                {/* The rail runs through every step — 01 included — so all
                    three badges land in the same position relative to their
                    column instead of 01 sitting left and the rest sitting
                    right. */}
                <span
                  className="hidden h-px flex-1 bg-line transition-colors duration-300 group-hover:bg-accent-2 lg:block"
                  aria-hidden="true"
                />
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12.5px] font-semibold transition-all duration-300 ${
                    active === index
                      ? 'bg-accent text-ink ring-2 ring-accent-2 ring-offset-2 ring-offset-canvas'
                      : 'bg-accent/55 text-ink'
                  }`}
                >
                  {step.n}
                </span>
              </span>

              <span className="mt-4 block text-[1.05rem] font-semibold tracking-tight text-ink">
                {step.title}
              </span>
              <span className="mt-1.5 block max-w-[34ch] text-[0.95rem] leading-relaxed text-muted">
                {step.body}
              </span>
            </button>
          ))}
        </div>

        {/* the demonstration card */}
        <Reveal
          delay={reduced ? 0 : 120}
          className="mt-12 overflow-hidden rounded-[26px] border border-line bg-canvas-2"
        >
          <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="relative p-7 sm:p-9 lg:p-11">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent">
                <IconDoc size={21} />
              </span>

              <h3 className="display mt-6 max-w-[15ch] text-[clamp(1.75rem,3vw,2.5rem)]">
                Plan, edit, and schedule in a calm workspace.
              </h3>

              <p className="lede mt-4 max-w-[42ch]">
                Keep your ideas, drafts, media, and schedule together, so you can move from
                inspiration to published posts without the chaos.
              </p>

              <Link to="/app" className="btn btn-dark mt-7">
                Explore the workspace
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="relative border-t border-line bg-white/55 p-6 sm:p-8 lg:border-l lg:border-t-0">
              {/* decorative leaf-shadow wash */}
              <span
                aria-hidden="true"
                className="ambient -right-10 -top-10 h-56 w-56 rounded-full bg-accent-2/45"
              />

              <div className="relative">
                <p className="max-w-[46ch] text-[0.95rem] leading-relaxed text-ink-2">
                  <span className="font-semibold text-ink">
                    {demoPanels[active].heading}.
                  </span>{' '}
                  {demoPanels[active].body}
                </p>

                <div className="mt-5">
                  {PANELS.map((Panel, index) => (
                    <div
                      key={demoPanels[index].id}
                      role="tabpanel"
                      id={`workflow-panel-${index}`}
                      aria-labelledby={`workflow-tab-${index}`}
                      hidden={active !== index}
                    >
                      <div aria-hidden="true">
                        <Panel />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
