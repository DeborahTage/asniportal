import { HeroSection } from '@/components/sections/HeroSection'
import { MissionStrip } from '@/components/sections/MissionStrip'
import { AboutSection } from '@/components/sections/AboutSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { AwarenessSection } from '@/components/sections/AwarenessSection'
import { NewsSection } from '@/components/sections/NewsSection'
import { DocumentsSection } from '@/components/sections/DocumentsSection'
import { IncidentCTASection } from '@/components/sections/IncidentCTASection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'INSA — Securing Ethiopia\'s Digital Future',
  description: 'Information Network Security Administration — Ethiopia\'s national authority for cybersecurity, information security, and digital sovereignty.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionStrip />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <AwarenessSection />
      <NewsSection />
      <DocumentsSection />
      <IncidentCTASection />
    </>
  )
}
