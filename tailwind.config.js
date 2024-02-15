/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const autoGrid = plugin(
  function ({ matchComponents, addComponents, theme }) {
    const values = theme("autoGrid");

    matchComponents(
      {
        "auto-grid": (value) => ({
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
        }),
      },
      { values },
    );

    addComponents({
      ".auto-grid-none": {
        display: "revert",
        gridTemplateColumns: "revert",
      },
    });
  },
  {
    theme: {
      autoGrid: ({ theme }) => ({
        ...theme("spacing"),
      }),
    },
  },
);

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
  plugins: [autoGrid, "prettier-plugin-tailwindcss"],
};
