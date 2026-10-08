<script setup>
import { useReveal } from '@/composables/useReveal'

const root = useReveal()

const facts = ['Est. April 2025', 'Jakarta, Indonesia', 'Founded by Leonard Zonaphan']

const offerings = [
  {
    index: '01',
    title: 'Point-of-sale systems',
    text: 'Transactions, customer data, stock, and staff performance in one place.'
  },
  {
    index: '02',
    title: 'Automated reporting',
    text: 'Daily financial and performance reports that no longer need manual work.'
  },
  {
    index: '03',
    title: 'Digital loyalty & membership',
    text: 'Paper loyalty programs turned into system-based memberships.'
  }
]

const products = [
  {
    name: "The Men's Barbershop POS",
    status: 'Live',
    since: 'Since May 2025',
    client: "Client: The Men's Barbershop",
    description:
      'Point-of-sales system used across all barbershop locations — transactions, customer data, stock, and employee performance.',
    points: [
      'Automated daily financial and employee-performance reports, cutting ~90% of manual work',
      'Loyalty program digitalized into system-based membership'
    ]
  }
]
</script>

<template>
  <section id="company" ref="root" class="company">
    <v-container class="company_inner">
      <p class="company_kicker reveal">The company</p>
      <h2 class="company_heading reveal" style="transition-delay: 0.05s">
        Zon Digital <em>Solution</em>.
      </h2>
      <ul class="company_facts reveal" style="transition-delay: 0.1s" aria-label="Company facts">
        <li v-for="fact in facts" :key="fact" class="company_fact">{{ fact }}</li>
      </ul>
      <p class="company_lede reveal" style="transition-delay: 0.15s">
        A Jakarta-based software company that turns manual business operations into simple, reliable
        systems.
      </p>
      <p class="company_text reveal" style="transition-delay: 0.2s">
        We build practical business software — point-of-sale, automated reporting, and digital
        loyalty programs — for small and growing service businesses in Indonesia.
      </p>

      <h3 class="company_subhead reveal">What we build</h3>
      <div class="company_offerings">
        <article
          v-for="item in offerings"
          :key="item.index"
          class="company_offering reveal"
          style="transition-delay: 0.1s"
        >
          <span class="company_offering_index" aria-hidden="true">{{ item.index }}</span>
          <h4>{{ item.title }}</h4>
          <p>{{ item.text }}</p>
        </article>
      </div>

      <h3 class="company_subhead reveal">Products</h3>
      <article v-for="product in products" :key="product.name" class="company_product reveal">
        <div class="company_product_badges">
          <span class="company_status">{{ product.status }}</span>
          <span class="company_since">{{ product.since }}</span>
        </div>
        <h4>{{ product.name }}</h4>
        <p class="company_product_client">{{ product.client }}</p>
        <p class="company_product_text">{{ product.description }}</p>
        <ul class="company_product_points">
          <li v-for="point in product.points" :key="point">{{ point }}</li>
        </ul>
      </article>

      <div class="company_footer reveal">
        <p class="company_claude">
          <strong>Built with Claude Code.</strong> We use Claude Code across our entire development
          workflow.
        </p>
        <a class="company_cta" href="mailto:info@leonardzonaphan.com">info@leonardzonaphan.com</a>
      </div>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.company {
  position: relative;
  background: radial-gradient(60vmax 30vmax at -10% -5%, rgba(232, 176, 75, 0.14), transparent 60%),
    radial-gradient(50vmax 30vmax at 110% 60%, rgba(7, 90, 78, 0.5), transparent 60%), $--color-ink;
  color: $--color-cream;
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
    color: $--color-accent;
    margin-bottom: 0.5rem;
  }

  &_heading {
    font-family: $--title-font;
    font-size: clamp(2rem, 1.2rem + 3.4vw, 3.6rem);
    line-height: 1.05;
    letter-spacing: -0.01em;
    text-wrap: balance;
    margin: 0;

    em {
      font-style: normal;
      color: $--color-accent;
    }
  }

  &_facts {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0;
    margin: 1rem 0 0;
  }

  &_fact {
    font-size: $--font-mini;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $--color-ink;
    background: $--color-cream;
    border-radius: 999px;
    padding: 0.3rem 0.85rem;

    &:first-child {
      background: $--color-accent;
    }
  }

  &_lede {
    max-width: 720px;
    margin: $--spacing-s 0 0;
    font-family: $--title-font;
    font-size: $--font-h3;
    line-height: 1.3;
    color: #fff;
  }

  &_text {
    max-width: 680px;
    margin: 0.75rem 0 0;
    color: $--color-cream;
    opacity: 0.85;
  }

  &_subhead {
    font-size: $--font-mini;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $--color-accent;
    margin: $--spacing-m 0 1rem;
  }

  &_offerings {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
  }

  &_offering {
    border-top: 2px solid $--color-accent;
    padding-top: 1rem;

    &_index {
      font-family: $--title-font;
      font-size: $--font-h4;
      color: transparent;
      -webkit-text-stroke: 1.5px $--color-accent;
    }

    h4 {
      font-size: $--font-h5;
      color: #fff;
      margin: 0.35rem 0 0.25rem;
    }

    p {
      margin: 0;
      font-size: $--font-link;
      color: $--color-cream-dim;
    }
  }

  &_product {
    background: rgba(242, 236, 221, 0.06);
    border: 1px solid rgba(242, 236, 221, 0.18);
    border-top: 3px solid $--color-accent;
    border-radius: 22px;
    padding: 1.6rem;

    h4 {
      font-family: $--title-font;
      font-size: $--font-h3;
      color: #fff;
      margin: 0.75rem 0 0.15rem;
    }

    &_badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    &_client {
      font-weight: 600;
      color: $--color-cream-dim;
      margin: 0;
    }

    &_text {
      max-width: 680px;
      margin: 0.75rem 0 0;
      opacity: 0.85;
    }

    &_points {
      margin: 0.75rem 0 0;
      padding: 0;
      display: grid;
      gap: 0.4rem;
      max-width: 680px;

      li {
        position: relative;
        padding-left: 1.4rem;
        font-size: $--font-link;
        opacity: 0.9;

        &::before {
          content: '✦';
          position: absolute;
          left: 0;
          color: $--color-accent;
          font-size: 0.8em;
        }
      }
    }
  }

  &_status,
  &_since {
    font-size: $--font-mini;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-radius: 999px;
    padding: 0.3rem 0.85rem;
  }

  &_status {
    color: $--color-ink;
    background: $--color-accent;
  }

  &_since {
    border: 1px solid rgba(242, 236, 221, 0.3);
  }

  &_footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: $--spacing-m;
    padding-top: $--spacing-s;
    border-top: 1px solid rgba(242, 236, 221, 0.18);
  }

  &_claude {
    margin: 0;
    max-width: 520px;
    font-size: $--font-link;
    color: $--color-cream-dim;

    strong {
      color: #fff;
    }
  }

  &_cta {
    display: inline-flex;
    align-items: center;
    min-height: 48px;
    padding: 0 1.75rem;
    border-radius: 999px;
    background: $--color-accent;
    color: $--color-ink;
    font-weight: 700;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }
}

@media (min-width: 768px) {
  .company_offerings {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}
</style>
