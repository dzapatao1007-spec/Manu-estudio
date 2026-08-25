import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  HeroContent,
  ManifestoContent,
  StudioInfo,
  ServiceItem,
  BeforeAfterItem,
  LookbookItem,
  FAQItem,
  ReviewItem
} from '../types';
import {
  DEFAULT_HERO,
  DEFAULT_MANIFESTO,
  DEFAULT_STUDIO_INFO,
  DEFAULT_SERVICES,
  DEFAULT_GALLERY,
  DEFAULT_LOOKBOOK,
  DEFAULT_ABOUT,
  DEFAULT_FAQS,
  DEFAULT_REVIEWS
} from '../data/defaultContent';
import { compressImageFile } from '../utils/imageCompressor';

interface AdminContextType {
  // Auth state
  isAdminLoggedIn: boolean;
  loginError: string | null;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;

  // Cloud sync status
  isSaving: boolean;
  saveSuccess: boolean;
  lastSavedText: string;

  // Content state
  hero: HeroContent;
  manifesto: ManifestoContent;
  studioInfo: StudioInfo;
  services: ServiceItem[];
  gallery: BeforeAfterItem[];
  lookbook: LookbookItem[];
  about: typeof DEFAULT_ABOUT;
  faqs: FAQItem[];
  reviews: ReviewItem[];

  // Mutators
  updateHero: (data: Partial<HeroContent>) => Promise<void>;
  updateManifesto: (data: Partial<ManifestoContent>) => Promise<void>;
  updateStudioInfo: (data: Partial<StudioInfo>) => Promise<void>;
  updateService: (service: ServiceItem) => Promise<void>;
  addService: (service: ServiceItem) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  updateGalleryItem: (item: BeforeAfterItem) => Promise<void>;
  addGalleryItem: (item: BeforeAfterItem) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  updateLookbookItem: (index: number, item: LookbookItem) => Promise<void>;
  addLookbookItem: (item: LookbookItem) => Promise<void>;
  deleteLookbookItem: (id: string) => Promise<void>;
  updateAbout: (data: Partial<typeof DEFAULT_ABOUT>) => Promise<void>;
  updateFaqs: (faqs: FAQItem[]) => Promise<void>;
  addFaq: (faq: FAQItem) => Promise<void>;
  updateFaq: (faq: FAQItem) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
  updateReviews: (reviews: ReviewItem[]) => Promise<void>;
  addReview: (review: ReviewItem) => Promise<void>;
  updateReview: (review: ReviewItem) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  exportBackupJson: () => string;
  importBackupJson: (jsonString: string) => Promise<boolean>;
  resetToDefaults: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const FIRESTORE_DOC_ID = 'main_content';
const FIRESTORE_COLLECTION = 'manu_studio_data';

const CURRENT_DATA_VERSION = '2026_manu_studio_v4_definitive';

// Helper function to check if services match current catalog
function isValidServiceList(list: unknown): list is ServiceItem[] {
  if (!Array.isArray(list) || list.length === 0) return false;
  const hasDiseno = list.some((s: any) => s && s.id === 'diseno-de-ceja');
  const hasPowder = list.some((s: any) => s && s.id === 'powder-brows');
  const hasLatin = list.some((s: any) => s && s.id === 'latin-brows');
  return hasDiseno && hasPowder && hasLatin;
}

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Clear stale cache if version mismatch or old schema
  if (typeof window !== 'undefined') {
    const cachedVersion = localStorage.getItem('manu_data_version');
    const cachedServices = localStorage.getItem('manu_services');
    let needsReset = cachedVersion !== CURRENT_DATA_VERSION;
    if (cachedServices) {
      try {
        const parsed = JSON.parse(cachedServices);
        if (!isValidServiceList(parsed)) {
          needsReset = true;
        }
      } catch {
        needsReset = true;
      }
    }
    if (needsReset) {
      localStorage.removeItem('manu_services');
      localStorage.removeItem('manu_about');
      localStorage.removeItem('manu_hero');
      localStorage.setItem('manu_data_version', CURRENT_DATA_VERSION);
    }
  }

  // Admin Auth State (No external Google login required)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('manu_admin_session') === 'true';
  });
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Sync state
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [lastSavedText, setLastSavedText] = useState<string>('Sincronizado con Firebase');

  // App Content
  const [hero, setHero] = useState<HeroContent>(() => {
    const saved = localStorage.getItem('manu_hero');
    return saved ? JSON.parse(saved) : DEFAULT_HERO;
  });

  const [manifesto, setManifesto] = useState<ManifestoContent>(() => {
    const saved = localStorage.getItem('manu_manifesto');
    return saved ? JSON.parse(saved) : DEFAULT_MANIFESTO;
  });

  const [studioInfo, setStudioInfo] = useState<StudioInfo>(() => {
    const saved = localStorage.getItem('manu_studio_info');
    return saved ? JSON.parse(saved) : DEFAULT_STUDIO_INFO;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('manu_services');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (isValidServiceList(parsed)) return parsed;
      } catch {
        // fallback
      }
    }
    return DEFAULT_SERVICES;
  });

  const [gallery, setGallery] = useState<BeforeAfterItem[]>(() => {
    const saved = localStorage.getItem('manu_gallery');
    return saved ? JSON.parse(saved) : DEFAULT_GALLERY;
  });

  const [lookbook, setLookbook] = useState<LookbookItem[]>(() => {
    const saved = localStorage.getItem('manu_lookbook');
    return saved ? JSON.parse(saved) : DEFAULT_LOOKBOOK;
  });

  const [about, setAbout] = useState<typeof DEFAULT_ABOUT>(() => {
    const saved = localStorage.getItem('manu_about');
    return saved ? JSON.parse(saved) : DEFAULT_ABOUT;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('manu_faqs');
    return saved ? JSON.parse(saved) : DEFAULT_FAQS;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('manu_reviews');
    return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
  });

  // Listen to Firebase Firestore changes in real-time
  useEffect(() => {
    try {
      const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC_ID);
      const unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            
            // Check if Firestore has valid new catalog
            const firestoreHasValidServices = isValidServiceList(data.services);
            
            if (!firestoreHasValidServices || data.version !== CURRENT_DATA_VERSION) {
              // Upgrade Firestore with definitive new services and about
              syncWholeDatabaseToFirebase({
                hero: DEFAULT_HERO,
                manifesto: DEFAULT_MANIFESTO,
                studioInfo: data.studioInfo || DEFAULT_STUDIO_INFO,
                services: DEFAULT_SERVICES,
                gallery: data.gallery || DEFAULT_GALLERY,
                lookbook: data.lookbook || DEFAULT_LOOKBOOK,
                about: DEFAULT_ABOUT,
                faqs: data.faqs || DEFAULT_FAQS,
                reviews: data.reviews || DEFAULT_REVIEWS
              });
              setServices(DEFAULT_SERVICES);
              setAbout(DEFAULT_ABOUT);
              localStorage.setItem('manu_services', JSON.stringify(DEFAULT_SERVICES));
              localStorage.setItem('manu_about', JSON.stringify(DEFAULT_ABOUT));
              return;
            }

            if (data.hero) {
              setHero(data.hero);
              localStorage.setItem('manu_hero', JSON.stringify(data.hero));
            }
            if (data.manifesto) {
              setManifesto(data.manifesto);
              localStorage.setItem('manu_manifesto', JSON.stringify(data.manifesto));
            }
            if (data.studioInfo) {
              setStudioInfo(data.studioInfo);
              localStorage.setItem('manu_studio_info', JSON.stringify(data.studioInfo));
            }
            if (data.services && isValidServiceList(data.services)) {
              setServices(data.services);
              localStorage.setItem('manu_services', JSON.stringify(data.services));
            }
            if (data.gallery && Array.isArray(data.gallery)) {
              setGallery(data.gallery);
              localStorage.setItem('manu_gallery', JSON.stringify(data.gallery));
            }
            if (data.lookbook && Array.isArray(data.lookbook)) {
              setLookbook(data.lookbook);
              localStorage.setItem('manu_lookbook', JSON.stringify(data.lookbook));
            }
            if (data.about) {
              setAbout(data.about);
              localStorage.setItem('manu_about', JSON.stringify(data.about));
            }
            if (data.faqs && Array.isArray(data.faqs)) {
              setFaqs(data.faqs);
              localStorage.setItem('manu_faqs', JSON.stringify(data.faqs));
            }
            if (data.reviews && Array.isArray(data.reviews)) {
              setReviews(data.reviews);
              localStorage.setItem('manu_reviews', JSON.stringify(data.reviews));
            }
            setLastSavedText('Conectado a Firebase ✓');
          } else {
            // First time seeding to Firestore
            syncWholeDatabaseToFirebase({
              hero: DEFAULT_HERO,
              manifesto: DEFAULT_MANIFESTO,
              studioInfo: DEFAULT_STUDIO_INFO,
              services: DEFAULT_SERVICES,
              gallery: DEFAULT_GALLERY,
              lookbook: DEFAULT_LOOKBOOK,
              about: DEFAULT_ABOUT,
              faqs: DEFAULT_FAQS,
              reviews: DEFAULT_REVIEWS
            });
          }
        },
        (error) => {
          console.warn('Firebase Firestore snapshot listener error (using local cache):', error);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore initialization error:', err);
    }
  }, []);

  // Helper to push full document to Firebase
  const syncWholeDatabaseToFirebase = async (dataToSync: {
    hero?: HeroContent;
    manifesto?: ManifestoContent;
    studioInfo?: StudioInfo;
    services?: ServiceItem[];
    gallery?: BeforeAfterItem[];
    lookbook?: LookbookItem[];
    about?: typeof DEFAULT_ABOUT;
    faqs?: FAQItem[];
    reviews?: ReviewItem[];
  }) => {
    setIsSaving(true);
    try {
      const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC_ID);
      const currentSnap = await getDoc(docRef);
      const existing = currentSnap.exists() ? currentSnap.data() : {};

      const payload = {
        ...existing,
        ...dataToSync,
        version: CURRENT_DATA_VERSION,
        updatedAt: new Date().toISOString()
      };

      await setDoc(docRef, payload, { merge: true });
      setSaveSuccess(true);
      setLastSavedText(`Guardado en Firebase (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      setLastSavedText('Guardado localmente (sin conexión a Firebase)');
    } finally {
      setIsSaving(false);
    }
  };

  // Auth Functions (Explicitly User: manu, Pass: manu123)
  const login = (user: string, pass: string): boolean => {
    const trimmedUser = user.trim().toLowerCase();
    const trimmedPass = pass.trim();

    if (trimmedUser === 'manu' && trimmedPass === 'manu123') {
      setIsAdminLoggedIn(true);
      setLoginError(null);
      setShowLoginModal(false);
      localStorage.setItem('manu_admin_session', 'true');
      return true;
    } else {
      setLoginError('Usuario o contraseña incorrectos. Recuerda: usuario "manu" y contraseña "manu123"');
      return false;
    }
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('manu_admin_session');
  };

  // Image Upload handler
  const uploadImage = async (file: File): Promise<string> => {
    return await compressImageFile(file, 1200, 0.85);
  };

  // Mutators
  const updateHero = async (data: Partial<HeroContent>) => {
    const updated = { ...hero, ...data };
    setHero(updated);
    localStorage.setItem('manu_hero', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ hero: updated });
  };

  const updateManifesto = async (data: Partial<ManifestoContent>) => {
    const updated = { ...manifesto, ...data };
    setManifesto(updated);
    localStorage.setItem('manu_manifesto', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ manifesto: updated });
  };

  const updateStudioInfo = async (data: Partial<StudioInfo>) => {
    const updated = { ...studioInfo, ...data };
    setStudioInfo(updated);
    localStorage.setItem('manu_studio_info', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ studioInfo: updated });
  };

  const updateService = async (service: ServiceItem) => {
    const updated = services.map((s) => (s.id === service.id ? service : s));
    setServices(updated);
    localStorage.setItem('manu_services', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ services: updated });
  };

  const addService = async (service: ServiceItem) => {
    const updated = [service, ...services];
    setServices(updated);
    localStorage.setItem('manu_services', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ services: updated });
  };

  const deleteService = async (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    localStorage.setItem('manu_services', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ services: updated });
  };

  const updateGalleryItem = async (item: BeforeAfterItem) => {
    const updated = gallery.map((g) => (g.id === item.id ? item : g));
    setGallery(updated);
    localStorage.setItem('manu_gallery', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ gallery: updated });
  };

  const addGalleryItem = async (item: BeforeAfterItem) => {
    const updated = [item, ...gallery];
    setGallery(updated);
    localStorage.setItem('manu_gallery', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ gallery: updated });
  };

  const deleteGalleryItem = async (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    localStorage.setItem('manu_gallery', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ gallery: updated });
  };

  const updateLookbookItem = async (index: number, item: LookbookItem) => {
    const updated = [...lookbook];
    updated[index] = item;
    setLookbook(updated);
    localStorage.setItem('manu_lookbook', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ lookbook: updated });
  };

  const addLookbookItem = async (item: LookbookItem) => {
    const updated = [item, ...lookbook];
    setLookbook(updated);
    localStorage.setItem('manu_lookbook', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ lookbook: updated });
  };

  const deleteLookbookItem = async (id: string) => {
    const updated = lookbook.filter((item) => item.id !== id);
    setLookbook(updated);
    localStorage.setItem('manu_lookbook', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ lookbook: updated });
  };

  const updateAbout = async (data: Partial<typeof DEFAULT_ABOUT>) => {
    const updated = { ...about, ...data };
    setAbout(updated);
    localStorage.setItem('manu_about', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ about: updated });
  };

  const updateFaqs = async (updatedFaqs: FAQItem[]) => {
    setFaqs(updatedFaqs);
    localStorage.setItem('manu_faqs', JSON.stringify(updatedFaqs));
    await syncWholeDatabaseToFirebase({ faqs: updatedFaqs });
  };

  const addFaq = async (faq: FAQItem) => {
    const updated = [...faqs, faq];
    setFaqs(updated);
    localStorage.setItem('manu_faqs', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ faqs: updated });
  };

  const updateFaq = async (faq: FAQItem) => {
    const updated = faqs.map((f) => (f.id === faq.id ? faq : f));
    setFaqs(updated);
    localStorage.setItem('manu_faqs', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ faqs: updated });
  };

  const deleteFaq = async (id: string) => {
    const updated = faqs.filter((f) => f.id !== id);
    setFaqs(updated);
    localStorage.setItem('manu_faqs', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ faqs: updated });
  };

  const updateReviews = async (updatedReviews: ReviewItem[]) => {
    setReviews(updatedReviews);
    localStorage.setItem('manu_reviews', JSON.stringify(updatedReviews));
    await syncWholeDatabaseToFirebase({ reviews: updatedReviews });
  };

  const addReview = async (review: ReviewItem) => {
    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem('manu_reviews', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ reviews: updated });
  };

  const updateReview = async (review: ReviewItem) => {
    const updated = reviews.map((r) => (r.id === review.id ? review : r));
    setReviews(updated);
    localStorage.setItem('manu_reviews', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ reviews: updated });
  };

  const deleteReview = async (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    localStorage.setItem('manu_reviews', JSON.stringify(updated));
    await syncWholeDatabaseToFirebase({ reviews: updated });
  };

  const exportBackupJson = (): string => {
    const backupData = {
      hero,
      manifesto,
      studioInfo,
      services,
      gallery,
      lookbook,
      about,
      faqs,
      reviews,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(backupData, null, 2);
  };

  const importBackupJson = async (jsonString: string): Promise<boolean> => {
    try {
      const data = JSON.parse(jsonString);
      if (data.hero) setHero(data.hero);
      if (data.manifesto) setManifesto(data.manifesto);
      if (data.studioInfo) setStudioInfo(data.studioInfo);
      if (data.services) setServices(data.services);
      if (data.gallery) setGallery(data.gallery);
      if (data.lookbook) setLookbook(data.lookbook);
      if (data.about) setAbout(data.about);
      if (data.faqs) setFaqs(data.faqs);
      if (data.reviews) setReviews(data.reviews);

      if (data.hero) localStorage.setItem('manu_hero', JSON.stringify(data.hero));
      if (data.manifesto) localStorage.setItem('manu_manifesto', JSON.stringify(data.manifesto));
      if (data.studioInfo) localStorage.setItem('manu_studio_info', JSON.stringify(data.studioInfo));
      if (data.services) localStorage.setItem('manu_services', JSON.stringify(data.services));
      if (data.gallery) localStorage.setItem('manu_gallery', JSON.stringify(data.gallery));
      if (data.lookbook) localStorage.setItem('manu_lookbook', JSON.stringify(data.lookbook));
      if (data.about) localStorage.setItem('manu_about', JSON.stringify(data.about));
      if (data.faqs) localStorage.setItem('manu_faqs', JSON.stringify(data.faqs));
      if (data.reviews) localStorage.setItem('manu_reviews', JSON.stringify(data.reviews));

      await syncWholeDatabaseToFirebase({
        hero: data.hero,
        manifesto: data.manifesto,
        studioInfo: data.studioInfo,
        services: data.services,
        gallery: data.gallery,
        lookbook: data.lookbook,
        about: data.about,
        faqs: data.faqs,
        reviews: data.reviews
      });
      return true;
    } catch (e) {
      console.error('Error importing JSON backup:', e);
      return false;
    }
  };

  const resetToDefaults = async () => {
    setHero(DEFAULT_HERO);
    setManifesto(DEFAULT_MANIFESTO);
    setStudioInfo(DEFAULT_STUDIO_INFO);
    setServices(DEFAULT_SERVICES);
    setGallery(DEFAULT_GALLERY);
    setLookbook(DEFAULT_LOOKBOOK);
    setAbout(DEFAULT_ABOUT);
    setFaqs(DEFAULT_FAQS);
    setReviews(DEFAULT_REVIEWS);

    localStorage.removeItem('manu_hero');
    localStorage.removeItem('manu_manifesto');
    localStorage.removeItem('manu_studio_info');
    localStorage.removeItem('manu_services');
    localStorage.removeItem('manu_gallery');
    localStorage.removeItem('manu_lookbook');
    localStorage.removeItem('manu_about');
    localStorage.removeItem('manu_faqs');
    localStorage.removeItem('manu_reviews');

    await syncWholeDatabaseToFirebase({
      hero: DEFAULT_HERO,
      manifesto: DEFAULT_MANIFESTO,
      studioInfo: DEFAULT_STUDIO_INFO,
      services: DEFAULT_SERVICES,
      gallery: DEFAULT_GALLERY,
      lookbook: DEFAULT_LOOKBOOK,
      about: DEFAULT_ABOUT,
      faqs: DEFAULT_FAQS,
      reviews: DEFAULT_REVIEWS
    });
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        loginError,
        login,
        logout,
        showLoginModal,
        setShowLoginModal,
        isSaving,
        saveSuccess,
        lastSavedText,
        hero,
        manifesto,
        studioInfo,
        services,
        gallery,
        lookbook,
        about,
        faqs,
        reviews,
        updateHero,
        updateManifesto,
        updateStudioInfo,
        updateService,
        addService,
        deleteService,
        updateGalleryItem,
        addGalleryItem,
        deleteGalleryItem,
        updateLookbookItem,
        addLookbookItem,
        deleteLookbookItem,
        updateAbout,
        updateFaqs,
        addFaq,
        updateFaq,
        deleteFaq,
        updateReviews,
        addReview,
        updateReview,
        deleteReview,
        uploadImage,
        exportBackupJson,
        importBackupJson,
        resetToDefaults
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
