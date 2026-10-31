<script setup>
defineProps({
  stops: { type: Array, required: true },
  active: { type: Number, default: -1 },
  visible: { type: Boolean, default: false }
})
</script>

<template>
  <nav class="rail" :class="{ 'is-visible': visible }" aria-label="Journey stops">
    <ol class="rail_list">
      <li v-for="(stop, i) in stops" :key="stop.id">
        <a
          :href="`#stop-${stop.id}`"
          class="rail_stop"
          :class="[`rail_stop--${stop.glow}`, { 'is-active': active === i, 'is-past': active > i }]"
          :aria-current="active === i ? 'step' : undefined"
        >
          <span class="rail_dot" aria-hidden="true" />
          <span class="rail_label">
            <span class="rail_year">{{ stop.year }}</span> {{ stop.railLabel }}
          </span>
        </a>
      </li>
    </ol>
    <a class="rail_skip" href="#about">Skip the ride <span aria-hidden="true">→</span></a>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.rail {
  position: fixed;
  right: clamp(0.75rem, 2vw, 1.75rem);
  top: 50%;
  z-index: 900;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  transform: translate(12px, -50%);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.4s ease,
    transform 0.4s ease,
    visibility 0.4s;

  &.is-visible {
    opacity: 1;
    visibility: visible;
    transform: translate(0, -50%);
  }

  &_list {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    margin: 0;
    padding: 0.5rem 0.4rem;
    border-radius: 999px;
    background: var(--c-nav);
    border: 1px solid var(--c-border);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  &_stop {
    --glow: #{var(--c-glow-ai)};
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 0.6rem;
    min-height: 40px;
    min-width: 32px;
    padding: 0 0.35rem;
    color: var(--c-text-dim);
    font-size: 0.78rem;
    font-weight: 600;
    position: relative;

    &--code {
      --glow: #{var(--c-glow-code)};
    }

    &:focus-visible {
      outline: 2px solid var(--glow);
      outline-offset: 2px;
      border-radius: 999px;
    }
  }

  &_dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid var(--c-border-strong);
    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      box-shadow 0.3s ease,
      transform 0.3s ease;
  }

  &_stop.is-past &_dot {
    border-color: var(--glow);
  }

  &_stop.is-active &_dot {
    background: var(--glow);
    border-color: var(--glow);
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--glow) 25%, transparent);
    transform: scale(1.15);
  }

  // labels float to the left of the pill; shown for the active stop and on hover
  &_label {
    position: absolute;
    right: calc(100% + 0.9rem);
    white-space: nowrap;
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
    background: var(--c-nav);
    border: 1px solid var(--c-border);
    opacity: 0;
    transform: translateX(6px);
    pointer-events: none;
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
  }

  &_year {
    color: var(--glow);
  }

  &_stop:hover &_label,
  &_stop:focus-visible &_label {
    opacity: 1;
    transform: none;
  }

  &_skip {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--c-text);
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    background: var(--c-nav);
    border: 1px solid var(--c-border);
    min-height: 36px;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;

    &:hover {
      color: var(--c-accent);
    }
  }
}

// phones / portrait: a compact horizontal strip under the navbar
@media (max-aspect-ratio: 9/10), (max-width: 760px) {
  .rail {
    top: 4.6rem;
    right: 50%;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    transform: translate(50%, -6px);

    &.is-visible {
      transform: translate(50%, 0);
    }

    &_list {
      flex-direction: row;
      padding: 0.2rem 0.5rem;
      background: var(--c-nav);
    }

    &_stop {
      min-height: 44px;
      min-width: 36px;
      justify-content: center;
    }

    &_label {
      display: none;
    }

    &_skip {
      background: var(--c-nav);
      font-size: 0.75rem;
      min-height: 44px;
      padding: 0.3rem 0.75rem;
    }
  }
}
</style>
