// src/pages/Support.tsx
import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, Mail, Phone, Clock, FileQuestion, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumb from '../components/common/Breadcrumb';

const Support = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = [
        {
            question: 'How do I deposit funds into my BlackGem account?',
            answer: 'You can deposit funds by navigating to the Transactions page in your dashboard. Select your preferred payment method (TRX, BNB, or other available options), enter the amount, and follow the instructions. Most deposits are processed within minutes.'
        },
        {
            question: 'What trading packages are available?',
            answer: 'BlackGem offers several trading packages based on major economic events: NFP (Non-Farm Payrolls), CPI (Consumer Price Index), FOMC (Federal Reserve meetings), Eurozone events, and Japan News trades. Each package has different risk levels and potential returns.'
        },
        {
            question: 'How does the compensation policy work?',
            answer: 'When trades don\'t perform as expected, BlackGem provides partial compensation to help offset your losses. The exact compensation amount depends on the package and market conditions, typically up to 30% of the loss. Compensation is processed within 48 hours.'
        },
        {
            question: 'How long does it take to receive my returns?',
            answer: 'Returns are typically credited to your account within 24-48 hours after a successful trade. For NFP and CPI trades, this usually happens by the end of the trading day. FOMC results may take slightly longer due to market volatility.'
        },
        {
            question: 'Can I withdraw my funds at any time?',
            answer: 'Yes, you can withdraw your available balance at any time. Funds that are currently invested in active trades must wait until the trade concludes. Withdrawal requests are processed within 24 hours.'
        },
        {
            question: 'What are the risks involved?',
            answer: 'All trading involves risk, and you may lose some or all of your invested capital. Each package displays its risk level (Low, Medium, High) transparently. We recommend only investing what you can afford to lose and diversifying across multiple packages.'
        },
        {
            question: 'How are trades executed?',
            answer: 'Our team of professional traders executes positions during high-impact economic events. You receive real-time updates on trade status through your dashboard and notifications. We use established risk management protocols to protect investments.'
        },
        {
            question: 'Is my money secure on BlackGem?',
            answer: 'Yes. We use industry-standard encryption for all transactions, and funds are held in secure accounts. We also support crypto payments for added security and privacy. Your account is protected with secure authentication.'
        }
    ];

    const contactMethods = [
        {
            icon: MessageCircle,
            title: 'Live Chat',
            description: 'Chat with our support team in real-time',
            action: 'Available 24/7',
            highlight: true
        },
        {
            icon: Mail,
            title: 'Email Support',
            description: 'Send us a detailed message',
            action: 'blackgeminvestmentfirm@gmail.com'
        },
        {
            icon: Phone,
            title: 'Phone Support',
            description: 'Speak directly with an agent (WhatsApp)',
            action: '+237 679-205-413'
        },
        {
            icon: Clock,
            title: 'Response Time',
            description: 'Average support response',
            action: 'Under 2 hours'
        }
    ];

    return (
        <div className="min-h-screen bg-gem">
            <Navbar />
            <Breadcrumb currentPage="Support" />

            {/* Hero Section */}
            <section className="pt-8 pb-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-gold mb-6"
                    >
                        Support Center
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-gray-300 max-w-3xl mx-auto"
                    >
                        We're here to help. Find answers to common questions or reach out to our dedicated
                        support team for personalized assistance.
                    </motion.p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-12 px-4 bg-lighter">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactMethods.map((method, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`p-6 rounded-xl text-center ${method.highlight
                                    ? 'bg-gold text-gem'
                                    : 'bg-gem border border-hover/20'
                                    }`}
                            >
                                <method.icon className={`w-10 h-10 mx-auto mb-4 ${method.highlight ? 'text-gem' : 'text-gold'}`} />
                                <h3 className={`text-lg font-semibold mb-2 ${method.highlight ? 'text-gem' : 'text-white'}`}>
                                    {method.title}
                                </h3>
                                <p className={`text-sm mb-3 ${method.highlight ? 'text-gem/70' : 'text-gray-400'}`}>
                                    {method.description}
                                </p>
                                <p className={`font-medium ${method.highlight ? 'text-gem' : 'text-gold'}`}>
                                    {method.action}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-gold text-center mb-4"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-gray-400 text-center mb-12"
                    >
                        Find quick answers to common questions about BlackGem
                    </motion.p>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="bg-lighter rounded-xl border border-hover/20 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full p-6 flex items-center justify-between text-left hover:bg-hover/5 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <FileQuestion className="w-5 h-5 text-gold flex-shrink-0" />
                                        <span className="text-white font-medium">{faq.question}</span>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gold transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-6 pb-6 pl-15">
                                        <p className="text-gray-400 leading-relaxed ml-9">{faq.answer}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Still Need Help */}
            <section className="py-16 px-4 bg-lighter">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <HelpCircle className="w-16 h-16 text-gold mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-4">Still Need Help?</h2>
                        <p className="text-gray-400 mb-8">
                            Our support team is available 24/7 to assist you with any questions or concerns.
                            Don't hesitate to reach out—we're here to ensure your BlackGem experience is seamless.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="mailto:support@blackgem.com"
                                className="px-8 py-3 bg-gold text-gem font-semibold rounded-lg hover:bg-hover transition-colors"
                            >
                                Email Us
                            </a>
                            <a
                                href="tel:+237679205413"
                                className="px-8 py-3 border border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-gem transition-colors"
                            >
                                Call Now
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Support;
