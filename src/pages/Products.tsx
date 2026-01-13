// src/pages/Products.tsx
import { motion } from 'framer-motion';
import { TrendingUp, Shield, AlertTriangle, DollarSign, Clock, CheckCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumb from '../components/common/Breadcrumb';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Products = () => {
    const products = [
        {
            name: 'NFP Trading Package',
            risk: 'Medium',
            potentialROI: '15-25%',
            duration: 'Monthly',
            description: 'Trade during the Non-Farm Payrolls release. This high-impact US employment data creates significant market volatility, offering substantial return opportunities.',
            features: ['Monthly trading opportunity', 'Real-time trade updates', 'Compensation for losses', 'Transparent fee structure']
        },
        {
            name: 'CPI Trading Package',
            risk: 'Medium',
            potentialROI: '12-20%',
            duration: 'Monthly',
            description: 'Capitalize on Consumer Price Index releases. Inflation data drives central bank decisions, creating predictable market movements.',
            features: ['Monthly trading cycle', 'Inflation-driven opportunities', 'Risk-managed positions', 'Full transparency']
        },
        {
            name: 'FOMC Trading Package',
            risk: 'High',
            potentialROI: '20-35%',
            duration: 'Per Event (8x/year)',
            description: 'Trade around Federal Reserve interest rate decisions. These announcements move markets globally, offering high-reward opportunities for experienced investors.',
            features: ['8 opportunities per year', 'Highest impact events', 'Premium returns', 'Enhanced risk management']
        },
        {
            name: 'Eurozone Package',
            risk: 'Medium-Low',
            potentialROI: '10-18%',
            duration: 'Monthly',
            description: 'Focus on European Central Bank decisions and Eurozone economic data. Ideal for diversifying beyond US markets.',
            features: ['European market exposure', 'ECB decision trading', 'Diversification benefits', 'Stable returns']
        },
        {
            name: 'Japan News Package',
            risk: 'Medium',
            potentialROI: '12-22%',
            duration: 'Per Event',
            description: 'Trade Bank of Japan policy decisions and Japanese economic releases. The Yen is highly reactive, creating unique opportunities.',
            features: ['Asian market access', 'BOJ policy trading', 'Yen pair opportunities', 'Time-zone diversification']
        }
    ];

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'High': return 'text-red-400 bg-red-500/20';
            case 'Medium': return 'text-orange-400 bg-orange-500/20';
            case 'Medium-Low': return 'text-yellow-400 bg-yellow-500/20';
            case 'Low': return 'text-green-400 bg-green-500/20';
            default: return 'text-gray-400 bg-gray-500/20';
        }
    };

    return (
        <div className="min-h-screen bg-gem">
            <Navbar />
            <Breadcrumb currentPage="Products" />

            {/* Hero Section */}
            <section className="pt-8 pb-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-gold mb-6"
                    >
                        Investment Products
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-gray-300 max-w-3xl mx-auto"
                    >
                        Choose from our range of trading packages tailored to different economic events.
                        Each package offers unique opportunities with transparent risk levels and potential returns.
                    </motion.p>
                </div>
            </section>

            {/* Risk Transparency Banner */}
            <section className="py-8 px-4 bg-hover/20">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left"
                    >
                        <AlertTriangle className="w-8 h-8 text-gold flex-shrink-0" />
                        <p className="text-gray-300">
                            <span className="font-semibold text-gold">Our Commitment: </span>
                            All trading involves risk. At BlackGem, we're transparent about risk levels and provide
                            compensation when trades don't perform as expected. Your trust is our priority.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-lighter rounded-xl border border-hover/20 overflow-hidden hover:border-gold/50 transition-colors"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gold">{product.name}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(product.risk)}`}>
                                            {product.risk} Risk
                                        </span>
                                    </div>

                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">{product.description}</p>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-gem/50 p-3 rounded-lg">
                                            <div className="flex items-center gap-2 text-gold mb-1">
                                                <TrendingUp className="w-4 h-4" />
                                                <span className="text-xs">Potential ROI</span>
                                            </div>
                                            <p className="text-white font-semibold">{product.potentialROI}</p>
                                        </div>
                                        <div className="bg-gem/50 p-3 rounded-lg">
                                            <div className="flex items-center gap-2 text-gold mb-1">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-xs">Duration</span>
                                            </div>
                                            <p className="text-white font-semibold text-sm">{product.duration}</p>
                                        </div>
                                    </div>

                                    <ul className="space-y-2 mb-6">
                                        {product.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                                                <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Button asChild className="w-full bg-gold text-gem hover:bg-hover">
                                        <Link to="/register">Get Started</Link>
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Compensation Policy */}
            <section className="py-16 px-4 bg-lighter">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Shield className="w-16 h-16 text-gold mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-4">Our Compensation Promise</h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            We understand that markets don't always move in our favor. When trades go south,
                            BlackGem provides compensation to help offset your losses. We believe in sharing both
                            the rewards and the risks with our investors. Your investment is backed by our commitment
                            to transparency and fairness.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-gem p-6 rounded-xl">
                                <DollarSign className="w-10 h-10 text-gold mx-auto mb-3" />
                                <h3 className="text-white font-semibold mb-2">Partial Compensation</h3>
                                <p className="text-gray-400 text-sm">Receive up to 30% back on losing trades</p>
                            </div>
                            <div className="bg-gem p-6 rounded-xl">
                                <Clock className="w-10 h-10 text-gold mx-auto mb-3" />
                                <h3 className="text-white font-semibold mb-2">Quick Processing</h3>
                                <p className="text-gray-400 text-sm">Compensation processed within 48 hours</p>
                            </div>
                            <div className="bg-gem p-6 rounded-xl">
                                <CheckCircle className="w-10 h-10 text-gold mx-auto mb-3" />
                                <h3 className="text-white font-semibold mb-2">No Hidden Terms</h3>
                                <p className="text-gray-400 text-sm">Clear, straightforward compensation policy</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Products;
