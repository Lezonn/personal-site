<template>
  <footer class="d-flex justify-center align-center flex-column">
    <div class="contact-icon">
      <a class="mx-2" href="https://github.com/Lezonn" target="_blank" rel="noopener noreferrer">
        <img width="30" height="30" src="/src/assets/icons/github-icon.svg" />
      </a>
      <a class="mx-2" href="mailto:lezonmail@gmail.com" target="_blank" rel="noopener noreferrer">
        <img width="30" height="30" src="/src/assets/icons/gmail-icon.svg" />
      </a>
      <a
        class="mx-2"
        href="https://www.linkedin.com/in/leonard-zonaphan/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img width="30" height="30" src="/src/assets/icons/linkedin-icon.svg" />
      </a>
    </div>
    <div class="copyright">
      <p>Copyright ©️ 2024 Leonard Zonaphan</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

footer {
  height: 100px;
  background-color: rgba($color: $secondary-background-color, $alpha: 0.8);
  backdrop-filter: blur(10px);

  .copyright {
    color: #363636;
  }
}
</style>
