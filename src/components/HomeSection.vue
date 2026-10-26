<script setup>
import BubbleBackground from './BubbleBackground.vue'
import leoImg from '@/assets/leo.webp'

defineProps({
  staticMode: { type: Boolean, default: false }
})
</script>

<template>
  <section id="home" class="home" :class="{ 'home--static': staticMode }">
    <bubble-background v-if="staticMode" />
    <div class="home_copy">
      <p class="home_eyebrow">AI Product Owner @ Astra TSO</p>
      <h1 class="home_title">AI-enable <em>your idea.</em></h1>
      <p class="home_intro">
        <img
          :src="leoImg"
          class="home_avatar"
          alt="Leonard Zonaphan"
          width="56"
          height="56"
          fetchpriority="high"
        />
        <span>
          Hi, I'm Leo — AI Product Owner. I turn ideas and messy processes into AI products people
          actually use.
        </span>
      </p>
      <div class="home_actions d-flex flex-wrap">
        <v-btn color="#e8b04b" class="home_actions_primary" href="#journey">
          Start the ride ↓
        </v-btn>
        <v-btn variant="outlined" class="home_actions_secondary" href="#contact">
          Get in touch
        </v-btn>
      </div>
    </div>
    <a v-if="!staticMode" class="home_cue" href="#journey">
      <span class="home_cue_mouse" aria-hidden="true" />
      Scroll to start the ride
    </a>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.home {
  position: relative;
  min-height: 100vh;
  min-height: 100lvh;
  display: flex;
  align-items: center;
  padding: 6.5rem clamp(1rem, 6vw, 5rem) 5rem;

  // keep the copy readable over the 3D world
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      100deg,
      rgba(3, 17, 15, 0.82) 0%,
      rgba(3, 17, 15, 0.45) 38%,
      transparent 62%
    );
    pointer-events: none;
  }

  &--static {
    overflow: hidden;
    background: radial-gradient(50vmax 40vmax at 85% 20%, rgba(232, 176, 75, 0.18), transparent 60%),
      radial-gradient(60vmax 50vmax at 0% 100%, rgba(7, 90, 78, 0.55), transparent 60%), $--color-bg;
  }

  &_copy {
    position: relative;
    z-index: 1;
    max-width: 640px;
  }

  &_eyebrow {
    display: inline-block;
    font-size: $--font-mini;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $--color-ink;
    background: $--color-cream;
    border-radius: 999px;
    padding: 0.4rem 1rem;
    margin-bottom: $--spacing-xs;
  }

  &_title {
    font-family: $--title-font;
    font-size: clamp(3rem, 1.4rem + 6vw, 7rem);
    line-height: 0.95;
    letter-spacing: -0.02em;
    color: $--color-cream;
    margin: 0;
    text-wrap: balance;

    em {
      font-style: normal;
      color: $--color-accent;
      text-shadow: 0 0 40px rgba(242, 184, 79, 0.35);
    }
  }

  &_intro {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    max-width: 560px;
    margin: $--spacing-s 0 0;
    font-size: $--font-h6;
    line-height: 1.55;
    color: $--color-cream-dim;
  }

  &_avatar {
    flex: none;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    object-position: 50% 12%;
    background: $--color-bg-raised;
    border: 2px solid $--color-accent;
    box-shadow: 0 0 0 5px rgba(232, 176, 75, 0.15);
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
      letter-spacing: 0;
      font-weight: 700;
      border-radius: 999px;
      padding: 0 1.6rem;
    }

    &_primary {
      color: $--color-ink !important;
    }

    &_secondary {
      border-color: rgba(242, 236, 221, 0.5);
      color: $--color-cream;
    }
  }

  &_cue {
    position: absolute;
    left: 50%;
    bottom: 1.75rem;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    font-size: $--font-mini;
    font-weight: 600;
    color: $--color-cream-dim;
    z-index: 1;

    &_mouse {
      width: 22px;
      height: 34px;
      border: 2px solid currentColor;
      border-radius: 12px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 6px;
        width: 4px;
        height: 7px;
        margin-left: -2px;
        border-radius: 2px;
        background: $--color-accent;
        animation: cue 1.8s ease-in-out infinite;
      }
    }
  }
}

@media (max-aspect-ratio: 9/10) {
  .home {
    align-items: flex-start;
    padding-top: 6rem;

    &::before {
      background: linear-gradient(
        180deg,
        rgba(3, 17, 15, 0.85) 0%,
        rgba(3, 17, 15, 0.5) 42%,
        transparent 62%
      );
    }

    &--static {
      align-items: center;
    }
  }
}

@media (max-width: 560px) {
  .home_eyebrow {
    font-size: 0.72rem;
    padding: 0.32rem 0.85rem;
  }

  .home_intro {
    font-size: $--font-mini;
  }

  .home_avatar {
    width: 46px;
    height: 46px;
  }
}

@keyframes cue {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  60% {
    transform: translateY(9px);
    opacity: 0.2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home_cue_mouse::after {
    animation: none;
  }
}
</style>
