import { useState, useCallback } from 'react';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { PropertiesShowcase } from './sections/PropertiesShowcase';
import { FeaturedCarousel } from './sections/FeaturedCarousel';
import { AboutSection } from './sections/AboutSection';
import { CoreValues } from './sections/CoreValues';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { ContactForm } from './sections/ContactForm';
import { Footer } from './sections/Footer';
import { Preloader } from './components/Preloader';
import { ScrollToTop } from './components/ScrollToTop';
import { WhatsAppButton } from './components/WhatsAppButton';
import { StickyMobileCTA } from './components/StickyMobileCTA';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div className={`min-h-screen bg-[#0B0B0D] ${isLoading ? 'overflow-hidden max-h-screen' : ''}`}>
        {/* Noise overlay */}
        <div className="noise-overlay" />
        
        <Navigation />

        <main>
          <Hero isReady={!isLoading} />
          <PropertiesShowcase />
          <FeaturedCarousel />
          <AboutSection />
          <CoreValues />
          <TestimonialsSection />
          <ContactForm />
        </main>

        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
        <StickyMobileCTA />
      </div>
    </>
  );
}

export default App;
