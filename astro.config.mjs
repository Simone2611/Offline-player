import { defineConfig } from "astro/config";
// Also can be @astrojs/vercel/static
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  // Also can be 'static' or 'hybrid'
  output: "server",
  adapter: vercel()
});

// import { defineConfig } from "astro/config";

// // https://astro.build/config
// export default defineConfig({});