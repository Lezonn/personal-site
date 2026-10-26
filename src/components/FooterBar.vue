<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="footer">
    <v-container class="footer_cta">
      <p class="footer_kicker">Let's talk</p>
      <h2 class="footer_cta_title">Let's build something <em>useful</em> together.</h2>
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
    </v-container>
    <v-container fluid class="footer_inner">
      <v-row no-gutters class="footer_grid">
        <v-col cols="12" md="6" class="footer_brand">
          <p class="footer_brand_name">Leonard Zonaphan.</p>
          <p class="footer_sub">
            AI Product Owner &amp; Software Engineer — RPA, process automation, and digital
            transformation.
          </p>
          <p class="footer_copyright">© {{ currentYear }} Leonard Zonaphan • Jakarta</p>
        </v-col>
        <v-col cols="6" md="3" class="footer_col">
          <ul class="footer_list d-flex flex-column">
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
        </v-col>
        <v-col cols="6" md="3" class="footer_col">
          <ul class="footer_list d-flex flex-column">
            <li class="footer_list_heading">Contact</li>
            <li>
              <a href="mailto:info@leonardzonaphan.com"> info@leonardzonaphan.com </a>
            </li>
            <li>
              <a href="#home">Back to top ↑</a>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
    <div class="footer_giant" aria-hidden="true">LEONARD</div>
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
      background: linear-gradient(transparent 62%, rgba(232, 176, 75, 0.65) 62%);
      padding: 0 0.1em;
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
    gap: 1.5rem 0;
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
        color: $--color-cream-dim;

        &:hover {
          color: $--color-accent;
        }
      }
    }
  }

  &_giant {
    font-family: $--title-font;
    font-weight: 700;
    font-size: clamp(4rem, 4vw + 4rem, 12rem);
    line-height: 0.85;
    text-align: center;
    letter-spacing: 0.02em;
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(242, 236, 221, 0.16);
    user-select: none;
    margin-top: $--spacing-s;
    transform: translateY(0.12em);
  }
}
</style>
