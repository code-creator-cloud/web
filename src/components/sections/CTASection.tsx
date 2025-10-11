// src/components/sections/CTASection.tsx
import { Button } from "../ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Shield, Clock, Users, Star, ChevronRight } from "lucide-react"

const CTASection = () => {
  return (
    <section className="py-16 px-4 bg-gem overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#FF6B35]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#241151]/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#FF6B35]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-white "
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gold/20 backdrop-blur-sm rounded-full px-5 py-2 mb-8 border border-none"
          >
            <Star className="w-4 h-4 text-gold mr-2 fill-current" />
            <span className="text-sm font-medium">Rated 4.8/5 by 100+ investors</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Start Your <span className="text-gold">Financial Journey </span>?
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of investors who trust us with their financial future. 
            Get started today and experience the difference of professional-grade trading results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Shield,
                title: "Secure & Protected",
                description: "Secured deposits and withdrawal methods",
                color: "from-[#241151] to-[#2d1a5c]"
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock customer service and support",
                color: "from-[#241151] to-[#2d1a5c]"
              },
              {
                icon: Users,
                title: "Community",
                description: "Join 1k+ investors in our growing community",
                color: "from-[#241151] to-[#2d1a5c]"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className={`w-20 h-20 bg-gold  ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 border-none shadow-lg`}>
                  <item.icon className="w-8 h-8 text-gem" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-white/80 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10">
            <Button 
              size="lg" 
              className="bg-gold text-gem hover:bg-gold px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-hover/25 transition-all duration-300 group"
            >
              
              Open an Account
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-none bg-gold text-gem hover:bg-gold hover:text-gem px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm shadow-lg hover:shadow-hover/25 transition-all duration-300 group"
            >
              Schedule a Consultation
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="bg-gold/50 backdrop-blur-sm rounded-2xl p-6  border-none max-w-2xl mx-auto">
            <ul className="flex flex-col sm:flex-row justify-center gap-6 text-white/80 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                Maximize profits 
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                  10% commission
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                Start with as little as $10
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection