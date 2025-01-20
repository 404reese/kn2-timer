import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        grass: "#4CAF50", // Minecraft grass color
        dirt: "#8B4513", // Minecraft dirt color
        stone: "#7D7D7D", // Minecraft stone color
        brown: {
          600: "#8B4513", // Custom brown color for borders
        },
      },
      fontFamily: {
        minecraft: ['"Press Start 2P"', 'cursive'], // Custom Minecraft font
      },
    },
  },
  plugins: [],
} satisfies Config;