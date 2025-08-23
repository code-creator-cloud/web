// src/components/layout/HeroSection.tsx
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat pt-16"
      style={{
        backgroundImage: "url('/src/assets/images/hero_image.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/70"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Introducing the new Power E*TRADE Pro
        </h1>
        <p className="text-xl sm:text-2xl mb-10 max-w-2xl mx-auto">
          Your ultimate downloadable desktop trading platform with nearly unlimited customization, advanced charting and more.
        </p>
        
        <div className="w-24 h-1 bg-white mx-auto mb-10"></div>
        
        <Button 
          size="lg" 
          className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6 font-semibold"
          asChild
        >
          <Link to="/register">Get started</Link>
        </Button>
      </div>
    </section>
  )
}

export default HeroSection