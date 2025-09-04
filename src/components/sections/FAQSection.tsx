import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { useState } from "react"

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How do I qualify for the $1,000 bonus?",
      answer: [
        "Open and fund a new brokerage account with a qualifying deposit of $25,000 or more by October 31, 2025, using promo code OFFER25 during account opening.",
        "Maintain the qualifying deposit for at least 90 days to ensure eligibility for the bonus.",
        "The bonus will be credited to your account within 30 days after meeting all requirements."
      ]
    },
    {
      question: "Are there any commission fees?",
      answer: [
        "We offer $0 commissions for online U.S.-listed stocks, ETFs, mutual funds, and options trades.",
        "Certain transactions, such as foreign securities or broker-assisted trades, may incur additional fees like regulatory or exchange fees.",
        "Always review the fee schedule for specific transactions to understand any applicable costs."
      ]
    },
    {
      question: "Is my money FDIC insured?",
      answer: [
        "Yes, our Premium Savings Account is FDIC insured up to $500,000 through Morgan Stanley Private Bank, Member FDIC.",
        "FDIC insurance covers both principal and interest but does not apply to investment products like stocks or mutual funds.",
        "Investment products are subject to market risks and are not covered by FDIC insurance."
      ]
    },
    {
      question: "Can I open multiple accounts?",
      answer: [
        "Yes, you can open various account types, including brokerage, retirement, and savings accounts, to suit your financial goals.",
        "Each account can be customized for specific purposes, such as tax-advantaged retirement savings or short-term cash management.",
        "There are no limits on the number of accounts you can open, provided you meet the eligibility criteria for each."
      ]
    },
    {
      question: "What is the minimum deposit required?",
      answer: [
        "Most accounts have no minimum deposit requirement to open, making them accessible to a wide range of investors.",
        "Certain account types or promotional offers, like the $1,000 bonus, may require specific funding thresholds to qualify.",
        "Always check the terms of any promotional offer or premium account for specific deposit requirements."
      ]
    },
    {
      question: "How do I contact customer support?",
      answer: [
        "Our customer support is available 24/7 via phone, email, or live chat, with a comprehensive help center for self-service options.",
        "Premium account holders receive priority support, ensuring faster response times for urgent inquiries.",
        "You can also connect with us through our social media channels for quick updates and assistance."
      ]
    }
  ]

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section className="py-24 px-6 bg-gray-100">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <HelpCircle className="w-10 h-10 text-blue-600 mr-4" />
            <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Explore answers to the most common questions about our services, accounts, and more.
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
              className="border border-gray-200 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-5 text-left flex items-center justify-between bg-white hover:bg-blue-50 transition-colors duration-200 rounded-t-2xl"
              >
                <span className="text-xl font-semibold text-gray-900">
                  {`${index + 1}. ${faq.question}`}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${
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
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 py-6 bg-white rounded-b-2xl">
                      {faq.answer.map((ans, ansIndex) => (
                        <p key={ansIndex} className="text-gray-600 leading-relaxed mb-3 flex items-start">
                          <span className="font-medium text-blue-600 mr-2">{String.fromCharCode(97 + ansIndex)}.</span>
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