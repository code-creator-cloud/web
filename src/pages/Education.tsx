// src/pages/Education.tsx
import { motion } from 'framer-motion';
import { BookOpen, Video, Users, Award, Lightbulb, GraduationCap } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumb from '../components/common/Breadcrumb';

const Education = () => {
    const topics = [
        {
            title: 'Understanding NFP Trading',
            category: 'Economic Events',
            description: 'Learn how Non-Farm Payrolls data impacts currency markets and how BlackGem positions trades to capitalize on these movements.',
            duration: '15 min read'
        },
        {
            title: 'CPI & Inflation Trading',
            category: 'Economic Events',
            description: 'Explore how inflation data drives market sentiment and central bank decisions, creating trading opportunities.',
            duration: '12 min read'
        },
        {
            title: 'FOMC Decisions Explained',
            category: 'Central Banks',
            description: 'Understand how Federal Reserve interest rate decisions create some of the most volatile and profitable trading moments.',
            duration: '18 min read'
        },
        {
            title: 'Risk Management Basics',
            category: 'Fundamentals',
            description: 'Learn the principles of risk management and how BlackGem protects your investments while maximizing opportunities.',
            duration: '10 min read'
        },
        {
            title: 'Reading Economic Calendars',
            category: 'Tools',
            description: 'Master the art of using economic calendars to plan your investments around high-impact market events.',
            duration: '8 min read'
        },
        {
            title: 'Understanding ROI & Returns',
            category: 'Investing Basics',
            description: 'Learn how returns are calculated, what to expect from different packages, and how compensation works when trades don\'t succeed.',
            duration: '12 min read'
        }
    ];

    const features = [
        {
            icon: BookOpen,
            title: 'Comprehensive Guides',
            description: 'In-depth articles covering everything from basic trading concepts to advanced market analysis techniques.'
        },
        {
            icon: Video,
            title: 'Video Tutorials',
            description: 'Visual learning content that walks you through platform features and investment strategies step by step.'
        },
        {
            icon: Users,
            title: 'Community Support',
            description: 'Connect with other BlackGem investors to share insights, ask questions, and learn from shared experiences.'
        },
        {
            icon: Award,
            title: 'Expert Insights',
            description: 'Regular updates from our team of analysts on market conditions and upcoming trading opportunities.'
        }
    ];

    return (
        <div className="min-h-screen bg-gem">
            <Navbar />
            <Breadcrumb currentPage="Education" />

            {/* Hero Section */}
            <section className="pt-8 pb-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-gold mb-6"
                    >
                        Education Center
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-gray-300 max-w-3xl mx-auto"
                    >
                        Knowledge is your greatest asset. Learn how BlackGem works, understand the markets we trade,
                        and become a more informed investor with our comprehensive educational resources.
                    </motion.p>
                </div>
            </section>

            {/* Learning Features */}
            <section className="py-16 px-4 bg-lighter">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-gold text-center mb-12"
                    >
                        Learning Resources
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gem p-6 rounded-xl border border-hover/20 text-center"
                            >
                                <feature.icon className="w-12 h-12 text-gold mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Topics */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-gold text-center mb-4"
                    >
                        Featured Topics
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
                    >
                        Start your learning journey with our most popular educational content
                    </motion.p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {topics.map((topic, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-lighter p-6 rounded-xl border border-hover/20 hover:border-gold/50 transition-colors cursor-pointer group"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs text-gold bg-gold/10 px-3 py-1 rounded-full">{topic.category}</span>
                                    <span className="text-xs text-gray-500">{topic.duration}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold transition-colors">{topic.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{topic.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How BlackGem Works */}
            <section className="py-16 px-4 bg-lighter">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <Lightbulb className="w-16 h-16 text-gold mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-6">How BlackGem Works</h2>

                        <div className="text-left space-y-6">
                            <div className="bg-gem p-6 rounded-xl">
                                <h3 className="text-gold font-semibold mb-2">1. Choose Your Investment</h3>
                                <p className="text-gray-400">
                                    Select from our range of trading packages based on economic events like NFP, CPI, or FOMC.
                                    Each package has clear risk levels and potential returns.
                                </p>
                            </div>

                            <div className="bg-gem p-6 rounded-xl">
                                <h3 className="text-gold font-semibold mb-2">2. Deposit Funds</h3>
                                <p className="text-gray-400">
                                    Invest your chosen amount through our secure platform. We accept multiple payment methods
                                    including crypto for fast, global transactions.
                                </p>
                            </div>

                            <div className="bg-gem p-6 rounded-xl">
                                <h3 className="text-gold font-semibold mb-2">3. We Trade on Your Behalf</h3>
                                <p className="text-gray-400">
                                    Our expert team executes trades during high-impact economic events. You receive real-time
                                    updates on positions and market conditions.
                                </p>
                            </div>

                            <div className="bg-gem p-6 rounded-xl">
                                <h3 className="text-gold font-semibold mb-2">4. Receive Returns or Compensation</h3>
                                <p className="text-gray-400">
                                    When trades succeed, you receive your ROI. If trades don't perform as expected, BlackGem
                                    provides compensation to help offset your losses. Transparency is at our core.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <GraduationCap className="w-16 h-16 text-gold mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Learning?</h2>
                        <p className="text-gray-400 mb-8">
                            Join BlackGem today and access our full library of educational content while you invest.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Education;
