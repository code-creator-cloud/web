// src/pages/Home.tsx
import HeroSection from "../components/layout/HeroSection"
import Navbar from "../components/layout/Navbar"
import PromotionBanner from "../components/sections/PromotionBanner"
import FinancialPotential from "../components/sections/FinancialPotential"
import FAQSection from "../components/sections/FAQSection"
import CTASection from "../components/sections/CTASection"
import Footer from "../components/layout/Footer"

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PromotionBanner />
      <FinancialPotential />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default Home