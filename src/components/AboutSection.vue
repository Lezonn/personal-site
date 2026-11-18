<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useReveal } from '@/composables/useReveal'

const root = useReveal()

const focusAreas = [
  {
    index: '01',
    title: 'AI Product Owner',
    text: 'Discovery to delivery for AI features that fix real ops pain.'
  },
  {
    index: '02',
    title: 'Process Automation · RPA',
    text: 'Map the as-is process, then automate the repetitive parts.'
  },
  {
    index: '03',
    title: 'Software Development',
    text: 'Full-stack web apps and integrations grounded in engineering experience.'
  }
]

const metrics = [
  { prefix: '~', value: 15, suffix: '', label: 'RPA solutions in production' },
  { prefix: '', value: 4, suffix: '', label: 'GenAI initiatives shipped' },
  { prefix: '', value: 127, suffix: '', label: 'Auto2000 branches served' },
  { prefix: '', value: 68, suffix: '%', label: 'workload cut by automation' }
]

// metrics count up once they scroll into view
const shown = reactive(metrics.map(() => 0))
const metricsEl = ref(null)
let countObserver = null
let countFrame = 0

function countUp() {
  const start = performance.now()
  const step = (now) => {
    const p = Math.min((now - start) / 1400, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    metrics.forEach((m, i) => (shown[i] = Math.round(m.value * eased)))
    if (p < 1) countFrame = requestAnimationFrame(step)
  }
  countFrame = requestAnimationFrame(step)
}

onMounted(() => {
  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    metrics.forEach((m, i) => (shown[i] = m.value))
    return
  }
  countObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      countObserver.disconnect()
      countUp()
    },
    { threshold: 0.4 }
  )
  countObserver.observe(metricsEl.value)
})

onUnmounted(() => {
  countObserver?.disconnect()
  cancelAnimationFrame(countFrame)
})
</script>

<template>
  <section id="about" ref="root" class="about">
    <div class="container about_inner">
      <div class="about_grid">
        <div class="about_copy">
          <p class="about_kicker reveal">About</p>
          <h2 class="about_heading reveal" style="transition-delay: 0.05s">
            Engineer who speaks <em>operations</em>, owner who can <em>ship</em>.
          </h2>
          <p class="about_lede reveal" style="transition-delay: 0.1s">
            I'm Leonard Zonaphan — AI Product Owner for Process Automation at Astra TSO Auto2000. I
            turn field problems into shipped improvements, reporting impact up to C-level.
          </p>
        </div>
        <div class="about_focus">
          <article
            v-for="area in focusAreas"
            :key="area.index"
            class="about_row reveal"
            style="transition-delay: 0.1s"
          >
            <span class="about_row_index">{{ area.index }}</span>
            <div>
              <h3>{{ area.title }}</h3>
              <p>{{ area.text }}</p>
            </div>
          </article>
        </div>
      </div>
      <div ref="metricsEl" class="about_metrics reveal">
        <div v-for="(m, i) in metrics" :key="m.label" class="about_metric">
          <span class="about_metric_value" aria-hidden="true">
            {{ m.prefix }}{{ shown[i] }}{{ m.suffix }}
          </span>
          <span class="sr-only">{{ m.prefix }}{{ m.value }}{{ m.suffix }}</span>
          <span class="about_metric_label">{{ m.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.about {
  position: relative;
  background: radial-gradient(50vmax 30vmax at 100% 45%, rgba(232, 176, 75, 0.1), transparent 60%),
    radial-gradient(50vmax 40vmax at 0% 80%, rgba(7, 90, 78, 0.45), transparent 60%), var(--c-bg);
  padding: $--spacing-xl 0;
  overflow: hidden;

  &_inner {
    max-width: 1120px;
  }

  &_grid {
    display: grid;
    gap: $--spacing-m;
    align-items: center;
  }

  &_kicker {
    font-size: $--font-mini;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--c-accent);
    margin-bottom: 0.5rem;
  }

  &_heading {
    font-family: $--title-font;
    font-size: clamp(2rem, 1.2rem + 3.4vw, 3.6rem);
    line-height: 1.05;
    letter-spacing: -0.01em;
    text-wrap: balance;
    color: var(--c-text);
    max-width: 760px;
    margin: 0;

    em {
      font-style: normal;
      color: var(--c-highlight);
    }
  }

  &_lede {
    max-width: 640px;
    margin: $--spacing-s 0 0;
    font-size: $--font-h6;
    line-height: 1.65;
    color: var(--c-text-dim);
  }

  &_focus {
    margin-top: $--spacing-s;
    border-top: 1px solid var(--c-border);
  }

  &_row {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.25rem;
    align-items: baseline;
    padding: 1.1rem 0.5rem;
    border-bottom: 1px solid var(--c-border);
    transition:
      background 0.25s ease,
      padding 0.25s ease;

    &:hover {
      background: var(--c-hover);
      padding-left: 1rem;
    }

    &_index {
      font-family: $--title-font;
      font-size: $--font-h4;
      color: transparent;
      -webkit-text-stroke: 1.5px var(--c-accent);
    }

    h3 {
      font-size: $--font-h5;
      color: var(--c-text);
      margin: 0 0 0.25rem;
    }

    p {
      margin: 0;
      font-size: $--font-link;
      color: var(--c-text-dim);
    }
  }

  &_metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem 0;
    margin-top: $--spacing-m;
    padding-top: $--spacing-s;
    border-top: 1px solid var(--c-border);
  }

  &_metric {
    padding: 0 1rem;
    border-left: 2px solid var(--c-accent);

    &_value {
      display: block;
      font-family: $--title-font;
      font-size: clamp(2rem, 1.4rem + 2vw, 3rem);
      line-height: 1;
      color: var(--c-text);
      font-variant-numeric: tabular-nums;
    }

    &_label {
      display: block;
      margin-top: 0.35rem;
      font-size: $--font-mini;
      color: var(--c-text-dim);
    }
  }
}

@media (min-width: 768px) {
  .about_metrics {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 960px) {
  .about_grid {
    grid-template-columns: 1fr 1fr;
    gap: $--spacing-l;
  }
}
</style>
