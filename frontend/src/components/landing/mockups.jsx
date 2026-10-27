import { mediaImages } from '../../data/images'
import {
  IconCalendar,
  IconCheck,
  IconDoc,
  IconImage,
  IconSearch,
  IconSliders,
  IconText,
  IconUser,
} from '../ui/Icons'

/**
 * Product mockups used as illustrations inside marketing sections.
 *
 * They are rendered as real markup (crisper than a PNG and reusable later),
 * and are marked aria-hidden because they *illustrate* the product rather
 * than being the product — every genuinely interactive control on this page
 * is exposed separately with a real label.
 */

const SIDE_ITEMS = [
  { label: 'Content', Icon: IconDoc },
  { label: 'Calendar', Icon: IconCalendar },
  { label: 'Media', Icon: IconImage },
  { label: 'Account', Icon: IconUser },
]

export function MockWindow({ children, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_34px_70px_-46px_rgba(40,33,18,0.55)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-line-2 bg-[#fdfcf9] px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-coral" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#a7d98b]" />
      </div>
      <div className="flex">{children}</div>
    </div>
  )
}

export function MockSidebar({ active = 'Content' }) {
  return (
    <aside className="hidden w-[136px] shrink-0 border-r border-line-2 bg-[#fcfbf7] p-3.5 sm:block">
      <div className="mb-4 pl-1 text-[9.5px] font-semibold tracking-[0.3em] text-ink">
        RUNWAY
      </div>
      <ul className="space-y-1">
        {SIDE_ITEMS.map(({ label, Icon }) => (
          <li
            key={label}
            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px] ${
              label === active
                ? 'bg-accent font-semibold text-ink'
                : 'font-medium text-muted'
            }`}
          >
            <Icon size={13} />
            {label}
          </li>
        ))}
      </ul>
      <div className="mt-6 space-y-2 opacity-70">
        <div className="h-2 w-16 rounded-full bg-line-2" />
        <div className="h-2 w-10 rounded-full bg-line-2" />
      </div>
    </aside>
  )
}

function ViewPills({ items, active }) {
  return (
    <div className="flex items-center rounded-full border border-line-2 bg-canvas p-0.5">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-full px-2.5 py-1 text-[10px] ${
            item === active
              ? 'border border-line bg-white font-semibold text-ink'
              : 'text-muted'
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

const MONTH_DAYS = [
  { n: 29, out: true }, { n: 30, out: true }, { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 },
  { n: 6 }, { n: 7 }, { n: 8 }, { n: 9 }, { n: 10 }, { n: 11 }, { n: 12 },
  { n: 13 }, { n: 14 }, { n: 15 }, { n: 16 }, { n: 17 }, { n: 18 }, { n: 19 },
  { n: 20 }, { n: 21, img: 3, label: 'Draft', tone: 'accent' },
  { n: 22 }, { n: 23, img: 1, label: 'Scheduled', tone: 'coral' }, { n: 24 },
  { n: 25, img: 5, label: 'Draft', tone: 'accent' }, { n: 26 },
  { n: 27 }, { n: 28, img: 2, label: 'Scheduled', tone: 'coral' }, { n: 29 },
  { n: 30 }, { n: 31, img: 0, label: 'Draft', tone: 'accent' },
  { n: 1, out: true }, { n: 2, out: true },
]

export function MockCalendarMonth() {
  return (
    <MockWindow>
      <MockSidebar active="Content" />
      <div className="min-w-0 flex-1 p-3.5 sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
            Calendar
          </span>
          <div className="flex items-center gap-2">
            <ViewPills items={['Week', 'Month', 'List']} active="Month" />
            <span className="rounded-full bg-ink px-2.5 py-1.5 text-[10px] font-medium text-white">
              + New post
            </span>
          </div>
        </div>

        <div className="mb-2 flex items-center gap-2 text-[10.5px] text-muted">
          <span className="rounded-md border border-line-2 px-2 py-1 font-medium text-ink">
            May 2024
          </span>
          <span className="flex gap-1">
            <span className="grid h-5 w-5 place-items-center rounded-md border border-line-2">‹</span>
            <span className="grid h-5 w-5 place-items-center rounded-md border border-line-2">›</span>
          </span>
        </div>

        <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-line-2 bg-line-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="bg-[#fcfbf7] px-1.5 py-1 text-[9px] font-medium text-muted-2">
              {day}
            </div>
          ))}
          {MONTH_DAYS.map((day, index) => (
            <div key={index} className="min-h-[46px] bg-white p-1">
              <span
                className={`text-[9.5px] ${day.out ? 'text-muted-2/60' : 'text-muted'}`}
              >
                {day.n}
              </span>
              {day.img !== undefined && (
                <div className="mt-1 overflow-hidden rounded-md border border-line-2">
                  <img
                    src={mediaImages[day.img]}
                    alt=""
                    loading="lazy"
                    className="h-8 w-full object-cover"
                  />
                  <span className="flex items-center gap-1 px-1 py-0.5 text-[7.5px] text-muted">
                    <i
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        day.tone === 'coral' ? 'bg-coral' : 'bg-accent-2'
                      }`}
                    />
                    <span className="hidden min-w-0 truncate sm:block">
                      {day.label}
                    </span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MockWindow>
  )
}

const WEEK_COLUMNS = [
  { day: 'Mon', date: 'May 20', events: [{ at: 0, img: 4, label: 'Draft', tone: 'accent' }] },
  { day: 'Tue', date: 'May 21', events: [{ at: 1, img: 1, label: 'Scheduled', tone: 'coral' }] },
  { day: 'Wed', date: 'May 22', events: [{ at: 0, img: 0, label: 'Scheduled', tone: 'coral' }] },
  { day: 'Thu', date: 'May 23', events: [{ at: 2, img: 6, label: 'Draft', tone: 'accent' }] },
  { day: 'Fri', date: 'May 24', events: [{ at: 1, img: 7, label: 'Draft', tone: 'accent' }] },
  { day: 'Sat', date: 'May 25', events: [{ at: 2, img: 3, label: 'Scheduled', tone: 'coral' }] },
  { day: 'Sun', date: 'May 26', events: [{ at: 3, img: 2, label: 'Draft', tone: 'accent' }] },
]

const TIME_ROWS = ['9 AM', '12 PM', '3 PM', '6 PM']

export function MockCalendarWeek() {
  return (
    <MockWindow>
      <MockSidebar active="Calendar" />
      <div className="min-w-0 flex-1 p-3.5 sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
              Calendar
            </span>
            <span className="hidden rounded-md border border-line-2 px-2 py-1 text-[10px] text-muted sm:inline">
              May 20 – May 26, 2024
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ViewPills items={['Week', 'Month', 'List']} active="Week" />
            <span className="hidden rounded-full bg-ink px-2.5 py-1.5 text-[10px] font-medium text-white sm:inline">
              + New post
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-8 shrink-0 pt-[26px]">
            {TIME_ROWS.map((time) => (
              <div key={time} className="h-[46px] text-right text-[8.5px] text-muted-2">
                {time}
              </div>
            ))}
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-7 gap-1.5">
            {WEEK_COLUMNS.map((col) => (
              <div key={col.day} className="min-w-0">
                <div className="mb-1.5 text-center">
                  <div className="text-[9px] font-medium text-muted">{col.day}</div>
                  <div className="text-[8.5px] text-muted-2">{col.date}</div>
                </div>
                <div className="space-y-1.5">
                  {TIME_ROWS.map((time, rowIndex) => {
                    const event = col.events.find((item) => item.at === rowIndex)
                    if (!event) {
                      return (
                        <div
                          key={time}
                          className="h-[42px] rounded-md border border-line-2 bg-[#fcfbf7]/70"
                        />
                      )
                    }
                    return (
                      <div key={time} className="overflow-hidden rounded-md border border-line-2 bg-white">
                        <img
                          src={mediaImages[event.img]}
                          alt=""
                          loading="lazy"
                          className="h-[26px] w-full object-cover"
                        />
                        <span className="flex items-center gap-1 px-1 py-0.5 text-[7.5px] text-muted">
                          <i
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              event.tone === 'coral' ? 'bg-coral' : 'bg-accent-2'
                            }`}
                          />
                          <span className="hidden min-w-0 truncate sm:block">
                            {event.label}
                          </span>
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockWindow>
  )
}

export function MockMediaGrid({ count = 7, showChrome = true }) {
  const grid = (
    <div className="grid grid-cols-3 gap-2 p-3.5 sm:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="relative overflow-hidden rounded-lg border border-line-2">
          <img
            src={mediaImages[index]}
            alt=""
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
          <span className="absolute left-1.5 top-1.5 h-3 w-3 rounded border-[1.5px] border-white/90" />
          <span className="absolute right-1.5 top-1.5 text-[9px] leading-none text-white/90">
            ⋯
          </span>
        </div>
      ))}
      {showChrome && (
        <div className="grid aspect-[4/3] place-items-center rounded-lg border border-line-2 bg-canvas-3 text-lg text-muted-2">
          +
        </div>
      )}
    </div>
  )

  if (!showChrome) return <div aria-hidden="true">{grid}</div>

  return (
    <MockWindow>
      <MockSidebar active="Media" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 px-3.5 pb-2 pt-3.5">
          <span className="mr-auto font-display text-[15px] font-semibold tracking-tight text-ink">
            Media
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-line px-2.5 py-1.5 text-[10px] text-muted-2 sm:flex">
            <IconSearch size={11} />
            Search assets
          </span>
          <span className="grid h-6 w-6 place-items-center rounded-md border border-line bg-accent">
            <IconImage size={12} />
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 pb-1">
          {['All assets', 'Photos', 'Videos'].map((filter, index) => (
            <span
              key={filter}
              className={`rounded-full px-2.5 py-1 text-[10px] ${
                index === 0 ? 'border border-accent-2 bg-accent font-medium text-ink' : 'text-muted'
              }`}
            >
              {filter}
            </span>
          ))}
        </div>
        {grid}
      </div>
    </MockWindow>
  )
}

/* ------------------------------------------------------------------
   "How it works" demo panels — the actual flow, step by step
------------------------------------------------------------------- */
const CHANNELS = [
  { name: 'Channel A', Icon: IconText, lines: ['Weekend reset — three small', 'habits that actually stuck.'], count: '142 / 280' },
  { name: 'Channel B', Icon: IconImage, lines: ['Behind the scenes: how this', 'week’s set came together.'], count: '96 / 2200' },
  { name: 'Channel C', Icon: IconUser, lines: ['New drop is live. Full breakdown', 'in the link.'], count: '74 / 3000' },
]

export function MockComposer() {
  return (
    <div className="rounded-2xl border border-line-2 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent">
          <IconDoc size={15} />
        </span>
        <span className="text-[12.5px] font-semibold text-ink">New post</span>
        <span className="ml-auto rounded-full bg-canvas-3 px-2 py-0.5 text-[9.5px] text-muted">
          Draft
        </span>
      </div>

      <div className="rounded-xl border border-line-2 bg-canvas-2 p-3">
        <p className="text-[12.5px] leading-relaxed text-ink-2">
          Weekend reset — three small habits that actually stuck this week, and the one
          I’m dropping.
        </p>
        <div className="mt-3 flex items-center gap-2">
        {[3, 1].map((index) => (
          <img
            key={index}
            src={mediaImages[index]}
            alt=""
            loading="lazy"
            className="h-16 w-24 rounded-lg object-cover"
          />
        ))}
        <span className="grid h-16 w-16 place-items-center rounded-lg border border-dashed border-line bg-white text-muted-2">
          +
        </span>
      </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-muted">
        <span className="flex items-center gap-1.5 rounded-md bg-canvas-3 px-2 py-1">
          <IconImage size={11} /> 2 images
        </span>
        <span className="flex items-center gap-1.5 rounded-md bg-canvas-3 px-2 py-1">
          <IconSliders size={11} /> 3 channels
        </span>
        <span className="ml-auto flex gap-2">
          <span className="rounded-full border border-line px-2.5 py-1">Save draft</span>
          <span className="rounded-full bg-ink px-2.5 py-1 text-white">Schedule</span>
        </span>
      </div>
    </div>
  )
}

export function MockChannels() {
  return (
    <div className="grid gap-2.5 sm:grid-cols-3">
      {CHANNELS.map(({ name, Icon, lines, count }) => (
        <div key={name} className="rounded-2xl border border-line-2 bg-white p-3.5">
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-canvas-3">
              <Icon size={13} />
            </span>
            <span className="text-[11.5px] font-semibold text-ink">{name}</span>
          </div>
          <div className="space-y-1.5 rounded-lg bg-canvas-2 p-2.5">
            {lines.map((line) => (
              <p key={line} className="text-[11px] leading-snug text-ink-2">
                {line}
              </p>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between text-[9.5px] text-muted-2">
            <span>{count}</span>
            <span className="flex items-center gap-1 text-muted">
              <IconCheck size={10} /> tailored
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function MockSchedule() {
  return (
    <div className="rounded-2xl border border-line-2 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent">
          <IconCalendar size={15} />
        </span>
        <span className="text-[12.5px] font-semibold text-ink">Schedule post</span>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-xl border border-line-2 bg-canvas-2 p-3">
          <div className="text-[9.5px] uppercase tracking-[0.18em] text-muted-2">Date</div>
          <div className="mt-1 flex items-center justify-between text-[13px] font-medium text-ink">
            May 24, 2024 <span className="text-muted-2">▾</span>
          </div>
        </div>
        <div className="rounded-xl border border-line-2 bg-canvas-2 p-3">
          <div className="text-[9.5px] uppercase tracking-[0.18em] text-muted-2">Time</div>
          <div className="mt-1 flex items-center justify-between text-[13px] font-medium text-ink">
            10:00 AM <span className="text-muted-2">▾</span>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
          <div
            key={index}
            className={`grid aspect-square place-items-center rounded-md text-[10px] ${
              index === 4
                ? 'bg-ink font-semibold text-white'
                : 'border border-line-2 text-muted'
            }`}
          >
            {20 + index}
          </div>
        ))}
        <div className="col-span-7 mt-1 text-center text-[9px] text-muted-2">
          Times shown are local
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="rounded-full border border-line px-3 py-1.5 text-[10.5px] text-muted">
          Save as draft
        </span>
        <span className="ml-auto rounded-full bg-ink px-3 py-1.5 text-[10.5px] font-medium text-white">
          Schedule post
        </span>
      </div>
    </div>
  )
}
