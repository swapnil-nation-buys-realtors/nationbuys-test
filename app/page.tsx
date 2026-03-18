import HeroSlider          from '@/components/HeroSlider'
import StatsSection        from '@/components/StatsSection'
import ServicesSection     from '@/components/ServicesSection'
import WhyChooseUs         from '@/components/WhyChooseUs'
import TestimonialsSection from '@/components/TestimonialsSection'
import LetsTalkSection     from '@/components/LetsTalkSection'

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