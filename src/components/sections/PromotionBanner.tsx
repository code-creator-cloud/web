import { Button } from "../ui/button"
import { motion } from "framer-motion"
import { Gift, Clock, ArrowRight, Sparkles } from "lucide-react"

const PromotionBanner = () => {
  return (
    <div className="ml-8 mt-8 mr-8">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-16 rounded-3xl shadow-2xl">
        {/* Background decorative elements */}
        <div className="absolute inset-0 rounded-3xl">
          <div className="absolute top-8 left-8 w-48 h-48 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-8 right-8 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-3xl"></div>
        </div>

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
              <div className="inline-flex items-center bg-gradient-to-r from-accent/20 to-accent/30 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-accent/30">
                <Sparkles className="w-5 h-5 text-accent mr-2 animate-pulse" />
                <span className="text-white font-semibold text-sm tracking-wide">EXCLUSIVE WELCOME BONUS</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Start with up to
                <span className="block text-accent bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">$1,000 Bonus</span>
              </h1>

              <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-lg">
                Take the first step towards your financial future. Open and fund your new brokerage account today and unlock exclusive benefits.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-accent/50 hover:border-accent"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 bg-primary border-white/30 text-white hover:bg-white/15 hover:border-white/50 backdrop-blur-sm px-8 py-4 rounded-full font-semibold transition-all duration-300"
                >
                  View Details
                </Button>
              </div>

              <div className="flex items-center text-white/70 text-sm bg-black/20 rounded-full px-4 py-2 backdrop-blur-sm inline-flex">
                <Clock className="w-4 h-4 mr-2 animate-pulse" />
                <span>Offer expires October 31, 2025</span>
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
              <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/30 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-accent/30">
                    <Gift className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">How to Qualify</h3>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1 flex-shrink-0 shadow-lg">1</div>
                    <div>
                      <p className="text-white font-semibold mb-1">Open Account</p>
                      <p className="text-white/80 text-sm">Create your new brokerage account online in minutes</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1 flex-shrink-0 shadow-lg">2</div>
                    <div>
                      <p className="text-white font-semibold mb-1">Fund Account</p>
                      <p className="text-white/80 text-sm">Make a qualifying deposit of $1,000 or more</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1 flex-shrink-0 shadow-lg">3</div>
                    <div>
                      <p className="text-white font-semibold mb-1">Get Bonus</p>
                      <p className="text-white/80 text-sm">Receive your welcome bonus within 30 days</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-5 bg-gradient-to-br from-accent/20 to-accent/30 rounded-2xl border border-accent/40 backdrop-blur-sm">
                  <div className="text-center">
                    <p className="text-white/90 text-sm mb-3 font-medium">Use promotional code</p>
                    <div className="bg-white/25 rounded-xl px-6 py-3 inline-block border border-white/30 backdrop-blur-sm">
                      <code className="text-accent font-mono font-bold text-xl tracking-wider">WELCOME25</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements with improved animations */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-accent/40 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white/30 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-4 right-12 w-2 h-2 bg-accent/60 rounded-full animate-ping delay-500"></div>
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
              Securities products are offered through E*TRADE Securities LLC, Member FINRA/SIPC. 
              See full terms and conditions for complete details.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default PromotionBanner