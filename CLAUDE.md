# CLAUDE.md — personal-site

Portfolio SPA for Leonard Zonaphan, live at **https://www.leonardzonaphan.com** (Vercel). Vue 3 +
Vite with plain SCSS (no UI framework: Vuetify was dropped to pass Lighthouse mobile ≥ 90); the hero
and career journey are a Three.js scene. Scripts are in `package.json`.

## Page anatomy

`App.vue` stacks: `NavigationBar` → `HomeSection` (hero: portrait in a bubble with orbiting skill
bubbles, the hook, calls to action) → `JourneyWorld` (3D journey) → `AboutSection` → `FooterBar`.
`App.vue` also owns the SEO metadata (vue-meta, JSON-LD Person); `index.html` carries a static copy
of the same meta for no-JS crawlers, so edit both together.

Theme is a **bright day look** built on the original cream + mist-blue palette. Colors are CSS
custom properties on `:root` in `src/assets/styles/main.scss` (`--c-bg`, `--c-surface`, `--c-text`,
`--c-accent` teal, `--c-highlight` gold, `--c-glow-ai` / `--c-glow-code`, `--c-sky-*`); use them in
components rather than literal colors. The 3D world's colors live in `src/journey/themes.js`, and
its sky stops mirror `--c-sky-*` so the hero blends into the stage. Bubbles are the site's motif
(CSS bubbles in the hero, glassy point sprites in the world). Fonts: Averia Libre (titles),
Poppins (body).

## The journey

- **Content** is `src/data/journey.js`, newest stop first. One entry = one island + one chapter.
  `scene` picks the diorama builder, `glow` the era (`ai` gold for AI/automation work, `code` mint
  for earlier engineering), `sign` the caption under the logo, `brand` the company name + logo.
- **Logos**: `brand.logo` points into `public/journey/logos/`. The island sign plate and the
  caption bar draw the file when it exists and fall back to the brand name as a wordmark when it
  doesn't, so a logo is added by dropping the file in with the matching name.
- **Stage**: `JourneyWorld.vue` keeps a sticky canvas behind DOM steps (`[data-step]`: an intro,
  then one per stop). Scroll position between step tops becomes progress `t` (0 = overview,
  k = parked at stop k-1). The story runs as a lower-third caption bar (chapters cross-fade);
  "Details" opens a side panel and the framing slides the island aside. All text stays in the DOM.
- **World**: `src/journey/world.js` builds islands, road, car, sky and the camera choreography;
  it is lazy-loaded and only built on the visitor's first interaction (scroll, pointer, key), so
  it never competes with first paint. Until then the stage shows a poster of the opening shot
  (`public/journey/overview-{wide,tall}.webp`). Between stops the car parks for the first/last
  30% of the scroll and drives in the middle 40%.
- **Dioramas**: `src/journey/dioramas/<scene>.js`, built from helpers in `src/journey/kit.js`.
  Island-local frame: the road runs along x = 5.5 (x 3.4–7.6); keep props in x ≤ 2.6 and inside
  radius ~10.5. Helpers place shapes by their **base** y. Anything animated or transparent goes
  in a `dynamicGroup` (or sets `userData.dynamic`); every other mesh is merged per material at
  build time, so a static mesh you try to move later will not exist.
- **Road**: five control points per island keep the spline flat; fewer let it sag under the
  island surface.
- **Quality tiers** (`src/journey/quality.js`): `high` desktop, `lite` touch/small screens,
  `static` for no WebGL, reduced motion, data saver or weak devices — a 2D timeline using the
  stills in `public/journey/<stop id>.webp`. Force a tier with `?static` or `?lite`.
- **Posters, stills and OG images** are renders of the scene: re-capture `public/journey/*.webp`
  and `public/og-image*.png` with Playwright whenever a diorama or the overview shot changes
  visibly (move the mouse to wake the scene; the dev server exposes
  `window.__journeyWorld.jumpTo(t)`).

## Conventions

- `<script setup>` only; scoped `<style lang="scss">` importing `@/assets/styles/variables`.
- Layout is CSS grid/flex in component styles; `main.scss` holds the reset and a `.container`
  column helper.
- Import alias `@/` → `src/`. Prettier: no semicolons, single quotes, width 100.
- `npm run lint` and `npx prettier --check src/` before committing; no test suite exists (use
  Vitest beside components if adding one).

## Git workflow

`master` is production; open PRs into `dev`. Imperative commit messages
(`feat: …`, `fix: …`).
