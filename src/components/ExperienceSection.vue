<script setup>
const experiences = [
  {
    duration: {
      length: '1 YEAR',
      range: 'Feb 2023 - Feb 2024'
    },
    title: 'Blibli.com - Software Development Engineer Intern',
    description:
      'Working with PM, QA, and senior software engineer to maintain internal SEO tools, product feed, and product detail page',
    color: 'primary',
    icon: 'mdi-account'
  },
  {
    duration: {
      length: '1 YEAR',
      range: 'Mar 2021 - Mar 2022'
    },
    title: 'Bina Nusantara IT Divison - Associate Member',
    description:
      'Working with system analyst and senior programmer to migrate BINUS Square operations portal web apps',
    color: 'primary',
    icon: 'mdi-account'
  }
]
</script>

<template>
  <section id="experience" class="experience h-screen">
    <v-container class="d-flex align-center justify-center flex-column h-100">
      <h2>My Experience</h2>
      <v-timeline align-top>
        <v-timeline-item
          v-for="(experience, index) in experiences"
          :key="experience.title"
          :color="experience.color"
          :icon="experience.icon"
          small
        >
          <template v-slot:opposite>
            <div :class="index % 2 == 0 ? 'text-right' : 'text-left'">
              <p>{{ experience.duration.length }}</p>
              <p>{{ experience.duration.range }}</p>
            </div>
          </template>
          <v-card color="grey lighten-4" class="pa-3" flat>
            <h4>{{ experience.title }}</h4>
            <p>{{ experience.description }}</p>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.experience {
  background: linear-gradient(to bottom, $primary-background-color, $secondary-background-color);
}
</style>
