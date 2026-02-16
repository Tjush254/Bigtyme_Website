import { useEffect, useRef, useState } from 'react';
import { MapPin, Home, Briefcase, History, BookOpen, Award, ArrowRight } from 'lucide-react';
import { aboutConfig } from '../config';

const iconMap: Record<string, React.ElementType> = {
  MapPin,
  Home,
  Briefcase,
  History,
  BookOpen,
  Award,
};

export function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!aboutConfig.mainTitle) return null;

  const tabs = aboutConfig.tabs;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0B0B0D] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#141419] via-[#0B0B0D] to-[#0B0B0D]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-script text-4xl md:text-5xl text-[#E53935] block mb-2">
            {aboutConfig.scriptText}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/60 block mb-4">
            {aboutConfig.subtitle}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight whitespace-pre-line">
            {aboutConfig.mainTitle}
          </h2>
        </div>

        {/* Intro Text */}
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-white/70 text-lg leading-relaxed">
            {aboutConfig.introText}
          </p>
        </div>

        {/* Timeline */}
        <div className={`mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {aboutConfig.timeline.map((item, index) => (
              <div key={index} className="text-center">
                <span className="font-serif text-3xl md:text-4xl text-[#E53935] block mb-1">
                  {item.year}
                </span>
                <span className="text-white/60 text-sm">{item.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Tab Content */}
          <div className="order-2 lg:order-1">
            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tabs.map((tab, index) => {
                const Icon = iconMap[tab.icon] || MapPin;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all ${
                      activeTab === index
                        ? 'bg-[#E53935] text-white'
                        : 'bg-[#141419] text-white/70 hover:bg-[#1d1d1d] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Panel */}
            <div className="relative min-h-[300px]">
              {tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  className={`transition-all duration-500 ${
                    activeTab === index
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-8 absolute inset-0 pointer-events-none'
                  }`}
                >
                  {activeTab === index && (
                    <div className="bg-[#141419] rounded-xl p-8 border border-white/5">
                      <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
                        {tab.content.title}
                      </h3>
                      <p className="text-white/70 mb-6 leading-relaxed">
                        {tab.content.description}
                      </p>
                      <div className="flex items-center gap-2 text-[#E53935]">
                        <span className="text-sm font-medium">{tab.content.highlight}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Year Badge & Hours */}
            <div className="flex items-center gap-8 mt-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#E53935]/10 rounded-lg flex items-center justify-center">
                  <span className="font-serif text-2xl text-[#E53935]">{aboutConfig.yearBadge}</span>
                </div>
                <div>
                  <span className="text-white/50 text-sm block">{aboutConfig.yearBadgeLabel}</span>
                  <span className="text-white">Bigtyme Properties</span>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/10" />
              <div className="hidden sm:block">
                <span className="text-white/50 text-sm block">{aboutConfig.openingHoursLabel}</span>
                <span className="text-white">{aboutConfig.openingHours}</span>
              </div>
            </div>
          </div>

          {/* Tab Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              {tabs.map((tab, index) => (
                <img
                  key={tab.id}
                  src={tab.image}
                  alt={tab.content.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    activeTab === index
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className={`mt-16 text-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl mx-auto">
            <span className="text-[#E53935] text-sm uppercase tracking-wider mb-4 block">
              {aboutConfig.quote.prefix}
            </span>
            <p className="font-serif text-2xl md:text-3xl text-white italic mb-4">
              "{aboutConfig.quote.text}"
            </p>
            <span className="text-white/50">— {aboutConfig.quote.attribution}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
