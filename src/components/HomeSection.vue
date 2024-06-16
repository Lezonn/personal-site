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
        font-family: $--title-font;
        font-size: $--font-h2;
        font-weight: 400;
      }
    }
  }
}
</style>
