// =============================================================================
// Bigtyme Properties Configuration
// =============================================================================
// All site content is configured here. Components render nothing when their
// primary config fields are empty strings or empty arrays.
// =============================================================================

// -----------------------------------------------------------------------------
// Site Config
// -----------------------------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
  keywords: string;
  ogImage: string;
  canonical: string;
}

export const siteConfig: SiteConfig = {
  title: "Bigtyme Properties - Setting New Standards in Modern Living",
  description: "Discover Exclusive Lands and Properties That Transcend Expectations. Bigtyme Properties develops residences and mixed-use spaces in Kenya.",
  language: "en",
  keywords: "real estate, property, Kenya, land, houses, residential, commercial, Bigtyme Properties",
  ogImage: "/images/hero_skyline.jpg",
  canonical: "https://bigtyme.properties",
};

// -----------------------------------------------------------------------------
// Navigation Config
// -----------------------------------------------------------------------------
export interface NavDropdownItem {
  name: string;
  href: string;
}

export interface NavLink {
  name: string;
  href: string;
  icon: string;
  dropdown?: NavDropdownItem[];
}

export interface NavigationConfig {
  brandName: string;
  brandSubname: string;
  tagline: string;
  navLinks: NavLink[];
  ctaButtonText: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "BIGTYME",
  brandSubname: "Properties",
  tagline: "your property partner",
  navLinks: [
    { name: "Home", href: "#hero", icon: "Home" },
    { name: "Properties", href: "#properties", icon: "Building" },
    { name: "Services", href: "#services", icon: "Briefcase" },
    { name: "About Us", href: "#about", icon: "Users" },
    { name: "Contact Us", href: "#contact", icon: "Mail" },
  ],
  ctaButtonText: "Book a Tour",
};

// -----------------------------------------------------------------------------
// Preloader Config
// -----------------------------------------------------------------------------
export interface PreloaderConfig {
  brandName: string;
  brandSubname: string;
  yearText: string;
}

export const preloaderConfig: PreloaderConfig = {
  brandName: "BIGTYME",
  brandSubname: "Properties",
  yearText: "Est. 2015",
};

// -----------------------------------------------------------------------------
// Hero Config
// -----------------------------------------------------------------------------
export interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

export interface HeroConfig {
  scriptText: string;
  mainTitle: string;
  description: string;
  ctaButtonText: string;
  ctaTarget: string;
  stats: HeroStat[];
  decorativeText: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  scriptText: "BIGTYME PROPERTIES",
  mainTitle: "Setting New Standards\nin Modern Living.",
  description: "Discover Exclusive Lands and Properties That Transcend Expectations.",
  ctaButtonText: "Explore Developments",
  ctaTarget: "#properties",
  stats: [
    { value: 120, suffix: "+", label: "Projects Delivered" },
    { value: 6, suffix: "", label: "Cities" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
  ],
  decorativeText: "SCROLL",
  backgroundImage: "/images/hero_skyline.jpg",
};

// -----------------------------------------------------------------------------
// Properties Showcase Config (adapted from WineShowcase)
// -----------------------------------------------------------------------------
export interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  image: string;
  description: string;
  features: string[];
  size: string;
  type: string;
}

export interface PropertyFeature {
  icon: string;
  title: string;
  description: string;
}

export interface PropertyQuote {
  text: string;
  attribution: string;
  prefix: string;
}

export interface PropertiesShowcaseConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  properties: Property[];
  features: PropertyFeature[];
  quote: PropertyQuote;
}

export const propertiesShowcaseConfig: PropertiesShowcaseConfig = {
  scriptText: "Popular Residencies",
  subtitle: "BEST CHOICES",
  mainTitle: "Discover Exclusive Lands and Properties",
  properties: [
    {
      id: "1",
      name: "KAJIADO-Ildamart",
      location: "Kajiado",
      price: "Ksh. 400,000",
      image: "/images/dev_project_a.jpg",
      description: "1/8 ACRE (50x100) 3kms from Kajiado district hospital. Ideal for residential, commercial, agricultural.",
      features: ["50x100 Plot", "3km from Hospital", "Mixed Use"],
      size: "1/8 Acre",
      type: "Land",
    },
    {
      id: "2",
      name: "KAJIADO-Tinga Oletepesi",
      location: "Kajiado",
      price: "Ksh. 800,000",
      image: "/images/dev_project_b.jpg",
      description: "1 ACRE Approx. 4kms from Tinga shopping Centre, 65kms from Nairobi, off Magadi road. Ideal for residential.",
      features: ["1 Acre", "Near Shopping Center", "Magadi Road"],
      size: "1 Acre",
      type: "Land",
    },
    {
      id: "3",
      name: "Katani Estate opposite Seme Primary",
      location: "Katani",
      price: "Ksh. 1,600,000",
      image: "/images/dev_project_c.jpg",
      description: "Katani Estate, opposite Seme primary 50x100. Approx.10kms from Msa rd.",
      features: ["50x100 Plot", "Near School", "10km from Msa Rd"],
      size: "50x100",
      type: "Land",
    },
    {
      id: "4",
      name: "Syokimau, Mwananchi rd Victory court",
      location: "Syokimau",
      price: "Ksh. 4,900,000",
      image: "/images/interior_hero.jpg",
      description: "Syokimau, Mwananchi rd Victory court 50x100. Approx.3.5kms from Msa rd.",
      features: ["50x100 Plot", "Victory Court", "3.5km from Msa Rd"],
      size: "50x100",
      type: "Land",
    },
  ],
  features: [
    { icon: "MapPin", title: "Prime Locations", description: "Properties in strategic areas with high growth potential" },
    { icon: "Shield", title: "Secure Investment", description: "All properties with clear title deeds and legal documentation" },
    { icon: "TrendingUp", title: "High Returns", description: "Consistent appreciation in fast-growing neighborhoods" },
    { icon: "Users", title: "Expert Guidance", description: "Professional advice on land matters and investments" },
  ],
  quote: {
    text: "We don't just sell land; we help you build your future.",
    attribution: "Bigtyme Properties Team",
    prefix: "Our Promise",
  },
};

// -----------------------------------------------------------------------------
// Featured Properties Carousel Config (adapted from WineryCarousel)
// -----------------------------------------------------------------------------
export interface CarouselSlide {
  image: string;
  title: string;
  subtitle: string;
  area: string;
  unit: string;
  description: string;
}

export interface FeaturedCarouselConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  locationTag: string;
  slides: CarouselSlide[];
}

export const featuredCarouselConfig: FeaturedCarouselConfig = {
  scriptText: "Featured Projects",
  subtitle: "PREMIUM DEVELOPMENTS",
  mainTitle: "Our Signature Developments",
  locationTag: "Nairobi, Kenya",
  slides: [
    {
      image: "/images/dev_project_a.jpg",
      title: "Northline Residences",
      subtitle: "Modern Courtyard Living",
      area: "45",
      unit: "units",
      description: "A calm courtyard community with private terraces and a connected walkway to the city.",
    },
    {
      image: "/images/dev_project_b.jpg",
      title: "Skyline Towers",
      subtitle: "Luxury Apartments",
      area: "120",
      unit: "apartments",
      description: "Contemporary high-rise living with panoramic city views and world-class amenities.",
    },
    {
      image: "/images/invest_image.jpg",
      title: "Metropolitan Heights",
      subtitle: "Urban Excellence",
      area: "200",
      unit: "units",
      description: "Premium residential tower in the heart of the business district.",
    },
  ],
};

// -----------------------------------------------------------------------------
// About/Services Config (adapted from Museum)
// -----------------------------------------------------------------------------
export interface TimelineEvent {
  year: string;
  event: string;
}

export interface ServiceTabContent {
  title: string;
  description: string;
  highlight: string;
}

export interface ServiceTab {
  id: string;
  name: string;
  icon: string;
  image: string;
  content: ServiceTabContent;
}

export interface ServiceQuote {
  prefix: string;
  text: string;
  attribution: string;
}

export interface AboutConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  timeline: TimelineEvent[];
  tabs: ServiceTab[];
  openingHours: string;
  openingHoursLabel: string;
  ctaButtonText: string;
  yearBadge: string;
  yearBadgeLabel: string;
  quote: ServiceQuote;
  founderPhotoAlt: string;
  founderPhoto: string;
}

export const aboutConfig: AboutConfig = {
  scriptText: "The Bigtyme Story",
  subtitle: "ABOUT US",
  mainTitle: "WE DEAL IN DIFFERENT\nTYPES OF PROPERTIES.",
  introText: "Welcome to Bigtyme Properties, Your Property Partner. Our journey is not just about real estate; it's about creating a tapestry of experiences and possibilities. Our primary objective is to link land buyers and sellers in relation to acquisition and disposal.",
  timeline: [
    { year: "2015", event: "Company Founded" },
    { year: "2018", event: "Expanded to 3 Cities" },
    { year: "2021", event: "100+ Projects Delivered" },
    { year: "2024", event: "Industry Leader" },
  ],
  tabs: [
    {
      id: "land",
      name: "Land",
      icon: "MapPin",
      image: "/images/design_split_image.jpg",
      content: {
        title: "Premium Land Solutions",
        description: "We offer residential, commercial, industrial, agricultural, and speculation land options across Kenya.",
        highlight: "Clear title deeds guaranteed",
      },
    },
    {
      id: "houses",
      name: "Houses",
      icon: "Home",
      image: "/images/interior_hero.jpg",
      content: {
        title: "Quality Housing",
        description: "From standalone single dwellings to apartments and multi-dwelling units, find your perfect home.",
        highlight: "Modern designs, prime locations",
      },
    },
    {
      id: "services",
      name: "Professional Services",
      icon: "Briefcase",
      image: "/images/dev_project_c.jpg",
      content: {
        title: "End-to-End Services",
        description: "Construction, architectural design, land survey, valuation, electrical, and plumbing works.",
        highlight: "One-stop property solution",
      },
    },
  ],
  openingHours: "Mon–Fri, 9am–6pm",
  openingHoursLabel: "Office Hours",
  ctaButtonText: "Contact Us",
  yearBadge: "2015",
  yearBadgeLabel: "Founded",
  quote: {
    prefix: "Our Vision",
    text: "Our vision is to make all people live in the best places.",
    attribution: "Bigtyme Properties",
  },
  founderPhotoAlt: "Bigtyme Properties Team",
  founderPhoto: "/images/design_split_image.jpg",
};

// -----------------------------------------------------------------------------
// Testimonials Config (adapted from News)
// -----------------------------------------------------------------------------
export interface NewsArticle {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface StoryQuote {
  prefix: string;
  text: string;
  attribution: string;
}

export interface StoryTimelineItem {
  value: string;
  label: string;
}

export interface TestimonialsConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  viewAllText: string;
  readMoreText: string;
  articles: NewsArticle[];
  testimonialsScriptText: string;
  testimonialsSubtitle: string;
  testimonialsMainTitle: string;
  testimonials: Testimonial[];
  storyScriptText: string;
  storySubtitle: string;
  storyTitle: string;
  storyParagraphs: string[];
  storyTimeline: StoryTimelineItem[];
  storyQuote: StoryQuote;
  storyImage: string;
  storyImageCaption: string;
}

export const testimonialsConfig: TestimonialsConfig = {
  scriptText: "Testimonials",
  subtitle: "WHAT OUR CUSTOMERS SAY",
  mainTitle: "Client Success Stories",
  viewAllText: "View All Stories",
  readMoreText: "Read More",
  articles: [
    {
      id: 1,
      image: "/images/dev_project_a.jpg",
      title: "First-Time Buyer Success",
      excerpt: "How we helped a young family find their dream plot in Kajiado.",
      date: "Jan 2024",
      category: "Success Story",
    },
    {
      id: 2,
      image: "/images/dev_project_b.jpg",
      title: "Investment Portfolio Growth",
      excerpt: "Building a real estate portfolio with strategic land acquisitions.",
      date: "Dec 2023",
      category: "Investment",
    },
    {
      id: 3,
      image: "/images/interior_hero.jpg",
      title: "Commercial Development",
      excerpt: "Transforming raw land into a thriving business complex.",
      date: "Nov 2023",
      category: "Development",
    },
  ],
  testimonialsScriptText: "Reviews",
  testimonialsSubtitle: "CLIENT FEEDBACK",
  testimonialsMainTitle: "What Our Customers Say",
  testimonials: [
    {
      name: "Frank (Pilot)",
      role: "Purchase of plot in Katani",
      text: "Working with Bigtyme Properties has been an exceptional experience. From the initial consultation to the final purchase of my land in Katani, their team provided professional, efficient, and seamless service every step of the way.",
      rating: 5,
    },
    {
      name: "Catherine",
      role: "Sell of Utawala and Ildamart Plots",
      text: "I am pleased to recommend Bigtyme for their exceptional real estate services. During my experience with them, they consistently demonstrated professionalism, expertise, and dedication.",
      rating: 5,
    },
    {
      name: "Jimmy (Car dealer)",
      role: "Purchase of Plot in Syokimau Airport Road",
      text: "The process was smooth and genuine. I can recommend your services anyday!",
      rating: 5,
    },
    {
      name: "Kaane",
      role: "Sell of Ildamart and Kisaju plots",
      text: "Your services were great, I needed finances and you assisted me sale My plots. I recommend you to other people who need the services. Good Job!",
      rating: 5,
    },
    {
      name: "Lucy",
      role: "Sell of plot in Katani (Standards Court)",
      text: "I really appreciate services you provided during the sale of my Katani Land. After mentioning to you of my intention to dispose off the land, it took a very short time to get a buyer.",
      rating: 5,
    },
    {
      name: "Billmartin (Police Sacco)",
      role: "Purchase of Plot Syokimau Katani Road (Azuri Court)",
      text: "A true expert! It's rare to meet someone as knowledgeable and approachable as Job of Bigtyme Properties Company. He clearly explained everything, answered all my questions.",
      rating: 5,
    },
  ],
  storyScriptText: "Our Journey",
  storySubtitle: "THE BIGTYME STORY",
  storyTitle: "Building Dreams Since 2015",
  storyParagraphs: [
    "Our head office is located in Syokimau, Machakos County with a Branch office in Luanda Town, Vihiga County. We have a team of highly knowledgeable, motivated and dedicated personnel who offer professional advice to clients on land matters.",
    "From first sketch to final handover, we keep the human experience at the center of everything we do.",
  ],
  storyTimeline: [
    { value: "120+", label: "Projects" },
    { value: "6", label: "Cities" },
    { value: "98%", label: "Satisfaction" },
  ],
  storyQuote: {
    prefix: "Our Mission",
    text: "To provide exceptional real estate services that exceed client expectations and build lasting relationships.",
    attribution: "Bigtyme Properties",
  },
  storyImage: "/images/city_living_street.jpg",
  storyImageCaption: "Bigtyme Properties - Your Property Partner",
};

// -----------------------------------------------------------------------------
// Core Values Config
// -----------------------------------------------------------------------------
export interface CoreValue {
  icon: string;
  title: string;
  description: string;
}

export interface CoreValuesConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  values: CoreValue[];
}

export const coreValuesConfig: CoreValuesConfig = {
  scriptText: "Values",
  subtitle: "OUR CORE VALUES",
  mainTitle: "What We Stand For",
  values: [
    {
      icon: "Lightbulb",
      title: "Innovation",
      description: "Embracing creativity and technology to redefine the real estate landscape.",
    },
    {
      icon: "Users",
      title: "Community",
      description: "Building not just properties, but vibrant communities that thrive together.",
    },
    {
      icon: "Shield",
      title: "Integrity",
      description: "Upholding honesty and transparency in every interaction and transaction.",
    },
  ],
};

// -----------------------------------------------------------------------------
// Contact Form Config
// -----------------------------------------------------------------------------
export interface ContactInfoItem {
  icon: string;
  label: string;
  value: string;
  subtext: string;
}

export interface ContactFormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  visitDateLabel: string;
  visitorsLabel: string;
  visitorsOptions: string[];
  messageLabel: string;
  messagePlaceholder: string;
  submitText: string;
  submittingText: string;
  successMessage: string;
  errorMessage: string;
}

export interface ContactFormConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  contactInfoTitle: string;
  contactInfo: ContactInfoItem[];
  form: ContactFormFields;
  privacyNotice: string;
  formEndpoint: string;
}

export const contactFormConfig: ContactFormConfig = {
  scriptText: "Contact Us",
  subtitle: "GET IN TOUCH",
  mainTitle: "Easy To Contact Us",
  introText: "Ready to embark on your real estate journey with Bigtyme Properties? Connect with us today. Our dedicated team is here to guide you through every step.",
  contactInfoTitle: "Contact Information",
  contactInfo: [
    { icon: "Phone", label: "Call", value: "+254 721 162 028", subtext: "Mon–Fri, 9am–6pm" },
    { icon: "Phone", label: "Call", value: "+254 719 721 708", subtext: "Alternative number" },
    { icon: "Mail", label: "Email", value: "bigtymeproperties@gmail.com", subtext: "We reply within 24hrs" },
    { icon: "MessageCircle", label: "Whatsapp", value: "+254 721 162 028", subtext: "Chat with us" },
  ],
  form: {
    nameLabel: "Your Name",
    namePlaceholder: "Enter your full name",
    emailLabel: "Your Email",
    emailPlaceholder: "Enter your email address",
    phoneLabel: "Phone Number",
    phonePlaceholder: "Enter your phone number",
    visitDateLabel: "Preferred Visit Date",
    visitorsLabel: "Property Interest",
    visitorsOptions: ["Land", "House", "Commercial", "Investment", "Other"],
    messageLabel: "Your Message",
    messagePlaceholder: "Tell us what you're looking for...",
    submitText: "Send Message",
    submittingText: "Sending...",
    successMessage: "Thank you! We'll get back to you within 24 hours.",
    errorMessage: "Something went wrong. Please try again.",
  },
  privacyNotice: "By submitting this form, you agree to our privacy policy.",
  formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
};

// -----------------------------------------------------------------------------
// Footer Config
// -----------------------------------------------------------------------------
export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterContactItem {
  icon: string;
  text: string;
}

export interface FooterConfig {
  brandName: string;
  tagline: string;
  description: string;
  socialLinks: SocialLink[];
  linkGroups: FooterLinkGroup[];
  contactItems: FooterContactItem[];
  newsletterLabel: string;
  newsletterSubtitle: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSuccessText: string;
  newsletterErrorText: string;
  newsletterEndpoint: string;
  copyrightText: string;
  legalLinks: string[];
  icpText: string;
  backToTopText: string;
  ageVerificationText: string;
}

export const footerConfig: FooterConfig = {
  brandName: "BIGTYME",
  tagline: "Properties",
  description: "Our vision is to make all people live in the best places. Your trusted property partner in Kenya.",
  socialLinks: [
    { icon: "Facebook", label: "BigtymeProperties", href: "https://facebook.com/BigtymeProperties" },
    { icon: "Instagram", label: "Bigtyme.Properties", href: "https://instagram.com/Bigtyme.Properties" },
    { icon: "Twitter", label: "@Bigtymepropert1", href: "https://twitter.com/Bigtymepropert1" },
    { icon: "Video", label: "@bigtyme_properties", href: "https://tiktok.com/@bigtyme_properties" },
  ],
  linkGroups: [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "#hero" },
        { name: "Properties", href: "#properties" },
        { name: "Services", href: "#services" },
        { name: "About Us", href: "#about" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "Properties", href: "#properties" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ],
    },
  ],
  contactItems: [
    { icon: "MapPin", text: "Syokimau, Kenya" },
    { icon: "Phone", text: "+254 721 162 028" },
    { icon: "Mail", text: "bigtymeproperties@gmail.com" },
  ],
  newsletterLabel: "Download our FREE Land Buyer's Guide",
  newsletterSubtitle: "5 Things to Check Before Buying Land in Syokimau. Sent to your email instantly.",
  newsletterPlaceholder: "Enter your email for the guide",
  newsletterButtonText: "Get Free Guide",
  newsletterSuccessText: "Success! Check your email for the guide.",
  newsletterErrorText: "Please try again.",
  newsletterEndpoint: "https://formspree.io/f/YOUR_NEWSLETTER_ID",
  copyrightText: "Copyright © 2026 Bigtyme Properties. All rights reserved.",
  legalLinks: ["Privacy Policy", "Terms of Service"],
  icpText: "",
  backToTopText: "Back to top",
  ageVerificationText: "",
};

// -----------------------------------------------------------------------------
// Scroll To Top Config
// -----------------------------------------------------------------------------
export interface ScrollToTopConfig {
  ariaLabel: string;
}

export const scrollToTopConfig: ScrollToTopConfig = {
  ariaLabel: "Back to top",
};

// -----------------------------------------------------------------------------
// WhatsApp Config
// -----------------------------------------------------------------------------
export interface WhatsAppConfig {
  phoneNumber: string;
  message: string;
  ariaLabel: string;
}

export const whatsappConfig: WhatsAppConfig = {
  phoneNumber: "+254721162028",
  message: "Hello Bigtyme Properties, I'm interested in your properties. Could you please provide more information?",
  ariaLabel: "Chat with us on WhatsApp",
};
