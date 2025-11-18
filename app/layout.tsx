import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Osamah.dev - Full-Stack Developer & AI Engineer',
  description: 'Hi, I\'m Osamah Hussein, an experienced Full-Stack Developer and AI Engineer in Lahore, Pakistan. I design and deliver scalable web and mobile applications, combining robust backend logic with an engaging user experience.',
  metadataBase: new URL('https://osamah-s7s.github.io'),
  openGraph: {
    title: 'Osamah Hussein - Full-Stack Developer & AI Engineer',
    description: 'Hi, I\'m Osamah Hussein, an experienced Full-Stack Developer and AI Engineer in Lahore, Pakistan. I design and deliver scalable web and mobile applications, combining robust backend logic with an engaging user experience.',
    url: 'https://osamah-s7s.github.io/',
    siteName: 'Osamah.dev',
    images: [
      {
        url: 'https://osamah-s7s.github.io/profile-osos.webp',
        width: 1200,
        height: 630,
        alt: 'Osamah Hussein - Full-Stack Developer & AI Engineer',
        type: 'image/webp',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Osamah Hussein - Full-Stack Developer & AI Engineer',
    description: 'Hi, I\'m Osamah Hussein, an experienced Full-Stack Developer and AI Engineer in Lahore, Pakistan. I design and deliver scalable web and mobile applications, combining robust backend logic with an engaging user experience.',
    images: ['https://osamah-s7s.github.io/profile-osos.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}


