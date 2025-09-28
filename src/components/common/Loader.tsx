// Loader.tsx
import React from 'react';
import { motion } from 'framer-motion';

type LoaderSize = 'sm' | 'md' | 'lg' | 'xl';

interface LoaderProps {
  size?: LoaderSize;
  text?: string;
  overlay?: boolean;
  fullScreen?: boolean;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'lg',
  text = 'Loading...',
  overlay = true,
  fullScreen = false,
  className = '',
}) => {
  // Size variants
  const sizeClasses: Record<LoaderSize, { container: string; logo: string }> = {
    sm: { container: 'w-24 h-24', logo: 'w-10 h-10' },
    md: { container: 'w-32 h-32', logo: 'w-16 h-16' },
    lg: { container: 'w-40 h-40', logo: 'w-20 h-20' },
    xl: { container: 'w-48 h-48', logo: 'w-24 h-24' },
  };

  const currentSize = sizeClasses[size];

  // Loader content with spinning animation
  const loaderContent = (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${currentSize.container} mb-4`}>
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
        ></motion.div>
        
        {/* Middle pulsing ring */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-4 rounded-full border-4 border-secondary/30"
        ></motion.div>
        
        {/* Logo with subtle pulse */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-8 flex items-center justify-center"
        >
          <img
            src="/images/logo.png"
            alt="Logo"
            className={`${currentSize.logo} object-contain`}
          />
        </motion.div>
        
        {/* Floating dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              rotate: 360,
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              rotate: { duration: 4, repeat: Infinity, ease: "linear" }
            }}
            className="absolute w-3 h-3 bg-secondary rounded-full"
            style={{
              top: `${Math.sin((i * 2 * Math.PI) / 3) * 40 + 50}%`,
              left: `${Math.cos((i * 2 * Math.PI) / 3) * 40 + 50}%`,
              transform: 'translate(-50%, -50%)'
            }}
          ></motion.div>
        ))}
      </div>
      
      {/* Text with animation */}
      {text && (
        <div className="text-center">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-lg font-semibold text-primary mb-2"
          >
            {text}
          </motion.p>
          
          <motion.div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
                className="text-secondary text-xl font-bold"
              >
                .
              </motion.span>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 ${className}`}>
        {loaderContent}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className={`fixed inset-0 bg-background/80 flex items-center justify-center z-50 ${className}`}>
        {loaderContent}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {loaderContent}
    </div>
  );
};

export default Loader;