// src/components/sections/PromotionBanner.tsx
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const PromotionBanner = () => {
  return (
    <section className="bg-gradient-to-r from-[#241151] to-[#3A2A72] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Get up to $1,000 for a limited time<span className="text-xs align-super">¹</span>
        </h2>
        
        <p className="text-lg mb-6 max-w-3xl mx-auto">
          Open and fund a new brokerage account with a qualifying deposit by October 31, 2025. Learn how
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 inline-block">
          <p className="text-sm font-semibold">Terms apply. Use promo code:</p>
          <p className="text-xl font-bold text-[#FF6B35]">OFFER25</p>
        </div>
        
        <div className="mt-6">
          <Button 
            size="lg" 
            className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 text-lg px-8 py-6 font-semibold rounded-full"
            asChild
          >
            <Link to="/register">Open an account</Link>
          </Button>
        </div>
        
        <p className="text-xs mt-6 opacity-80">
          <sup>¹</sup>Terms and conditions apply. See official offer details for more information.
        </p>
      </div>
    </section>
  )
}

export default PromotionBanner