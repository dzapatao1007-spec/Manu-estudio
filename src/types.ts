export type ServiceCategory = 'all' | 'brows' | 'lashes' | 'micropigmentation' | 'combos' | 'care';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'brows' | 'lashes' | 'micropigmentation' | 'combos' | 'care';
  shortDescription: string;
  fullDescription: string;
  duration: string; // e.g. "1h 45m"
  price: number;
  popular?: boolean;
  tag?: string; // e.g. "Más Solicitado", "Efecto Polvo", "Fusión Natural"
  image: string;
  included: string[];
  idealFor: string;
  retouchTime?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  service: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  tag: string;
}

export interface LookbookItem {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'lashes' | 'brows' | 'general';
}

export interface HeroContent {
  pillTag: string;
  titleLine1: string;
  titleHighlight: string;
  subtitle: string;
  heroImage: string;
  floatingBadgeTitle: string;
  floatingBadgeSub: string;
  metric1Val: string;
  metric1Lbl: string;
  metric2Val: string;
  metric2Lbl: string;
  metric3Val: string;
  metric3Lbl: string;
}

export interface ManifestoContent {
  pillTag: string;
  title: string;
  body: string;
  pilar1Title: string;
  pilar1Desc: string;
  pilar2Title: string;
  pilar2Desc: string;
  pilar3Title: string;
  pilar3Desc: string;
}

export interface StudioInfo {
  name: string;
  slogan: string;
  tagline: string;
  logo?: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  instagram: string;
  instagramUrl?: string;
  address: string;
  city: string;
  schedule: string;
  email: string;
  promoActive?: boolean;
  promoText?: string;
  promoBadge?: string;
  promoCode?: string;
}

export interface BookingFormData {
  clientName: string;
  phone: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  stylePreference: string;
  notes: string;
  isFirstTime: boolean;
}
