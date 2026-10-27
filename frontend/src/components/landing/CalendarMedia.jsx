import { IconCalendar, IconImage } from '../ui/Icons'
import Reveal from '../ui/Reveal'
import { MockCalendarWeek, MockMediaGrid } from './mockups'

function TextBlock({ Icon, title, body, align = 'left' }) {
  return (
    <div className={align === 'right' ? 'lg:pl-4' : ''}>
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent">
        <Icon size={26} />
      </span>
      <h3 className="display mt-6 max-w-[14ch] text-[clamp(1.7rem,3vw,2.45rem)]">{title}</h3>
      <p className="lede mt-4 max-w-[38ch] text-[1.02rem]">{body}</p>
    </div>
  )
}

export default function CalendarMedia() {
  return (
    <section id="calendar-media" className="overflow-hidden py-20 sm:py-24">
      <div className="shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Plan with clarity</p>
          <h2 className="display mt-4 text-[clamp(2.05rem,4.6vw,3.35rem)]">
            Your content, in a rhythm that works.
          </h2>
          <p className="lede mx-auto mt-4 max-w-[44ch] text-[1.05rem]">
            Plan, organize, and find your content — all in one place.
          </p>
        </Reveal>

        {/* week calendar */}
        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
          <Reveal>
            <TextBlock
              Icon={IconCalendar}
              title="A calendar that keeps the week in view."
              body="See drafts and scheduled posts together, then shape a week that feels manageable."
            />
          </Reveal>

          <Reveal delay={120} className="relative">
            <span
              aria-hidden="true"
              className="ambient -bottom-14 -right-10 h-52 w-52 rounded-full bg-accent-2/40"
            />
            <div className="relative">
              <MockCalendarWeek />
            </div>
          </Reveal>
        </div>

        {/* media library */}
        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-12">
          <Reveal className="relative order-2 lg:order-1">
            <span
              aria-hidden="true"
              className="ambient -bottom-16 -left-10 h-52 w-52 rounded-full bg-sky/70"
            />
            <div className="relative">
              <MockMediaGrid />
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <TextBlock
              Icon={IconImage}
              title="Keep every visual within reach."
              body="Find and reuse the images and videos you already trust, all in one tidy library."
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
