<script setup>
import BubbleBackground from './BubbleBackground.vue'
import portraitImg from '@/assets/leo-600.webp'

// what Leo does, drawn as bubbles orbiting the portrait. x is measured from the
// box's left edge, or its right edge for `right` chips, so none leave a phone screen.
const skills = [
  { label: 'GenAI products', icon: 'sparkles', x: 0, y: 10 },
  { label: 'RPA & automation', icon: 'robot', x: -4, y: 4, right: true },
  { label: 'Process discovery', icon: 'search', x: -8, y: 50 },
  { label: 'Full-stack web apps', icon: 'code', x: -6, y: 66, right: true },
  { label: 'Dashboards & reports', icon: 'chart', x: 6, y: 86 }
]

const icons = {
  sparkles:
    'M12 3l1.8 4.6L18.4 9.4l-4.6 1.8L12 15.8l-1.8-4.6L5.6 9.4l4.6-1.8zM18.5 15l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z',
  robot: 'M5 9h14v9H5zM12 5v4M9.5 13v.5M14.5 13v.5M9 16h6M3 13v2M21 13v2',
  search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5 20 20',
  code: 'M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12',
  chart: 'M4 20V11M10 20V5M16 20v-6M3 20h18'
}
</script>

<template>
  <section id="home" class="home">
    <bubble-background />
    <div class="home_inner">
      <div class="home_visual">
        <div class="home_portrait">
          <span class="home_portrait_bubble" aria-hidden="true" />
          <div class="home_portrait_cut">
            <img
              :src="portraitImg"
              alt="Leonard Zonaphan"
              width="600"
              height="800"
              fetchpriority="high"
            />
          </div>
        </div>
        <ul class="home_skills" aria-label="What I do">
          <li
            v-for="(skill, i) in skills"
            :key="skill.label"
            class="home_skill"
            :class="{ 'home_skill--right': skill.right }"
            :style="{ '--x': `${skill.x}%`, '--y': `${skill.y}%`, '--i': i }"
          >
            <span class="home_skill_icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path :d="icons[skill.icon]" /></svg>
            </span>
            {{ skill.label }}
          </li>
        </ul>
      </div>
      <div class="home_copy">
        <p class="home_eyebrow">AI Product Owner · Software Engineer</p>
        <h1 class="home_title">
          <span class="home_hi">Hi, I'm Leo.</span>
          <span class="home_hook">
            I turn messy operations into <em>AI products</em> and <em>automation</em> people
            actually use.
          </span>
        </h1>
        <div class="home_actions">
          <a class="home_btn home_btn--primary" href="#journey">Take the ride ↓</a>
          <a class="home_btn home_btn--secondary" href="#contact">Get in touch</a>
        </div>
        <p class="home_now">Now at Astra TSO Auto2000 · Jakarta</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.home {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: 6.5rem clamp(1rem, 5vw, 4.5rem) 4rem;
  background: linear-gradient(
    180deg,
    var(--c-sky-top) 0%,
    var(--c-sky-mid) 55%,
    var(--c-sky-bottom) 100%
  );

  &_inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    display: grid;
    gap: 2.5rem;
    align-items: center;
  }

  // ---------- portrait in a bubble, skills orbiting it ----------

  &_visual {
    position: relative;
    justify-self: center;
    width: min(520px, 78vw);
    aspect-ratio: 1;
  }

  &_portrait {
    position: absolute;
    inset: 9%;

    &_bubble {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(circle at 32% 26%, rgba(255, 255, 255, 0.9) 0 6%, transparent 7%),
        radial-gradient(circle, #ffffff 0%, #e4f3ec 52%, #a9d8c8 100%);
      border: 2px solid rgba(255, 255, 255, 0.9);
      box-shadow:
        0 30px 60px rgba(10, 46, 41, 0.18),
        inset -10px -16px 30px rgba(242, 184, 79, 0.18);
    }

    // the cut-out stands inside the bubble and pops out over its top edge
    &_cut {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: -22%;
      -webkit-mask-image: linear-gradient(#000, #000),
        radial-gradient(closest-side at 50% 59%, #000 99%, transparent 100%);
      mask-image: linear-gradient(#000, #000),
        radial-gradient(closest-side at 50% 59%, #000 99%, transparent 100%);
      -webkit-mask-size:
        100% 59%,
        100% 100%;
      mask-size:
        100% 59%,
        100% 100%;
      -webkit-mask-position: top, center;
      mask-position: top, center;
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;

      img {
        display: block;
        height: 100%;
        width: auto;
        margin: 0 auto;
        filter: drop-shadow(0 18px 24px rgba(10, 46, 41, 0.22));
      }
    }
  }

  &_skills {
    position: absolute;
    inset: 0;
  }

  &_skill {
    position: absolute;
    left: var(--x);
    top: var(--y);
    display: inline-flex;

    &--right {
      left: auto;
      right: var(--x);
    }

    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.85rem 0.35rem 0.35rem;
    border-radius: 999px;
    white-space: nowrap;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--c-heading);
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.95);
    box-shadow: 0 12px 30px rgba(10, 46, 41, 0.14);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    animation: bob 6s ease-in-out infinite;
    animation-delay: calc(var(--i) * -1.3s);

    &_icon {
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #3fa38f, var(--c-accent));
      box-shadow: inset 0 -3px 6px rgba(0, 0, 0, 0.15);

      svg {
        width: 18px;
        height: 18px;
        fill: none;
        stroke: #fff;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    }

    &:nth-child(2n) &_icon {
      background: radial-gradient(circle at 35% 30%, #e9b75c, var(--c-highlight));
    }
  }

  // ---------- copy ----------

  &_copy {
    max-width: 600px;
  }

  &_eyebrow {
    display: inline-block;
    font-size: $--font-mini;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--c-on-accent);
    background: var(--c-accent);
    border-radius: 999px;
    padding: 0.4rem 1rem;
  }

  &_title {
    margin-top: 1rem;
    font-weight: inherit;
  }

  &_hi {
    display: block;
    font-family: $--title-font;
    font-size: clamp(2.8rem, 1.6rem + 4.4vw, 5.6rem);
    line-height: 0.95;
    letter-spacing: -0.02em;
    color: var(--c-heading);
  }

  &_hook {
    display: block;
    margin-top: 1rem;
    font-size: clamp(1.25rem, 1rem + 1vw, 1.9rem);
    font-weight: 500;
    line-height: 1.3;
    color: var(--c-text);
    text-wrap: balance;

    em {
      font-style: normal;
      color: var(--c-accent);
      background: linear-gradient(transparent 64%, rgba(242, 184, 79, 0.45) 64%);
      padding: 0 0.08em;
    }
  }

  &_actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.75rem;
  }

  &_btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 0 1.6rem;
    border-radius: 999px;
    font-size: 0.95rem;
    font-weight: 700;
    transition:
      transform 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 2px solid var(--c-heading);
      outline-offset: 3px;
    }

    &--primary {
      color: var(--c-on-accent);
      background: var(--c-accent);
      box-shadow: 0 10px 30px color-mix(in srgb, var(--c-accent) 28%, transparent);

      &:hover {
        background: var(--c-accent-hover);
      }
    }

    &--secondary {
      color: var(--c-heading);
      background: rgba(255, 255, 255, 0.6);
      border: 1px solid var(--c-border-strong);

      &:hover {
        border-color: var(--c-heading);
      }
    }
  }

  &_now {
    margin-top: 1.1rem;
    font-size: $--font-mini;
    color: var(--c-text-dim);
  }
}

@media (min-width: 960px) {
  .home_inner {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 3rem;
  }

  .home_visual {
    order: 2;
  }
}

@media (max-width: 959px) {
  .home {
    align-items: flex-start;
    padding-top: 5.5rem;
  }

  .home_inner {
    gap: 1.5rem;
  }

  .home_copy {
    text-align: center;
    justify-self: center;
  }

  .home_actions {
    justify-content: center;
  }
}

@media (max-width: 560px) {
  .home_eyebrow {
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    padding: 0.32rem 0.8rem;
  }

  .home_visual {
    width: min(330px, 86vw);
  }

  // no backdrop blur on phones: five moving blurred layers cost more than they show
  .home_skill {
    gap: 0.35rem;
    padding: 0.25rem 0.6rem 0.25rem 0.25rem;
    font-size: 0.75rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;

    &_icon {
      width: 26px;
      height: 26px;

      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
}

@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home_skill {
    animation: none;
  }
}
</style>
