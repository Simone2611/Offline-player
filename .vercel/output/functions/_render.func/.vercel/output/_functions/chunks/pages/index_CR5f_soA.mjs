import { c as createAstro, d as createComponent, r as renderTemplate, e as defineScriptVars, g as renderHead, f as addAttribute } from '../astro_BtfBDZlb.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                            */
import fs from 'fs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  function getFiles(dir, files = []) {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
      const name = `${dir}/${file}`;
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files);
      } else {
        files.push(name);
      }
    }
    return files;
  }
  const filesInTheFolder = getFiles("src/pages/videosrc");
  let array = "";
  if (Astro2.cookies.get("crono")) {
    const cookie = [Astro2.cookies.get("crono").value];
    array = JSON.parse(cookie);
  }
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"', "><title>Player</title>", '</head> <body> <nav> <svg id="home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"></path></svg> <input id="cerca" placeholder="Cerca..."> </nav> <div id="search"></div> <div class="containerAll"> <div class="containerdownload"> <p class="title">Continua a guardare</p> <div class="downloaded" id="crono"></div> </div> <div class="containerdownload"> <p class="title">Video scaricati</p> <div class="downloaded" id="videos"></div> </div> </div> <script>(function(){', '\n      let k = 0;\n\n      const videos2 = document.getElementById("crono");\n\n      array.forEach((element) => {\n        let filename = array[k]\n          .replaceAll(window.location.origin + "/", "")\n          .replaceAll(".mp4", "");\n        const div = document.createElement("div");\n        let thumb = document.createElement("video");\n        let a = document.createElement("a");\n        let a2 = document.createElement("a");\n        let p = document.createElement("p");\n        thumb.src =\n          "src/pages/videosrc/" +\n          array[k].replaceAll(window.location.origin + "/", "") +\n          ".mp4#t=" +\n          Math.random() * 46;\n        thumb.classList.add("thumbnail");\n        thumb.classList.add("videosrc");\n        a.href = filename;\n\n        p.innerText = filename;\n\n        a2.href = filename;\n        a2.classList.add("downloadedvideos");\n\n        a.appendChild(p);\n\n        div.appendChild(thumb);\n        div.appendChild(a);\n\n        a2.appendChild(div);\n        videos2.appendChild(a2);\n        k++;\n      });\n    })();<\/script> <script>(function(){', '\n      let i = 0;\n\n      const videos = document.getElementById("videos");\n\n      filesInTheFolder.forEach((element) => {\n        let filename = filesInTheFolder[i]\n          .replaceAll("src/pages/videosrc/", "")\n          .replaceAll(".mp4", "");\n        const div = document.createElement("div");\n        let thumb = document.createElement("video");\n        let a = document.createElement("a");\n        let a2 = document.createElement("a");\n        let p = document.createElement("p");\n        thumb.src = filesInTheFolder[i] + "#t=" + Math.random() * 26;\n        thumb.classList.add("thumbnail");\n        thumb.classList.add("videosrc");\n\n        a.href = filename;\n\n        p.innerText = filename;\n\n        a2.href = filename;\n        a2.classList.add("downloadedvideos");\n\n        a.appendChild(p);\n\n        div.appendChild(thumb);\n        div.appendChild(a);\n\n        a2.appendChild(div);\n        videos.appendChild(a2);\n        i++;\n      });\n    })();<\/script>  </body> </html>'])), addAttribute(Astro2.generator, "content"), renderHead(), defineScriptVars({ array }), defineScriptVars({ filesInTheFolder }));
}, "/Users/macbookpro/Desktop/simo/offlineplayer/src/pages/index.astro", void 0);

const $$file = "/Users/macbookpro/Desktop/simo/offlineplayer/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
