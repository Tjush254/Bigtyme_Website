import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Users, Shield } from 'lucide-react';
import { coreValuesConfig } from '../config';

const iconMap: Record<string, React.ElementType> = {
  Lightbulb,
  Users,
  Shield,
};

export function CoreValues() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!coreValuesConfig.mainTitle) return null;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#141419] overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#E53935]/5 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-script text-4xl md:text-5xl text-[#E53935] block mb-2">
            {coreValuesConfig.scriptText}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/60 block mb-4">
            {coreValuesConfig.subtitle}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white">
            {coreValuesConfig.mainTitle}
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {coreValuesConfig.values.map((value, index) => {
            const Icon = iconMap[value.icon] || Lightbulb;
            return (
              <div
                key={index}
                className={`value-card bg-[#0B0B0D] rounded-xl p-8 border border-white/5 transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-[#E53935]/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#E53935]" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {value.description}
                </p>

                {/* Decorative line */}
                <div className="mt-6 pt-6 border-t border-white/5">
                  <div className="w-12 h-1 bg-[#E53935]/30 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { value: '120+', label: 'Projects Delivered' },
            { value: '6', label: 'Cities' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '9+', label: 'Years Experience' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <span className="font-serif text-3xl md:text-4xl text-[#E53935] block mb-1">
                {stat.value}
              </span>
              <span className="text-white/50 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
