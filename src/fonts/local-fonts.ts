import localFont from "next/font/local";

export const IRANYekan = localFont({
  src: [
    {
      path: "../fonts/IranYekan/iranyekan_thin.woff",
      weight: "100",
    },
    {
      path: "../fonts/IranYekan/iranyekan_light.woff2",
      weight: "300",
    },
    {
      path: "../fonts/IranYekan/iranyekan_regular.woff2",
      weight: "400",
    },
    {
      path: "../fonts/IranYekan/iranyekan_medium.woff",
      weight: "500",
    },
    {
      path: "../fonts/IranYekan/iranyekan_bold.woff2",
      weight: "700",
    },
    {
      path: "../fonts/IranYekan/iranyekan_extrabold.woff",
      weight: "800",
    },
    {
      path: "../fonts/IranYekan/iranyekan_black.woff",
      weight: "900",
    },
    {
      path: "../fonts/IranYekan/iranyekan_extrablack.woff",
      weight: "950",
    },
  ],
  variable: "--font-iranyekan",
});
