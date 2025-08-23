// src/components/layout/HeroSection.tsx
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('/images/hero_image.jpg')",
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-transparent z-1"></div>
      
      {/* Diagonal Separator */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 z-2">
        <div className="relative w-full h-full">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-primary/20 clip-path-diagonal"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Introducing the new <span className="text-accent">Power E*TRADE Pro</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl mb-10 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Your ultimate downloadable desktop trading platform with nearly unlimited customization, advanced charting and more.
            </motion.p>
            
            {/* Decorative Diagonal Line */}
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-accent to-transparent mb-10 transform -skew-x-45"
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <Button 
                size="lg" 
                className="bg-accent text-white hover:bg-accent/90 text-lg px-8 py-6 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                asChild
              >
                <Link to="/register">Get started</Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right Side - Visual Element */}
          <motion.div 
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Abstract Graphic */}
              <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">Advanced Tools</h3>
                  <p className="text-white/80">Professional-grade trading platform</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-6 -left-6 w-14 h-14 bg-accent/30 rounded-full backdrop-blur-sm border border-white/20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-8 -right-8 w-20 h-20 bg-primary/40 rounded-full backdrop-blur-sm border border-white/20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom CSS for diagonal clip */}
      <style>{`
        .clip-path-diagonal {
          clip-path: polygon(0 0, 100% 0, 0 100%);
        }
      `}</style>
    </section>
  )
}

export default HeroSection