import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead } from '../astro_BtfBDZlb.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import fs from 'fs';

const $$Astro = createAstro();
const $$cerca = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$cerca;
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
  let letter = letter1.replaceAll("/input/", "").replaceAll("+", " ");
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
  return renderTemplate`${maybeRenderHead()}<div class="search" id="inputsearch">${arr}</div>`;
}, "/Users/macbookpro/Desktop/simo/offlineplayer/src/pages/input/[cerca].astro", void 0);

const $$file = "/Users/macbookpro/Desktop/simo/offlineplayer/src/pages/input/[cerca].astro";
const $$url = "/input/[cerca]";

export { $$cerca as default, $$file as file, $$url as url };
