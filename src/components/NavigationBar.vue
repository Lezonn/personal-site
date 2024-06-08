<template>
  <nav class="d-flex justify-center w-100 position-fixed">
    <a href="#hero">Home</a>
    <a href="#about">About</a>
    <a href="#experience">Experience</a>
    <a href="#project">Project</a>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

nav {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  height: 60px;
  z-index: 1000;

  a {
    color: $primary-font-color;
    text-decoration: none;
    position: relative;
    margin: 8px;
    padding: 8px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 5px;
      width: 100%;
      height: 2px;
      background: rgba(255, 255, 255, 0.5);
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
</style>
