import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DAz1U_OY.mjs';
import 'es-module-lexer';
import { e as decodeKey } from './chunks/astro/server_NeTizdhH.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/daniel/Muebles_Gumilla/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}},{"file":"sobre-el-taller/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sobre-el-taller","isIndex":false,"type":"page","pattern":"^\\/sobre-el-taller\\/$","segments":[[{"content":"sobre-el-taller","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sobre-el-taller.astro","pathname":"/sobre-el-taller","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/oauth/callback","isIndex":false,"type":"endpoint","pattern":"^\\/oauth\\/callback\\/$","segments":[[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/oauth/callback.ts","pathname":"/oauth/callback","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/oauth","isIndex":true,"type":"endpoint","pattern":"^\\/oauth\\/$","segments":[[{"content":"oauth","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/oauth/index.ts","pathname":"/oauth","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"always"}}}],"site":"https://mueblesgumilla.com","base":"/","trailingSlash":"always","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/daniel/Muebles_Gumilla/src/pages/catalogo/[...categoria].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/catalogo/[...categoria]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/home/daniel/Muebles_Gumilla/src/pages/catalogo/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/catalogo/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/daniel/Muebles_Gumilla/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/daniel/Muebles_Gumilla/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/home/daniel/Muebles_Gumilla/src/pages/sobre-el-taller.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/catalogo/[...categoria]@_@astro":"pages/catalogo/_---categoria_.astro.mjs","\u0000@astro-page:src/pages/catalogo/[slug]@_@astro":"pages/catalogo/_slug_.astro.mjs","\u0000@astro-page:src/pages/oauth/callback@_@ts":"pages/oauth/callback.astro.mjs","\u0000@astro-page:src/pages/oauth/index@_@ts":"pages/oauth.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/sobre-el-taller@_@astro":"pages/sobre-el-taller.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","/home/daniel/Muebles_Gumilla/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/home/daniel/Muebles_Gumilla/src/content/categorias/camas.md?astroContentCollectionEntry=true":"chunks/camas_CmsArTMo.mjs","/home/daniel/Muebles_Gumilla/src/content/categorias/estantes.md?astroContentCollectionEntry=true":"chunks/estantes_B9mH8NpP.mjs","/home/daniel/Muebles_Gumilla/src/content/categorias/mesas.md?astroContentCollectionEntry=true":"chunks/mesas_CZOdSYqB.mjs","/home/daniel/Muebles_Gumilla/src/content/categorias/otros.md?astroContentCollectionEntry=true":"chunks/otros_C7oI7Bkg.mjs","/home/daniel/Muebles_Gumilla/src/content/categorias/sillas.md?astroContentCollectionEntry=true":"chunks/sillas_DGs2oJLK.mjs","/home/daniel/Muebles_Gumilla/src/content/productos/estante-minimal.md?astroContentCollectionEntry=true":"chunks/estante-minimal_DucCDI1t.mjs","/home/daniel/Muebles_Gumilla/src/content/productos/mesa-comedor-lenga.md?astroContentCollectionEntry=true":"chunks/mesa-comedor-lenga_t_Aw1p6o.mjs","/home/daniel/Muebles_Gumilla/src/content/productos/silla-roble-clasica.md?astroContentCollectionEntry=true":"chunks/silla-roble-clasica_Dlmf059s.mjs","/home/daniel/Muebles_Gumilla/src/content/categorias/camas.md?astroPropagatedAssets":"chunks/camas_CuHv_L0_.mjs","/home/daniel/Muebles_Gumilla/src/content/categorias/estantes.md?astroPropagatedAssets":"chunks/estantes_DlW5zLHP.mjs","/home/daniel/Muebles_Gumilla/src/content/categorias/mesas.md?astroPropagatedAssets":"chunks/mesas_v4gYPMch.mjs","/home/daniel/Muebles_Gumilla/src/content/categorias/otros.md?astroPropagatedAssets":"chunks/otros_CN_kAEiI.mjs","/home/daniel/Muebles_Gumilla/src/content/categorias/sillas.md?astroPropagatedAssets":"chunks/sillas_BazcUQRA.mjs","/home/daniel/Muebles_Gumilla/src/content/productos/estante-minimal.md?astroPropagatedAssets":"chunks/estante-minimal_DqQaL_lm.mjs","/home/daniel/Muebles_Gumilla/src/content/productos/mesa-comedor-lenga.md?astroPropagatedAssets":"chunks/mesa-comedor-lenga_B4buBm-z.mjs","/home/daniel/Muebles_Gumilla/src/content/productos/silla-roble-clasica.md?astroPropagatedAssets":"chunks/silla-roble-clasica_CGbvRpcn.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","/home/daniel/Muebles_Gumilla/src/assets/productos/placeholder_cama.png":"chunks/placeholder_cama_CIHgaM-l.mjs","/home/daniel/Muebles_Gumilla/src/assets/productos/placeholder_mesa.png":"chunks/placeholder_mesa_C12nYkc7.mjs","/home/daniel/Muebles_Gumilla/src/assets/productos/placeholder_estante.png":"chunks/placeholder_estante_BYe2AhPt.mjs","/home/daniel/Muebles_Gumilla/src/content/categorias/camas.md":"chunks/camas_BvDBrjQB.mjs","/home/daniel/Muebles_Gumilla/src/content/categorias/estantes.md":"chunks/estantes_BiGVNU4W.mjs","/home/daniel/Muebles_Gumilla/src/content/categorias/mesas.md":"chunks/mesas_CoTzx4Q0.mjs","/home/daniel/Muebles_Gumilla/src/content/categorias/otros.md":"chunks/otros_AVs5nP9N.mjs","/home/daniel/Muebles_Gumilla/src/content/categorias/sillas.md":"chunks/sillas_Dtk-VrjI.mjs","/home/daniel/Muebles_Gumilla/src/content/productos/estante-minimal.md":"chunks/estante-minimal_CwvjZVqj.mjs","/home/daniel/Muebles_Gumilla/src/content/productos/mesa-comedor-lenga.md":"chunks/mesa-comedor-lenga_B59G8bCL.mjs","/home/daniel/Muebles_Gumilla/src/content/productos/silla-roble-clasica.md":"chunks/silla-roble-clasica_Dcly6pWa.mjs","\u0000@astrojs-manifest":"manifest_DvC5vbga.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.BjhK5obW.js","/astro/hoisted.js?q=1":"_astro/hoisted.CotCCGu2.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/logo-antiguo.C8uYhh1A.jpg","/_astro/img-20260817-wa0014.Dfhc2vne.jpg","/_astro/hero-home.DJgfCTAB.jpg","/_astro/placeholder_cama.CLPT482D.png","/_astro/placeholder_mesa.DU_M59gn.png","/_astro/placeholder_estante.DyTCV_ZD.png","/_astro/bosque-chileno.CuOcTyy_.jpg","/_astro/logo-actual.qiEWgcOa.png","/_astro/placeholder_silla.BwZ8GFa7.png","/_astro/placeholder_otros.TV4uMnHJ.png","/_astro/_categoria_.Bl9ZLLGv.css","/apple-touch-icon.png","/favicon.ico","/favicon.svg","/og-image.jpg","/robots.txt","/_astro/hoisted.BjhK5obW.js","/_astro/hoisted.CotCCGu2.js","/admin/config.yml","/admin/index.html","/images/hero.png","/404.html","/sobre-el-taller/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"PCUvDX/kpEXFefhLYuANaIE+5cCJXanb+jZkVrTvYbE=","experimentalEnvGetSecretEnabled":false});

export { manifest };
