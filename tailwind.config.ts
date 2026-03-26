import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Evidence Base design system — academic journal palette
        eb: {
          bg: "#FDFAF5",            // warm cream (like aged paper)
          surface: "#FFFFFF",        // white card surfaces
          "surface-2": "#F3EDE3",    // slightly warmer alt sections
          border: "#E3D9C8",         // warm gray border
          "border-strong": "#C4B8A4", // stronger border
          navy: "#1C2B47",           // deep navy — primary headings
          "navy-light": "#2D4060",   // slightly lighter navy
          slate: "#3D4F6E",          // slate blue — body text
          muted: "#6B7A90",          // muted text
          subtle: "#9BA5B5",         // very subtle / metadata
          gold: "#B07820",           // warm amber/gold — primary accent
          "gold-dark": "#8E6010",    // darker gold for hover
          "gold-light": "#C8923A",   // lighter gold
          "gold-faint": "#FEF6E6",   // very light gold tint
          "gold-border": "#DEB870",  // gold border
          green: "#2E6B52",          // forest green — verified/truth
          "green-faint": "#EFF7F3",  // light green tint
          red: "#8B3028",            // muted red
          "red-faint": "#FEF0EE",    // light red tint
        },
        // Remap bitcoin → gold so all existing bg-bitcoin/text-bitcoin use gold
        bitcoin: "#B07820",
        "bitcoin-dark": "#8E6010",
        "bitcoin-light": "#C8923A",
        // Keep dark palette for admin pages (internal tool stays dark)
        dark: {
          950: "#0a0a0a",
          900: "#111111",
          800: "#1a1a1a",
          700: "#2a2a2a",
          600: "#3a3a3a",
          500: "#4a4a4a",
          400: "#6a6a6a",
          300: "#8a8a8a",
          200: "#aaaaaa",
          100: "#cccccc",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "'Times New Roman'", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(28, 43, 71, 0.06), 0 1px 2px rgba(28, 43, 71, 0.04)",
        "card-md": "0 4px 12px rgba(28, 43, 71, 0.10), 0 2px 4px rgba(28, 43, 71, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
