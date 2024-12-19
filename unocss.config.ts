import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  // presetWebFonts,
} from "unocss";

export default defineConfig({
  shortcuts: {
    xy: "flex gap-2  items-center",
    yx: "flex flex-col gap-2  items-center",
    "xy-center": "flex gap-2 justify-center items-center",
    "yx-center": "flex flex-col gap-2 justify-center items-center",
    "xy-between": "flex gap-2 justify-between items-center",
    "yx-between": "flex gap-2 flex-col justify-between items-center",
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        height: "1.2em",
        width: "1.2em",
        "vertical-align": "text-bottom",
      },
    }),
    // presetWebFonts({
    //   provider: "google",
    //   fonts: {
    //     mono: ["JetBrains Mono"],
    //   },
    // }),
  ],
});
