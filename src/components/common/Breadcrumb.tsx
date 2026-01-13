// src/components/common/Breadcrumb.tsx
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbProps {
    currentPage: string;
}

const Breadcrumb = ({ currentPage }: BreadcrumbProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="pt-20 pb-4 px-4 bg-gem"
        >
            <div className="max-w-7xl mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-gold transition-colors group"
                >
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-hover/20 group-hover:bg-gold/20 transition-colors">
                        <Home className="w-4 h-4" />
                        <span className="text-sm">Home</span>
                    </span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="flex items-center gap-1 text-gold">
                        <Sparkles className="w-3 h-3" />
                        <span className="text-sm font-medium">{currentPage}</span>
                    </span>
                </Link>
            </div>
        </motion.div>
    );
};

export default Breadcrumb;
