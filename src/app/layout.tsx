import "./globals.css";
import type { Viewport, Metadata } from "next";
import { cn } from "@/lib/utils";
import { IRANYekan } from "../fonts/local-fonts";
import dynamic from "next/dynamic";
const SimpleTrackX = dynamic(() => import("@/simpleTrackX/SimpleTrackX"), {
  ssr: false,
});
const ThemeProvider = dynamic(
  () => import("@/components/layout/ThemeProvider"),
  { ssr: false }
);

const METADATA_CONSTS = {
  title: "دیجی‌کالا",
  description:
    "هر آنچه که نیاز دارید با بهترین قیمت از دیجی‌کالا بخرید! جدیدترین انواع گوشی موبایل، لپ تاپ، لباس، لوازم آرایشی و بهداشتی، کتاب، لوازم خانگی، خودرو و... با امکان تعویض و مرجوعی آسان | ✓ارسال رايگان ✓پرداخت در محل ✓ضمانت بازگشت کالا - برای خرید کلیک کنید!",
  domain:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://about.digikala.com",
  basePath: "/template/",
  toBeIndexed: false,
  siteName: "دیجی‌کالا",
  locale: "fa_IR",
  type: "website",
};

export const metadata: Metadata = {
  title: {
    default: METADATA_CONSTS.title,
    template: `%s | ${METADATA_CONSTS.title}`,
  },
  description: METADATA_CONSTS.description,
  metadataBase: new URL(METADATA_CONSTS.domain),
  applicationName: METADATA_CONSTS.siteName,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: METADATA_CONSTS.title,
  },
  formatDetection: {
    telephone: true,
  },
  robots: {
    index: METADATA_CONSTS.toBeIndexed,
    follow: METADATA_CONSTS.toBeIndexed,
    nocache: false,
    googleBot: {
      index: METADATA_CONSTS.toBeIndexed,
      follow: METADATA_CONSTS.toBeIndexed,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "--background",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className="size-full bg-background">
      <body
        className={cn(
          IRANYekan.className,
          "relative min-size-full antialiased"
        )}
      >
        <SimpleTrackX />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
