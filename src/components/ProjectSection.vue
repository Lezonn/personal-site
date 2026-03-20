<script setup>
import { useScrollReveal } from '@/composables/useScrollReveal'

const { el, isVisible } = useScrollReveal({ threshold: 0.1 })

const projects = [
  {
    title: 'Project Alpha',
    description: 'Short description of the project and the problem it solves. Replace this with your actual project details.',
    stack: ['Vue 3', 'Node.js', 'PostgreSQL'],
    liveUrl: '',
    repoUrl: 'https://github.com/Lezonn',
    year: '2024'
  },
  {
    title: 'Project Beta',
    description: 'Another project description goes here. Highlight what makes this project interesting or impactful.',
    stack: ['React', 'Express', 'MongoDB'],
    liveUrl: '',
    repoUrl: 'https://github.com/Lezonn',
    year: '2023'
  },
  {
    title: 'Project Gamma',
    description: 'A third project description. Mention the tech stack, your role, and any key outcomes or features.',
    stack: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    liveUrl: '',
    repoUrl: 'https://github.com/Lezonn',
    year: '2023'
  }
]
</script>

<template>
  <section id="project" ref="el" class="project">
    <v-container class="project__container">
      <div class="section-header reveal" :class="{ 'is-visible': isVisible }">
        <h2 class="section-header__title">Projects</h2>
        <div class="section-header__line"></div>
      </div>

      <v-row class="mt-8">
        <v-col
          v-for="(project, i) in projects"
          :key="project.title"
          cols="12"
          sm="6"
          lg="4"
          class="d-flex"
        >
          <v-card
            class="project-card reveal"
            :class="[{ 'is-visible': isVisible }, `reveal-delay-${i + 1}`]"
            elevation="0"
          >
            <div class="project-card__accent"></div>
            <v-card-text class="project-card__body">
              <span class="project-card__year">{{ project.year }}</span>
              <h3 class="project-card__title">{{ project.title }}</h3>
              <p class="project-card__desc">{{ project.description }}</p>
              <div class="d-flex flex-wrap ga-1 mt-3">
                <v-chip
                  v-for="tech in project.stack"
                  :key="tech"
                  size="small"
                  variant="outlined"
                  color="#075a4e"
                >
                  {{ tech }}
                </v-chip>
              </div>
            </v-card-text>
            <v-card-actions class="project-card__actions">
              <v-btn
                v-if="project.repoUrl"
                variant="text"
                color="#075a4e"
                size="small"
                :href="project.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </v-btn>
              <v-btn
                v-if="project.liveUrl"
                variant="tonal"
                color="#075a4e"
                size="small"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.project {
  background-color: $--color-background-secondary;
  min-height: 100vh;

  &__container {
    padding-top: $--spacing-xl;
    padding-bottom: $--spacing-xl;
  }
}

.project-card {
  background: $--color-surface;
  border: 1px solid rgba(7, 90, 78, 0.1);
  border-radius: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(7, 90, 78, 0.15);
  }

  &__accent {
    height: 4px;
    background: linear-gradient(90deg, $--color-text-primary, $--color-background-primary);
    border-radius: 12px 12px 0 0;
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
  }

  &__year {
    display: block;
    font-size: $--font-mini;
    color: $--color-text-primary;
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__title {
    font-family: $--title-font;
    font-size: $--font-h4;
    color: $--color-dark;
    margin: 4px 0 8px;
  }

  &__desc {
    font-size: $--font-mini;
    color: $--color-dark-light;
    line-height: 1.6;
    margin: 0;
  }

  &__actions {
    padding: 8px 16px 12px;
  }
}
</style>
