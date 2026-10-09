<script setup>
import BubbleBackground from './BubbleBackground.vue'
import { useReveal } from '@/composables/useReveal'
import leoImg from '@/assets/leo.webp'

const root = useReveal()
</script>

<template>
  <section id="home" ref="root" class="home">
    <div class="home_aurora" aria-hidden="true">
      <span class="home_blob home_blob_a" aria-hidden="true" />
      <span class="home_blob home_blob_b" aria-hidden="true" />
      <span class="home_blob home_blob_c" aria-hidden="true" />
    </div>
    <v-container class="home_inner">
      <div class="home_copy">
        <p class="home_eyebrow reveal">AI Product Owner @ Astra TSO</p>
        <h1 class="home_title">
          <span class="home_title_name reveal" style="transition-delay: 0.05s">Hi. I'm Leo</span>
          <span class="home_title_role reveal" style="transition-delay: 0.15s">
            I turn <em>messy processes</em> into products people use.
          </span>
        </h1>
        <p class="home_description reveal" style="transition-delay: 0.25s">
          AI Product Owner &amp; Software Engineer — GenAI, RPA, and full-stack web apps, currently
          driving digital transformation at Astra TSO Auto2000.
        </p>
        <div class="home_actions d-flex flex-wrap reveal" style="transition-delay: 0.35s">
          <v-btn color="#0a2e29" class="home_actions_primary" href="#contact"> Get in touch </v-btn>
          <v-btn variant="outlined" class="home_actions_secondary" href="#experience">
            See my work
          </v-btn>
        </div>
      </div>
      <div class="home_portrait reveal" style="transition-delay: 0.2s">
        <img
          :src="leoImg"
          class="home_portrait_img"
          alt="Portrait of Leonard Zonaphan"
          width="900"
          height="1200"
          fetchpriority="high"
        />
      </div>
    </v-container>
    <bubble-background />
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.home {
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    to bottom,
    $--color-background-primary,
    $--color-background-secondary
  );

  &_aurora {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  &_blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.55;
    animation: drift 14s ease-in-out infinite alternate;
  }

  &_blob_a {
    width: 44vmax;
    height: 44vmax;
    left: -12vmax;
    top: -10vmax;
    background: radial-gradient(circle, #ffffff 0%, rgba(255, 255, 255, 0) 70%);
  }

  &_blob_b {
    width: 38vmax;
    height: 38vmax;
    right: -10vmax;
    top: 12vh;
    background: radial-gradient(circle, rgba(7, 90, 78, 0.35) 0%, rgba(7, 90, 78, 0) 70%);
    animation-delay: -5s;
  }

  &_blob_c {
    width: 30vmax;
    height: 30vmax;
    left: 30vw;
    bottom: 6vh;
    background: radial-gradient(circle, rgba(232, 176, 75, 0.4) 0%, rgba(232, 176, 75, 0) 70%);
    animation-delay: -9s;
  }

  &_inner {
    position: relative;
    z-index: 1;
    min-height: 100svh;
    max-width: 1160px;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: $--spacing-m;
    padding-top: $--spacing-xl;
    padding-bottom: $--spacing-l;
  }

  &_copy {
    max-width: 620px;
  }

  &_eyebrow {
    display: inline-block;
    font-size: $--font-mini;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $--color-cream;
    background: $--color-ink;
    border-radius: 999px;
    padding: 0.45rem 1.1rem;
    margin-bottom: $--spacing-xs;
    box-shadow: 0 10px 30px rgba(10, 46, 41, 0.25);
  }

  &_title {
    margin: 0;

    &_name {
      display: block;
      font-family: $--title-font;
      font-size: clamp(3rem, 1.2rem + 6vw, 7rem);
      line-height: 0.95;
      letter-spacing: -0.02em;
      color: $--color-text-primary;
    }

    &_role {
      display: block;
      margin: 1rem 0 0;
      max-width: 720px;
      font-family: $--body-font;
      font-size: $--font-h3;
      font-weight: 500;
      line-height: 1.3;
      color: $--color-dark;
      text-wrap: balance;

      em {
        font-style: normal;
        background: linear-gradient(transparent 62%, rgba(232, 176, 75, 0.65) 62%);
        padding: 0 0.1em;
      }
    }
  }

  &_description {
    max-width: 600px;
    margin-top: $--spacing-s;
    color: $--color-dark-light;
  }

  &_actions {
    gap: 0.75rem;
    margin-top: $--spacing-s;

    :deep(.v-btn) {
      min-height: 48px;
      height: 48px;
    }

    &_primary,
    &_secondary {
      text-transform: none;
      font-weight: 600;
      border-radius: 999px;
      padding: 0 1.6rem;
    }

    &_secondary {
      border-color: $--color-ink;
      color: $--color-ink;
    }
  }

  &_portrait {
    position: relative;
    justify-self: center;
    align-self: center;
    width: 100%;
    max-width: 280px;
    margin-top: 0.75rem;

    // soft glow behind the subject so the cut-out sits on a surface
    &::before {
      content: '';
      position: absolute;
      inset: 12% 4% 4%;
      background: radial-gradient(
        50% 50% at 50% 45%,
        rgba(255, 255, 255, 0.6),
        rgba(7, 90, 78, 0.12) 60%,
        transparent 75%
      );
      filter: blur(10px);
      z-index: -1;
    }
  }

  &_portrait_img {
    display: block;
    width: 100%;
    height: auto;
    // melt the bottom into the aurora
    mask-image: linear-gradient(to bottom, #000 82%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, #000 82%, transparent 100%);
  }
}

@media (min-width: 1100px) {
  .home_inner {
    grid-template-columns: 1.15fr 0.85fr;
    gap: $--spacing-l;
  }

  .home_portrait {
    max-width: 400px;
    margin-top: 0;
    justify-self: end;
  }
}

@media (max-width: 1099px) {
  .home_inner {
    // always clear the fixed navbar on small screens (nav ~66px)
    padding-top: max($--spacing-xl, 5.5rem);
    // keep copy + portrait packed together (don't stretch rows across a tall viewport)
    align-content: start;
    // center the text block & portrait on the page in stacked layout
    justify-items: center;
    // don't force a giant 100svh fill on tall viewports (e.g. desktop-site-on-mobile);
    // let the hero size to its content instead of leaving a huge empty gap below
    min-height: max-content;
  }

  .home_eyebrow {
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    padding: 0.32rem 0.85rem;
    margin-bottom: 0.8rem;
  }

  .home_copy {
    text-align: center;
  }

  .home_description {
    margin-left: auto;
    margin-right: auto;
  }

  .home_actions {
    justify-content: center;
  }

  .home_title_role {
    margin-left: auto;
    margin-right: auto;
  }
}

@keyframes drift {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(4vmax, 3vmax) scale(1.12);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home_blob {
    animation: none;
  }
}
</style>
