import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const GTWalsheimPro = localFont({
  src: [
    {
      path: "./GTWalsheimPro-Thin.ttf",
      weight: "200",
    },
    {
      path: "./GTWalsheimPro-ThinOblique.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./GTWalsheimPro-Light.ttf",
      weight: "300",
    },
    {
      path: "./GTWalsheimPro-LightOblique.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./GTWalsheimPro-Regular.ttf",
      weight: "400",
    },
    {
      path: "./GTWalsheimPro-RegularOblique.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./GTWalsheimPro-Medium.ttf",
      weight: "500",
    },
    {
      path: "./GTWalsheimPro-MediumOblique.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./GTWalsheimPro-Bold.ttf",
      weight: "700",
    },
    {
      path: "./GTWalsheimPro-BoldOblique.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./GTWalsheimPro-Black.ttf",
      weight: "900",
    },
    {
      path: "./GTWalsheimPro-BlackOblique.ttf",
      weight: "900",
      style: "italic",
    },
  ],
});
