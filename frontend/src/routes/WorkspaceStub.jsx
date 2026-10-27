import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, IconCalendar, IconDoc, IconImage, IconUser } from '../components/ui/Icons'

const PLANNED = [
  { Icon: IconDoc, label: 'Composer with per-channel copy' },
  { Icon: IconCalendar, label: 'Calendar and scheduling' },
  { Icon: IconImage, label: 'Media library' },
  { Icon: IconUser, label: 'Connected accounts (examples)' },
]

/**
 * Phase 1 placeholder for /app.
 * The landing CTA needs a real destination before the workspace exists,
 * so it lands here rather than on a dead link. Phase 2 replaces this file
 * with the interactive workspace shell.
 */
export default function WorkspaceStub() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-line bg-canvas/88 backdrop-blur-md">
        <div className="shell flex h-[74px] items-center justify-between">
          <Link
            to="/"
            className="font-sans text-[1.05rem] font-semibold tracking-[0.34em] text-ink"
          >
            RUNWAY
          </Link>
          <Link to="/" className="btn btn-quiet">
            <ArrowLeft size={16} />
            Back to the landing page
          </Link>
        </div>
      </header>

      <main className="shell py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Workspace · Phase 2</p>

          <h1 className="display mt-5 text-[clamp(2.2rem,5.5vw,3.6rem)]">
            The workspace is next in line.
          </h1>

          <p className="lede mx-auto mt-5 max-w-[46ch] text-[1.05rem]">
            You have reached the destination of the landing-page CTA. This release is the
            frontend foundation, so the interactive workspace has not been built yet — and
            nothing here is connected to a server.
          </p>

          <Link to="/" className="btn btn-dark mt-8">
            Back to the landing page
            <ArrowRight size={16} />
          </Link>
        </div>

        <section
          aria-labelledby="coming-heading"
          className="mx-auto mt-16 max-w-3xl rounded-[24px] border border-line bg-canvas-2 p-7 sm:p-9"
        >
          <h2 id="coming-heading" className="display text-[1.55rem]">
            Planned for the workspace
          </h2>
          <p className="lede mt-2 text-[0.95rem]">
            Local sample data only — no API, database, authentication, or publishing.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {PLANNED.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent">
                  <Icon size={17} />
                </span>
                <span className="text-[0.95rem] font-medium text-ink-2">{label}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[0.85rem] leading-relaxed text-muted-2">
            Prototype status: this screen is a deliberate placeholder so the landing page
            never links to a dead destination. It is replaced wholesale in Phase 2.
          </p>
        </section>
      </main>
    </div>
  )
}
