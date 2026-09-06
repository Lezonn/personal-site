<script setup>
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
  { value: '~15', label: 'RPA solutions in production' },
  { value: '4', label: 'GenAI initiatives shipped' },
  { value: '127', label: 'Auto2000 branches served' },
  { value: '68%', label: 'workload cut by automation' }
]
</script>

<template>
  <section id="about" ref="root" class="about">
    <v-container class="about_inner">
      <p class="about_kicker reveal">About</p>
      <h2 class="about_heading reveal" style="transition-delay: 0.05s">
        Engineer who speaks <em>operations</em>, owner who can <em>ship</em>.
      </h2>
      <p class="about_lede reveal" style="transition-delay: 0.1s">
        I'm Leonard Zonaphan — AI Product Owner for Process Automation at Astra TSO Auto2000. I turn
        field problems into shipped improvements, reporting impact up to C-level.
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
      <div class="about_metrics reveal">
        <div v-for="m in metrics" :key="m.label" class="about_metric">
          <span class="about_metric_value">{{ m.value }}</span>
          <span class="about_metric_label">{{ m.label }}</span>
        </div>
      </div>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.about {
  background-color: $--color-background-secondary;
  padding: $--spacing-xl 0;
  overflow: hidden;

  &_inner {
    max-width: 1080px;
  }

  &_kicker {
    font-size: $--font-mini;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $--color-text-primary;
    margin-bottom: 0.5rem;
  }

  &_heading {
    font-family: $--title-font;
    font-size: clamp(2rem, 1.2rem + 3.4vw, 3.6rem);
    line-height: 1.05;
    letter-spacing: -0.01em;
    text-wrap: balance;
    color: $--color-dark;
    max-width: 760px;
    margin: 0;

    em {
      font-style: normal;
      background: linear-gradient(transparent 62%, rgba(232, 176, 75, 0.65) 62%);
      padding: 0 0.1em;
    }
  }

  &_lede {
    max-width: 680px;
    margin: $--spacing-s 0 0;
    font-size: $--font-h6;
    line-height: 1.65;
    color: $--color-dark-light;
  }

  &_focus {
    margin-top: $--spacing-s;
    border-top: 2px solid $--color-ink;
  }

  &_row {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.25rem;
    align-items: baseline;
    padding: 1.25rem 0.5rem;
    border-bottom: 1px solid rgba(10, 46, 41, 0.18);
    transition:
      background 0.25s ease,
      padding 0.25s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
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
      color: $--color-dark;
      margin: 0 0 0.25rem;
    }

    p {
      margin: 0;
      font-size: $--font-link;
      color: $--color-dark-light;
    }
  }

  &_metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem 0;
    margin-top: $--spacing-s;
    padding-top: $--spacing-s;
    border-top: 1px solid rgba(10, 46, 41, 0.18);
  }

  &_metric {
    padding: 0 1rem;
    border-left: 2px solid $--color-accent;

    &_value {
      display: block;
      font-family: $--title-font;
      font-size: $--font-h3;
      line-height: 1;
      color: $--color-ink;
    }

    &_label {
      display: block;
      margin-top: 0.25rem;
      font-size: $--font-mini;
      color: $--color-dark-light;
    }
  }
}

@media (min-width: 768px) {
  .about_metrics {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
