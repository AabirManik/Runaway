import { useEffect, useRef, useState } from 'react'

/**
 * Subtle scroll reveal using IntersectionObserver.
 * Only ever animates opacity + transform, so it can never shift layout.
 * Falls back to "visible" when IntersectionObserver is unavailable, and
 * reveals immediately when the user prefers reduced motion.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (disabled || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }

    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [disabled])

  const classes = [
    'reveal',
    visible ? 'is-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      ref={ref}
      className={classes}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
