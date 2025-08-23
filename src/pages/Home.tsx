// src/pages/Home.tsx
import HeroSection from "../components/layout/HeroSection"
import Navbar from "../components/layout/Navbar"

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
    </div>
  )
}

export default Home