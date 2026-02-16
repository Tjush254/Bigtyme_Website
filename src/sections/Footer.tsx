import { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Video, ArrowUp, CheckCircle, AlertCircle } from 'lucide-react';
import { footerConfig } from '../config';

// Icon lookup map for dynamic icon resolution from config strings
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin, Phone, Mail, Instagram, Facebook, Twitter, Video, ArrowUp,
};

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Null check: if config is empty, render nothing
  if (!footerConfig.brandName) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      const response = await fetch(footerConfig.newsletterEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newsletterEmail,
        }),
      });

      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
      }
    } catch {
      setNewsletterStatus('error');
    }

    setTimeout(() => setNewsletterStatus('idle'), 4000);
  };

  return (
    <footer className="relative bg-[#0B0B0D] border-t border-white/5" role="contentinfo">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img 
                src="/images/logo.png" 
                alt="Bigtyme Properties" 
                className="h-20 w-auto"
              />
            </div>
            {footerConfig.description && (
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {footerConfig.description}
              </p>
            )}
            {/* Social Links */}
            {footerConfig.socialLinks.length > 0 && (
              <nav aria-label="Social media links">
                <div className="flex gap-3">
                  {footerConfig.socialLinks.map((social) => {
                    const IconComponent = iconMap[social.icon];
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#E53935] hover:border-[#E53935] hover:text-white transition-all duration-300"
                      >
                        {IconComponent && <IconComponent className="w-4 h-4" />}
                      </a>
                    );
                  })}
                </div>
              </nav>
            )}
          </div>

          {/* Link Groups */}
          {footerConfig.linkGroups.map((group, index) => (
            <nav key={index} aria-label={group.title}>
              <h3 className="font-serif text-lg text-white mb-5">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/70 text-sm hover:text-[#E53935] transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact Info + Newsletter */}
          <div>
            {footerConfig.contactItems.length > 0 && (
              <>
                <h3 className="font-serif text-lg text-white mb-5">Contact</h3>
                <ul className="space-y-4">
                  {footerConfig.contactItems.map((item, index) => {
                    const IconComponent = iconMap[item.icon];
                    return (
                      <li key={index} className="flex items-start gap-3">
                        {IconComponent && <IconComponent className="w-4 h-4 text-[#E53935] mt-0.5 flex-shrink-0" aria-hidden="true" />}
                        <span className="text-white/70 text-sm">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            {/* Lead Magnet / Newsletter */}
            {footerConfig.newsletterLabel && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-white font-serif text-lg mb-2">{footerConfig.newsletterLabel}</h4>
                {footerConfig.newsletterSubtitle && (
                  <p className="text-white/50 text-xs mb-4 leading-relaxed">
                    {footerConfig.newsletterSubtitle}
                  </p>
                )}
                {newsletterStatus === 'success' ? (
                  <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 p-4 rounded-lg border border-green-400/20">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{footerConfig.newsletterSuccessText}</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletter} className="space-y-3">
                    <div className="relative group">
                      <label htmlFor="newsletter-email" className="sr-only">{footerConfig.newsletterLabel}</label>
                      <input
                        id="newsletter-email"
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder={footerConfig.newsletterPlaceholder}
                        required
                        autoComplete="email"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#E53935] transition-all group-hover:border-white/20"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#E53935] text-white text-sm font-bold rounded-lg hover:bg-[#C62828] transition-all transform active:scale-[0.98] shadow-lg shadow-[#E53935]/10"
                    >
                      {footerConfig.newsletterButtonText}
                    </button>
                  </form>
                )}
                {newsletterStatus === 'error' && (
                  <p className="text-[#E53935] text-xs mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {footerConfig.newsletterErrorText}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/50 text-xs">
            {footerConfig.copyrightText && (
              <span>{footerConfig.copyrightText}</span>
            )}
            {footerConfig.legalLinks.map((link, index) => (
              <span key={index}>
                <span className="hidden md:inline">|</span>
                <button className="hover:text-[#E53935] transition-colors ml-2 md:ml-0">{link}</button>
              </span>
            ))}
          </div>

          {/* Back to Top */}
          {footerConfig.backToTopText && (
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/70 text-sm hover:text-[#E53935] transition-colors group"
              aria-label={footerConfig.backToTopText}
            >
              <span>{footerConfig.backToTopText}</span>
              <div className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center group-hover:border-[#E53935] group-hover:bg-[#E53935] transition-all duration-300">
                <ArrowUp className="w-4 h-4" />
              </div>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
