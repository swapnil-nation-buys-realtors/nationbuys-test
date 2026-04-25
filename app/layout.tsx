import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'


export const metadata: Metadata = {
  title: {
    template: '%s | Nation Buys Realtors',
    default: 'Nation Buys Realtors | Best Realtors in India & Dubai',
  },
  description: 'Elevate Ambitions with NBR: Expert facilitation of prime land transactions and pre-leased commercial portfolios across Pune, Mumbai, Goa and Dubai. Best Realtors in India.',
  keywords: ['Nation Buys Realtors', 'Realtors in Mumbai', 'Best Realtors in India', 'Prime Lands', 'Pre-Leased Yields', 'Commercial Real Estate', 'Pune Realtors', 'Dubai Real Estate Advisory'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="/open-graph-image.jpeg" />
        <meta property="og:title" content="Nation Buys Realtor | Prime Lands & Pre-Leased Yields" />
        <meta property="og:description" content="Elevate Ambitions with NBR: Expert facilitation of prime land transactions and pre-leased commercial portfolios across Pune, Mumbai, Goa and Dubai." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
