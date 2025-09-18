
// src/components/sections/FinancialPotential.tsx
import { motion } from "framer-motion"
import { BarChart4, CandlestickChart, DollarSign, HandCoins } from "lucide-react"
import { Button } from "../ui/button"
// import type { Description } from "@radix-ui/react-dialog"

const FinancialPotential = () => {
  const accounts = [
    {
      icon: BarChart4 ,
      title: "CPI Trades",
      description: "Invest and trade with us using the Consumer Price Index (CPI) trading option. Get informed of low and high inflation announcements across the US stocks market",
      highlight: "10% Commission"
    },
    {
      icon: DollarSign,
      title: "NFP Trades",
      description: "Get to know about Non-Farm Payrolls (NFP) market and its movements monthly, concerning the US economy and Dollar strength",
      highlight: "10% Commission"
    },
    {
      icon: CandlestickChart,
      title: "FOMC Trades",
      description: "Federal Open Market Committee (FOMC) happens every three months, and you shouldn't miss out on this opportunity",
      highlight: "10% Commission"
    },
    {
      icon: HandCoins,
      title: "PPI Trades",
      description: "Prepare yourself further with the Producer Price Index (PPI) market, it can be used to predict the CPI market",
      highlight: "10% Commission"
    }
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Unlock your full financial potential
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Do more with your money at BLACK GEM with our most popular investment strategy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((account, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 text-center"
            >
              <div className="mb-6">
                <account.icon className="w-16 h-16 text-primary mx-auto mb-4" />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {account.title}
              </h3>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                {account.description}
              </p>

              {account.highlight && (
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 text-lg mb-2">
                    {account.highlight}
                  </p>
                  {/* {account.subtext && (
                    <p className="text-gray-600 text-sm">
                      {account.subtext}
                    </p>
                  )} */}
                </div>
              )}
{/* 
              {account.disclaimer && (
                <p className="text-xs text-gray-500 mb-6">
                  {account.disclaimer}
                </p>
              )} */}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold"
                >
                  Choose Option
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-primary text-primary hover:bg-primary/5"
                >
                  Learn more
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-500">
            BLACK GEM official community, Member BLACK GEM. $15 monthly account fee waived with $5,000 average monthly balance.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default FinancialPotential