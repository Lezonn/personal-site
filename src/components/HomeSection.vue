<script setup>
import BubbleBackground from './BubbleBackground.vue'
</script>

<template>
  <section id="home" class="home d-flex align-center justify-center flex-column">
    <div class="home__center text-center">
      <h1>
        <span class="home__name">Hi. I'm Leo</span>
        <span class="home__subtitle">A Software Engineer</span>
      </h1>
      <p class="home__desc">
        I'm passionate in exploring about software development, including frontend and backend
        development.
      </p>
      <div class="home__actions">
        <v-btn variant="outlined" color="#075a4e" size="large" href="#project" class="cta-btn">
          See My Work
        </v-btn>
      </div>
    </div>
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
  min-height: 100vh;
  position: relative;

  &__center {
    max-width: 680px;
    padding: 0 $--spacing-m;
    z-index: 1;
  }

  &__name {
    display: block;
    font-family: $--title-font;
    font-size: $--font-h1;
    color: $--color-text-primary;
    line-height: 1;
    margin-bottom: $--spacing-xs;
  }

  &__subtitle {
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

  &__desc {
    font-size: $--font-body;
    color: $--color-dark-light;
    max-width: 480px;
    margin: $--spacing-m auto 0;
    line-height: 1.8;
  }

  &__actions {
    margin-top: $--spacing-l;
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
