import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { useState } from "react"

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How do I qualify for the $1,000 bonus?",
      answer: [
        "We are sorry, this bonus is not available for the moment but we will surely notify our users once the time arrives"
      ]
    },
    {
      question: "Are there any commission fees?",
      answer: [
        "Yes, there is a 10% commision on every options you take. That is what keeps this platform running",
        "Certain transactions, such as deposit and withdrawal using crypto option, may incur additional fees blockchain fees.",
        "Always review the fee schedule for specific transactions to understand any applicable costs."
      ]
    },
    {
      question: "Is my ROI assured?",
      answer: [
        "Yes, your returns on investments are assured. This platform deals with professional traders with at least three years of experience.",
        "Be rest assured that there maybe some inconveniences such as suspense in transction in broker. But these issues will be solved by BLACK GEM officials and you'll get you refund.",
        "Investment returns are subject to market risks and are not covered by BLACK GEM Officials"
      ]
    },
    {
      question: "Can I open multiple accounts?",
      answer: [
        "Yes, we encourage you open multiple accounts to maximize profits made from trading options.",
        "In as much as profits will be maximized using multiple accounts, things may go the other way aswell. Not a finacial advice.",
        "There are no limits on the number of accounts you can open, provided they are all active."
      ]
    },
    {
      question: "What is the minimum deposit required?",
      answer: [
        "Minimum deposit ranges from $10-$20. The more the platform improves, the higher the minimum deposits",
        "Certain promotional offers, like the $1,000 bonus, may require specific funding thresholds to qualify.",
        "Always check the terms of any promotional offer for specific deposit requirements."
      ]
    },
    {
      question: "How do I contact customer support?",
      answer: [
        "Our customer support is available 24/7 via phone, email, or live chat, with a comprehensive help center for self-service options.",
        "Consistently active accounts receive priority support, ensuring faster response times for urgent inquiries.",
        "You can also connect with us through our social media channels for quick updates and assistance."
      ]
    }
  ]

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section className="py-24 px-6 bg-gem">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <HelpCircle className="w-10 h-10 text-gold mr-4" />
            <h2 className="text-5xl font-extrabold text-gold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Explore answers to the most common questions about our services, options, and more.
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              viewport={{ once: true }}
              className="border-none rounded-2xl shadow-sm bg-gem hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-5 text-left flex items-center justify-between bg-gold hover:bg-gold-50 transition-colors duration-200 rounded-t-2xl"
              >
                <span className="text-xl font-semibold text-bin">
                  {`${index + 1}. ${faq.question}`}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-bin transition-transform duration-300 ${
                    expandedIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 py-6 bg-gold rounded-b-2xl">
                      {faq.answer.map((ans, ansIndex) => (
                        <p key={ansIndex} className="text-bin leading-relaxed mb-3 flex items-start">
                          <span className="font-medium text-gem mr-2">{String.fromCharCode(97 + ansIndex)}.</span>
                          {ans}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection