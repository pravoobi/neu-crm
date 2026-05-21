import Navbar from './sections/Navbar'
import HeroSection from './sections/HeroSection'
import FeaturesSection from './sections/FeaturesSection'
import TestimonialsSection from './sections/TestimonialsSection'
import PricingSection from './sections/PricingSection'
import CTASection from './sections/CTASection'
import Footer from './sections/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  )
}
