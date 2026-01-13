// src/pages/Research.tsx
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Bell, FileText, BarChart2, Clock } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumb from '../components/common/Breadcrumb';

const Research = () => {
    const marketEvents = [
        {
            name: 'Non-Farm Payrolls (NFP)',
            frequency: 'First Friday of every month',
            impact: 'High',
            description: 'The NFP report measures the change in the number of employed people during the previous month. It is one of the most impactful economic indicators, often causing significant market volatility.'
        },
        {
            name: 'Consumer Price Index (CPI)',
            frequency: 'Monthly',
            impact: 'High',
            description: 'CPI measures inflation by tracking changes in prices of goods and services. Central banks closely monitor this data when making interest rate decisions.'
        },
        {
            name: 'FOMC Meetings',
            frequency: '8 times per year',
            impact: 'Very High',
            description: 'The Federal Open Market Committee determines US monetary policy. Their interest rate decisions can move markets globally within seconds of announcement.'
        },
        {
            name: 'Producer Price Index (PPI)',
            frequency: 'Monthly',
            impact: 'Medium-High',
            description: 'PPI measures wholesale inflation, serving as a leading indicator for CPI. Changes in producer prices often pass through to consumer prices.'
        }
    ];

    const insights = [
        {
            icon: TrendingUp,
            title: 'Market Analysis',
            description: 'Our team of analysts monitors global markets 24/7 to identify the best trading opportunities for your investments.'
        },
        {
            icon: Calendar,
            title: 'Economic Calendar',
            description: 'Stay ahead with our comprehensive calendar of upcoming economic events that could impact your trades.'
        },
        {
            icon: Bell,
            title: 'Trade Alerts',
            description: 'Receive instant notifications when market conditions change or when trades are executed on your behalf.'
        },
        {
            icon: FileText,
            title: 'Detailed Reports',
            description: 'Access comprehensive reports on trade performance, market conditions, and future opportunities.'
        }
    ];

    return (
        <div className="min-h-screen bg-gem">
            <Navbar />
            <Breadcrumb currentPage="News & Research" />

            {/* Hero Section */}
            <section className="pt-8 pb-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-gold mb-6"
                    >
                        News & Research
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-gray-300 max-w-3xl mx-auto"
                    >
                        At BlackGem, we believe informed investors make better decisions. Our research team
                        provides you with the insights you need to understand where your money is going and
                        what events are driving your returns.
                    </motion.p>
                </div>
            </section>

            {/* Research Insights */}
            <section className="py-16 px-4 bg-lighter">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-gold text-center mb-12"
                    >
                        Our Research Capabilities
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {insights.map((insight, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gem p-6 rounded-xl border border-hover/20 text-center"
                            >
                                <insight.icon className="w-10 h-10 text-gold mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">{insight.title}</h3>
                                <p className="text-gray-400 text-sm">{insight.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Market Events */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-gold text-center mb-4"
                    >
                        Key Economic Events We Trade
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
                    >
                        Understanding these events helps you make informed investment decisions on BlackGem
                    </motion.p>

                    <div className="space-y-6">
                        {marketEvents.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-lighter p-6 rounded-xl border border-hover/20"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-gold">{event.name}</h3>
                                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                                        <span className="flex items-center gap-2 text-gray-400 text-sm">
                                            <Clock className="w-4 h-4" />
                                            {event.frequency}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.impact === 'Very High' ? 'bg-red-500/20 text-red-400' :
                                            event.impact === 'High' ? 'bg-orange-500/20 text-orange-400' :
                                                'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {event.impact} Impact
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-400 leading-relaxed">{event.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 bg-lighter">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <BarChart2 className="w-16 h-16 text-gold mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Invest Smarter?</h2>
                        <p className="text-gray-400 mb-8">
                            Join thousands of investors who trust BlackGem to manage their trades during high-impact economic events.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Research;
