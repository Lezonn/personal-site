<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isNavbarFloating = ref(false)
const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#project' },
  { label: 'Contact', href: '#contact' }
]

function onScroll() {
  isNavbarFloating.value = window.scrollY > 8
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="d-flex justify-center position-fixed w-100">
    <nav :class="{ 'navbar-floating': isNavbarFloating }" aria-label="Primary">
      <a v-for="link in links" :key="link.href" :href="link.href">
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

header {
  z-index: 1000;
  pointer-events: none;
}

nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  pointer-events: auto;
  border-radius: 999px;
  min-height: 52px;
  padding: 0.35rem 0.9rem;
  margin-top: $--spacing-xs;
  transition: all 0.3s ease-out;

  a {
    font-weight: 600;
    position: relative;
    color: $--color-dark-light;
    margin: $--spacing-xxs;
    padding: 0.35rem $--spacing-xxs;
    white-space: nowrap;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 2px;
      width: 100%;
      height: 2px;
      background: rgba(7, 90, 78, 0.6);
      border-radius: 2px;
      transform: scaleX(0);
      transition: transform 0.3s ease;
      transform-origin: right;
    }

    &:hover::after,
    &:focus-visible::after {
      transform: scaleX(1);
      transform-origin: left;
    }

    &:focus-visible {
      outline: 2px solid $--color-text-primary;
      outline-offset: 3px;
      border-radius: 6px;
    }
  }
}

.navbar-floating {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 8px 30px rgba(51, 51, 51, 0.1);
}

@media (max-width: 560px) {
  nav {
    max-width: calc(100vw - 1.5rem);
    overflow-x: auto;
    gap: 0;
    padding: 0.3rem 0.55rem;
  }

  nav a {
    font-size: 0.82rem;
    margin: 0.05rem;
    padding: 0.32rem 0.45rem;
  }
}
</style>
