import ContactHero from '@/components/contacthero'
import ProcessSection      from '@/components/ProcessSection'      // NEW — Section 5
import ScheduleVisit       from '@/components/ScheduleVisit'       // NEW — Section 6
import FAQSection          from '@/components/FAQSection'           // NEW — Section 8
import LeadGenSection      from '@/components/LeadGenSection'       // NEW — Section 9

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