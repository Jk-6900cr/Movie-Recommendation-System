import { useEffect, useRef } from 'react'

/**
 * Adds the "is-visible" class once the element scrolls into view.
 * Pairs with the .reveal CSS class defined in index.css.
 * Keeps animation logic dependency-free (IntersectionObserver is native).
 */
export default function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15, ...options },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return ref
}