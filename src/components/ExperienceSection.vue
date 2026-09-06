<script setup>
import { useReveal } from '@/composables/useReveal'

const root = useReveal()

const roles = [
  {
    period: 'Nov 2025 — Present',
    category: 'AI · Product',
    title: 'AI Product Owner — Process Automation',
    company: 'PT Astra International Tbk · TSO Auto2000',
    summary:
      'Own AI and automation initiatives end to end — from pain-point discovery to production — and lead the company AI exploration project, reporting progress and key decisions up to department-head, division-head, and C-level.',
    points: [
      'Owned end-to-end delivery of 4 GenAI initiatives (AI recruitment screening, AI Virtual Assistant, AI Salesman Live Chat, AI KV Generator)',
      'Built and deployed ~15 production-grade RPA solutions serving operational teams across 127 Auto2000 branches'
    ],
    tags: ['AI Workflow', 'AI Agents', 'RPA', 'UiPath']
  },
  {
    period: 'Oct 2024 — Oct 2025',
    category: 'Leadership',
    title: 'Management Trainee',
    company: 'PT Astra International Tbk · TSO Auto2000',
    summary:
      'Completed the Astra TSO Management Trainee program with a final project driving end-to-end process improvement from discovery to evaluation.',
    points: [
      'Ran discovery across 4 divisions; found 6 repetitive activities consuming ~1,000 man-hours/month — then cut 68% workload with UiPath, macros, and Power BI',
      'Shipped internal websites for HC & General Services: LMS, Auto2000 Innovation System, quarterly building maintenance report'
    ],
    tags: ['UiPath', 'Power BI', 'RPA', 'Web Apps']
  },
  {
    period: 'May 2025 — Present',
    category: 'Consulting',
    title: 'IT Solution Consultant',
    company: "The Men's Barbershop",
    summary:
      'Built and maintain the point-of-sales system used across all barbershop locations — transactions, customer data, stock, and employee performance.',
    points: [
      'Cut ~90% of manual work with automated daily financial and employee-performance reports',
      'Digitalized the loyalty program into system-based membership'
    ],
    tags: ['POS System', 'Reporting', 'Loyalty Program']
  },
  {
    period: 'Feb 2023 — Feb 2024',
    category: 'Engineering',
    title: 'Software Development Engineer Intern',
    company: 'Blibli.com',
    summary:
      'Delivered a high-quality SEO system with cross-functional agile teams, across backend microservices and component-based frontend.',
    points: [
      'Maintained SEO microservices with Java Spring (reactive), JUnit, and Mockito',
      'Built Vue.js components with Vitest and Playwright; applied schema markup and meta-tag best practices'
    ],
    tags: ['Java Spring', 'Vue.js', 'SEO', 'Microservices']
  },
  {
    period: 'Mar 2021 — Mar 2022',
    category: 'Full-stack',
    title: 'Full Stack Developer',
    company: 'Bina Nusantara IT Division',
    summary:
      'Built the BINUS Square operation portal with .NET and SQL, and migrated 50+ tables from the legacy database design.',
    points: [
      'Implemented the operations portal used by BINUS Square staff',
      'Wrote SQL migrations for 50+ tables; trained in PHP, .NET, and database systems'
    ],
    tags: ['.NET', 'SQL', 'Laravel', 'Migrations']
  },
  {
    period: 'Sep 2020 — Jul 2024',
    category: 'Education',
    title: 'B.Sc. Computer Science',
    company: 'BINUS University',
    summary:
      'Computer science foundation behind the engineering-to-product path. Also published “Metaverse as A Future of Education: A Systematic Review”.',
    points: [],
    tags: ['EdTech', 'Metaverse', 'Publication']
  }
]
</script>

<template>
  <section id="experience" ref="root" class="experience">
    <v-container class="experience_inner">
      <p class="experience_kicker reveal">Experience</p>
      <h2 class="experience_heading reveal" style="transition-delay: 0.05s">
        From shipping code<br />to shipping <em>outcomes</em>.
      </h2>
      <div class="experience_timeline">
        <article
          v-for="(role, i) in roles"
          :key="role.title + role.period"
          class="experience_item reveal"
          :style="{ transitionDelay: `${0.05 * (i % 3)}s` }"
        >
          <span class="experience_dot" aria-hidden="true" />
          <span class="experience_ghost" aria-hidden="true">
            {{ String(i + 1).padStart(2, '0') }}
          </span>
          <div class="experience_badges">
            <span class="experience_category">{{ role.category }}</span>
            <span class="experience_period">{{ role.period }}</span>
          </div>
          <h3>{{ role.title }}</h3>
          <p class="experience_company">{{ role.company }}</p>
          <p class="experience_summary">{{ role.summary }}</p>
          <ul v-if="role.points.length" class="experience_points">
            <li v-for="point in role.points" :key="point">{{ point }}</li>
          </ul>
          <div class="experience_tags">
            <span v-for="tag in role.tags" :key="tag" class="experience_tag">
              {{ tag }}
            </span>
          </div>
        </article>
      </div>
      <a
        class="experience_more reveal"
        href="https://www.linkedin.com/in/leonard-zonaphan/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Full work history on LinkedIn →
      </a>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.experience {
  position: relative;
  background: radial-gradient(60vmax 30vmax at 110% -5%, rgba(232, 176, 75, 0.14), transparent 60%),
    radial-gradient(50vmax 30vmax at -10% 40%, rgba(7, 90, 78, 0.5), transparent 60%), $--color-ink;
  color: $--color-cream;
  padding: $--spacing-xl 0;
  overflow: hidden;

  &_inner {
    max-width: 880px;
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
    margin: 0 0 $--spacing-s;

    em {
      font-style: normal;
      color: $--color-accent;
    }
  }

  &_timeline {
    position: relative;
    padding-left: 2rem;

    &::before {
      content: '';
      position: absolute;
      left: 7px;
      top: 8px;
      bottom: 8px;
      width: 2px;
      background: linear-gradient(to bottom, $--color-accent, rgba(232, 176, 75, 0.15));
      border-radius: 2px;
    }
  }

  &_item {
    position: relative;
    padding: 0 0 2.5rem;

    &:last-child {
      padding-bottom: 0;
    }

    h3 {
      font-size: $--font-h4;
      color: #fff;
      margin: 0.6rem 0 0.15rem;
    }
  }

  &_dot {
    position: absolute;
    left: -2rem;
    top: 6px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: $--color-ink;
    border: 3px solid $--color-accent;
    box-shadow: 0 0 0 5px rgba(232, 176, 75, 0.15);
    transform: translateX(-1px);
  }

  &_ghost {
    position: absolute;
    right: 0;
    top: -0.6rem;
    font-family: $--title-font;
    font-size: 3.4rem;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1px rgba(242, 236, 221, 0.25);
    pointer-events: none;
    user-select: none;
  }

  &_badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }

  &_category {
    display: inline-block;
    font-size: $--font-mini;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $--color-ink;
    background: $--color-cream;
    border-radius: 999px;
    padding: 0.3rem 0.85rem;
  }

  &_period {
    display: inline-block;
    font-size: $--font-mini;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $--color-ink;
    background: $--color-accent;
    border-radius: 999px;
    padding: 0.3rem 0.85rem;
  }

  &_company {
    font-weight: 600;
    color: $--color-cream-dim;
    margin: 0;
  }

  &_summary {
    color: $--color-cream;
    opacity: 0.85;
    margin: 0.75rem 0 0;
    max-width: 640px;
  }

  &_points {
    margin: 0.75rem 0 0;
    padding: 0;
    display: grid;
    gap: 0.4rem;
    max-width: 640px;

    li {
      position: relative;
      padding-left: 1.4rem;
      color: $--color-cream;
      opacity: 0.9;
      font-size: $--font-link;

      &::before {
        content: '✦';
        position: absolute;
        left: 0;
        color: $--color-accent;
        font-size: 0.8em;
      }
    }
  }

  &_tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  &_tag {
    font-size: $--font-mini;
    border: 1px solid rgba(242, 236, 221, 0.3);
    color: $--color-cream;
    border-radius: 999px;
    padding: 0.25rem 0.8rem;
  }

  &_more {
    display: inline-flex;
    align-items: center;
    margin-top: $--spacing-s;
    font-weight: 700;
    color: $--color-accent;
    border-bottom: 2px solid rgba(232, 176, 75, 0.4);
    padding-bottom: 2px;

    &:hover {
      border-bottom-color: $--color-accent;
    }
  }
}
</style>
