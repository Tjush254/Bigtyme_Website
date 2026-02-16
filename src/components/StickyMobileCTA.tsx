import { Calendar, MessageCircle } from 'lucide-react';
import { whatsappConfig } from '../config';

export function StickyMobileCTA() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi Bigtyme Properties, I'd like to book a site visit for one of your properties.");
    window.open(`https://wa.me/${whatsappConfig.phoneNumber.replace('+', '')}?text=${message}`, '_blank');
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[45] bg-[#0B0B0D]/90 backdrop-blur-md border-t border-white/10 p-4 pb-safe">
      <div className="flex gap-3">
        {/* Secondary Action: WhatsApp */}
        <button
          onClick={handleWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-lg font-bold text-sm"
          aria-label="Inquire on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </button>

        {/* Primary Action: Book Visit */}
        <button
          onClick={scrollToContact}
          className="flex-[2] flex items-center justify-center gap-2 bg-[#E53935] text-white py-3 rounded-lg font-bold text-sm shadow-lg shadow-[#E53935]/20 animate-pulse"
        >
          <Calendar className="w-4 h-4" />
          Book a Site Visit
        </button>
      </div>
    </div>
  );
}
