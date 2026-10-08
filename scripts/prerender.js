// Renders the app to static HTML after `vite build` so the page content is in the
// served HTML (crawlers, link previews, plain fetches), then hydrates in the browser.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const indexPath = `${root}dist/index.html`
const serverEntry = `${root}dist-ssr/entry-server.js`

const { render } = await import(pathToFileURL(serverEntry).href)
const appHtml = await render()

const template = await readFile(indexPath, 'utf-8')
const placeholder = '<div id="app"></div>'
if (!template.includes(placeholder)) {
  throw new Error(`prerender: ${placeholder} not found in dist/index.html`)
}

await writeFile(indexPath, template.replace(placeholder, `<div id="app">${appHtml}</div>`))
await rm(`${root}dist-ssr`, { recursive: true, force: true })

console.log(
  `prerender: wrote ${(appHtml.length / 1024).toFixed(1)} kB of HTML into dist/index.html`
)
