<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import HomeSection from './HomeSection.vue'
import JourneyCard from './JourneyCard.vue'
import JourneyRail from './JourneyRail.vue'
import { stops } from '@/data/journey'
import { detectTier } from '@/journey/quality'

// Hero + career journey share one sticky WebGL stage. The DOM steps (hero,
// then one per stop) scroll over it; their positions drive the 3D progress.
// Until the visitor first interacts, the stage shows a pre-rendered poster of
// the opening shot, so building the scene never competes with the first paint.
const WAKE_EVENTS = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'keydown', 'scroll']
const tier = detectTier()
const mode = ref(tier === 'static' ? 'static' : '3d')
const root = ref(null)
const stage = ref(null)
const canvas = ref(null)
const ready = ref(false)
const progress = ref(0)
const inView = ref(true)

const active = computed(() => Math.round(progress.value) - 1)
const railVisible = computed(
  () =>
    mode.value === '3d' &&
    inView.value &&
    progress.value > 0.55 &&
    progress.value < stops.length + 0.45
)

let world = null
let starting = false
let anchors = []
let disposed = false
let resizeObserver = null
let viewObserver = null

function measure() {
  if (!root.value) return
  const y = window.scrollY
  anchors = [...root.value.querySelectorAll('[data-step]')].map(
    (el) => el.getBoundingClientRect().top + y
  )
}

function readProgress() {
  const y = window.scrollY
  if (!anchors.length || y <= anchors[0]) return 0
  for (let i = 0; i < anchors.length - 1; i++) {
    if (y < anchors[i + 1]) return i + (y - anchors[i]) / (anchors[i + 1] - anchors[i])
  }
  return anchors.length - 1
}

function onScroll() {
  progress.value = readProgress()
  world?.setProgress(progress.value)
}

function syncRunning() {
  if (!world) return
  if (inView.value && !document.hidden) world.start()
  else world.stop()
}

function fallBackToStatic() {
  world?.dispose()
  world = null
  mode.value = 'static'
}

async function startWorld() {
  if (starting) return
  starting = true
  WAKE_EVENTS.forEach((type) => window.removeEventListener(type, startWorld))
  try {
    await Promise.race([
      document.fonts?.load('700 40px Poppins').catch(() => {}),
      new Promise((resolve) => setTimeout(resolve, 1500))
    ])
    const { createWorld } = await import('@/journey/world')
    if (disposed) return
    world = createWorld(canvas.value, {
      stops,
      tier,
      onFirstFrame: () => (ready.value = true)
    })
    world.resize(stage.value.clientWidth, stage.value.clientHeight)
    world.jumpTo(progress.value)
    canvas.value.addEventListener('webglcontextlost', fallBackToStatic, { once: true })
    syncRunning()
  } catch (error) {
    console.error('Journey 3D failed, showing the 2D timeline instead.', error)
    fallBackToStatic()
  }
}

onMounted(() => {
  measure()
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('visibilitychange', syncRunning)
  resizeObserver = new ResizeObserver(() => {
    measure()
    onScroll()
    if (world && stage.value) world.resize(stage.value.clientWidth, stage.value.clientHeight)
  })
  resizeObserver.observe(root.value)
  if (stage.value) resizeObserver.observe(stage.value)
  viewObserver = new IntersectionObserver(([entry]) => {
    inView.value = entry.isIntersecting
    syncRunning()
  })
  viewObserver.observe(root.value)
  if (mode.value !== '3d') return
  if (window.scrollY > 0) startWorld()
  else WAKE_EVENTS.forEach((type) => window.addEventListener(type, startWorld, { passive: true }))
})

onUnmounted(() => {
  disposed = true
  WAKE_EVENTS.forEach((type) => window.removeEventListener(type, startWorld))
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('visibilitychange', syncRunning)
  resizeObserver?.disconnect()
  viewObserver?.disconnect()
  world?.dispose()
})
</script>

<template>
  <div ref="root" class="world" :class="`world--${mode}`">
    <div v-if="mode === '3d'" ref="stage" class="world_stage" aria-hidden="true">
      <canvas ref="canvas" class="world_canvas" :class="{ 'is-ready': ready }" />
    </div>
    <div class="world_steps">
      <div class="world_step world_step--hero" data-step>
        <home-section :static-mode="mode === 'static'" />
      </div>
      <section id="journey" class="world_journey" aria-labelledby="journey-title">
        <h2 id="journey-title" class="world_journey_title">
          <span class="world_journey_kicker">The ride so far</span>
          From shipping code to shipping <em>AI</em>.
        </h2>
        <div
          v-for="(stop, i) in stops"
          :id="`stop-${stop.id}`"
          :key="stop.id"
          class="world_step"
          :class="i % 2 ? 'is-right' : 'is-left'"
          data-step
        >
          <journey-card
            :stop="stop"
            :index="i"
            :active="mode === 'static' || active === i"
            :overlay="mode === '3d'"
            :still="mode === 'static' ? `/journey/${stop.id}.webp` : ''"
          />
        </div>
      </section>
    </div>
    <journey-rail :stops="stops" :active="active" :visible="railVisible" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.world {
  position: relative;
  background: $--color-bg;

  &_stage {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100lvh;
    overflow: hidden;
    background:
      url('/journey/overview-wide.webp') center / cover no-repeat,
      #061b18;

    @media (max-aspect-ratio: 9/10) {
      background-image: url('/journey/overview-tall.webp');
    }
  }

  &_canvas {
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1.2s ease;

    &.is-ready {
      opacity: 1;
    }
  }

  &_steps {
    position: relative;
    z-index: 1;
  }

  &--3d &_steps {
    margin-top: -100vh;
    margin-top: -100lvh;
  }

  &_step {
    display: flex;
    align-items: center;
    // right padding keeps cards clear of the stop rail
    padding: 6rem calc(clamp(1rem, 5vw, 4.5rem) + 3.5rem) 6rem clamp(1rem, 5vw, 4.5rem);
    min-height: 100vh;
    min-height: 100lvh;

    &.is-right {
      justify-content: flex-end;
    }

    &--hero {
      display: block;
      padding: 0;
    }
  }

  &_journey {
    position: relative;

    &_title {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    }
  }

  // the active stop's card settles into place
  &--3d :deep(.card) {
    transform: translateY(18px) scale(0.97);
  }

  &--3d :deep(.card.is-active) {
    opacity: 1;
    transform: none;
  }
}

@media (max-aspect-ratio: 9/10) {
  .world--3d .world_step:not(.world_step--hero) {
    align-items: flex-end;
    justify-content: center;
    padding: 7rem 0.9rem 1.25rem;
  }
}

// ---------- 2D timeline (no WebGL / reduced motion / data saver) ----------

.world--static {
  .world_journey {
    padding: $--spacing-xl clamp(1rem, 5vw, 3rem);
    max-width: 1080px;
    margin: 0 auto;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: calc(#{$--spacing-xl} + 9rem);
      bottom: $--spacing-xl;
      width: 2px;
      background: linear-gradient(to bottom, $--color-glow-ai, $--color-glow-code);
      opacity: 0.5;
    }

    &_title {
      position: static;
      width: auto;
      height: auto;
      overflow: visible;
      clip: auto;
      white-space: normal;
      display: block;
      text-align: center;
      font-family: $--title-font;
      font-size: clamp(2rem, 1.2rem + 3.4vw, 3.6rem);
      line-height: 1.05;
      color: $--color-cream;
      margin: 0 0 $--spacing-m;

      em {
        font-style: normal;
        color: $--color-accent;
      }
    }

    &_kicker {
      display: block;
      font-family: $--body-font;
      font-size: $--font-mini;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: $--color-accent;
      margin-bottom: 0.5rem;
    }
  }

  .world_step:not(.world_step--hero) {
    position: relative;
    min-height: 0;
    padding: 1rem 0;
    justify-content: flex-start;

    &.is-right {
      justify-content: flex-end;
    }

    // interleave the zig-zag so the columns don't leave half-empty rows
    @media (min-width: 900px) {
      & + .world_step {
        margin-top: -12rem;
      }
    }
  }

  :deep(.card) {
    width: min(100%, 470px);
  }
}

@media (max-width: 899px) {
  .world--static {
    .world_journey::before {
      left: 1.1rem;
    }

    .world_step:not(.world_step--hero),
    .world_step.is-right:not(.world_step--hero) {
      justify-content: flex-end;
      padding-left: 1.6rem;
    }
  }
}
</style>
