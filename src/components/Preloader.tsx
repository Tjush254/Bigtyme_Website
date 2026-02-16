import { useState, useEffect } from 'react';
import { preloaderConfig } from '../config';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'loading' | 'fading'>('loading');

  const isEmpty = !preloaderConfig.brandName;

  useEffect(() => {
    if (isEmpty) {
      onComplete();
      return;
    }

    const fadeTimer = setTimeout(() => setPhase('fading'), 2200);
    const completeTimer = setTimeout(() => onComplete(), 2800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, isEmpty]);

  // If config is empty, render nothing
  if (isEmpty) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0B0B0D] flex flex-col items-center justify-center transition-opacity duration-600 ${
        phase === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo */}
      <div className="preloader-text mb-8">
        <img 
          src="/images/logo.png" 
          alt="Bigtyme Properties" 
          className="h-24 md:h-32 w-auto"
        />
      </div>

      {/* Loading Line */}
      <div className="mt-8 w-48 h-px bg-white/10 overflow-hidden">
        <div className="preloader-line h-full bg-gradient-to-r from-[#E53935]/50 via-[#E53935] to-[#E53935]/50" />
      </div>

      {/* Year */}
      {preloaderConfig.yearText && (
        <p
          className="preloader-text mt-4 text-xs text-white/40 uppercase tracking-[0.3em]"
          style={{ animationDelay: '0.4s' }}
        >
          {preloaderConfig.yearText}
        </p>
      )}
    </div>
  );
}
