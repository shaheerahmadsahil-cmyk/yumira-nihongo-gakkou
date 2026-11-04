import type { Config } from "tailwindcss";

const config: Config = {
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
        washi: {
          50: "#FCFBF9",
          100: "#F9F6F0",
          200: "#F3EDE2",
          300: "#E8DEC8",
        },
        japanRed: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
        navy: {
          800: "#1E293B",
          900: "#0F172A",
          950: "#0B1120",
        },
        sumi: {
          800: "#27272A",
          900: "#18181B",
          950: "#09090B",
        },
        sakura: {
          50: "#FFF5F7",
          100: "#FFE4E9",
          200: "#FFCCD7",
          300: "#FFA8BB",
          400: "#FB7185",
          500: "#F43F5E",
        },
        kin: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        japanese: ["var(--font-noto-sans-jp)", "'Hiragino Kaku Gothic ProN'", "'Yu Gothic'", "sans-serif"],
        bengali: ["var(--font-noto-sans-bengali)", "'Hind Siliguri'", "'SolaimanLipi'", "sans-serif"],
      },
      backgroundImage: {
        'seigaiha-pattern': "radial-gradient(circle at 100% 150%, #f1e9dd 24%, #fcfbf9 25%, #fcfbf9 28%, #f1e9dd 29%, #f1e9dd 36%, #fcfbf9 37%, #fcfbf9 40%, #f1e9dd 41%, #f1e9dd 48%, #fcfbf9 49%)",
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'petal-fall': 'petalFall 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        petalFall: {
          '0%': { transform: 'translate(0, -10px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translate(100px, 100vh) rotate(360deg)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
