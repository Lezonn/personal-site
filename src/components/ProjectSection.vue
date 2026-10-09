<script setup>
import { useReveal } from '@/composables/useReveal'

const root = useReveal()

const projects = [
  {
    title: 'AI Product Owner @ Astra TSO',
    description:
      'Four GenAI initiatives owned end to end — AI recruitment screening, AI Virtual Assistant, AI Salesman Live Chat, and AI KV Generator — bridging business needs with IT vendors.',
    tags: ['AI Workflow', 'AI Products', 'Project Management'],
    link: 'https://www.linkedin.com/in/leonard-zonaphan/',
    linkLabel: 'More on LinkedIn',
    accent: '#e8b04b',
    featured: true
  },
  {
    title: 'RPA Across 127 Branches',
    description:
      '~15 production-grade RPA solutions automating reporting and third-party data collection for operational teams nationwide.',
    tags: ['UiPath', 'RPA', 'Power BI'],
    link: 'https://www.linkedin.com/in/leonard-zonaphan/',
    linkLabel: 'More on LinkedIn',
    accent: '#075a4e',
    featured: false
  },
  {
    title: 'Barbershop POS System',
    description:
      'Point-of-sales across all shop locations with automated daily reports cutting ~90% of manual work, plus digital membership.',
    tags: ['Full-stack', 'Automation', 'POS'],
    link: 'https://github.com/Lezonn',
    linkLabel: 'Code on GitHub',
    accent: '#7a9ba8',
    featured: false
  },
  {
    title: 'SEO System @ Blibli',
    description:
      'Reactive Java Spring microservices plus Vue.js components with schema markup and meta-tag optimization, shipped through full SDLC.',
    tags: ['Java Spring', 'Vue.js', 'SEO'],
    link: 'https://github.com/Lezonn',
    linkLabel: 'More on GitHub',
    accent: '#c96f4a',
    featured: false
  }
]
</script>

<template>
  <section id="project" ref="root" class="project">
    <v-container class="project_inner">
      <div class="project_head">
        <div>
          <p class="project_kicker reveal">Selected work</p>
          <h2 class="project_heading reveal" style="transition-delay: 0.05s">
            Work with <em>measurable</em> outcomes.
          </h2>
        </div>
        <p class="project_sub reveal" style="transition-delay: 0.1s">
          Automation, AI product work, and engineering — each tied to a real operational result.
        </p>
      </div>
      <div class="project_grid">
        <article
          v-for="(item, i) in projects"
          :key="item.title"
          class="project_card reveal"
          :class="{ project_card_featured: item.featured }"
          :style="{ transitionDelay: `${0.05 * (i % 4)}s`, '--card-accent': item.accent }"
        >
          <span class="project_index" aria-hidden="true">
            {{ String(i + 1).padStart(2, '0') }}
          </span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <div class="project_tags">
            <span v-for="tag in item.tags" :key="tag" class="project_tag">{{ tag }}</span>
          </div>
          <a :href="item.link" target="_blank" rel="noopener noreferrer" class="project_link">
            {{ item.linkLabel }} <span aria-hidden="true">→</span>
          </a>
        </article>
      </div>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.project {
  background-color: $--color-background-secondary;
  padding: $--spacing-xl 0;
  overflow: hidden;

  &_inner {
    max-width: 1080px;
  }

  &_head {
    display: grid;
    gap: 1rem;
    margin-bottom: $--spacing-s;
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
    text-wrap: balance;
    color: $--color-dark;
    margin: 0;

    em {
      font-style: normal;
      background: linear-gradient(transparent 62%, rgba(232, 176, 75, 0.65) 62%);
      padding: 0 0.1em;
    }
  }

  &_sub {
    color: $--color-dark-light;
    max-width: 420px;
    margin: 0;
    align-self: end;
  }

  &_grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
  }

  &_card {
    --card-accent: #075a4e;
    position: relative;
    display: flex;
    flex-direction: column;
    background: #fff;
    border: 1px solid rgba(10, 46, 41, 0.14);
    border-top: 3px solid var(--card-accent);
    border-radius: 22px;
    padding: 1.6rem 1.6rem 1.4rem;
    overflow: hidden;
    transition:
      transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-6px) rotate(-0.3deg);
      box-shadow: 0 24px 50px rgba(10, 46, 41, 0.16);
    }

    h3 {
      font-family: $--title-font;
      font-size: $--font-h4;
      color: $--color-dark;
      margin: 0.75rem 0 0.5rem;
    }

    p {
      margin: 0;
      color: $--color-dark-light;
      font-size: $--font-link;
    }
  }

  &_index {
    font-family: $--title-font;
    font-size: 2.6rem;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1.5px var(--card-accent);
  }

  &_tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  &_tag {
    font-size: $--font-mini;
    font-weight: 600;
    background: rgba(10, 46, 41, 0.07);
    color: $--color-dark;
    border-radius: 999px;
    padding: 0.25rem 0.8rem;
  }

  &_link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: auto;
    padding-top: 1.25rem;
    font-weight: 700;
    color: $--color-text-primary;

    span {
      transition: transform 0.25s ease;
    }

    &:hover span {
      transform: translateX(5px);
    }
  }
}

@media (min-width: 768px) {
  .project_head {
    grid-template-columns: 1.2fr 1fr;
    align-items: end;
  }

  .project_grid {
    grid-template-columns: repeat(6, 1fr);
  }

  .project_card {
    grid-column: span 2;
  }

  .project_card_featured {
    grid-column: span 6;
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1.5rem;

    h3 {
      font-size: $--font-h3;
    }

    p,
    .project_tags {
      grid-column: 2;
    }

    .project_link {
      grid-column: 2;
    }
  }
}
</style>
