// src/pages/Platforms.tsx
import { motion } from 'framer-motion';
import { Monitor, Smartphone, BarChart3, Shield, Zap, Globe } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumb from '../components/common/Breadcrumb';

const Platforms = () => {
    const features = [
        {
            icon: Monitor,
            title: 'Web Trading Platform',
            description: 'Access your investments from any browser. Our intuitive web platform provides real-time updates on your trades, deposit management, and comprehensive portfolio tracking.'
        },
        {
            icon: Smartphone,
            title: 'Mobile Ready',
            description: 'Stay connected to your investments on the go. Our mobile-responsive design ensures you never miss an important trade update or market opportunity.'
        },
        {
            icon: BarChart3,
            title: 'Real-Time Analytics',
            description: 'Track your ROI with live performance metrics. See exactly how your deposits are performing across different trading events like NFP, CPI, and FOMC.'
        },
        {
            icon: Shield,
            title: 'Secure Transactions',
            description: 'Your funds are protected with enterprise-grade security. Every deposit and withdrawal is encrypted and verified for your peace of mind.'
        },
        {
            icon: Zap,
            title: 'Instant Notifications',
            description: 'Receive immediate alerts when trades are executed, when you earn returns, or if market conditions change. Stay informed every step of the way.'
        },
        {
            icon: Globe,
            title: 'Global Market Access',
            description: 'Participate in major economic events worldwide. From US employment data to Eurozone decisions, access opportunities across global markets.'
        }
    ];

    return (
        <div className="min-h-screen bg-gem">
            <Navbar />
            <Breadcrumb currentPage="Platforms" />

            {/* Hero Section */}
            <section className="pt-8 pb-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-gold mb-6"
                    >
                        Our Trading Platform
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
                    >
                        BlackGem provides a seamless investment experience. Deposit funds into specific trading events,
                        track your investments in real-time, and receive transparent updates on your returns—or compensation
                        if trades don't go as planned.
                    </motion.p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 px-4 bg-lighter">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-gold text-center mb-12"
                    >
                        Platform Features
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gem p-6 rounded-xl border border-hover/20 hover:border-gold/50 transition-colors"
                            >
                                <feature.icon className="w-12 h-12 text-gold mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-gold text-center mb-12"
                    >
                        How BlackGem Works
                    </motion.h2>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: '1', title: 'Create Account', desc: 'Sign up and verify your identity in minutes' },
                            { step: '2', title: 'Choose a Trade', desc: 'Select from NFP, CPI, FOMC, or other trading events' },
                            { step: '3', title: 'Deposit Funds', desc: 'Invest in your chosen trade with your preferred amount' },
                            { step: '4', title: 'Receive Returns', desc: 'Get your ROI when trades succeed, or compensation if they don\'t' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-gold text-gem rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Platforms;
