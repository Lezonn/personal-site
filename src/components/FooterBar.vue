<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="footer">
    <div class="container footer_cta">
      <p class="footer_kicker">Let's talk</p>
      <h2 class="footer_cta_title">Got an idea? Let's <em>AI-enable</em> it.</h2>
      <p class="footer_cta_text">
        AI Product Owner &amp; Software Engineer — from GenAI products and process automation to
        full-stack software. Open to product, automation, and engineering roles.
      </p>
      <a class="footer_cta_btn" href="mailto:info@leonardzonaphan.com">
        info@leonardzonaphan.com
      </a>
      <div class="footer_cta_social">
        <a
          href="https://www.linkedin.com/in/leonard-zonaphan/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a href="https://github.com/Lezonn" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </div>
    <div class="container footer_inner">
      <div class="footer_grid">
        <div class="footer_brand">
          <p class="footer_brand_name">Leonard Zonaphan.</p>
          <p class="footer_sub">
            AI Product Owner &amp; Software Engineer — RPA, process automation, and digital
            transformation.
          </p>
          <p class="footer_copyright">© {{ currentYear }} Leonard Zonaphan • Jakarta</p>
        </div>
        <div class="footer_col">
          <ul class="footer_list">
            <li class="footer_list_heading">Elsewhere</li>
            <li>
              <a
                href="https://www.linkedin.com/in/leonard-zonaphan/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/Lezonn" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div class="footer_col">
          <ul class="footer_list">
            <li class="footer_list_heading">Contact</li>
            <li>
              <a href="mailto:info@leonardzonaphan.com"> info@leonardzonaphan.com </a>
            </li>
            <li>
              <a href="#home">Back to top ↑</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer_giant" aria-hidden="true" />
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.footer {
  position: relative;
  background-color: $--color-bg;
  border-top: 1px solid rgba(242, 236, 221, 0.1);
  padding: $--spacing-l 0 0;
  overflow: hidden;

  &_cta {
    max-width: 760px;
    text-align: center;
    padding: $--spacing-l 1rem $--spacing-l;
    margin-bottom: $--spacing-l;
    border-bottom: 1px solid rgba(242, 236, 221, 0.14);
  }

  &_kicker {
    font-size: $--font-mini;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $--color-accent;
    margin-bottom: 0.5rem;
  }

  &_cta_title {
    font-family: $--title-font;
    font-size: clamp(1.8rem, 1.1rem + 3vw, 3rem);
    line-height: 1.1;
    letter-spacing: -0.01em;
    text-wrap: balance;
    color: $--color-cream;
    margin: 0;

    em {
      font-style: normal;
      color: $--color-accent;
      text-shadow: 0 0 30px rgba(242, 184, 79, 0.35);
    }
  }

  &_cta_text {
    max-width: 540px;
    margin: $--spacing-s auto $--spacing-s;
    color: $--color-cream-dim;
  }

  &_cta_btn {
    display: inline-flex;
    align-items: center;
    min-height: 48px;
    padding: 0 1.75rem;
    border-radius: 999px;
    background: $--color-accent;
    color: $--color-ink;
    font-weight: 700;
    transition:
      transform 0.2s ease,
      background 0.2s ease;

    &:hover {
      background: $--color-cream;
      transform: translateY(-2px);
    }
  }

  &_cta_social {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: $--spacing-s;
    font-weight: 600;

    a {
      min-height: 44px;
      display: inline-flex;
      align-items: center;
      color: $--color-cream-dim;

      &:hover {
        color: $--color-accent;
      }
    }
  }

  &_inner {
    max-width: 1080px;
    padding-bottom: $--spacing-m;
  }

  &_grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem 0;
  }

  &_brand {
    grid-column: 1 / -1;
  }

  &_brand_name {
    font-family: $--title-font;
    font-size: $--font-h3;
    color: $--color-cream;
    margin: 0;
  }

  &_sub {
    color: $--color-cream-dim;
    font-size: $--font-link;
    max-width: 380px;
    margin: 0.5rem 0 0;
  }

  &_copyright {
    color: $--color-cream-dim;
    font-size: $--font-mini;
    margin: 1rem 0 0;
  }

  &_list {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;

    &_heading {
      color: $--color-accent;
      font-weight: 600;
    }

    & > li {
      margin-bottom: 0.15rem;

      & > a {
        display: inline-flex;
        align-items: center;
        min-height: 44px;
        padding: 0.25rem 0.35rem;
        margin-left: -0.35rem;
        border-radius: 8px;
        overflow-wrap: anywhere;
        color: $--color-cream-dim;

        &:hover {
          color: $--color-accent;
        }
      }
    }
  }

  // extruded wordmark lying back into the page
  &_giant {
    font-family: $--title-font;
    font-weight: 700;
    font-size: clamp(4rem, 4vw + 4rem, 12rem);
    line-height: 0.85;
    text-align: center;
    letter-spacing: 0.02em;
    // decorative: the word lives in ::before so it isn't graded as body text
    color: $--color-bg-raised;
    -webkit-text-stroke: 1.5px rgba(232, 176, 75, 0.5);
    text-shadow:
      0 1px 0 #0e3832,
      0 2px 0 #0e3832,
      0 3px 0 #0d342e,
      0 4px 0 #0d342e,
      0 5px 0 #0c302b,
      0 6px 0 #0c302b,
      0 7px 0 #0b2c27,
      0 8px 0 #0b2c27,
      0 22px 30px rgba(0, 0, 0, 0.55);
    user-select: none;
    margin-top: $--spacing-s;
    transform: perspective(700px) rotateX(34deg) translateY(0.1em);
    transform-origin: 50% 100%;

    &::before {
      content: 'LEONARD';
    }
  }
}

@media (min-width: 960px) {
  .footer_grid {
    grid-template-columns: 2fr 1fr 1fr;
  }

  .footer_brand {
    grid-column: auto;
  }
}
</style>
