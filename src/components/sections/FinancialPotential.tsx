// src/components/sections/FinancialPotential.tsx
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { BanknotesIcon, UserCircleIcon, SparklesIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid'

const FinancialPotential = () => {
  const accounts = [
    {
      title: "Brokerage Account",
      description: "Invest and trade for your financial goals with $0 commissions for online U.S.-listed stocks, ETFs, mutual funds, options and much more - other fees may apply.¹",
      icon: BanknotesIcon,
      ctaPrimary: "Open an account",
      ctaSecondary: "Learn more"
    },
    {
      title: "Retirement Accounts",
      description: "Build your nest egg with tax-advantaged Traditional, Roth, and Rollover IRAs, plus personalized retirement planning tools and guidance.",
      icon: UserCircleIcon,
      ctaPrimary: "Open an account",
      ctaSecondary: "Learn more"
    },
    {
      title: "Premium Savings Account",
      description: "Boost your savings with 4.00% Annual Percentage Yield²",
      icon: SparklesIcon,
      ctaPrimary: "Open an account",
      ctaSecondary: null
    },
    {
      title: "Max-Rate Checking Account",
      description: "Competitive yield with 3.00% Annual Percentage Yield³ and no transaction fees",
      icon: CurrencyDollarIcon,
      ctaPrimary: "Open an account",
      ctaSecondary: null
    }
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#241151] mb-4">
            Unlock your full financial potential
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Do more with your money at E*TRADE with our most popular accounts
          </p>
          <div className="w-28 h-1 bg-[#FF6B35] mx-auto my-8 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {accounts.map((account, index) => {
            const Icon = account.icon
            return (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
                <Icon className="w-16 h-16 text-[#FF6B35] mb-6" />
                <h3 className="text-2xl font-semibold text-[#241151] mb-4">{account.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{account.description}</p>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button className="bg-[#241151] text-white hover:bg-[#241151]/90 flex-1" asChild>
                    <Link to="/register">{account.ctaPrimary}</Link>
                  </Button>
                  {account.ctaSecondary && (
                    <Button variant="outline" className="border-[#241151] text-[#241151] hover:bg-[#241151] hover:text-white flex-1" asChild>
                      <Link to="/learn-more">{account.ctaSecondary}</Link>
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center text-xs text-gray-500 max-w-3xl mx-auto">
          <p className="mb-2">
            <sup>¹</sup>Commission-free trading applies to U.S. exchange-listed stocks, ETFs, and options. Options contracts 
            are $0.65 per contract. Mutual funds trade with no transaction fee (NTF); funds not on the NTF list are subject to a transaction fee.
          </p>
          <p className="mb-2">
            <sup>²</sup>4.00% APY as of current date. Rates subject to change.
          </p>
          <p>
            <sup>³</sup>3.00% APY as of current date. Rates subject to change. Certain conditions apply.
          </p>
        </div>
      </div>
    </section>
  )
}

export default FinancialPotential
