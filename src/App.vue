<script setup>
import NavigationBar from '@/components/NavigationBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import HomeSection from '@/components/HomeSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ProjectSection from '@/components/ProjectSection.vue'

import { useMeta } from 'vue-meta'

useMeta({
  title: 'Leonard Zonaphan - AI Product Owner & Software Engineer',
  description:
    'AI Product Owner & Process Automation at Astra TSO Auto2000: 4 GenAI initiatives and ~15 RPA solutions serving 127 branches. Software engineering background (Blibli, BINUS).',
  meta: [
    { name: 'robots', content: 'index, follow' },
    {
      name: 'keywords',
      content:
        'Leonard Zonaphan, AI Product Owner, Software Engineer, GenAI, Process Automation, RPA, UiPath, Digital Transformation, Astra, Auto2000'
    },
    { name: 'author', content: 'Leonard Zonaphan' },
    // Open Graph
    { property: 'og:title', content: 'Leonard Zonaphan - AI Product Owner & Software Engineer' },
    {
      property: 'og:description',
      content:
        'AI Product Owner & Process Automation at Astra TSO. 4 GenAI initiatives, ~15 RPA solutions across 127 branches. Software engineering background (Blibli, BINUS).'
    },
    { property: 'og:type', content: 'profile' },
    { property: 'og:url', content: 'https://www.leonardzonaphan.com' },
    { property: 'og:image', content: 'https://www.leonardzonaphan.com/og-image.png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Leonard Zonaphan — AI Product Owner & Software Engineer' },
    { property: 'og:site_name', content: 'Leonard Zonaphan' },
    // Twitter card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Leonard Zonaphan - AI Product Owner & Software Engineer' },
    {
      name: 'twitter:description',
      content: 'AI Product Owner & Process Automation at Astra TSO. 4 GenAI initiatives, ~15 RPA solutions across 127 branches.'
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
      json: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Leonard Zonaphan',
        description:
          'AI Product Owner & Process Automation at Astra TSO Auto2000, with a software engineering background.',
        jobTitle: 'AI Product Owner & Software Engineer',
        url: 'https://www.leonardzonaphan.com',
        image: 'https://www.leonardzonaphan.com/og-image.png',
        worksFor: { '@type': 'Organization', name: 'Astra TSO' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'BINUS University' },
        email: 'mailto:lezonmail@gmail.com',
        knowsLanguage: ['id', 'en'],
        address: { '@type': 'PostalAddress', addressLocality: 'Jakarta', addressCountry: 'ID' },
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
    }
  ]
})
</script>

<template>
  <main>
    <a class="skip-link" href="#about">Skip to content</a>
    <navigation-bar />
    <home-section />
    <about-section />
    <experience-section />
    <project-section />
    <footer-bar />
    <metainfo>
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
