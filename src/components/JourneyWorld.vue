<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import JourneyCard from './JourneyCard.vue'
import JourneyRail from './JourneyRail.vue'
import { stops } from '@/data/journey'
import { detectTier } from '@/journey/quality'

// The career journey: a sticky WebGL stage with DOM steps scrolling past it
// (an intro, then one per stop); their positions drive the 3D progress. The story
// runs as a lower-third caption bar; "Details" opens a panel and the camera slides
// the island aside to make room. Until the visitor first interacts, the stage shows
// a pre-rendered poster, so building the scene never competes with the first paint.
const WAKE_EVENTS = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'keydown', 'scroll']
const tier = detectTier()
const mode = ref(tier === 'static' ? 'static' : '3d')
const root = ref(null)
const stage = ref(null)
const canvas = ref(null)
const ready = ref(false)
const progress = ref(0)
const inView = ref(false)
const entered = ref(false)
const detailsOpen = ref(false)
const missingLogos = reactive(new Set())

const active = computed(() => Math.round(progress.value) - 1)
const current = computed(() => stops[Math.max(0, Math.min(active.value, stops.length - 1))])
const railVisible = computed(
  () => mode.value === '3d' && inView.value && entered.value && progress.value < stops.length + 0.45
)
// how far the car is between two stops (0 parked → 1 arrived), for the bar's progress line
const drive = computed(() => {
  const f = progress.value - Math.floor(progress.value)
  return Math.min(Math.max((f - 0.3) / 0.4, 0), 1)
})

// where the island sits on screen: clear of the bar, and aside when details are open
const framing = {
  hero: (portrait) => (portrait ? [0, 0.12] : [0.1, 0.1]),
  stop: (i, portrait) => {
    if (portrait) return detailsOpen.value ? [0, 0.3] : [0, 0.15]
    return detailsOpen.value ? [-0.16, 0.1] : [0, 0.1]
  },
  distScale: () => 1.05
}

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
  entered.value = anchors.length > 0 && window.scrollY > anchors[0] - window.innerHeight * 0.25
  world?.setProgress(progress.value)
  if (active.value < 0) detailsOpen.value = false
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
      framing,
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

function toggleDetails() {
  detailsOpen.value = !detailsOpen.value
  world?.refresh()
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
  <section
    id="journey"
    ref="root"
    class="world"
    :class="`world--${mode}`"
    aria-labelledby="journey-title"
  >
    <span class="world_fade" aria-hidden="true" />

    <!-- 3D: sticky stage with the caption bar and details panel -->
    <div v-if="mode === '3d'" ref="stage" class="world_stage">
      <canvas ref="canvas" class="world_canvas" :class="{ 'is-ready': ready }" aria-hidden="true" />
      <div class="world_bar">
        <span class="world_progress" aria-hidden="true">
          <span :style="{ transform: `scaleX(${active < 0 ? 0 : drive})` }" />
        </span>
        <div class="world_chapter world_chapter--intro" :class="{ 'is-active': active < 0 }">
          <span class="world_year">6</span>
          <div class="world_main">
            <p class="world_meta">The ride so far · 2020 → today</p>
            <h2 id="journey-title" class="world_title">From a CS campus to shipping AI products</h2>
            <p class="world_company">Scroll to drive through every stop ↓</p>
          </div>
        </div>
        <article
          v-for="(stop, i) in stops"
          :key="stop.id"
          class="world_chapter"
          :class="[`world_chapter--${stop.glow}`, { 'is-active': active === i }]"
          :aria-hidden="active !== i"
        >
          <span class="world_year">{{ stop.year }}</span>
          <div class="world_main">
            <p class="world_meta">
              <span class="world_badge">{{ stop.category }}</span> {{ stop.period }}
            </p>
            <h3 class="world_title">{{ stop.title }}</h3>
            <p class="world_company">
              <img
                v-if="!missingLogos.has(stop.brand.logo)"
                :src="stop.brand.logo"
                :alt="stop.brand.name"
                class="world_logo"
                loading="lazy"
                @error="missingLogos.add(stop.brand.logo)"
              />
              {{ stop.company }}
            </p>
          </div>
          <p v-if="stop.highlight" class="world_highlight">
            <strong>{{ stop.highlight.value }}</strong>
            <span>{{ stop.highlight.label }}</span>
          </p>
          <button
            type="button"
            class="world_more"
            :aria-expanded="detailsOpen"
            aria-controls="journey-details"
            :tabindex="active === i ? 0 : -1"
            @click="toggleDetails"
          >
            {{ detailsOpen ? 'Close' : 'Details' }}
          </button>
        </article>
      </div>
      <aside
        id="journey-details"
        class="world_drawer"
        :class="{ 'is-open': detailsOpen && active >= 0 }"
        :aria-hidden="!(detailsOpen && active >= 0)"
      >
        <p class="world_meta">
          <span class="world_badge" :class="`world_badge--${current.glow}`">
            {{ current.category }}
          </span>
          {{ current.period }}
        </p>
        <h3 class="world_title">{{ current.title }}</h3>
        <p class="world_company">{{ current.company }}</p>
        <p class="world_summary">{{ current.summary }}</p>
        <ul class="world_points">
          <li v-for="point in current.points" :key="point">{{ point }}</li>
        </ul>
        <p class="world_tags">
          <span v-for="tag in current.tags" :key="tag">{{ tag }}</span>
        </p>
        <a
          v-if="current.link"
          :href="current.link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="world_link"
        >
          {{ current.link.label }} <span aria-hidden="true">→</span>
        </a>
      </aside>
    </div>

    <!-- steps: scroll anchors in 3D; the readable timeline in the 2D fallback -->
    <div class="world_steps">
      <div class="world_step world_step--intro" data-step>
        <h2 v-if="mode === 'static'" class="world_static_title">
          <span>The ride so far</span>
          From a CS campus to shipping AI products
        </h2>
      </div>
      <div
        v-for="(stop, i) in stops"
        :id="`stop-${stop.id}`"
        :key="stop.id"
        class="world_step"
        :class="i % 2 ? 'is-right' : 'is-left'"
        data-step
      >
        <journey-card
          v-if="mode === 'static'"
          :stop="stop"
          :index="i"
          :still="`/journey/${stop.id}.webp`"
        />
      </div>
    </div>
    <journey-rail :stops="stops" :active="active" :visible="railVisible" />
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.world {
  position: relative;
  background: var(--c-bg);

  // blends the hero's warm bottom edge into the sky at the top of the stage
  &_fade {
    position: absolute;
    inset: 0 0 auto;
    z-index: 3;
    height: 22vh;
    background: linear-gradient(var(--c-sky-bottom), transparent);
    pointer-events: none;
  }

  &--static &_fade {
    display: none;
  }

  &_stage {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100lvh;
    overflow: hidden;
    background:
      url('/journey/overview-wide.webp') center / cover no-repeat,
      var(--c-sky-mid);

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

  // ---------- caption bar ----------

  &_bar {
    position: absolute;
    left: 50%;
    bottom: max(1.25rem, env(safe-area-inset-bottom, 0px));
    z-index: 2;
    width: min(1100px, calc(100% - 2rem));
    min-height: 112px;
    display: grid;
    border-radius: 22px;
    background: var(--c-surface);
    border: 1px solid rgba(255, 255, 255, 0.95);
    box-shadow: 0 24px 60px var(--c-shadow);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    transform: translateX(-50%);
    overflow: hidden;
  }

  &_progress {
    position: absolute;
    inset: 0 0 auto;
    height: 3px;
    background: var(--c-border);

    span {
      display: block;
      height: 100%;
      background: var(--c-accent);
      transform-origin: left;
      transition: transform 0.15s linear;
    }
  }

  // every chapter shares one grid cell and cross-fades
  &_chapter {
    --glow: var(--c-glow-ai);
    grid-area: 1 / 1;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 1.5rem;
    padding: 1.1rem 1.4rem;
    opacity: 0;
    visibility: hidden;
    transform: translateY(12px);
    transition:
      opacity 0.35s ease,
      transform 0.35s ease,
      visibility 0.35s;

    &--code {
      --glow: var(--c-glow-code);
    }

    &--intro {
      --glow: var(--c-accent);
      grid-template-columns: auto minmax(0, 1fr);
      align-self: center;
    }

    &.is-active {
      opacity: 1;
      visibility: visible;
      transform: none;
    }
  }

  &_year {
    font-family: $--title-font;
    font-size: 3rem;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1.5px var(--glow);
  }

  &_meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--c-text-dim);
  }

  &_badge {
    color: var(--c-on-glow);
    background: var(--glow, var(--c-glow-ai));
    padding: 0.2rem 0.6rem;
    border-radius: 999px;

    &--code {
      background: var(--c-glow-code);
    }
  }

  &_title {
    font-size: 1.1rem;
    line-height: 1.25;
    color: var(--c-heading);
    margin-top: 0.35rem;
  }

  &_company {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--c-text-dim);
  }

  &_logo {
    height: 22px;
    width: auto;
    max-width: 110px;
    object-fit: contain;
  }

  &_highlight {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    max-width: 250px;
    font-size: 0.82rem;
    color: var(--c-text-dim);

    strong {
      font-family: $--title-font;
      font-size: 2rem;
      color: var(--glow);
    }
  }

  &_more {
    min-height: 44px;
    padding: 0 1.2rem;
    border-radius: 999px;
    border: 1px solid var(--c-border-strong);
    background: transparent;
    color: var(--c-heading);
    font: 700 0.85rem $--body-font;
    cursor: pointer;

    &:hover {
      border-color: var(--c-accent);
      color: var(--c-accent);
    }

    &:focus-visible {
      outline: 2px solid var(--c-accent);
      outline-offset: 2px;
    }
  }

  // ---------- details panel ----------

  &_drawer {
    position: absolute;
    top: 88px;
    right: 4.5rem;
    bottom: calc(112px + 2.5rem);
    z-index: 2;
    width: min(400px, calc(100% - 2rem));
    padding: 1.4rem;
    overflow: auto;
    border-radius: 22px;
    background: var(--c-surface);
    border: 1px solid rgba(255, 255, 255, 0.95);
    box-shadow: 0 24px 60px var(--c-shadow);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    color: var(--c-text);
    opacity: 0;
    visibility: hidden;
    transform: translateX(110%);
    transition:
      transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.3s ease,
      visibility 0.5s;

    &.is-open {
      opacity: 1;
      visibility: visible;
      transform: none;
    }
  }

  &_summary {
    margin-top: 0.9rem;
    font-size: 0.95rem;
    line-height: 1.6;
  }

  &_points {
    margin-top: 0.8rem;
    display: grid;
    gap: 0.35rem;

    li {
      position: relative;
      padding-left: 1.2rem;
      font-size: 0.88rem;
      line-height: 1.5;

      &::before {
        content: '✦';
        position: absolute;
        left: 0;
        color: var(--c-highlight);
        font-size: 0.75em;
      }
    }
  }

  &_tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 1rem;

    span {
      font-size: 0.75rem;
      color: var(--c-text-dim);
      border: 1px solid var(--c-border);
      border-radius: 999px;
      padding: 0.15rem 0.65rem;
    }
  }

  &_link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    min-height: 44px;
    margin-top: 0.6rem;
    font-weight: 700;
    color: var(--c-accent);
  }

  // ---------- steps ----------

  &--3d &_steps {
    position: relative;
    margin-top: -100vh;
    margin-top: -100lvh;
    pointer-events: none;
  }

  &--3d &_step {
    min-height: 100vh;
    min-height: 100lvh;
  }
}

// phones: the bar becomes a compact card; details slide up as a sheet above it
@media (max-aspect-ratio: 9/10), (max-width: 760px) {
  .world_bar {
    bottom: max(0.75rem, env(safe-area-inset-bottom, 0px));
    width: calc(100% - 1.5rem);
  }

  .world_chapter {
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.4rem 0.9rem;
    padding: 1rem;

    &--intro {
      grid-template-columns: auto minmax(0, 1fr);
    }
  }

  .world_year {
    font-size: 2.2rem;
    grid-row: span 2;
  }

  .world_highlight {
    grid-column: 2;
  }

  .world_more {
    grid-column: 1 / -1;
    min-height: 40px;
  }

  .world_drawer {
    top: auto;
    left: 0.75rem;
    right: 0.75rem;
    bottom: 236px;
    width: auto;
    max-height: 46vh;
    transform: translateY(40px);
  }
}

// ---------- 2D timeline (no WebGL / reduced motion / data saver) ----------

.world--static {
  .world_steps {
    position: relative;
    max-width: 1080px;
    margin: 0 auto;
    padding: $--spacing-xl clamp(1rem, 5vw, 3rem);

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: calc(#{$--spacing-xl} + 9rem);
      bottom: $--spacing-xl;
      width: 2px;
      background: linear-gradient(to bottom, var(--c-glow-ai), var(--c-glow-code));
      opacity: 0.5;
    }
  }

  .world_static_title {
    text-align: center;
    font-family: $--title-font;
    font-size: clamp(2rem, 1.2rem + 3.4vw, 3.4rem);
    line-height: 1.05;
    color: var(--c-heading);
    margin-bottom: $--spacing-m;
    text-wrap: balance;

    span {
      display: block;
      font-family: $--body-font;
      font-size: $--font-mini;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--c-accent);
      margin-bottom: 0.5rem;
    }
  }

  .world_step:not(.world_step--intro) {
    position: relative;
    display: flex;
    padding: 1rem 0;

    &.is-right {
      justify-content: flex-end;
    }

    @media (min-width: 900px) {
      & + .world_step {
        margin-top: -12rem;
      }
    }
  }
}

@media (max-width: 899px) {
  .world--static {
    .world_steps::before {
      left: 1.1rem;
    }

    .world_step:not(.world_step--intro),
    .world_step.is-right:not(.world_step--intro) {
      justify-content: flex-end;
      padding-left: 1.6rem;
    }
  }
}
</style>
