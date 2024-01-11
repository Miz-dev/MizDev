/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    colors: {
      primary: "#2c568e",
      "dark-navy": "#0f1928",
      gray: "#777777",
      "light-gray": "#eeeeee",
      "gray-dark": "#273444",
      black: "#333333",
      white: "#ffffff",
    },
    extend: {},
  },
  plugins: [],
};
