/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,js,jsx,md,mdx,ts,tsx}"],
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
  plugins: ["prettier-plugin-tailwindcss"],
};
