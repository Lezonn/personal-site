<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useReveal } from '@/composables/useReveal'
import leoImg from '@/assets/leo.webp'

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

// photo card tilts toward the pointer (2.5D)
const tilt = reactive({ x: 0, y: 0 })
function onTilt(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  tilt.x = ((event.clientY - rect.top) / rect.height - 0.5) * -12
  tilt.y = ((event.clientX - rect.left) / rect.width - 0.5) * 14
}
function resetTilt() {
  tilt.x = 0
  tilt.y = 0
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
        <div class="about_photo reveal" style="transition-delay: 0.15s">
          <div
            class="about_card"
            :style="{ '--rx': `${tilt.x}deg`, '--ry': `${tilt.y}deg` }"
            @pointermove="onTilt"
            @pointerleave="resetTilt"
          >
            <div class="about_card_back" aria-hidden="true" />
            <img
              :src="leoImg"
              class="about_card_img"
              alt="Portrait of Leonard Zonaphan"
              width="900"
              height="1200"
              loading="lazy"
            />
            <span class="about_card_badge about_card_badge--top">AI Product Owner</span>
            <span class="about_card_badge about_card_badge--bottom">Jakarta, ID</span>
          </div>
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
    radial-gradient(50vmax 40vmax at 0% 80%, rgba(7, 90, 78, 0.45), transparent 60%), $--color-bg;
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
    color: $--color-accent;
    margin-bottom: 0.5rem;
  }

  &_heading {
    font-family: $--title-font;
    font-size: clamp(2rem, 1.2rem + 3.4vw, 3.6rem);
    line-height: 1.05;
    letter-spacing: -0.01em;
    text-wrap: balance;
    color: $--color-cream;
    max-width: 760px;
    margin: 0;

    em {
      font-style: normal;
      color: $--color-accent;
    }
  }

  &_lede {
    max-width: 640px;
    margin: $--spacing-s 0 0;
    font-size: $--font-h6;
    line-height: 1.65;
    color: $--color-cream-dim;
  }

  &_focus {
    margin-top: $--spacing-s;
    border-top: 1px solid rgba(242, 236, 221, 0.3);
  }

  &_row {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.25rem;
    align-items: baseline;
    padding: 1.1rem 0.5rem;
    border-bottom: 1px solid $--color-line;
    transition:
      background 0.25s ease,
      padding 0.25s ease;

    &:hover {
      background: rgba(242, 236, 221, 0.04);
      padding-left: 1rem;
    }

    &_index {
      font-family: $--title-font;
      font-size: $--font-h4;
      color: transparent;
      -webkit-text-stroke: 1.5px $--color-accent;
    }

    h3 {
      font-size: $--font-h5;
      color: $--color-cream;
      margin: 0 0 0.25rem;
    }

    p {
      margin: 0;
      font-size: $--font-link;
      color: $--color-cream-dim;
    }
  }

  // ---------- 2.5D photo card ----------

  &_photo {
    justify-self: center;
    width: min(100%, 360px);
    perspective: 900px;
    padding-top: 2.5rem;
  }

  &_card {
    --rx: 0deg;
    --ry: 0deg;
    position: relative;
    aspect-ratio: 3 / 3.6;
    transform-style: preserve-3d;
    transform: rotateX(var(--rx)) rotateY(var(--ry));
    transition: transform 0.25s ease-out;

    &_back {
      position: absolute;
      inset: 0;
      border-radius: 28px;
      background: radial-gradient(70% 60% at 50% 35%, rgba(232, 176, 75, 0.35), transparent 70%),
        radial-gradient(90% 70% at 50% 100%, rgba(31, 122, 106, 0.7), transparent 75%),
        $--color-bg-raised;
      border: 1px solid rgba(242, 236, 221, 0.18);
      box-shadow:
        0 40px 80px rgba(0, 0, 0, 0.45),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }

    // the cut-out pops out of the frame, in front of it
    &_img {
      position: absolute;
      left: 6%;
      bottom: 0;
      width: 88%;
      height: auto;
      transform: translateZ(40px);
      border-radius: 0 0 28px 28px;
      mask-image: linear-gradient(to bottom, #000 85%, transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, #000 85%, transparent 100%);
      filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.4));
    }

    &_badge {
      position: absolute;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 0.45rem 0.95rem;
      border-radius: 999px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);

      &--top {
        top: 12%;
        left: -6%;
        color: $--color-ink;
        background: $--color-accent;
        transform: translateZ(70px);
      }

      &--bottom {
        bottom: 9%;
        right: -5%;
        color: $--color-cream;
        background: rgba(6, 27, 24, 0.85);
        border: 1px solid $--color-line;
        transform: translateZ(60px);
      }
    }
  }

  &_metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem 0;
    margin-top: $--spacing-m;
    padding-top: $--spacing-s;
    border-top: 1px solid $--color-line;
  }

  &_metric {
    padding: 0 1rem;
    border-left: 2px solid $--color-accent;

    &_value {
      display: block;
      font-family: $--title-font;
      font-size: clamp(2rem, 1.4rem + 2vw, 3rem);
      line-height: 1;
      color: $--color-cream;
      font-variant-numeric: tabular-nums;
    }

    &_label {
      display: block;
      margin-top: 0.35rem;
      font-size: $--font-mini;
      color: $--color-cream-dim;
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
    grid-template-columns: 1.35fr 1fr;
    gap: $--spacing-l;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about_card {
    transform: none;
    transition: none;
  }
}
</style>
