import { MessageCircle } from 'lucide-react';
import { whatsappConfig } from '../config';

export function WhatsAppButton() {
  // Null check: if config is empty, render nothing
  if (!whatsappConfig.phoneNumber) return null;

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappConfig.message);
    const whatsappUrl = `https://wa.me/${whatsappConfig.phoneNumber.replace('+', '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      aria-label={whatsappConfig.ariaLabel}
      className="fixed bottom-8 left-8 z-40 w-12 h-12 rounded-lg bg-[#E53935]/90 text-white flex items-center justify-center shadow-lg shadow-[#E53935]/20 backdrop-blur-sm transition-all duration-300 hover:bg-[#E53935] hover:scale-110 group"
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Tooltip */}
      <span className="absolute left-14 scale-0 transition-all rounded bg-[#1d1d1d] p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap border border-[#E53935]/30">
        Chat with us
      </span>

      {/* Pulsing effect */}
      <span className="absolute inset-0 rounded-lg bg-[#E53935] opacity-20 animate-ping group-hover:animate-none"></span>
    </button>
  );
}
