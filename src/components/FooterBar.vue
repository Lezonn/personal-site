<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="footer">
    <v-container fluid>
      <v-row align="center" no-gutters>
        <v-col cols="12" md="4" class="text-center text-md-start footer__copyright">
          © {{ currentYear }} Leonard Zonaphan • Jakarta
        </v-col>

        <v-col cols="12" md="4" class="d-none d-md-flex justify-center">
          <span class="footer__tagline">Software Engineer</span>
        </v-col>

        <v-col cols="12" md="4" class="d-flex justify-center justify-md-end footer__links">
          <a
            href="https://www.linkedin.com/in/leonard-zonaphan/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="https://github.com/Lezonn" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="mailto:lezonmail@gmail.com"> Email </a>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.footer {
  background-color: $--color-background-secondary;
  padding: $--spacing-m 0;
  border-top: 1px solid rgba(7, 90, 78, 0.1);

  &__copyright {
    font-size: $--font-mini;
    color: $--color-dark-light;
    padding: $--spacing-xxs 0;
  }

  &__tagline {
    font-size: $--font-mini;
    color: $--color-text-primary;
    font-weight: 600;
  }

  &__links {
    gap: $--spacing-m;
    padding: $--spacing-xxs 0;

    a {
      color: $--color-dark-light;
      font-weight: 500;
      transition: color 0.2s ease;

      &:hover {
        color: $--color-text-primary;
      }
    }
  }
}
</style>
