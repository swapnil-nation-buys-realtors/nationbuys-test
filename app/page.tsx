import HeroSlider          from '@/components/HeroSlider'
import StatsSection        from '@/components/StatsSection'
import ServicesSection     from '@/components/ServicesSection'
import WhyChooseUs         from '@/components/WhyChooseUs'
import TestimonialsSection from '@/components/TestimonialsSection'
import LetsTalkSection     from '@/components/LetsTalkSection'
import { Metadata }        from 'next'

export const metadata: Metadata = {
  title: 'Nation Buys Realtors | Best Realtors in India & Mumbai',
  description: 'Nation Buys Realtors is the best real estate advisory firm in India. We specialize in prime lands and pre-leased commercial yields in Mumbai, Pune, Goa, and Dubai.',
}

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <LetsTalkSection />
    </>
  )
}