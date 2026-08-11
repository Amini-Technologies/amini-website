import type { Config } from "tailwindcss";

/**
 * Amini design system — Tailwind binding.
 *
 * Colours resolve to the semantic roles in src/styles/theme.css, so every
 * utility automatically flips inside a `data-theme="dark"` / `.surface-dark`
 * section. See DESIGN.md for the rules that govern how these are used.
 */

const role = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Surfaces */
        canvas: {
          1: role("canvas-1"),
          2: role("canvas-2"),
          3: role("canvas-3"),
          tint: role("canvas-tint"),
        },
        /* Text */
        ink: {
          1: role("ink-1"),
          2: role("ink-2"),
          3: role("ink-3"),
        },
        /* Brand accent — the Amini primary only */
        accent: {
          1: role("accent-1"),
          2: role("accent-2"),
          hover: role("accent-hover"),
          surface: role("accent-surface"),
          panel: role("accent-panel"),
          on: role("on-accent"),
        },
        /* Hairlines */
        line: {
          1: role("line-1"),
          2: role("line-2"),
          3: role("line-3"),
        },
        /* State — never for branding */
        state: {
          ok: role("state-ok"),
          warn: role("state-warn"),
          err: role("state-err"),
          "ok-surface": role("state-ok-surface"),
          "warn-surface": role("state-warn-surface"),
          "err-surface": role("state-err-surface"),
        },

        background: "var(--background)",
        foreground: "var(--foreground)",

        /**
         * Brand ramp. Kept under `primary` so the not-yet-migrated admin
         * surface keeps rendering. New work uses accent-1 / accent-2.
         */
        primary: {
          50: "#edfaf9",
          100: "#d0f5f3",
          200: "#a3ebe8",
          300: "#6edbd6",
          400: "#3abfba",
          500: "#1e9e99",
          550: "#0d7671",
          600: "#02534D",
          700: "#014742",
          800: "#013b36",
          900: "#012f2b",
          950: "#011917",
        },
      },

      fontFamily: {
        display: ["var(--font-readex)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-readex)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        /* Wordmark + numerals only — see DESIGN.md. */
        wordmark: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },

      /* Three scales, fixed steps. Nothing in between. */
      fontSize: {
        "display-xs": ["2rem", { lineHeight: "1.15", letterSpacing: "-0.018em" }],
        "display-sm": ["2.5rem", { lineHeight: "1.12", letterSpacing: "-0.020em" }],
        "display-md": ["3rem", { lineHeight: "1.08", letterSpacing: "-0.022em" }],
        "display-lg": ["4rem", { lineHeight: "1.05", letterSpacing: "-0.024em" }],
        "display-xl": ["5rem", { lineHeight: "1.02", letterSpacing: "-0.028em" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.65" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "mono-sm": ["0.75rem", { lineHeight: "1.5" }],
        "mono-md": ["0.875rem", { lineHeight: "1.5" }],
      },

      /**
       * Five radii. `2xl`/`3xl` are deprecated aliases that collapse legacy
       * markup onto `xl` rather than leaving it unstyled — do not use them.
       */
      borderRadius: {
        DEFAULT: "var(--radius-sm)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-xl)",
        "3xl": "var(--radius-xl)",
        full: "var(--radius-full)",
      },

      boxShadow: {
        "elevation-1": "var(--elevation-1)",
        "elevation-2": "var(--elevation-2)",
        "elevation-3": "var(--elevation-3)",
        "elevation-inset": "var(--elevation-inset)",
      },

      transitionTimingFunction: {
        standard: "var(--ease-standard)",
        out: "var(--ease-out)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "220ms",
        slow: "400ms",
      },

      animation: {
        "fade-in": "fadeIn var(--duration-slow) var(--ease-out) both",
        "slide-up": "slideUp var(--duration-slow) var(--ease-out) both",
        /* Tickers. Each track renders its content twice, so -50% loops seamlessly. */
        marquee: "marquee 46s linear infinite",
        "marquee-reverse": "marquee 52s linear infinite reverse",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
