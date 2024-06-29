<script setup>
import NavigationBar from '@/components/NavigationBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import HomeSection from '@/components/HomeSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ProjectSection from '@/components/ProjectSection.vue'

import { useMeta } from 'vue-meta'

useMeta({
  title: 'Leonard Zonaphan - Software Engineer',
  description:
    'A recent Bina Nusantara University computer science graduate with experience on large-scale real-world projects as a software engineer at Blibli.com.',
  meta: [
    { name: 'robots', content: 'index, follow' },
    { name: 'keywords', content: 'Leonard Zonaphan, Software Engineer, Bina Nusantara University' },
    { name: 'author', content: 'Leonard Zonaphan' }
  ],
  link: [
    {
      rel: 'canonical',
      href: window.location.origin
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      json: {
        '@context': 'http://schema.org',
        '@type': 'Person',
        name: 'Leonard Zonaphan',
        jobTitle: 'Software Engineer',
        url: 'https://www.leonardzonaphan.com',
        sameAs: ['https://www.linkedin.com/in/leonard-zonaphan/', 'https://github.com/Lezonn/']
      }
    }
  ]
})
</script>

<template>
  <main>
    <navigation-bar />
    <home-section />
    <about-section />
    <project-section />
    <footer-bar />
    <metainfo>
      <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>
  </main>
</template>

<style lang="scss" scoped></style>
