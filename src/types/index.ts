// ============================================
// Farmacia Mozart — Type Definitions
// ============================================

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  openingHours: OpeningHour[];
  socialLinks: SocialLink[];
}

export interface OpeningHour {
  day: string;
  dayIndex: number; // 0=Dom, 1=Lun, ..., 6=Sab
  open: string;
  close: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Offer {
  _id: string;
  title: string;
  description?: string;
  originalPrice?: number;
  discountedPrice?: number;
  image?: SanityImage;
  badge?: string;
  active: boolean;
  order?: number;
  startDate?: string;
  endDate?: string;
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: Category;
  categorySlug?: string;
  image?: SanityImage;
  active?: boolean;
  order?: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  order?: number;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order?: number;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  profilePhoto?: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface Flyer {
  _id: string;
  title: string;
  image?: SanityImage;
  startDate?: string;
  endDate?: string;
  active: boolean;
  order?: number;
}

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}
