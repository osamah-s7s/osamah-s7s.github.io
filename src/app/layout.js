import localFont from "next/font/local"
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import SeoJsonLd from "@/components/SeoJsonLd";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://osamah-alaini.vercel.app';
const siteUrl = rawSiteUrl.replace(/\/$/, '')

const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--font-poppins",
});

const bukra = localFont({
  src: [
    { path: "./fonts/29ltbukralight.ttf", weight: "300", style: "normal" },
    { path: "./fonts/29ltbukraregular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/29ltbukrabold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-bukra",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Osamah H. Alaini Portfolio',
  title: {
    default: "Osamah Portfolio - أ.م. أسامة",
    template: "%s | Osamah H. Alaini",
  },
  description: "Official portfolio of Engr. Osamah H. Alaini showcasing software engineering, AI, DevOps, research, education, experience, and contact information.",
  keywords: [
    'Osamah H. Alaini',
    'Osamah al-aini',
    'أسامه العيني',
    'أ.م. أسامة',
    'Osamah Hussein Alaini',
    'software engineering',
    'AI',
    'DevOps',
    'full-stack development',
    'machine learning',
    'NLP',
    'computer vision',
    'researcher',
    'portfolio'
  ],
  authors: [{ name: 'Osamah H. Alaini', url: siteUrl }],
  creator: 'Osamah H. Alaini',
  publisher: 'Osamah H. Alaini',
  icons: {
    icon: '/Osamah.jpg'
  },
  openGraph: {
    title: 'Osamah Portfolio - ملف أسامة حسين العيني',
    description: 'Official portfolio of Engr. Osamah H. Alaini covering software engineering, AI, DevOps, research, and professional contact details.',
    url: siteUrl,
    siteName: 'Osamah H. Alaini',
    images: [
      {
        url: `${siteUrl}/Osamah.jpg`,
        width: 1200,
        height: 1200,
        alt: 'Osamah H. Alaini'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Osamah Portfolio - Osamah H. Alaini',
    description: 'Official portfolio of Engr. Osamah H. Alaini covering software engineering, AI, DevOps, research, and contact details.',
    images: [`${siteUrl}/Osamah.jpg`]
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en': siteUrl,
      'ar': `${siteUrl}/?lang=ar`
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/`} />
        <link rel="alternate" hrefLang="ar" href={`${siteUrl}/?lang=ar`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />
      </head>
      <body
        className={`${poppins.variable} ${bukra.variable} antialiased bg-background text-heading`}
      >
        <SeoJsonLd />
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
