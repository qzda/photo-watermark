import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(), UnoCSS()],
  resolve: {
    alias: {
      "~": path.relative(__dirname, "./"),
    },
  },
});
