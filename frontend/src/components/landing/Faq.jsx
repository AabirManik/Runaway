import { useState } from 'react'
import { faqItems } from '../../data/landing'
import { Minus, Plus } from '../ui/Icons'
import Reveal from '../ui/Reveal'

export default function Faq() {
  const [openIds, setOpenIds] = useState(() => new Set([faqItems[0].id]))

  const toggle = (id) => {
    setOpenIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section id="faq" className="py-20 sm:py-24">
      <div className="shell max-w-4xl">
        <Reveal className="text-center">
          <h2 className="display text-[clamp(2.05rem,4.6vw,3.35rem)]">
            A few helpful answers
          </h2>
        </Reveal>

        <Reveal delay={90} className="mt-11 space-y-3.5">
          {faqItems.map((item) => {
            const open = openIds.has(item.id)
            return (
              <div
                key={item.id}
                className={`faq-item rounded-2xl border bg-canvas-2 transition-colors duration-300 ${
                  open ? 'is-open border-accent-2' : 'border-line'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${item.id}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => toggle(item.id)}
                    className="flex w-full items-center gap-5 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="font-display text-[clamp(1.02rem,2vw,1.2rem)] font-semibold tracking-tight text-ink">
                      {item.q}
                    </span>
                    <span
                      className={`ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                        open ? 'bg-accent text-ink' : 'bg-canvas-3 text-muted'
                      }`}
                      aria-hidden="true"
                    >
                      {open ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                </h3>

                <div
                  className="faq-panel"
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-button-${item.id}`}
                >
                  <div>
                    <p className="faq-body px-5 pb-5 text-[0.98rem] leading-relaxed text-muted sm:px-6 sm:pr-24">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
