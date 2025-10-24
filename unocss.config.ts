import { defineConfig, presetIcons, presetWind4 } from "unocss";

export default defineConfig({
  shortcuts: {
    "border-base": "border-hex-888/15 dark:border-dark-100 dark:border-transparent",
    "bg-base": "bg-white dark:bg-[#181818]!",
    "color-base": "text-gray-900 dark:text-gray-300",
    "color-fade": "text-gray-900:50 dark:text-gray-300:50",
    "icon-button": "op50 hover:op100 my-auto shrink-0 cursor-pointer",
  },
  presets: [
    presetWind4({
      dark: "media",
    }),
    presetIcons(),
  ],
  theme: {
    // https://unocss.dev/presets/wind3#animates
    animation: {
      keyframes: {
        rotate: "{0% { rotate: 0deg; } 100% { rotate: 360deg; }}",
      },
      durations: {
        rotate: "1s",
      },
      properties: {
        rotate: { "transform-origin": "center" },
      },
      counts: {
        rotate: "infinite",
      },
    },
    breakpoints: {
      sm: "430px",
    },
    colors: {
      primary: "var(--theme-color)",
      dark: {
        100: "#222",
        200: "#333",
        300: "#444",
        400: "#555",
        500: "#666",
        600: "#777",
        700: "#888",
        800: "#999",
        900: "#aaa",
      },
    },
  },
});
