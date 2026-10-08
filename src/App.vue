<script setup>
import NavigationBar from '@/components/NavigationBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import HomeSection from '@/components/HomeSection.vue'
import CompanySection from '@/components/CompanySection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ProjectSection from '@/components/ProjectSection.vue'

import { ref, onMounted } from 'vue'
import { useMeta } from 'vue-meta'

useMeta({
  title: 'Leonard Zonaphan — Founder, Zon Digital Solution',
  description:
    'Zon Digital Solution is a Jakarta-based software company founded in April 2025 by Leonard Zonaphan, building point-of-sale, automated reporting, and digital loyalty systems for growing businesses.',
  meta: [
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'Leonard Zonaphan' },
    // Open Graph
    { property: 'og:title', content: 'Leonard Zonaphan — Founder, Zon Digital Solution' },
    {
      property: 'og:description',
      content:
        'Zon Digital Solution is a Jakarta-based software company founded in April 2025 by Leonard Zonaphan, building point-of-sale, automated reporting, and digital loyalty systems for growing businesses.'
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:url', content: 'https://www.leonardzonaphan.com' },
    { property: 'og:image', content: 'https://www.leonardzonaphan.com/og-image.png' },
    { property: 'og:image:secure_url', content: 'https://www.leonardzonaphan.com/og-image.png' },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Leonard Zonaphan, founder of Zon Digital Solution' },
    { property: 'og:image', content: 'https://www.leonardzonaphan.com/og-image-600x315.png' },
    {
      property: 'og:image:secure_url',
      content: 'https://www.leonardzonaphan.com/og-image-600x315.png'
    },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '600' },
    { property: 'og:image:height', content: '315' },
    { property: 'og:site_name', content: 'Zon Digital Solution · Leonard Zonaphan' },
    // Twitter card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Leonard Zonaphan — Founder, Zon Digital Solution' },
    {
      name: 'twitter:description',
      content:
        'Zon Digital Solution, founded by Leonard Zonaphan in Jakarta (April 2025): point-of-sale, automated reporting, and digital loyalty systems.'
    },
    { name: 'twitter:image', content: 'https://www.leonardzonaphan.com/og-image.png' }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://www.leonardzonaphan.com'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      // Organization (Zon Digital Solution) + Person (founder) — keep in sync with index.html
      json: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://www.leonardzonaphan.com/#organization',
            name: 'Zon Digital Solution',
            url: 'https://www.leonardzonaphan.com',
            foundingDate: '2025-04',
            founder: {
              '@id': 'https://www.leonardzonaphan.com/#person'
            },
            email: 'info@leonardzonaphan.com',
            description:
              'Jakarta-based software company building point-of-sale, automated reporting, and digital loyalty systems for growing businesses.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Jakarta',
              addressCountry: 'ID'
            }
          },
          {
            '@type': 'Person',
            '@id': 'https://www.leonardzonaphan.com/#person',
            name: 'Leonard Zonaphan',
            description:
              'Founder of Zon Digital Solution. AI Product Owner & Process Automation at Astra TSO Auto2000, with a software engineering background.',
            jobTitle: 'Founder, Zon Digital Solution',
            url: 'https://www.leonardzonaphan.com',
            image: 'https://www.leonardzonaphan.com/og-image.png',
            email: 'info@leonardzonaphan.com',
            worksFor: [
              {
                '@id': 'https://www.leonardzonaphan.com/#organization'
              },
              {
                '@type': 'Organization',
                name: 'Astra TSO Auto2000'
              }
            ],
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: 'BINUS University'
            },
            knowsLanguage: ['id', 'en'],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Jakarta',
              addressCountry: 'ID'
            },
            knowsAbout: [
              'AI Product Management',
              'GenAI',
              'Process Automation',
              'RPA',
              'UiPath',
              'Software Development',
              'Digital Transformation'
            ],
            sameAs: ['https://www.linkedin.com/in/leonard-zonaphan/', 'https://github.com/Lezonn/']
          }
        ]
      }
    }
  ]
})

// <metainfo> teleports into <head>, which can't be hydrated from the prerendered HTML;
// render it only in the browser (crawlers get the same tags statically from index.html)
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <main>
    <a class="skip-link" href="#about">Skip to content</a>
    <navigation-bar />
    <home-section />
    <company-section />
    <about-section />
    <experience-section />
    <project-section />
    <footer-bar />
    <metainfo v-if="isMounted">
      <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>
  </main>
</template>

<style lang="scss" scoped>
.skip-link {
  position: absolute;
  left: 1rem;
  top: -100px;
  padding: 0.75rem 1.25rem;
  background: #0a2e29;
  color: #fff;
  font-weight: 600;
  border-radius: 0 0 12px 12px;
  z-index: 2000;
  transition: top 0.2s ease;

  &:focus {
    top: 0;
  }
}
</style>

<style lang="scss" scoped></style>
