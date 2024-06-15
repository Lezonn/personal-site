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
  <section id="about" class="about h-screen">
    <v-container class="d-flex align-center justify-center h-100 flex-column">
      <h1 class="my-2">About Me</h1>
      <div class="my-2">
        <p>
          Leonard Zonaphan is a computer science fresh graduate at Bina Nusantara University, with a
          focus on software engineering. He has experience working on real-world projects with scale
          as a software development engineer in Blibli.com and full stack developer in Bina
          Nusantara IT Division.
        </p>
        <p>
          Leonard enjoys topics related to technology, finance, entrepreneurship, and games. In his
          free time, he likes to do sports and gain new insights from courses & podcasts.
        </p>
      </div>
      <v-timeline class="my-2" direction="horizontal">
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

.about {
  background-color: $secondary-background-color;
}
</style>
