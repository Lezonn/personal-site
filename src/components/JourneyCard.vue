<script setup>
defineProps({
  stop: { type: Object, required: true },
  index: { type: Number, required: true },
  still: { type: String, default: '' }
})
</script>

<template>
  <article class="card" :class="`card--${stop.glow}`">
    <img
      v-if="still"
      :src="still"
      class="card_still"
      alt=""
      width="960"
      height="600"
      loading="lazy"
      decoding="async"
    />
    <span class="card_ghost" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
    <div class="card_meta">
      <span class="card_category">{{ stop.category }}</span>
      <span class="card_period">{{ stop.period }}</span>
    </div>
    <h3 class="card_title">{{ stop.title }}</h3>
    <p class="card_company">{{ stop.company }}</p>
    <p class="card_summary">{{ stop.summary }}</p>
    <p v-if="stop.highlight" class="card_highlight">
      <span class="card_highlight_value">{{ stop.highlight.value }}</span>
      <span class="card_highlight_label">{{ stop.highlight.label }}</span>
    </p>
    <ul v-if="stop.points.length" class="card_points">
      <li v-for="point in stop.points" :key="point">{{ point }}</li>
    </ul>
    <div class="card_tags">
      <span v-for="tag in stop.tags" :key="tag" class="card_tag">{{ tag }}</span>
    </div>
    <a
      v-if="stop.link"
      :href="stop.link.href"
      target="_blank"
      rel="noopener noreferrer"
      class="card_link"
    >
      {{ stop.link.label }} <span aria-hidden="true">→</span>
    </a>
  </article>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.card {
  --glow: var(--c-glow-ai);
  position: relative;
  width: min(100%, 460px);
  padding: 1.6rem 1.6rem 1.4rem;
  border-radius: 24px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  box-shadow: 0 24px 50px var(--c-shadow);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  color: var(--c-text);
  overflow: hidden;
  transition:
    opacity 0.6s ease,
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);

  &--code {
    --glow: var(--c-glow-code);
  }

  // top edge glow in the stop's tech color (gold = AI era, mint = code era)
  &::before {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--glow), transparent);
  }

  &_still {
    display: block;
    width: calc(100% + 3.2rem);
    height: auto;
    margin: -1.6rem -1.6rem 1.2rem;
    aspect-ratio: 8 / 5;
    object-fit: cover;
  }

  &_ghost {
    position: absolute;
    right: 1.2rem;
    top: 0.9rem;
    font-family: $--title-font;
    font-size: 3.2rem;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1px var(--c-border);
    pointer-events: none;
    user-select: none;
  }

  &_meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    padding-right: 3.5rem;
  }

  &_category,
  &_period {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-radius: 999px;
    padding: 0.28rem 0.75rem;
  }

  &_category {
    color: var(--c-on-glow);
    background: var(--glow);
  }

  &_period {
    color: var(--c-text);
    border: 1px solid var(--c-border);
  }

  &_title {
    font-size: $--font-h5;
    line-height: 1.25;
    color: var(--c-heading);
    margin: 0.9rem 0 0.2rem;
  }

  &_company {
    font-size: $--font-mini;
    font-weight: 600;
    color: var(--c-text-dim);
    margin: 0;
  }

  &_summary {
    font-size: $--font-mini;
    line-height: 1.6;
    color: var(--c-text);
    opacity: 0.88;
    margin: 0.75rem 0 0;
  }

  &_highlight {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    margin: 0.9rem 0 0;

    &_value {
      font-family: $--title-font;
      font-size: 2.1rem;
      line-height: 1;
      color: var(--glow);
    }

    &_label {
      font-size: $--font-mini;
      color: var(--c-text-dim);
    }
  }

  &_points {
    display: grid;
    gap: 0.35rem;
    margin: 0.8rem 0 0;
    padding: 0;

    li {
      position: relative;
      padding-left: 1.3rem;
      font-size: 0.9rem;
      line-height: 1.5;
      color: var(--c-text);
      opacity: 0.9;

      &::before {
        content: '✦';
        position: absolute;
        left: 0;
        color: var(--glow);
        font-size: 0.8em;
      }
    }
  }

  &_tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.9rem;
  }

  &_tag {
    font-size: 0.78rem;
    border: 1px solid var(--c-border);
    color: var(--c-text-dim);
    border-radius: 999px;
    padding: 0.2rem 0.7rem;
  }

  &_link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    min-height: 44px;
    margin-top: 0.4rem;
    font-weight: 700;
    color: var(--glow);

    span {
      transition: transform 0.25s ease;
    }

    &:hover span {
      transform: translateX(4px);
    }
  }
}

@media (max-aspect-ratio: 9/10), (max-width: 560px) {
  .card {
    padding: 1.2rem 1.2rem 1rem;
    border-radius: 20px;

    &_still {
      width: calc(100% + 2.4rem);
      margin: -1.2rem -1.2rem 1rem;
    }

    &_highlight_value {
      font-size: 1.7rem;
    }

    &_points li {
      font-size: 0.85rem;
    }
  }
}
</style>
