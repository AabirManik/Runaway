import CalendarMedia from '../components/landing/CalendarMedia'
import Faq from '../components/landing/Faq'
import FeatureGrid from '../components/landing/FeatureGrid'
import FinalCta from '../components/landing/FinalCta'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import Integrations from '../components/landing/Integrations'
import SiteFooter from '../components/landing/SiteFooter'
import SiteNav from '../components/landing/SiteNav'

/**
 * The complete public landing page — Phase 1.
 * Section order follows the approved references:
 * hero → how it works/features → integrations → calendar/media → CTA/FAQ → footer
 */
export default function LandingPage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <SiteNav />

      {/* tabIndex -1 so the skip link can actually move focus here —
          a fragment target only receives focus if it is focusable */}
      <main id="main" tabIndex={-1}>
        <Hero />
        <HowItWorks />
        <FeatureGrid />
        <Integrations />
        <CalendarMedia />
        <FinalCta />
        <Faq />
      </main>

      <SiteFooter />
    </>
  )
}
