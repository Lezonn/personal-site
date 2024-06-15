<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isNavbarFloating = ref(false)

function onScroll() {
  isNavbarFloating.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="d-flex justify-center">
    <nav :class="{ 'navbar-floating': isNavbarFloating }">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#project">Project</a>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

nav {
  border-radius: 50px;
  display: flex;
  align-items: center;
  position: fixed;
  height: 60px;
  margin-top: 20px;
  transition: all 0.3s ease-out;
  z-index: 1000;

  a {
    color: $primary-font-color;
    text-decoration: none;
    position: relative;
    margin: 8px;
    padding: 8px;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 5px;
      width: 100%;
      height: 2px;
      background: rgba(0, 0, 0, 0.5);
      transform: scaleX(0);
      transition: transform 0.3s ease;
      transform-origin: right;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
}

.navbar-floating {
  padding: 0 10px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
