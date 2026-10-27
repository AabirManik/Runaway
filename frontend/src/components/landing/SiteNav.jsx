import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '../../data/landing'
import { ArrowRight, Close, Menu } from '../ui/Icons'

/**
 * Sticky top navigation.
 * - In-page anchors for the five landing sections (matched to section IDs).
 * - Wordmark returns to the top of the landing page.
 * - "Open workspace" routes to /app.
 * - Narrow screens use an accessible disclosure menu (focus + Escape aware).
 */
export default function SiteNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const menuButtonRef = useRef(null)
  const panelRef = useRef(null)

  /* subtle border once the page has moved — transform/opacity free, so no jank */
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  /* close the menu whenever the route changes */
  useEffect(() => setOpen(false), [location.pathname, location.hash])

  /* focus the panel on open, restore to the trigger on Escape */
  useEffect(() => {
    if (!open) return undefined
    const first = panelRef.current?.querySelector('a, button')
    first?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const goTop = (event) => {
    if (location.pathname !== '/') return
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-canvas/88 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div
        className={`shell flex h-[74px] items-center justify-between gap-6 transition-[border-color] duration-300 ${
          scrolled ? 'border-b border-line' : 'border-b border-transparent'
        }`}
      >
        <Link
          to="/"
          onClick={goTop}
          className="font-sans text-[1.05rem] font-semibold tracking-[0.34em] text-ink"
          aria-label="Runway — back to top"
        >
          RUNWAY
        </Link>

        <nav aria-label="Landing sections" className="hidden min-[960px]:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-[0.95rem] text-ink-2 transition-colors duration-200 hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-[width] after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/app" className="btn btn-dark hidden sm:inline-flex">
            Open workspace
            <ArrowRight size={16} />
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/70 text-ink min-[960px]:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* narrow-screen menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="min-[960px]:hidden"
      >
        <div className="shell border-b border-line bg-canvas/97 pb-5 pt-1 backdrop-blur-md">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line-2 py-3.5 text-[1.02rem] text-ink-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <Link to="/app" className="btn btn-dark w-full">
                Open workspace
                <ArrowRight size={16} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
