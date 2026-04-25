import ContactHero from '@/components/contacthero'
import ProcessSection      from '@/components/ProcessSection'      // NEW — Section 5
import ScheduleVisit       from '@/components/ScheduleVisit'       // NEW — Section 6
import FAQSection          from '@/components/FAQSection'           // NEW — Section 8
import LeadGenSection      from '@/components/LeadGenSection'       // NEW — Section 9
import { Metadata }        from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Nation Buys Realtors, the best realtors in Mumbai and India, for prime land mandates and pre-leased commercial properties.',
}

export default function HomePage() {
  return (
    <>
      <ContactHero/>
      <ProcessSection />
      <ScheduleVisit />
      <FAQSection />
      <LeadGenSection />
    </>
  )
}