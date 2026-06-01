import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        charcoal: {
          DEFAULT: "#171717",
          darker: "#0C0C0C",
          lighter: "#262626",
        },
        cream: {
          DEFAULT: "#FEF3C7",
          lighter: "#FFFDF6",
          darker: "#F5E6B3",
        },
        brand: {
          orange: "#EA580C",
          gold: "#EAB308",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
