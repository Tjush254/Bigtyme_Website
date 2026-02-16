import { useEffect, useRef, useState } from 'react';
import { MapPin, Shield, ArrowRight, Heart, MessageCircle, CheckCircle2 } from 'lucide-react';
import { propertiesShowcaseConfig, whatsappConfig } from '../config';

export function PropertiesShowcase() {
  const [activeProperty, setActiveProperty] = useState(0);
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

  if (!propertiesShowcaseConfig.mainTitle) return null;

  const properties = propertiesShowcaseConfig.properties;
  const currentProperty = properties[activeProperty];

  const handlePropertyWhatsApp = () => {
    const message = `Hi Bigtyme Properties, I'm interested in the ${currentProperty.name} in ${currentProperty.location} for ${currentProperty.price}. Is it still available?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappConfig.phoneNumber.replace('+', '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="properties"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0B0B0D] overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E53935]/5 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-script text-4xl md:text-5xl text-[#E53935] block mb-2">
            {propertiesShowcaseConfig.scriptText}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/60 block mb-4">
            {propertiesShowcaseConfig.subtitle}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            {propertiesShowcaseConfig.mainTitle}
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Property Display */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Main Property Image */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
              <img
                src={currentProperty.image}
                alt={currentProperty.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              {/* Price Badge */}
              <div className="absolute top-4 left-4 bg-[#E53935] text-white px-4 py-2 rounded text-sm font-medium">
                {currentProperty.price}
              </div>

              {/* Trust Badge Overlay */}
              <div className="absolute top-4 right-16 bg-green-600 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg border border-green-400/30">
                <CheckCircle2 className="w-3 h-3" />
                Title Deed Ready
              </div>

              {/* Favorite Button */}
              <button className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#E53935] transition-colors">
                <Heart className="w-5 h-5" />
              </button>

              {/* Property Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  {currentProperty.location}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">
                  {currentProperty.name}
                </h3>
                
                {/* Mobile Specific Action */}
                <button 
                  onClick={handlePropertyWhatsApp}
                  className="lg:hidden w-full mt-4 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded font-medium hover:bg-[#128C7E] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Inquire on WhatsApp
                </button>
              </div>
            </div>

            {/* Property Thumbnails */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {properties.map((property, index) => (
                <button
                  key={property.id}
                  onClick={() => setActiveProperty(index)}
                  className={`relative flex-shrink-0 w-24 h-16 rounded overflow-hidden transition-all ${
                    activeProperty === index
                      ? 'ring-2 ring-[#E53935]'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Features & Details */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {/* Trust Badges Bar */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 text-white/70 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <Shield className="w-4 h-4 text-[#E53935]" />
                <span>Verified Documentation</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#E53935]" />
                <span>Immediate Transfer</span>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-[#141419] rounded-lg p-6 mb-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif text-xl text-white">Property Details</h4>
                <div className="text-[#E53935] text-xs font-bold uppercase tracking-widest bg-[#E53935]/10 px-3 py-1 rounded">
                  {currentProperty.type}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-white/50 text-sm">Plot Size</span>
                  <p className="text-white font-medium">{currentProperty.size}</p>
                </div>
                <div>
                  <span className="text-white/50 text-sm">Investment Type</span>
                  <p className="text-white font-medium">Residential / Mixed Use</p>
                </div>
                <div>
                  <span className="text-white/50 text-sm">Location Area</span>
                  <p className="text-white font-medium">{currentProperty.location}</p>
                </div>
                <div>
                  <span className="text-white/50 text-sm">Cash Price</span>
                  <p className="text-[#E53935] font-bold text-lg">{currentProperty.price}</p>
                </div>
              </div>
            </div>

            {/* Desktop WhatsApp Action */}
            <button 
              onClick={handlePropertyWhatsApp}
              className="hidden lg:flex w-full mb-6 items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-lg font-bold hover:bg-[#128C7E] transition-all transform hover:-translate-y-1 shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle className="w-6 h-6" />
              Inquire About This Property on WhatsApp
            </button>

            {/* Quote / Promise */}
            <div className="border-l-2 border-[#E53935] pl-6 py-2 mb-8 bg-white/5 rounded-r-lg">
              <span className="text-[#E53935] text-sm uppercase tracking-wider block mb-2">
                Our Promise
              </span>
              <p className="text-white/80 italic text-lg mb-2">
                "We ensure every piece of land we offer has a clean title and is ready for development."
              </p>
            </div>

            {/* Main CTA */}
            <button 
              onClick={scrollToContact}
              className="btn-primary w-full py-5 text-lg font-bold flex items-center justify-center gap-3 group relative overflow-hidden shadow-2xl shadow-[#E53935]/30"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              Book a Free Site Visit
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </button>
            <p className="text-center text-white/40 text-xs mt-4">
              * Group visits available every Saturday. Private tours on request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
