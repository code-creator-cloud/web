import { Button } from "../ui/button"
import { motion } from "framer-motion"
import { Gift, Clock, ArrowRight, Sparkles } from "lucide-react"

const PromotionBanner = () => {
  return (
    <div className="bg-gem p-10">
      <div className="ml-0 mt-8 mr-0 sm:ml-8 sm:mt-8 sm:mr-8  ">
        <section className="relative overflow-hidden bg-lighter  py-16 rounded-3xl shadow-3xl">
          {/*  */}
          <div className="relative z-10 max-w-6xl mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              
              {/* Left side - Main content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-left"
              >
                <div className="inline-flex items-center bg-gradient-to-r from-gold/30 to-gold/50 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border-none">
                  <Sparkles className="w-5 h-5 text-hover mr-2 animate-pulse" />
                  <span className="text-white/80 font-semibold text-sm tracking-wide">EXCLUSIVE WELCOME BONUS</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Start with up to
                  <span className="block text-accent bg-gradient-to-r from-gold to-gold/80 bg-clip-text text-transparent">$1,000 Bonus</span>
                </h1>

                <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-lg">
                  Take the first step towards your financial future. Open and fund your new investment account today and unlock exclusive benefits.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="bg-gold hover:bg-hover/90 text-bin font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group border-none"
                  >
                    Get Started Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 bg-bin border-none text-white hover:bg-white/15 backdrop-blur-sm px-8 py-4 rounded-full font-semibold transition-all duration-300"
                  >
                    View Details
                  </Button>
                </div>

                <div className="flex items-center text-white/70 text-sm bg-black/20 rounded-full px-4 py-2 backdrop-blur-sm inline-flex">
                  <Clock className="w-4 h-4 mr-2 animate-pulse" />
                  <span>Offer not available for now</span>
                </div>
              </motion.div>

              {/* Right side - Promo card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border-none shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/30 rounded-2xl flex items-center justify-center mx-auto mb-4 border-none">
                      <Gift className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="text-2xl font-bold text-gold mb-2">How to Qualify</h3>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center text-bin font-bold text-sm mr-4 mt-1 flex-shrink-0 shadow-lg">1</div>
                      <div>
                        <p className="text-white font-semibold mb-1">Open Account</p>
                        <p className="text-white/80 text-sm">Create your new investment account online in minutes</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center text-bin font-bold text-sm mr-4 mt-1 flex-shrink-0 shadow-lg">2</div>
                      <div>
                        <p className="text-white font-semibold mb-1">Fund Account</p>
                        <p className="text-white/80 text-sm">Make a qualifying deposit of $1,000 or more</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center text-bin font-bold text-sm mr-4 mt-1 flex-shrink-0 shadow-lg">3</div>
                      <div>
                        <p className="text-white font-semibold mb-1">Get Bonus</p>
                        <p className="text-white/80 text-sm">Receive your welcome bonus when available</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-5 bg-gradient-to-br from-gold/40 to-gold/50 rounded-2xl border border-none backdrop-blur-sm">
                    <div className="text-center">
                      <p className="text-bin/90 text-sm mb-3 font-medium">Use promo code</p>
                      <div className="bg-white/25 rounded-xl px-6 py-3 inline-block border border-none backdrop-blur-sm">
                        <code className="text-bin font-mono font-bold text-xl tracking-wider">######</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements with improved animations */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-gold/40 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white/30 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-4 right-12 w-2 h-2 bg-gold/60 rounded-full animate-ping delay-500"></div>
              </motion.div>
            </div>

            {/* Bottom disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-14 pt-8 border-t border-white/20"
            >
              <p className="text-white/60 text-sm max-w-4xl mx-auto leading-relaxed">
                *Welcome bonus subject to terms and conditions. New accounts only. Minimum deposit requirements apply. 
                Securities products are offered through BLACK GEM community, Member BLACK GEM. 
                See full terms and conditions for complete details.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>  
  )
}

export default PromotionBanner