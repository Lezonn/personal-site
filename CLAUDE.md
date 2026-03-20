# CLAUDE.md — AI Assistant Guide for personal-site

This file provides context for AI assistants (and developers) working in this repository.

---

## Project Overview

Personal portfolio site for Leonardo Zonaphan. It is a single-page application (SPA) deployed at **https://www.leonardzonaphan.com**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3.4 (Composition API) |
| Routing | Vue Router 4 |
| State management | Pinia 2 (minimal use) |
| UI components | Vuetify 3 (Material Design) |
| Styling | SASS/SCSS |
| Build tool | Vite 5 |
| Linting | ESLint 8 + eslint-plugin-vue |
| Formatting | Prettier 3 |
| SEO | vue-meta 3 |
| Analytics | @vercel/analytics |

---

## Project Structure

```
personal-site/
├── index.html                  # HTML entry point (Google Fonts preconnects)
├── vite.config.js              # Vite config — Vue plugin + '@' alias → src/
├── jsconfig.json               # JS path aliases
├── .eslintrc.cjs               # ESLint config
├── .prettierrc.json            # Prettier config
├── public/                     # Copied as-is to dist
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── main.js                 # App entry point — creates Vue app, registers plugins
    ├── App.vue                 # Root component: section orchestration + SEO metadata
    ├── router/
    │   └── index.js            # Vue Router (single route '/')
    ├── assets/
    │   └── styles/
    │       ├── main.scss       # Global styles
    │       └── _variables.scss # SCSS variables, CSS custom properties, fluid typography
    └── components/
        ├── NavigationBar.vue   # Fixed header with scroll-detection floating effect
        ├── HomeSection.vue     # Hero section (full-screen)
        ├── BubbleBackground.vue# Animated floating bubbles (spawns every 1s)
        ├── AboutSection.vue    # About section
        ├── ProjectSection.vue  # Projects section
        └── FooterBar.vue       # Contact & social links (responsive)
```

---

## Development Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Production build → dist/
npm run preview   # Preview the production build locally
npm run lint      # ESLint with auto-fix (respects .gitignore)
npm run format    # Prettier format on src/
```

---

## Code Conventions

### Vue Components
- Always use `<script setup>` (Composition API). Never use Options API.
- Component state goes in local `ref()` / `reactive()` — Pinia is configured but rarely needed.
- Use scoped `<style lang="scss">` for component styles.
- Use `@/` as the import alias for `src/` (e.g. `import Foo from '@/components/Foo.vue'`).

### Formatting (enforced by Prettier)
- No semicolons
- Single quotes for strings
- 2-space indentation
- Max line width: 100 characters
- No trailing commas

### Layout & Styling
- Use Vuetify grid system (`v-container`, `v-row`, `v-col`) for page layout.
- Prefer Vuetify utility classes (`d-flex`, `h-screen`, `align-center`, etc.) over custom CSS.
- Define new design tokens (colors, spacing, fonts) in `src/assets/styles/_variables.scss`.
- Global base styles go in `src/assets/styles/main.scss`.
- Fluid typography is handled via CSS custom properties defined in `_variables.scss`.

### HTML Structure
- Page sections have semantic IDs (e.g. `#home`, `#about`, `#projects`) for in-page navigation.
- Google Fonts (`Montserrat`, `Poppins`, `Averia Libre`) are preconnected in `index.html`.

---

## Component Notes

### NavigationBar.vue
- Listens to `window.scroll` to toggle a "floating" CSS class on the navbar.
- Registers/removes the listener in `onMounted` / `onUnmounted`.

### BubbleBackground.vue
- Spawns a new animated bubble every 1 second via `setInterval`.
- Each bubble has a random size, position, and 5–10 second animation duration, then is removed from the DOM.
- Respects `document.visibilityState` — stops spawning when the tab is hidden.
- Clean up the interval in `onUnmounted`.

### App.vue (SEO)
- `vue-meta` is used here for `<title>`, meta description, Open Graph tags, and JSON-LD structured data (Person schema).
- Update the structured data if contact details or social links change.

---

## SEO & Public Assets

- **robots.txt** — Allows all crawlers; points to sitemap.
- **sitemap.xml** — Single URL entry for the homepage. Update `<lastmod>` when content changes significantly.
- Production URL: `https://www.leonardzonaphan.com`

---

## Testing

No test infrastructure currently exists. If adding tests, use **Vitest** (Vite-native, compatible with the existing build setup) and place spec files alongside their components (`*.spec.js`).

---

## Git Workflow

- `main` — production branch
- `dev` — primary development branch (open PRs here before merging to main)
- Use descriptive, imperative commit messages (e.g. `fix: remove bubble spawn after unmount`)
- No custom git hooks or CI/CD pipelines are configured
