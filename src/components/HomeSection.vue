<script setup>
import BubbleBackground from './BubbleBackground.vue'
</script>

<template>
  <section id="home" class="home h-screen">
    <h1 class="home_content_h1 text-center">
      <span class="home_content_h1_name">Hi. I'm Leo</span>
      <span class="home_content_h1_about">A Software Engineer</span>
    </h1>
    <v-container fluid class="home_content_description d-flex justify-center">
      <v-row no-gutters>
        <v-spacer />
        <v-col cols="12" sm="10" md="7" lg="6">
          <p class="home_content_description_text text-center">
            I'm passionate in exploring about software development, including frontend and backend
            development.
          </p>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row no-gutters class="mt-6">
        <v-spacer />
        <v-col cols="12" class="d-flex justify-center">
          <v-btn variant="outlined" color="#075a4e" size="large" href="#project" class="cta-btn">
            See My Work
          </v-btn>
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
    <bubble-background />
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.home {
  background: linear-gradient(
    to bottom,
    $--color-background-primary,
    $--color-background-secondary
  );

  &_content {
    &_h1 {
      padding: 8rem 0 3rem;

      &_name {
        display: block;
        font-family: $--title-font;
        font-size: $--font-h1;
        color: $--color-text-primary;
        z-index: 1000;
      }

      &_about {
        display: inline-block;
        font-family: $--title-font;
        font-size: $--font-h2;
        font-weight: 400;
        overflow: hidden;
        white-space: nowrap;
        vertical-align: bottom;
        border-right: 3px solid $--color-text-primary;
        width: 0;
        animation:
          typing 2s steps(19, end) 0.5s forwards,
          blink-caret 0.75s step-end infinite;
      }
    }
  }
}

.cta-btn {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(7, 90, 78, 0.25);
  }
}

@keyframes typing {
  to {
    width: 14em;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: $--color-text-primary;
  }
}
</style>
