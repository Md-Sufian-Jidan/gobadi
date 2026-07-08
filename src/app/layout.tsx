import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Noto_Sans_Bengali, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
//   title: "Gobadi",
//   description: "AI-powered digital platform transforming the livestock ecosystem.",
//   icons: {
//     icon: "/assets/gobadi_logo.webp",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Gobadi",
//     description: "Gobadi is a animal website.",
//     images: ["/assets/gobadi_logo.webp"],
//   },
//   openGraph: {
//     title: "Gobadi",
//     description: "Gobadi is a animal website.",
//     images: ["/assets/gobadi_logo.webp"],
//   },
//   authors: [{ name: "Md Sufian Jidan" }],
//   keywords: ["gobadi", "animal", "website"],
// };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteName = "Gobadi";
const siteDescription = "Gobadi is an AI-powered digital platform connecting farmers, veterinarians, and trusted livestock service providers in one place.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — AI-Powered Livestock Platform`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "gobadi",
    "livestock platform",
    "cattle management",
    "veterinary services",
    "farmer marketplace",
    "AI livestock tracking",
  ],
  authors: [{ name: "Gobadi" }],
  creator: siteName,
  publisher: siteName,
  applicationName: siteName,
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/hero_gobadi_logo.ico",
    shortcut: "/hero_gobadi_logo.ico",
    apple: "/hero_gobadi_logo.webp",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    locale: "en_US",
    title: `${siteName} — AI-Powered Livestock Platform`,
    description: siteDescription,
    images: [
      {
        url: "/assets/gobadi_logo.webp",
        width: 1200,
        height: 630,
        alt: `${siteName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — AI-Powered Livestock Platform`,
    description: siteDescription,
    images: ["/assets/gobadi_logo.webp"],
    // creator: "@gobadi", // add once a handle exists
  },
  // verification: {
  //   google: "add-google-search-console-token",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${notoBengali.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
