/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,vue,md,mdx,svelte}"],
    safelist: [
    "after:w-full",
    "after:w-0",
    "text-gray-300",
  ],
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
