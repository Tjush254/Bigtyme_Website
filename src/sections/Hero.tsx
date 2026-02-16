import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { heroConfig } from '../config';

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!start || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

export function Hero({ isReady }: { isReady: boolean }) {
  const [phase, setPhase] = useState(0);
  // phase 0: hidden, 1: bg visible, 2: title, 3: cta, 4: stats counting

  // Build count-up hooks from stats config
  const stat0 = heroConfig.stats[0];
  const stat1 = heroConfig.stats[1];
  const stat2 = heroConfig.stats[2];
  const count0 = useCountUp(stat0?.value ?? 0, 2000, phase >= 4);
  const count1 = useCountUp(stat1?.value ?? 0, 2200, phase >= 4);
  const count2 = useCountUp(stat2?.value ?? 0, 1800, phase >= 4);
  const counts = [count0, count1, count2];

  useEffect(() => {
    if (!isReady) return;
    // Stagger: bg -> title -> cta -> stats
    const t1 = setTimeout(() => setPhase(1), 100);   // bg reveal
    const t2 = setTimeout(() => setPhase(2), 800);   // title
    const t3 = setTimeout(() => setPhase(3), 1400);  // cta
    const t4 = setTimeout(() => setPhase(4), 2000);  // stats
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [isReady]);

  // Null check: if config is empty, render nothing
  if (!heroConfig.mainTitle) return null;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with subtle Ken Burns */}
      <div className={`absolute inset-0 transition-opacity duration-[1.5s] ease-out ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 hero-kenburns">
          <img
            src={heroConfig.backgroundImage}
            alt={heroConfig.mainTitle}
            className="w-full h-full object-cover scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        
        {/* Red accent gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#E53935]/10 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center py-32 lg:py-40">
        {/* Script accent */}
        <div className={`transition-all duration-1000 ease-out ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-sm uppercase tracking-[0.3em] text-[#E53935]">
            {heroConfig.scriptText}
          </span>
        </div>

        {/* Divider line */}
        <div className={`mx-auto my-6 h-px bg-[#E53935]/50 transition-all duration-1000 ease-out ${phase >= 2 ? 'w-24 opacity-100' : 'w-0 opacity-0'}`} style={{ transitionDelay: '0.2s' }} />

        {/* Main Title */}
        <h1 className={`font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] tracking-wide whitespace-pre-line transition-all duration-1000 ease-out ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.3s' }}>
          {heroConfig.mainTitle}
        </h1>

        {/* Subtitle */}
        <p className={`mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto transition-all duration-1000 ease-out ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.4s' }}>
          {heroConfig.description}
        </p>

        {/* CTA */}
        {heroConfig.ctaButtonText && (
          <div className={`mt-10 transition-all duration-700 ease-out ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <button
              onClick={() => scrollToSection(heroConfig.ctaTarget || '#properties')}
              className="btn-primary inline-flex items-center gap-2 group"
              aria-label={heroConfig.ctaButtonText}
            >
              {heroConfig.ctaButtonText}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>

      {/* Stats with count-up */}
      {heroConfig.stats.length > 0 && (
        <div className={`absolute bottom-24 left-0 right-0 z-10 transition-all duration-1000 ease-out ${phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="container-custom">
            <div className="grid gap-8 max-w-3xl mx-auto" style={{ gridTemplateColumns: `repeat(${heroConfig.stats.length}, minmax(0, 1fr))` }}>
              {heroConfig.stats.map((stat, index) => (
                <div key={index} className={`text-center ${index > 0 && index < heroConfig.stats.length ? 'border-l border-white/20' : ''}`}>
                  <div className="font-serif text-3xl md:text-4xl text-[#E53935] mb-2 tabular-nums">
                    {counts[index]}{stat.suffix}
                  </div>
                  <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0B0D] to-transparent" />

      {/* Scroll hint */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => scrollToSection('#properties')}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-[#E53935] transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>

      {/* Side decorative */}
      {heroConfig.decorativeText && (
        <div className={`absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 transition-opacity duration-1000 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#E53935]/50 to-transparent" />
          <span className="text-[#E53935] text-xs tracking-widest" style={{ writingMode: 'vertical-lr' }}>{heroConfig.decorativeText}</span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#E53935]/50 to-transparent" />
        </div>
      )}
    </section>
  );
}
