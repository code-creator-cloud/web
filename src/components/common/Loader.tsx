// Loader.tsx
import React from 'react';

type LoaderSize = 'sm' | 'md' | 'lg' | 'xl';
type LoaderVariant = 'pulse' | 'orbit' | 'bounce' | 'spinner' | 'simple';

interface LoaderProps {
  size?: LoaderSize;
  variant?: LoaderVariant;
  text?: string;
  overlay?: boolean;
  fullScreen?: boolean;
  className?: string;
}

interface LogoProps {
  sizeClass: string;
  showGlow?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'lg',
  variant = 'pulse',
  text = 'Loading...',
  overlay = true,
  fullScreen = false,
  className = '',
}) => {
  // Size variants
  const sizeClasses: Record<LoaderSize, string> = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
  };

  // Logo component
  const Logo: React.FC<LogoProps> = ({ sizeClass, showGlow = false }) => (
    <div
      className={`${sizeClass} rounded-2xl flex items-center justify-center mx-auto ${
        showGlow ? 'animate-pulse-glow' : ''
      }`}
    >
      <img
        src="/images/logo.png"
        alt="Logo"
        className="w-full h-full object-contain p-2"
      />
    </div>
  );

  // Loader variants
  const loaderVariants: Record<LoaderVariant, JSX.Element> = {
    pulse: (
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <Logo sizeClass={sizeClasses[size]} showGlow={true} />
        </div>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
    ),

    orbit: (
      <div className="flex flex-col items-center">
        <div
          className={`mb-4 relative ${sizeClasses[size]} flex items-center justify-center`}
        >
          <div
            className={`absolute ${sizeClasses[size]} border-4 border-primary/20 rounded-full`}
          ></div>
          <div className="absolute w-6 h-6 bg-accent rounded-full animate-orbit"></div>
          <div
            className={`${sizeClasses[size]
              .replace('w-', 'w-24')
              .replace('h-', 'h-24')} rounded-2xl flex items-center justify-center`}
          >
            <Logo sizeClass="w-full h-full" />
          </div>
        </div>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
    ),

    bounce: (
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <div
            className={`${sizeClasses[size]} rounded-2xl flex items-center justify-center mx-auto animate-float shadow-lg`}
          >
            <Logo sizeClass="w-full h-full" />
          </div>
        </div>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
    ),

    spinner: (
      <div className="flex flex-col items-center">
        <div
          className={`mb-4 relative ${sizeClasses[size]} flex items-center justify-center`}
        >
          <div
            className={`absolute ${sizeClasses[size]} border-4 border-primary/20 rounded-full animate-spin-slow`}
          ></div>
          <div
            className={`${sizeClasses[size]
              .replace('w-', 'w-24')
              .replace('h-', 'h-24')} rounded-2xl flex items-center justify-center`}
          >
            <Logo sizeClass="w-full h-full" />
          </div>
        </div>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
    ),

    simple: (
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <Logo sizeClass={`${sizeClasses[size]} animate-pulse`} />
        </div>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
    ),
  };

  // The loader content
  const loaderContent = loaderVariants[variant] || loaderVariants.pulse;

  if (fullScreen) {
    return (
      <div className={`loader-container ${className}`}>
        <div className="loader-card">{loaderContent}</div>
      </div>
    );
  }

  if (overlay) {
    return (
      <div
        className={`fixed inset-0 bg-primary/95 flex items-center justify-center z-50 ${className}`}
      >
        <div className="loader-card">{loaderContent}</div>
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
