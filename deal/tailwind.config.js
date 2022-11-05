/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: colors.white,
      gray: {
        10: "rgba(0, 0, 0, 0.4)",
        20: "#FEFEFE",
        22: "#EDEDED",
        24: "#C2C2C2",
        25: "#444343",
        30: "#333333",
        35: "#302E2E",
        40: "#373B46",
        45: "#5C5959",
        50: "#B0B0B0",
        100: "#999999",
        120: "#928D8D",
        150: "#8E8B8B",
        200: "#747474",
        220: "#6F6969",
        250: "#5B5858",
        300: "#474747",
        400: "#353535",
        500: "#323232",
        520: "#2F2F2F",
        550: "#2C2C2C",
        600: "#272727",
        "modal-bg": "rgb(39, 49, 56)",
        "modal-main": "rgb(199, 199, 199)",
        "modal-secondary": "rgb(136, 136, 136)",
        "modal-border": "rgba(195, 195, 195, 0.14)",
        "modal-hover": "rgb(16, 26, 32)"
      },
      indigo: colors.indigo,
      red: colors.red,
      yellow: colors.yellow,
      green: colors.green,
      pink: colors.pink,
      purple: colors.purple,
      blue: { ...colors.blue, 300: "#6C66E9" },
      orange: {
        ...colors.orange,
        400: "#FF4F00",
        450: "#F8C110"
      },
      black: colors.black
    },
    screens: {
      xs: "475px",
      "8xl": "90rem",
      "9xl": "108rem",
      ...defaultTheme.screens
    },
    extend: {
      backgroundImage: {
        "home-bg": "url('/src/assets/homeBg.svg')"
      }
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      room: "0 4px 10px 0 rgba(175, 175, 175, 0.1)",
      button: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
      none: "none"
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem"
    }
  },
  variants: {
    extend: {
      backgroundColor: ["checked", "active", "hover"],
      borderColor: ["checked"]
    }
  },
  plugins: []
};
