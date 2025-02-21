import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{vue,js,ts}"],
  darkMode: "class",
  theme: {
    colors
  },
  plugins: []
} satisfies Config;
