import { c as createAstro, d as createComponent, r as renderTemplate, e as defineScriptVars, f as addAttribute, g as renderHead } from '../astro_BtfBDZlb.mjs';
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
const $$video = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$video;
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
  let link = "src/pages/videosrc" + Astro2.url.pathname + ".mp4";
  let title = Astro2.url.pathname.replaceAll("/", "").replaceAll(".mp4", "");
  let title1 = title.charAt(0).toUpperCase() + title.slice(1);
  let titlefinal = decodeURI(title1);
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"', "><title>Player</title>", '</head> <body> <nav> <svg id="home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"></path></svg> <input placeholder="Cerca..."> </nav> <div class="containerAll"> <div class="container"> <div class="videoc"> <video class="video" controls> <source', ' type="video/mp4"> </video> </div> <p>', '</p> </div> <div class="containerdownload"> <p>Video scaricati</p> <div class="downloaded" id="videos"></div> </div> </div> <script>(function(){', '\n      let i = 0;\n\n      const videos = document.getElementById("videos");\n\n      filesInTheFolder.forEach((element) => {\n        let filename = filesInTheFolder[i]\n          .replaceAll("src/pages/videosrc/", "")\n          .replaceAll(".mp4", "");\n        const div = document.createElement("div");\n        let thumb = document.createElement("video");\n        let a = document.createElement("a");\n        let a2 = document.createElement("a");\n        let p = document.createElement("p");\n        thumb.src = filesInTheFolder[i] + "#t=" + Math.random() * 26;\n        thumb.classList.add("thumbnail");\n        thumb.classList.add("videosrc");\n\n        a.href = filename;\n\n        p.innerText = filename;\n\n        a2.href = filename;\n        a2.classList.add("downloadedvideos");\n\n        a.appendChild(p);\n\n        div.appendChild(thumb);\n        div.appendChild(a);\n\n        a2.appendChild(div);\n        videos.appendChild(a2);\n        i++;\n      });\n\n      let old = JSON.parse(localStorage.getItem("Cronologia"));\n      if (old == null) {\n        let arr = [];\n        let location = window.location.href;\n        arr.push(location);\n        document.cookie =\n          "crono=" +\n          JSON.stringify(arr) +\n          ";path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT";\n        localStorage.setItem("Cronologia", JSON.stringify(arr));\n      } else if (old[5] != undefined) {\n        old.splice(0, 1);\n        let location = window.location.href;\n\n        old.push(location);\n\n        document.cookie =\n          "crono=" +\n          JSON.stringify(old) +\n          ";path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT";\n        localStorage.setItem("Cronologia", JSON.stringify(old));\n      } else {\n        let location = window.location.href;\n\n        let n = 0;\n        old.forEach((element) => {\n          if (element == location) {\n            n = 1;\n          }\n        });\n\n        if (n == 0) {\n          old.push(location);\n          document.cookie =\n            "crono=" +\n            JSON.stringify(old) +\n            ";path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT";\n          localStorage.setItem("Cronologia", JSON.stringify(old));\n        } else {\n        }\n      }\n    })();<\/script>  </body> </html>'])), addAttribute(Astro2.generator, "content"), renderHead(), addAttribute(link, "src"), titlefinal, defineScriptVars({ filesInTheFolder }));
}, "/Users/macbookpro/Desktop/simo/offlineplayer/src/pages/[video].astro", void 0);

const $$file = "/Users/macbookpro/Desktop/simo/offlineplayer/src/pages/[video].astro";
const $$url = "/[video]";

export { $$video as default, $$file as file, $$url as url };
