import { ref, onMounted, onUnmounted } from 'vue'

// Observes `.reveal` elements inside the component root and fades/slides
// them in on scroll. Respects prefers-reduced-motion. Usage:
//   const root = useReveal()
//   <section ref="root"> ... <div class="reveal"> ...
export function useReveal() {
  const root = ref(null)
  let observer = null

  onMounted(() => {
    const items = root.value ? root.value.querySelectorAll('.reveal') : []
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      items.forEach((el) => el.classList.add('is-visible'))
      return
    }
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    )
    items.forEach((el) => observer.observe(el))
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  return root
}
