<script setup>
import BubbleBackground from './BubbleBackground.vue'
</script>

<template>
  <section id="home" class="home h-screen">
    <v-container class="d-flex flex-column align-center justify-center h-100">
      <h1 class="text-center">
        <span class="text-name">Hi, I'm Leonard</span>
        <span class="text-about">A Software Engineer</span>
      </h1>
      <div class="description">
        <p class="text-description text-center">
          I'm passionate about exploring new technologies around web development, including frontend
          and backend.
        </p>
      </div>
    </v-container>
    <bubble-background />
  </section>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
@import '@/assets/styles/variables';
.home {
  background: linear-gradient(to bottom, $primary-background-color, $secondary-background-color);
}

.text-name {
  display: block;
  font-family: 'Permanent Marker', sans-serif;
  font-weight: 500;
  font-size: calc(4vw + 32px);
  color: $primary-font-color;
  z-index: 1000;
}

.text-about {
  font-family: 'Permanent Marker', sans-serif;
  font-size: 24px;
  opacity: 80%;
}

.description {
  margin-top: 10vh;
}

.text-description {
  max-width: 800px;
  font-size: 18px;
  font-weight: 400;
}
</style>
