/** @type {import('tailwindcss').Config} */

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
      grey: {
        "grey-100": "#FFFFFF",
        "grey-200": "#F0F0F0",
        "grey-300": "#E0E0E0",
        "grey-400": "#D1D1D1",
        "grey-500": "#C2C2C2",
        "grey-600": "#B3B3B3",
        "grey-700": "#A4A4A4",
        "grey-800": "#959595",
        "grey-900": "#858585",
        "grey-1000": "#000000",
      },
      bgColour: {
        "variant-1": "#FFFFFF",
        "variant-2": "#F9FBFC",
        "variant-3": "#212121",
      },
      success: { main: "#36B37E", dark: "#206B4C" },
      info: { main: "#0072DA", dark: "#004483", light: "#CCE3F8" },
      warning: { main: "#FFAB00", dark: "#996700", light: "#FFEECC" },
      Text: {
        "high-emphasis": "#18181B",
        "meduim-emphasis": "#949396",
        "low-emphasis": "#BDBDBD",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  // variants:{
  //   fill:[]
  // }
};
