import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead } from '../astro_BtfBDZlb.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                            */
import fs from 'fs';

const $$Astro = createAstro();
const $$search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$search;
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
  let arr = [];
  let i = 0;
  const filesInTheFolder = getFiles("src/pages/videosrc");
  let letter1 = Astro2.url.pathname;
  let letter = letter1.replaceAll("/search/", "");
  filesInTheFolder.forEach((element) => {
    let fix = element.replaceAll("src/pages/videosrc/", "").replaceAll(".mp4", "").toLowerCase();
    if (fix.includes(letter)) {
      if (i + 1 == filesInTheFolder.length) {
        arr.push(element);
      } else {
        arr.push(element + "-");
        i++;
      }
    }
  });
  return renderTemplate`${maybeRenderHead()}<nav> <svg id="home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"></path></svg> <input id="cerca" placeholder="Cerca..."> </nav> <div id="search"></div> <div class="containerdownload2"> <p class="title">Risultati</p> <div class="downloaded" id="videos">${arr}</div> </div> `;
}, "/Users/macbookpro/Desktop/simo/offlineplayer/src/pages/search/[search].astro", void 0);

const $$file = "/Users/macbookpro/Desktop/simo/offlineplayer/src/pages/search/[search].astro";
const $$url = "/search/[search]";

export { $$search as default, $$file as file, $$url as url };
