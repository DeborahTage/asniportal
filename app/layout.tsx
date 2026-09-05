import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { TopBar } from '@/components/navigation/TopBar'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: 'INSA — Information Network Security Administration',
    template: '%s | INSA Ethiopia',
  },
  description: 'Information Network Security Administration (INSA) — Ethiopia\'s national institution for cybersecurity, information security, and digital sovereignty.',
  keywords: ['INSA', 'Ethiopia', 'cybersecurity', 'information security', 'digital sovereignty', 'EthioCERT'],
  authors: [{ name: 'INSA Ethiopia' }],
  openGraph: {
    type: 'website',
    locale: 'en_ET',
    url: 'https://www.insa.gov.et',
    siteName: 'INSA Ethiopia',
    title: 'INSA — Information Network Security Administration',
    description: 'Ethiopia\'s national institution for cybersecurity, information security, and digital sovereignty.',
  },
  metadataBase: new URL('https://www.insa.gov.et'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <TopBar />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
