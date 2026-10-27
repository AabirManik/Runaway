import { features } from '../../data/landing'
import { mediaAt } from '../../data/images'
import {
  IconCalendar,
  IconDoc,
  IconImage,
  IconUser,
} from '../ui/Icons'
import Reveal from '../ui/Reveal'

const ICONS = { doc: IconDoc, calendar: IconCalendar, image: IconImage, user: IconUser }

function FeatureVisual({ kind }) {
  if (kind === 'drafts') {
    return (
      <div className="mt-5 flex items-end gap-3">
        <div className="flex-1 space-y-2">
          <span className="block h-2 w-[85%] rounded-full bg-line-2" />
          <span className="block h-2 w-[68%] rounded-full bg-line-2" />
          <span className="block h-2 w-[52%] rounded-full bg-line-2" />
        </div>
        <img
          {...mediaAt(3)}
          alt=""
          loading="lazy"
          className="h-16 w-20 shrink-0 rounded-lg object-cover"
        />
      </div>
    )
  }

  if (kind === 'calendar') {
    return (
      <div className="mt-5 flex items-end gap-3">
        <div className="grid flex-1 grid-cols-7 gap-1">
          {Array.from({ length: 14 }, (_, index) => (
            <span
              key={index}
              className={`aspect-square rounded-[3px] ${
                index === 3
                  ? 'bg-coral'
                  : index === 9
                    ? 'bg-accent-2'
                    : 'border border-line-2 bg-white'
              }`}
            />
          ))}
        </div>
        <img
          {...mediaAt(1)}
          alt=""
          loading="lazy"
          className="h-16 w-20 shrink-0 rounded-lg object-cover"
        />
      </div>
    )
  }

  if (kind === 'media') {
    return (
      <div className="mt-5 grid grid-cols-4 gap-2">
        {[0, 2, 6].map((index) => (
          <img
            key={index}
            {...mediaAt(index)}
            alt=""
            loading="lazy"
            className="h-16 w-full rounded-lg object-cover"
          />
        ))}
        <span className="grid h-16 place-items-center rounded-lg bg-canvas-3 text-lg text-muted-2">
          +
        </span>
      </div>
    )
  }

  return (
    <div className="mt-5 space-y-2.5">
      {['bg-accent', 'bg-coral', 'bg-line'].map((tone, index) => (
        <div key={tone} className="flex items-center gap-2.5">
          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${tone}`} />
          <span
            className="h-2 rounded-full bg-line-2"
            style={{ width: `${[70, 56, 44][index]}%` }}
          />
          <span className="ml-auto text-[11px] text-muted-2">›</span>
        </div>
      ))}
    </div>
  )
}

export default function FeatureGrid() {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Made for your content flow</p>
          <h2 className="display mt-4 text-[clamp(2.05rem,4.6vw,3.35rem)]">
            Everything planned in one place.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = ICONS[feature.icon]
            return (
              <Reveal
                as="article"
                key={feature.title}
                delay={index * 90}
                className="flex flex-col rounded-[20px] border border-line bg-canvas-2 p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[#d5cebd]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent">
                  <Icon size={19} />
                </span>
                <h3 className="mt-4 text-[1.05rem] font-semibold tracking-tight text-ink">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">
                  {feature.body}
                </p>
                <FeatureVisual kind={feature.visual} />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
