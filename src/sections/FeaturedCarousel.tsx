import { useEffect, useRef, useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { featuredCarouselConfig } from '../config';

export function FeaturedCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = featuredCarouselConfig.slides;

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

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying && isVisible) {
      autoPlayRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isVisible, slides.length]);

  if (!featuredCarouselConfig.mainTitle) return null;

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#141419] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="font-script text-4xl md:text-5xl text-[#E53935] block mb-2">
              {featuredCarouselConfig.scriptText}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-white/60 block mb-4">
              {featuredCarouselConfig.subtitle}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              {featuredCarouselConfig.mainTitle}
            </h2>
          </div>

          {/* Location Tag */}
          <div className="flex items-center gap-2 text-white/60 mt-4 md:mt-0">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{featuredCarouselConfig.locationTag}</span>
          </div>
        </div>

        {/* Carousel */}
        <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Main Slide */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === activeSlide
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              </div>
            ))}

            {/* Slide Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container-custom">
                <div className="max-w-xl">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={`transition-all duration-500 ${
                        index === activeSlide
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-4 absolute'
                      }`}
                    >
                      {index === activeSlide && (
                        <>
                          <span className="text-[#E53935] text-sm uppercase tracking-wider mb-2 block">
                            {slide.subtitle}
                          </span>
                          <h3 className="font-serif text-3xl md:text-5xl text-white mb-4">
                            {slide.title}
                          </h3>
                          <p className="text-white/70 mb-6 line-clamp-2">
                            {slide.description}
                          </p>
                          <div className="flex items-center gap-6 mb-6">
                            <div>
                              <span className="text-3xl md:text-4xl font-serif text-[#E53935]">
                                {slide.area}
                              </span>
                              <span className="text-white/60 text-sm ml-1">{slide.unit}</span>
                            </div>
                          </div>
                          <button className="btn-primary inline-flex items-center gap-2 group">
                            Learn More
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#E53935] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#E53935] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? 'w-8 bg-[#E53935]'
                    : 'w-4 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
