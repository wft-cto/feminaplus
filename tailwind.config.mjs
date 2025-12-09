/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,vue,md,mdx,svelte}"],
  theme: {
    extend: {
      fontFamily: {
        anticdidone: ['"Antic Didone"'],
        manrope: ['"Manrope"'],
      },
    },
  },
  plugins: [],
};
