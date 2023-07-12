/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: {
        "purple-100": "#E4E0FF",
        "purple-200": "#C9C1FF",
        "purple-300": "#AEA2FF",
        "purple-400": "#9383FF",
        "purple-500": "#7864FF",
        "purple-600": "#6050CC",
        "purple-700": "#483C99",
        "purple-800": "#302866",
        "purple-900": "#181433",
      },
      secondary: {
        "green-100": "#E8FEF4",
        "green-200": "#D1FDE9",
        "green-300": "#BAFCDE",
        "green-400": "#A3FBD3",
        "green-500": "#8CFAC8",
        "green-600": "#70C8A0",
        "green-700": "#549678",
        "green-800": "#386450",
        "green-900": "#1C3228",
      },
      accent: {
        100: "#DCFBDD",
        200: "#201F52",
        300: "#0E0E18",
        400: "#24093F",
        500: "#868686",
        600: "#CFE7FC",
        700: "#C099FF",
        800: "#FFC866",
        900: "#3B2E70",
      },
      grey: {
        50: "#F9FAFB",
        100: "#FFFFFF",
        200: "#F0F0F0",
        300: "#E0E0E0",
        400: "#D1D1D1",
        500: "#C2C2C2",
        600: "#B3B3B3",
        700: "#A4A4A4",
        800: "#959595",
        900: "#858585",
        1000: "#000000",
      },
      neutral: {
        100: "#F8F9FA",
      },
      bgColour: {
        "variant-1": "#FFFFFF",
        "variant-2": "#F9FBFC",
        "variant-3": "#212121",
      },
      star: {
        default: "#FFE500AB",
      },
      success: { main: "#36B37E", dark: "#206B4C" },
      info: { main: "#0072DA", dark: "#004483", light: "#CCE3F8" },
      warning: { main: "#FFAB00", dark: "#996700", light: "#FFEECC" },
      Text: {
        "high-emphasis": "#18181B",
        "meduim-emphasis": "#949396",
        "low-emphasis": "#BDBDBD",
      },
      "border-colour-light": "#E4E4E7",
    },
    extend: {
      fontFamily: {
        inter: ["var(--inter-font)", ...fontFamily.sans],
        GTWalsheimPro: ["var(--GTWalsheimPro-font)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
