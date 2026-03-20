<script setup>
import { useScrollReveal } from '@/composables/useScrollReveal'

const { el, isVisible } = useScrollReveal({ threshold: 0.1 })

const skills = [
  'Vue 3',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'REST API',
  'PostgreSQL',
  'Git',
  'HTML/CSS'
]

const experience = [
  {
    period: '2023 – Present',
    role: 'Software Engineer',
    company: 'Company Name'
  },
  {
    period: '2022 – 2023',
    role: 'Frontend Developer',
    company: 'Company Name'
  }
]

const education = [
  {
    period: '2019 – 2023',
    degree: 'S1 Computer Science',
    institution: 'University Name'
  }
]
</script>

<template>
  <section id="about" ref="el" class="about">
    <v-container class="about__container">
      <div class="section-header reveal" :class="{ 'is-visible': isVisible }">
        <h2 class="section-header__title">About Me</h2>
        <div class="section-header__line"></div>
      </div>

      <v-row class="mt-8" align="start">
        <!-- Photo column -->
        <v-col cols="12" md="5" class="d-flex justify-center">
          <div class="about__photo reveal reveal--left" :class="{ 'is-visible': isVisible }">
            <!-- Replace src with your actual photo path -->
            <!-- <img src="@/assets/photo.jpg" alt="Leonard Zonaphan" /> -->
          </div>
        </v-col>

        <!-- Content column -->
        <v-col cols="12" md="7">
          <!-- Bio -->
          <div class="about__bio reveal reveal-delay-1" :class="{ 'is-visible': isVisible }">
            <p>
              Hi, I'm Leo — a Software Engineer based in Jakarta, Indonesia. I enjoy building
              clean, performant web applications and am passionate about both frontend and backend
              development. I love turning complex problems into elegant, user-friendly experiences.
            </p>
          </div>

          <!-- Skills -->
          <div class="about__skills reveal reveal-delay-2" :class="{ 'is-visible': isVisible }">
            <h3 class="about__subtitle">Skills</h3>
            <div class="d-flex flex-wrap ga-2 mt-3">
              <v-chip
                v-for="(skill, i) in skills"
                :key="skill"
                variant="tonal"
                color="#075a4e"
                :class="`reveal-delay-${i + 3}`"
                class="reveal"
                :style="isVisible ? 'opacity:1;transform:translateY(0)' : ''"
              >
                {{ skill }}
              </v-chip>
            </div>
          </div>

          <!-- Experience -->
          <div class="about__section reveal reveal-delay-3" :class="{ 'is-visible': isVisible }">
            <h3 class="about__subtitle">Experience</h3>
            <div class="timeline mt-3">
              <div v-for="(item, i) in experience" :key="i" class="timeline__item">
                <div class="timeline__dot"></div>
                <div class="timeline__content">
                  <span class="timeline__date">{{ item.period }}</span>
                  <h4 class="timeline__role">{{ item.role }}</h4>
                  <p class="timeline__company">{{ item.company }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Education -->
          <div class="about__section reveal reveal-delay-4" :class="{ 'is-visible': isVisible }">
            <h3 class="about__subtitle">Education</h3>
            <div class="timeline mt-3">
              <div v-for="(item, i) in education" :key="i" class="timeline__item">
                <div class="timeline__dot"></div>
                <div class="timeline__content">
                  <span class="timeline__date">{{ item.period }}</span>
                  <h4 class="timeline__role">{{ item.degree }}</h4>
                  <p class="timeline__company">{{ item.institution }}</p>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.about {
  background-color: $--color-background-secondary;
  min-height: 100vh;

  &__container {
    padding-top: $--spacing-xl;
    padding-bottom: $--spacing-xl;
  }

  &__photo {
    width: 100%;
    aspect-ratio: 1;
    max-width: 360px;
    border-radius: 12px;
    border: 3px solid $--color-text-primary;
    background-color: $--color-background-primary;
    overflow: hidden;
    margin-bottom: $--spacing-m;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__bio {
    margin-bottom: $--spacing-m;

    p {
      color: $--color-dark-light;
      line-height: 1.8;
    }
  }

  &__skills {
    margin-bottom: $--spacing-m;
  }

  &__section {
    margin-bottom: $--spacing-m;
  }

  &__subtitle {
    font-family: $--title-font;
    font-size: $--font-h3;
    color: $--color-text-primary;
    margin-bottom: $--spacing-xxs;
  }
}

.timeline {
  position: relative;
  padding-left: 28px;

  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 6px;
    bottom: 6px;
    width: 2px;
    background: rgba(7, 90, 78, 0.2);
  }

  &__item {
    position: relative;
    margin-bottom: $--spacing-s;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__dot {
    position: absolute;
    left: -22px;
    top: 5px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: $--color-text-primary;
  }

  &__date {
    display: block;
    font-size: $--font-mini;
    color: $--color-text-primary;
    font-weight: 600;
    margin-bottom: 2px;
  }

  &__role {
    font-size: $--font-h5;
    color: $--color-dark;
    font-weight: 600;
    margin: 0;
  }

  &__company {
    font-size: $--font-mini;
    color: $--color-dark-light;
    margin: 0;
  }
}
</style>
