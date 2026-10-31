<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="footer">
    <div class="container footer_cta">
      <p class="footer_kicker">Let's talk</p>
      <h2 class="footer_cta_title">Got a messy process? Let's <em>automate</em> it.</h2>
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
  background-color: var(--c-bg);
  border-top: 1px solid var(--c-border);
  padding: $--spacing-l 0 0;
  overflow: hidden;

  &_cta {
    max-width: 760px;
    text-align: center;
    padding: $--spacing-l 1rem $--spacing-l;
    margin-bottom: $--spacing-l;
    border-bottom: 1px solid var(--c-border);
  }

  &_kicker {
    font-size: $--font-mini;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--c-accent);
    margin-bottom: 0.5rem;
  }

  &_cta_title {
    font-family: $--title-font;
    font-size: clamp(1.8rem, 1.1rem + 3vw, 3rem);
    line-height: 1.1;
    letter-spacing: -0.01em;
    text-wrap: balance;
    color: var(--c-text);
    margin: 0;

    em {
      font-style: normal;
      color: var(--c-highlight);
      text-shadow: 0 0 30px var(--c-highlight-glow);
    }
  }

  &_cta_text {
    max-width: 540px;
    margin: $--spacing-s auto $--spacing-s;
    color: var(--c-text-dim);
  }

  &_cta_btn {
    display: inline-flex;
    align-items: center;
    min-height: 48px;
    padding: 0 1.75rem;
    border-radius: 999px;
    background: var(--c-accent);
    color: var(--c-on-accent);
    font-weight: 700;
    transition:
      transform 0.2s ease,
      background 0.2s ease;

    &:hover {
      background: var(--c-text);
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
      color: var(--c-text-dim);

      &:hover {
        color: var(--c-accent);
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
    color: var(--c-text);
    margin: 0;
  }

  &_sub {
    color: var(--c-text-dim);
    font-size: $--font-link;
    max-width: 380px;
    margin: 0.5rem 0 0;
  }

  &_copyright {
    color: var(--c-text-dim);
    font-size: $--font-mini;
    margin: 1rem 0 0;
  }

  &_list {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;

    &_heading {
      color: var(--c-accent);
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
        color: var(--c-text-dim);

        &:hover {
          color: var(--c-accent);
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
    color: var(--c-bg-raised);
    -webkit-text-stroke: 1.5px color-mix(in srgb, var(--c-highlight) 55%, transparent);
    text-shadow:
      0 1px 0 var(--c-extrude),
      0 2px 0 var(--c-extrude),
      0 3px 0 var(--c-extrude),
      0 4px 0 var(--c-extrude),
      0 5px 0 var(--c-extrude),
      0 6px 0 var(--c-extrude),
      0 7px 0 var(--c-extrude),
      0 8px 0 var(--c-extrude),
      0 22px 30px var(--c-shadow);
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
