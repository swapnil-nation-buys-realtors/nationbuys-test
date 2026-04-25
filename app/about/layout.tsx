import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Nation Buys Realtors, the best realtors in India with over 17 years of experience in Mumbai, Pune, Goa, and Dubai real estate markets.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
