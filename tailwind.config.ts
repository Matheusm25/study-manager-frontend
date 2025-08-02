import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // User-provided pastel color palette and derived shades
        "pastel-cream": {
          50: "#FAF9EE", // User provided
          100: "#F8F7E9",
          200: "#F5F3E4",
          300: "#F2F0DF",
          400: "#EFECEB",
          500: "#EBE8E6",
          600: "#DCD9D4",
          700: "#C9C6C0",
          800: "#B6B3AC",
          900: "#A2AF9B", // Used as a darker shade for cream/sage
        },
        "pastel-sage": {
          50: "#F0F2EF",
          100: "#E0E3DE",
          200: "#D0D4CD",
          300: "#C0C5BC",
          400: "#B0B6AB",
          500: "#A2AF9B", // User provided (main sage color)
          600: "#929F8B",
          700: "#828F7B",
          800: "#727F6B",
          900: "#626F5B",
        },
        "pastel-beige": {
          50: "#DCCFC0", // User provided
          100: "#D0C3B4",
          200: "#C4B7A8",
          300: "#B8AB9C",
          400: "#AC9F90",
          500: "#A09384",
          600: "#948778",
          700: "#887B6C",
          800: "#7C6F60",
          900: "#706354",
        },
        "pastel-light-grey": {
          50: "#EEEEEE", // User provided
          100: "#E0E0E0",
          200: "#D0D0D0",
          300: "#C0C0C0",
          400: "#B0B0B0",
          500: "#A0A0A0",
          600: "#909090",
          700: "#808080",
          800: "#707070",
          900: "#606060",
        },
        "pastel-muted-blue": {
          50: "#F0F5F7",
          100: "#E0EAF0",
          200: "#D0DFE8",
          300: "#C0D4E0",
          400: "#B0C9D8",
          500: "#9ECAD6", // User provided (lighter blue)
          600: "#8CB8C0",
          700: "#7A8DAE", // User provided (darker blue)
          800: "#687C98",
          900: "#566B82",
        },
        "pastel-soft-pink": {
          50: "#FFF7F7",
          100: "#FFEAEA", // User provided (very light pink)
          200: "#FDDCDC",
          300: "#FBCBCB", // User provided (soft pink)
          400: "#F9BABA",
          500: "#F7A9A9",
          600: "#E09797",
          700: "#C98585",
          800: "#B27373",
          900: "#9B6161",
        },
        "pastel-lavender": {
          50: "#FCF8FF",
          100: "#F3E8FF",
          200: "#EBD6FB", // User provided
          300: "#D8C0F8",
          400: "#E0C0FB",
          500: "#A890F2",
          600: "#937EDC",
          700: "#7E6CC4",
          800: "#6B5AA9",
          900: "#58488E",
        },
        "pastel-peach": {
          50: "#FFF7F0",
          100: "#FFD6BA", // User provided
          200: "#FFC0A4",
          300: "#FFAA8E",
          400: "#FF9478",
          500: "#FF7E62",
          600: "#E06C56",
          700: "#C95A4A",
          800: "#B2483E",
          900: "#9B3632",
        },
        "text-primary": "#4A4A4A",
        "text-secondary": "#7A7A7A",
        "border-subtle": "#D0D0D0",
        "bg-surface": "#FFFFFF", // Pure white for panel backgrounds
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
