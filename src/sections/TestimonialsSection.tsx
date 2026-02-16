import { useEffect, useRef, useState } from 'react';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { testimonialsConfig } from '../config';

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  if (!testimonialsConfig.mainTitle) return null;

  const testimonials = testimonialsConfig.testimonials;
  const articles = testimonialsConfig.articles;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0B0B0D] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D] via-[#141419] to-[#0B0B0D]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-script text-4xl md:text-5xl text-[#E53935] block mb-2">
            {testimonialsConfig.testimonialsScriptText}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/60 block mb-4">
            {testimonialsConfig.testimonialsSubtitle}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white">
            {testimonialsConfig.testimonialsMainTitle}
          </h2>
        </div>

        {/* Featured Testimonial */}
        <div className={`mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-[#141419] rounded-2xl p-8 md:p-12 border border-white/5 relative">
            {/* Quote Icon */}
            <Quote className="absolute top-8 right-8 w-12 h-12 text-[#E53935]/20" />

            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[activeTestimonial].rating
                          ? 'text-[#E53935] fill-[#E53935]'
                          : 'text-white/20'
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="font-serif text-xl md:text-2xl text-white leading-relaxed mb-6">
                  "{testimonials[activeTestimonial].text}"
                </blockquote>
                <div>
                  <span className="text-white font-medium block">
                    {testimonials[activeTestimonial].name}
                  </span>
                  <span className="text-white/50 text-sm">
                    {testimonials[activeTestimonial].role}
                  </span>
                </div>
              </div>

              {/* Testimonial Navigation */}
              <div className="lg:border-l lg:border-white/10 lg:pl-8">
                <span className="text-white/50 text-sm uppercase tracking-wider mb-4 block">
                  More Stories
                </span>
                <div className="space-y-3">
                  {testimonials.slice(0, 4).map((testimonial, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-full text-left p-4 rounded-lg transition-all ${
                        activeTestimonial === index
                          ? 'bg-[#E53935]/10 border border-[#E53935]/30'
                          : 'bg-transparent hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span className="text-white font-medium block text-sm truncate">
                        {testimonial.name}
                      </span>
                      <span className="text-white/50 text-xs truncate">
                        {testimonial.role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Story Image */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <img
              src={testimonialsConfig.storyImage}
              alt={testimonialsConfig.storyImageCaption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Timeline Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex gap-6">
                {testimonialsConfig.storyTimeline.map((item, index) => (
                  <div key={index} className="text-center">
                    <span className="font-serif text-2xl text-[#E53935] block">
                      {item.value}
                    </span>
                    <span className="text-white/60 text-xs">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div>
            <span className="font-script text-3xl text-[#E53935] block mb-2">
              {testimonialsConfig.storyScriptText}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-white/60 block mb-4">
              {testimonialsConfig.storySubtitle}
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-white mb-6">
              {testimonialsConfig.storyTitle}
            </h3>
            {testimonialsConfig.storyParagraphs.map((paragraph, pIndex) => (
              <p key={pIndex} className="text-white/70 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
            
            {/* Story Quote */}
            <div className="mt-8 border-l-2 border-[#E53935] pl-6">
              <span className="text-[#E53935] text-sm uppercase tracking-wider mb-2 block">
                {testimonialsConfig.storyQuote.prefix}
              </span>
              <p className="text-white/80 italic mb-2">
                "{testimonialsConfig.storyQuote.text}"
              </p>
              <span className="text-white/50 text-sm">
                — {testimonialsConfig.storyQuote.attribution}
              </span>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className={`mt-16 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl text-white">Latest Stories</h3>
            <button className="text-[#E53935] text-sm flex items-center gap-2 hover:gap-3 transition-all">
              {testimonialsConfig.viewAllText}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#E53935] text-white text-xs px-3 py-1 rounded">
                      {article.category}
                    </span>
                  </div>
                </div>
                <span className="text-white/40 text-sm">{article.date}</span>
                <h4 className="text-white font-medium mt-1 mb-2 group-hover:text-[#E53935] transition-colors">
                  {article.title}
                </h4>
                <p className="text-white/60 text-sm line-clamp-2">
                  {article.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
