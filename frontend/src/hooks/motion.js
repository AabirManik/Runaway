import { useEffect, useState } from 'react'

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Tracks the user's reduced-motion preference live (responds to OS changes).
 * Used to disable auto-advance, parallax and reveal transitions in JS —
 * CSS has a matching media query as a safety net.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(REDUCED_QUERY).matches
  })

  useEffect(() => {
    if (!window.matchMedia) return undefined
    const mq = window.matchMedia(REDUCED_QUERY)
    const onChange = (event) => setReduced(event.matches)
    setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Decorative motion must pause while the page is hidden (FRONTEND.md).
 * Adds/removes `is-hidden-motion` on <html> so CSS can pause keyframes,
 * and reports the flag so JS timers can stop too.
 */
export function usePageHidden() {
  const [hidden, setHidden] = useState(
    () => typeof document !== 'undefined' && document.visibilityState === 'hidden',
  )

  useEffect(() => {
    const onChange = () => {
      const isHidden = document.visibilityState === 'hidden'
      setHidden(isHidden)
      document.documentElement.classList.toggle('is-hidden-motion', isHidden)
    }
    onChange()
    document.addEventListener('visibilitychange', onChange)
    return () => {
      document.removeEventListener('visibilitychange', onChange)
      document.documentElement.classList.remove('is-hidden-motion')
    }
  }, [])

  return hidden
}
