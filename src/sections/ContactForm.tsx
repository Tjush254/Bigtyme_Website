import { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, AlertCircle, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { contactFormConfig } from '../config';

// Icon lookup map for dynamic icon resolution from config strings
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin, Phone, Mail, MessageCircle,
};

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visitDate: '',
    visitors: 'Land',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Null check: if config is empty, render nothing
  if (!contactFormConfig.mainTitle) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(contactFormConfig.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          visitDate: formData.visitDate,
          visitors: formData.visitors,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', visitDate: '', visitors: 'Land', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setIsSubmitting(false);
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const form = contactFormConfig.form;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#141419] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #E53935 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-script text-4xl md:text-5xl text-[#E53935] block mb-2">
            {contactFormConfig.scriptText}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/60 block mb-4">
            {contactFormConfig.subtitle}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {contactFormConfig.mainTitle}
          </h2>
          {contactFormConfig.introText && (
            <p className="text-white/70 max-w-2xl mx-auto">
              {contactFormConfig.introText}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {contactFormConfig.contactInfoTitle && (
              <h3 className="font-serif text-2xl text-white mb-6">{contactFormConfig.contactInfoTitle}</h3>
            )}
            <div className="space-y-4" role="list" aria-label="Contact information">
              {contactFormConfig.contactInfo.map((item) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 p-4 bg-[#0B0B0D] rounded-lg border border-white/5 hover:border-[#E53935]/30 transition-colors"
                    role="listitem"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#E53935]/10 flex items-center justify-center flex-shrink-0">
                      {IconComponent && <IconComponent className="w-5 h-5 text-[#E53935]" />}
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-white font-medium">{item.value}</p>
                      <p className="text-sm text-white/60">{item.subtext}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Image */}
            <div className="mt-8 rounded-xl overflow-hidden">
              <img
                src="/images/contact_map.jpg"
                alt="Location Map"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          {/* Form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-[#0B0B0D] rounded-xl border border-white/5 p-8">
              {status === 'success' ? (
                <div className="text-center py-12" role="alert">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="font-serif text-2xl text-white mb-2">
                    {form.successMessage}
                  </h3>
                </div>
              ) : status === 'error' ? (
                <div className="text-center py-12" role="alert">
                  <AlertCircle className="w-16 h-16 text-[#E53935] mx-auto mb-4" />
                  <h3 className="font-serif text-2xl text-white mb-2">
                    {form.errorMessage}
                  </h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-sm text-white/80 mb-2">
                        {form.nameLabel} <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={form.namePlaceholder}
                        autoComplete="name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#E53935] transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm text-white/80 mb-2">
                        {form.phoneLabel} <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder={form.phonePlaceholder}
                        autoComplete="tel"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#E53935] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-sm text-white/80 mb-2">
                        {form.emailLabel} <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={form.emailPlaceholder}
                        autoComplete="email"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#E53935] transition-colors"
                      />
                    </div>

                    {/* Property Interest */}
                    {form.visitorsOptions.length > 0 && (
                      <div>
                        <label htmlFor="contact-visitors" className="block text-sm text-white/80 mb-2">
                          {form.visitorsLabel}
                        </label>
                        <select
                          id="contact-visitors"
                          name="visitors"
                          value={formData.visitors}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E53935] transition-colors"
                        >
                          {form.visitorsOptions.map((option) => (
                            <option key={option} value={option} className="bg-[#0B0B0D]">{option}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-sm text-white/80 mb-2">
                      {form.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder={form.messagePlaceholder}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#E53935] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {form.submittingText}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {form.submitText}
                      </>
                    )}
                  </button>

                  {contactFormConfig.privacyNotice && (
                    <p className="text-xs text-white/50 text-center">
                      {contactFormConfig.privacyNotice}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
