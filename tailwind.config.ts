import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "48rem",
      },
    },
    borderRadius: {
      none: "0",
      sm: "0.15rem",
      DEFAULT: "0.6rem",
      md: "0.3rem",
      lg: "0.6rem",
      xl: "0.9rem",
      "2xl": "1.2rem",
      "3xl": "1.5rem",
      "4xl": "1.8rem",
      "5xl": "2.1rem",
      full: "9999px",
    },
    screens: {
      "2xs": "320px",
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1.3rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      md: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "2.1rem" }],
      xl: ["1.25rem", { lineHeight: "2.35rem" }],
      "2xl": ["1.5rem", { lineHeight: "2.8rem" }],
      "3xl": ["1.875rem", { lineHeight: "3.4rem" }],
      "4xl": ["2.25rem", { lineHeight: "4rem" }],
      "5xl": ["3rem", { lineHeight: "5rem" }],
      "6xl": ["3.75rem", { lineHeight: "7rem" }],
      "7xl": ["4.5rem", { lineHeight: "8.7rem" }],
      "8xl": ["6rem", { lineHeight: "10rem" }],
    },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        digikala: {
          DEFAULT: "hsl(var(--digikala))",
        },
        digiplus: {
          DEFAULT: "hsl(var(--digiplus))",
        },
        ai: {
          DEFAULT: "hsl(var(--ai))",
          middark: "hsl(var(--ai-middark))",
          midlight: "hsl(var(--ai-midlight))",
          light: "hsl(var(--ai-light))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        pong: {
          "85%, 100%": { transform: "scale(1.3)", opacity: "0" },
        },
        "background-position-spin": {
          "0%": { backgroundPosition: "top center" },
          "100%": { backgroundPosition: "bottom center" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        wiggle: "wiggle 1s ease-in-out infinite",
        pong: "pong 2s linear infinite",
        backgroundPositionSpin:
          "background-position-spin 3000ms infinite alternate",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),

    function ({
      addBase,
      addUtilities,
    }: {
      addBase: (arg0: any) => void;
      addUtilities: (arg0: any, arg1: string[]) => void;
    }) {
      addBase({
        html: {
          direction: "rtl",
          width: "100%",
          maxWidth: "100vw",
          fontSize: "8px",
          unicodeBidi: "isolate",
          "@media (min-width: 360px)": {
            fontSize: "10px",
          },
        },
        body: {
          direction: "rtl",
          width: "100%",
        },
        a: {
          textDecoration: "none",
          WebkitTapHighlightColor: "rgba(255, 255, 255, 0)",
        },
        'input[type="number"]': {
          MozAppearance: "textfield",
        },
        "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
        'input[type="search"]::-ms-clear, input[type="search"]::-ms-reveal': {
          display: "none",
          width: 0,
          height: 0,
        },
        'input[type="search"]::-webkit-search-decoration, input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-results-button, input[type="search"]::-webkit-search-results-decoration':
          {
            display: "none",
          },
      });

      addUtilities(
        {
          ".scrollbar-thin": {
            scrollbarWidth: "thin",
          },
          ".scrollbar-thumb": {
            scrollbarColor: "#bbbbc7 #eff0f2",
          },
          ".scrollbar-thumb::-webkit-scrollbar": {
            height: "10px",
            width: "8px",
            backgroundColor: "#eff0f2",
            color: "#bbbbc7",
          },
          ".scrollbar-thumb::-webkit-scrollbar-thumb": {
            background: "#bbbbc7",
            WebkitBorderRadius: "0.6rem",
          },
          ".scrollbar-thumb::-webkit-scrollbar-corner": {
            background: "#bbbbc7",
          },
          ".no-scrollbar": {
            "-ms-overflow-style": "none",
            scrollbarWidth: "none",
          },
          ".no-scrollbar::-webkit-scrollbar": {
            display: "none",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
} satisfies Config;

export default config;
