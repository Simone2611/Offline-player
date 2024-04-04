import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_BtfBDZlb.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
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
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/input/[cerca]","isIndex":false,"type":"page","pattern":"^\\/input\\/([^/]+?)\\/?$","segments":[[{"content":"input","dynamic":false,"spread":false}],[{"content":"cerca","dynamic":true,"spread":false}]],"params":["cerca"],"component":"src/pages/input/[cerca].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const C=document.getElementById(\"home\");C.addEventListener(\"click\",a=>{window.location.href=window.location.origin});const u=document.getElementById(\"cerca\");u.addEventListener(\"input\",a=>{let e=document.getElementById(\"cerca\").value,n=document.getElementById(\"search\");e==null||e==null||e==\"\"?n.style.display=\"none\":(n.style.display=\"flex\",d()),addEventListener(\"click\",t=>{t.target.toString().includes(\"HTMLInputElement\")?n.style.display=\"flex\":n.style.display=\"none\"});function d(){const t=new XMLHttpRequest;t.onload=function(){const l=this.responseText,o=document.getElementById(\"search\");o.innerText=l;let w=l.trim();o.innerHTML=w;const s=document.getElementById(\"inputsearch\");let x=[s.innerText.trim()],L=JSON.stringify(x).replaceAll(\"-\",'\",\"').replace(',\"\"',\"\"),f=JSON.parse(L),v=0;s.innerText=\"\",f.forEach(b=>{let r=f[v].replaceAll(\"src/pages/videosrc/\",\"\").replaceAll(\".mp4\",\"\");const m=document.createElement(\"div\");let i=document.createElement(\"video\"),p=document.createElement(\"a\"),c=document.createElement(\"a\"),E=document.createElement(\"p\");i.src=window.location.origin+\"/src/pages/videosrc/\"+r+\".mp4#t=\"+Math.random()*26,i.classList.add(\"thumbnail\"),i.classList.add(\"videosrc\"),p.href=\"/\"+r,E.innerText=r,c.href=\"/\"+r,c.classList.add(\"downloadedvideos\"),p.appendChild(E),m.appendChild(i),m.appendChild(p),c.appendChild(m),s.appendChild(c),v++})},t.open(\"GET\",\"/input/\"+e.replaceAll(\" \",\"+\")),t.send()}});let h=document.getElementById(\"videos\"),T=h.innerText.trim(),A=[T],I=JSON.stringify(A).replaceAll(\"-\",'\",\"').replace(',\"\"',\"\"),y=JSON.parse(I),g=0;h.innerText=\"\";y.forEach(a=>{let e=y[g].replaceAll(\"src/pages/videosrc/\",\"\").replaceAll(\".mp4\",\"\");const n=document.createElement(\"div\");let d=document.createElement(\"video\"),t=document.createElement(\"a\"),l=document.createElement(\"a\"),o=document.createElement(\"p\");d.src=window.location.origin+\"/src/pages/videosrc/\"+e+\".mp4#t=\"+Math.random()*26,d.classList.add(\"thumbnail\"),d.classList.add(\"videosrc\"),t.href=\"/\"+e,o.innerText=e,l.href=\"/\"+e,l.classList.add(\"downloadedvideos\"),t.appendChild(o),n.appendChild(d),n.appendChild(t),l.appendChild(n),h.appendChild(l),g++});const B=document.querySelectorAll(\".videosrc\");B.forEach(function(a){a.onmouseover=function(){this.play(),this.playbackRate=1.5,this.muted=!0},a.onmouseout=function(){this.load()}});u.addEventListener(\"keypress\",a=>{a.keyCode==13&&(window.location.href=\"/search/\"+u.value)});\n"}],"styles":[{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap\";body,html{padding:0;margin:0;background-color:#111;color:#f5f5f5;font-family:Open Sans}a{color:inherit;text-decoration:none}svg{fill:#f5f5f5;width:1.5rem;padding:.5rem;align-self:center;cursor:pointer}input{margin:0 auto;width:20rem;padding:.6rem;border-radius:5px;border:none;outline:none;background-color:#111;color:#f5f5f5}nav{position:fixed;top:0;width:100vw;display:flex;align-items:center;flex-direction:row;height:3rem;background-color:#333}.video{width:900px;border-radius:10px}.videoc{display:flex;flex-direction:row;justify-content:center}.container{display:flex;flex-direction:column;justify-content:center}.container p{width:900px;display:flex;flex-direction:column;align-self:center;font-size:1.3rem}.thumbnail{width:15rem;border-radius:10px}.downloaded{display:flex;flex-direction:row;flex-wrap:wrap;gap:20px}.containerdownload{padding:.5rem}.downloadedvideos:hover{transform:scale(1.05);transition:.5s ease-in-out}.downloadedvideos{transition:.5s ease-in-out}.containerAll{margin-top:4rem}.search{display:flex;flex-direction:column;align-items:center;width:100%;margin-top:5rem;gap:1rem}.search a{width:25rem}.search a div{flex-direction:row;display:flex;gap:.2rem}.search a div video{width:10rem}.containerdownload2{padding:.5rem;margin-top:2rem}.title{font-size:2rem}\n"}],"routeData":{"route":"/search/[search]","isIndex":false,"type":"page","pattern":"^\\/search\\/([^/]+?)\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}],[{"content":"search","dynamic":true,"spread":false}]],"params":["search"],"component":"src/pages/search/[search].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const e=document.querySelectorAll(\".videosrc\");e.forEach(function(o){o.onmouseover=function(){this.play(),this.playbackRate=1.5,this.muted=!0},o.onmouseout=function(){this.load()}});const t=document.getElementById(\"home\");t.addEventListener(\"click\",o=>{window.location.href=window.location.origin});\n"}],"styles":[{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap\";body,html{padding:0;margin:0;background-color:#111;color:#f5f5f5;font-family:Open Sans}a{color:inherit;text-decoration:none}svg{fill:#f5f5f5;width:1.5rem;padding:.5rem;align-self:center;cursor:pointer}input{margin:0 auto;width:20rem;padding:.6rem;border-radius:5px;border:none;outline:none;background-color:#111;color:#f5f5f5}nav{position:fixed;top:0;width:100vw;display:flex;align-items:center;flex-direction:row;height:3rem;background-color:#333}.video{width:900px;border-radius:10px}.videoc{display:flex;flex-direction:row;justify-content:center}.container{display:flex;flex-direction:column;justify-content:center}.container p{width:900px;display:flex;flex-direction:column;align-self:center;font-size:1.3rem}.thumbnail{width:15rem;border-radius:10px}.downloaded{display:flex;flex-direction:row;flex-wrap:wrap;gap:20px}.containerdownload{padding:.5rem}.downloadedvideos:hover{transform:scale(1.05);transition:.5s ease-in-out}.downloadedvideos{transition:.5s ease-in-out}.containerAll{margin-top:4rem}.search{display:flex;flex-direction:column;align-items:center;width:100%;margin-top:5rem;gap:1rem}.search a{width:25rem}.search a div{flex-direction:row;display:flex;gap:.2rem}.search a div video{width:10rem}.containerdownload2{padding:.5rem;margin-top:2rem}.title{font-size:2rem}\n"}],"routeData":{"route":"/[video]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/?$","segments":[[{"content":"video","dynamic":true,"spread":false}]],"params":["video"],"component":"src/pages/[video].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const L=document.querySelectorAll(\".videosrc\");L.forEach(function(e){e.onmouseover=function(){this.play(),this.playbackRate=1.5,this.muted=!0},e.onmouseout=function(){this.load()}});const x=document.getElementById(\"home\");x.addEventListener(\"click\",e=>{window.location.href=window.location.origin});document.addEventListener(\"contextmenu\",e=>e.preventDefault());const p=document.getElementById(\"cerca\");p.addEventListener(\"input\",e=>{let n=document.getElementById(\"cerca\").value,l=document.getElementById(\"search\");n==null||n==null||n==\"\"?l.style.display=\"none\":(l.style.display=\"flex\",y()),addEventListener(\"click\",t=>{t.target.toString().includes(\"HTMLInputElement\")?l.style.display=\"flex\":l.style.display=\"none\"});function y(){const t=new XMLHttpRequest;t.onload=function(){const d=this.responseText,h=document.getElementById(\"search\");h.innerText=d;let E=d.trim();h.innerHTML=E;const c=document.getElementById(\"inputsearch\");let v=[c.innerText.trim()],g=JSON.stringify(v).replaceAll(\"-\",'\",\"').replace(',\"\"',\"\"),r=JSON.parse(g),i=0;c.innerText=\"\",r.forEach(T=>{let s=r[i].replaceAll(\"src/pages/videosrc/\",\"\").replaceAll(\".mp4\",\"\");const m=document.createElement(\"div\");let o=document.createElement(\"video\"),u=document.createElement(\"a\"),a=document.createElement(\"a\"),f=document.createElement(\"p\");o.src=r[i]+\"#t=\"+Math.random()*26,o.classList.add(\"thumbnail\"),o.classList.add(\"videosrc\"),u.href=s,f.innerText=s,a.href=s,a.classList.add(\"downloadedvideos\"),u.appendChild(f),m.appendChild(o),m.appendChild(u),a.appendChild(m),c.appendChild(a),i++})},t.open(\"GET\",\"/input/\"+n.replaceAll(\" \",\"+\")),t.send()}});p.addEventListener(\"keypress\",e=>{e.keyCode==13&&(window.location.href=\"/search/\"+p.value)});\n"}],"styles":[{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap\";body,html{padding:0;margin:0;background-color:#111;color:#f5f5f5;font-family:Open Sans}a{color:inherit;text-decoration:none}svg{fill:#f5f5f5;width:1.5rem;padding:.5rem;align-self:center;cursor:pointer}input{margin:0 auto;width:20rem;padding:.6rem;border-radius:5px;border:none;outline:none;background-color:#111;color:#f5f5f5}nav{position:fixed;top:0;width:100vw;display:flex;align-items:center;flex-direction:row;height:3rem;background-color:#333}.video{width:900px;border-radius:10px}.videoc{display:flex;flex-direction:row;justify-content:center}.container{display:flex;flex-direction:column;justify-content:center}.container p{width:900px;display:flex;flex-direction:column;align-self:center;font-size:1.3rem}.thumbnail{width:15rem;border-radius:10px}.downloaded{display:flex;flex-direction:row;flex-wrap:wrap;gap:20px}.containerdownload{padding:.5rem}.downloadedvideos:hover{transform:scale(1.05);transition:.5s ease-in-out}.downloadedvideos{transition:.5s ease-in-out}.containerAll{margin-top:4rem}.search{display:flex;flex-direction:column;align-items:center;width:100%;margin-top:5rem;gap:1rem}.search a{width:25rem}.search a div{flex-direction:row;display:flex;gap:.2rem}.search a div video{width:10rem}.containerdownload2{padding:.5rem;margin-top:2rem}.title{font-size:2rem}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/macbookpro/Desktop/simo/offlineplayer/src/pages/[video].astro",{"propagation":"none","containsHead":true}],["/Users/macbookpro/Desktop/simo/offlineplayer/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/input/[cerca].astro":"chunks/pages/_cerca__CTk_IBiy.mjs","/src/pages/search/[search].astro":"chunks/pages/_search__CF1pM6WH.mjs","/src/pages/[video].astro":"chunks/pages/_video__DIn4mr30.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_CfXQoFSn.mjs","/src/pages/index.astro":"chunks/pages/index_CR5f_soA.mjs","\u0000@astrojs-manifest":"manifest_s7gu1YYB.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_DaEPn9g6.mjs","\u0000@astro-page:src/pages/input/[cerca]@_@astro":"chunks/_cerca__C6lrnuag.mjs","\u0000@astro-page:src/pages/search/[search]@_@astro":"chunks/_search__4ui_gTB8.mjs","\u0000@astro-page:src/pages/[video]@_@astro":"chunks/_video__D195LPk_.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_6Xj1ZCs6.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.hcQDYQWT.js","/astro/hoisted.js?q=2":"_astro/hoisted.Dw9wi7Xi.js","/astro/hoisted.js?q=0":"_astro/hoisted.pugiqG7I.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/favicon.svg"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
