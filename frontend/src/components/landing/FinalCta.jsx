import { Link } from 'react-router-dom'
import { ArrowRight } from '../ui/Icons'
import Reveal from '../ui/Reveal'

export default function FinalCta() {
  return (
    <section className="pb-6 pt-4">
      <div className="shell">
        <Reveal className="relative overflow-hidden rounded-[26px] border border-line bg-canvas-2 px-6 py-14 text-center sm:py-16">
          {/* decorative accent flourishes */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 hidden h-28 w-28 -translate-y-1/2 text-accent-2 sm:block"
            viewBox="0 0 120 120"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          >
            <path d="M30 34 16 20M28 56 8 54M34 78 18 92" />
          </svg>

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 hidden h-32 w-40 -translate-y-1/2 text-accent-2 sm:block"
            viewBox="0 0 160 130"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          >
            <path d="M12 108c26-4 44-26 44-50s16-42 40-44c18-2 34 8 44 22" />
            <path d="M116 40c8-8 18-12 30-12" />
          </svg>

          <div className="relative mx-auto max-w-3xl px-2 sm:px-16">
            <h2 className="display text-[clamp(1.9rem,4.4vw,3.2rem)]">
              Ready to make room for better posts?
            </h2>
            <p className="lede mt-4 text-[1.05rem]">
              Plan drafts, media, and publishing in one calm workspace.
            </p>
            <Link to="/app" className="btn btn-dark mt-7">
              Explore the workspace
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
