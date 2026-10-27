import { ArrowDown, ArrowRight } from '../ui/Icons'
import HeroCarousel from './HeroCarousel'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 sm:pt-10" id="top">
      <div className="shell">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Plan with clarity</p>

          <h1 className="display mt-4 text-[clamp(2.6rem,7vw,5.1rem)]">
            A clearer <em>runway</em> for every post.
          </h1>

          <p className="lede mx-auto mt-4 max-w-[34ch] text-[clamp(1rem,1.5vw,1.15rem)]">
            Plan, shape, and schedule your social content in one calm workspace.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="/app" className="btn btn-dark">
              Open workspace
              <ArrowRight size={16} />
            </a>
            <a href="#how-it-works" className="btn btn-light">
              See how it works
              <ArrowDown size={16} />
            </a>
          </div>
        </div>

        <HeroCarousel />
      </div>
    </section>
  )
}
