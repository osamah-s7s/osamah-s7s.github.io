import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Osamah.dev - Full-Stack Developer & AI Engineer',
  description: 'Hi, I\'m Osamah Hussein, an experienced Full-Stack Developer and AI Engineer in Lahore, Pakistan. I design and deliver scalable web and mobile applications, combining robust backend logic with an engaging user experience.',
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


