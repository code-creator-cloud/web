// src/components/layout/Footer.tsx
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gem text-foot py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gold mb-4">BLACK GEM</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Empowering investors with professional-grade trading results from us to achieve their financial goals.
            </p>
            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-gray-300 mb-3">Follow Us</h5>
              <div className="flex flex-wrap gap-3">
                {[
                  { Icon: Facebook, label: 'Facebook', url: 'https://facebook.com/blackgem' },
                  { Icon: Twitter, label: 'Twitter', url: 'https://twitter.com/blackgem' },
                  { Icon: Instagram, label: 'Instagram', url: 'https://instagram.com/blackgem' },
                  { Icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/company/blackgem' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg hover:bg-gold hover:text-gem transition-colors group"
                  >
                    <social.Icon className="w-4 h-4 text-gold group-hover:text-gem transition-colors" />
                    <span className="text-sm text-gray-400 group-hover:text-gem transition-colors">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Options</h4>
            <ul className="space-y-2 text-gray-400">
              {['FOMC Trades', 'CPI Trades', 'NFP Trades', 'PPI Trades'].map((item, index) => (
                <li key={index} className="hover:text-gold transition-colors cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              {['Learning Center', 'Market Analysis', 'Research Tools', 'Live Meetings', 'Blog', 'Help Center'].map((item, index) => (
                <li key={index} className="hover:text-gold transition-colors cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-gold" />
                <span>+237 679-205-413</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-gold" />
                <span>support@blackgem.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-gold mt-1" />
                <span>Checkpoint Street<br />Buea, Cameroon</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {currentYear} BLACK GEM from Valerie Stanley. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              {['Privacy Policy', 'Terms of Service', 'Security', 'Disclosures', 'Compliance'].map((item, index) => (
                <span key={index} className="hover:text-accent transition-colors cursor-pointer">
                  {item}
                </span>
              ))}
            </div>
          </div>
          
          <p className="text-gray-500 text-sm mt-6">
            Brokerage products and services are offered by an external Company. Member BLACK GEM.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer