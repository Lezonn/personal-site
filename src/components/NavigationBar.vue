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
  <header class="d-flex justify-center position-fixed w-100">
    <nav :class="{ 'navbar-floating': isNavbarFloating }">
      <ul>
        <li>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#project">Project</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

header {
  z-index: 1000;
}

nav {
  display: flex;
  border-radius: 50px;
  height: 56px;
  align-items: center;
  transition: all 0.3s ease-out;
  margin-top: $--spacing-xs;

  ul > li > a {
    font-weight: 600;
    position: relative;
    color: $--color-dark-light;
    margin: $--spacing-xxs;
    padding: $--spacing-xxs;

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
  padding: 0 $--spacing-xxs;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(15px);
}
</style>
