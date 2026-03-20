import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollReveal(options = {}) {
  const el = ref(null)
  const isVisible = ref(false)
  const { threshold = 0.15, once = true } = options

  let observer

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (once) observer.disconnect()
        }
      },
      { threshold }
    )
    if (el.value) observer.observe(el.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { el, isVisible }
}
