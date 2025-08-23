// src/pages/Home.tsx
import HeroSection from "../components/layout/HeroSection"
import Navbar from "../components/layout/Navbar"
import FinancialPotential from "../components/sections/FinancialPotential"
import PromotionBanner from "../components/sections/PromotionBanner"

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PromotionBanner />
      <FinancialPotential />
    </div>
  )
}

export default Home