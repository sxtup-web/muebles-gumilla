import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DwDNLPvw.mjs';
import { manifest } from './manifest_11V4qAVW.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/catalogo/_slug_.astro.mjs');
const _page3 = () => import('./pages/catalogo/_---categoria_.astro.mjs');
const _page4 = () => import('./pages/oauth/callback.astro.mjs');
const _page5 = () => import('./pages/oauth.astro.mjs');
const _page6 = () => import('./pages/sobre-el-taller.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/catalogo/[slug].astro", _page2],
    ["src/pages/catalogo/[...categoria].astro", _page3],
    ["src/pages/oauth/callback.ts", _page4],
    ["src/pages/oauth/index.ts", _page5],
    ["src/pages/sobre-el-taller.astro", _page6],
    ["src/pages/index.astro", _page7]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "9e9c34b7-ea4d-41f1-811e-d29d7cf74a59",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
