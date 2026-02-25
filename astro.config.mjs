// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.feminaplussalon.com",
  integrations: [tailwind(), sitemap({
    customPages: [
    'https://www.feminaplussalon.com',
    'https://www.feminaplussalon.com/makeup/',
    'https://www.feminaplussalon.com/hair-color/',
    'https://www.feminaplussalon.com/hair-patch-wigs/'
  ]})],
});
