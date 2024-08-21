/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "my-basic-green": "#5F835D",
        "my-text-deepblack": "#6F6F6F",
        "my-text-lightblack": "#B9B9B9",
        "my-text-background": "#F1F1F1",
        "my-text-ligthgreen": "#BED7BA",
        "my-graph-orange": "#E5A07F",
        "my-warning-red": "#FF6565",
      },
      width: {
        // mywidth90: "90vw",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    function ({ addUtilities }) {
      const newUtilities = {
        /* 스크롤바 트랙 */
        ".scrollbar-track": {
          "scrollbar-width": "thin",
          "-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
        },
        /* 스크롤바 핸들 */
        ".scrollbar-thumb": {
          "-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "0.25rem",
          },
          "&:hover": {
            "-webkit-scrollbar-thumb": {
              background: "#555",
            },
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
