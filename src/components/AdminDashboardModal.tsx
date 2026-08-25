import React, { useState, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  Crown,
  X,
  Sparkles,
  Plus,
  Trash2,
  Edit,
  Save,
  Check,
  Upload,
  Image as ImageIcon,
  Phone,
  Settings,
  RefreshCw,
  Download,
  FileText,
  Star,
  HelpCircle,
  Clock,
  Layers,
  Heart,
  Eye,
  Tag,
  Gift,
  Search,
  ChevronRight,
  User
} from 'lucide-react';
import { ServiceItem, BeforeAfterItem, LookbookItem, FAQItem, ReviewItem } from '../types';
import { EditServiceModal } from './EditServiceModal';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 'overview' | 'services' | 'gallery' | 'lookbook' | 'reviews' | 'faqs' | 'contact' | 'about' | 'promo' | 'backup';

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const {
    services,
    gallery,
    lookbook,
    reviews,
    faqs,
    studioInfo,
    about,
    manifesto,
    hero,
    isSaving,
    saveSuccess,
    lastSavedText,
    updateStudioInfo,
    updateAbout,
    updateHero,
    updateManifesto,
    addService,
    updateService,
    deleteService,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    addLookbookItem,
    deleteLookbookItem,
    addReview,
    updateReview,
    deleteReview,
    addFaq,
    updateFaq,
    deleteFaq,
    uploadImage,
    exportBackupJson,
    importBackupJson,
    resetToDefaults
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isCreatingService, setIsCreatingService] = useState<boolean>(false);
  const [serviceSearch, setServiceSearch] = useState<string>('');

  // Gallery item form state
  const [newGalleryItem, setNewGalleryItem] = useState<Partial<BeforeAfterItem>>({
    title: '',
    service: 'Pestañas Clásicas',
    description: '',
    beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    afterImage: '/src/assets/images/eyelash_extensions_1787346129559.jpg',
    tag: 'Efecto Natural'
  });
  const [showAddGallery, setShowAddGallery] = useState<boolean>(false);

  // Lookbook form state
  const [newLookbookUrl, setNewLookbookUrl] = useState<string>('');
  const [newLookbookTitle, setNewLookbookTitle] = useState<string>('');
  const [newLookbookCategory, setNewLookbookCategory] = useState<string>('Pestañas');
  const [uploadingLookbook, setUploadingLookbook] = useState<boolean>(false);
  const lookbookFileRef = useRef<HTMLInputElement>(null);

  // FAQ form state
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [newFaq, setNewFaq] = useState<Partial<FAQItem>>({
    question: '',
    answer: '',
    category: 'lashes'
  });
  const [showAddFaq, setShowAddFaq] = useState<boolean>(false);

  // Review form state
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);
  const [newReview, setNewReview] = useState<Partial<ReviewItem>>({
    name: '',
    service: 'Pestañas Híbridas',
    rating: 5,
    comment: '',
    date: 'Reciente',
    verified: true
  });
  const [showAddReview, setShowAddReview] = useState<boolean>(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({ ...studioInfo });

  // Promo form state
  const [promoForm, setPromoForm] = useState({
    promoActive: studioInfo.promoActive ?? true,
    promoText: studioInfo.promoText ?? '✨ PROMOCIÓN VIP: 15% OFF en Dúo Lifting + Laminado con el código #MANUGLOW ✨',
    promoBadge: studioInfo.promoBadge ?? 'Descuento Exclusivo',
    promoCode: studioInfo.promoCode ?? 'MANUGLOW'
  });

  // About form state
  const [aboutForm, setAboutForm] = useState({
    greeting: about.greeting || 'Hola, soy Manuela',
    tagline: about.tagline || '',
    bio1: about.bio1 || '',
    bio2: about.bio2 || '',
    bio3: about.bio3 || '',
    portraitImage: about.portraitImage || '/src/assets/images/manu_founder_portrait_1787431485341.jpg'
  });
  const aboutFileRef = useRef<HTMLInputElement>(null);
  const [uploadingAboutImg, setUploadingAboutImg] = useState<boolean>(false);

  // Backup import file ref
  const backupFileRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter services
  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
    s.category.toLowerCase().includes(serviceSearch.toLowerCase()) ||
    (s.tag && s.tag.toLowerCase().includes(serviceSearch.toLowerCase()))
  );

  // Lookbook image upload handler
  const handleLookbookFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLookbook(true);
    try {
      const base64 = await uploadImage(file);
      await addLookbookItem({
        id: `lb-${Date.now()}`,
        url: base64,
        title: newLookbookTitle || 'Resultado Manu Studio',
        category: newLookbookCategory
      });
      setNewLookbookTitle('');
      if (lookbookFileRef.current) lookbookFileRef.current.value = '';
    } catch (err) {
      console.error(err);
      alert('Error al procesar la imagen');
    } finally {
      setUploadingLookbook(false);
    }
  };

  const handleAddLookbookUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLookbookUrl) return;
    await addLookbookItem({
      id: `lb-${Date.now()}`,
      url: newLookbookUrl,
      title: newLookbookTitle || 'Foto Lookbook',
      category: newLookbookCategory
    });
    setNewLookbookUrl('');
    setNewLookbookTitle('');
  };

  // Gallery add handler
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.title || !newGalleryItem.beforeImage || !newGalleryItem.afterImage) {
      alert('Completa el título y ambas fotos del antes y después');
      return;
    }
    await addGalleryItem({
      id: `ba-${Date.now()}`,
      title: newGalleryItem.title,
      service: newGalleryItem.service || 'Servicio de Belleza',
      description: newGalleryItem.description || '',
      beforeImage: newGalleryItem.beforeImage,
      afterImage: newGalleryItem.afterImage,
      tag: newGalleryItem.tag || 'Resultado VIP'
    });
    setShowAddGallery(false);
    setNewGalleryItem({
      title: '',
      service: 'Pestañas Clásicas',
      description: '',
      beforeImage: '',
      afterImage: '',
      tag: 'Efecto Natural'
    });
  };

  // FAQ add & edit
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaq) {
      await updateFaq(editingFaq);
      setEditingFaq(null);
    } else if (newFaq.question && newFaq.answer) {
      await addFaq({
        id: `faq-${Date.now()}`,
        question: newFaq.question,
        answer: newFaq.answer,
        category: (newFaq.category as any) || 'lashes'
      });
      setShowAddFaq(false);
      setNewFaq({ question: '', answer: '', category: 'lashes' });
    }
  };

  // Review add & edit
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReview) {
      await updateReview(editingReview);
      setEditingReview(null);
    } else if (newReview.name && newReview.comment) {
      await addReview({
        id: `rev-${Date.now()}`,
        name: newReview.name,
        service: newReview.service || 'Pestañas Híbridas',
        rating: newReview.rating || 5,
        comment: newReview.comment,
        date: newReview.date || 'Reciente',
        verified: newReview.verified ?? true
      });
      setShowAddReview(false);
      setNewReview({
        name: '',
        service: 'Pestañas Híbridas',
        rating: 5,
        comment: '',
        date: 'Reciente',
        verified: true
      });
    }
  };

  // Save Contact
  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStudioInfo(contactForm);
    alert('¡Información de contacto guardada y sincronizada en Firebase!');
  };

  // Save Promo
  const handleSavePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStudioInfo({
      promoActive: promoForm.promoActive,
      promoText: promoForm.promoText,
      promoBadge: promoForm.promoBadge,
      promoCode: promoForm.promoCode
    });
    alert('¡Configuración de la promoción guardada!');
  };

  // Save About
  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAbout(aboutForm);
    alert('¡Página "Sobre mí" actualizada y sincronizada en Firebase!');
  };

  // Upload About Portrait
  const handleAboutPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAboutImg(true);
    try {
      const base64 = await uploadImage(file);
      setAboutForm((prev) => ({ ...prev, portraitImage: base64 }));
      await updateAbout({ portraitImage: base64 });
      alert('¡Foto de Manu actualizada con éxito!');
    } catch (err) {
      console.error(err);
      alert('Error al subir la imagen');
    } finally {
      setUploadingAboutImg(false);
    }
  };

  // Export JSON
  const handleDownloadBackup = () => {
    const json = exportBackupJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_manu_studio_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      if (text) {
        const success = await importBackupJson(text);
        if (success) {
          setImportStatus('¡Copia de seguridad restaurada con éxito en Firebase!');
          setTimeout(() => setImportStatus(null), 4000);
        } else {
          setImportStatus('Error al leer el archivo JSON.');
        }
      }
    };
    reader.readAsText(file);
  };

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Resumen & Estado', icon: <Crown className="w-4 h-4 text-[#C59B27]" /> },
    { id: 'services', label: 'Servicios & Precios', icon: <Sparkles className="w-4 h-4 text-[#E61E78]" />, badge: services.length },
    { id: 'gallery', label: 'Antes & Después', icon: <Eye className="w-4 h-4 text-[#8F6317]" />, badge: gallery.length },
    { id: 'lookbook', label: 'Lookbook de Fotos', icon: <ImageIcon className="w-4 h-4 text-[#E61E78]" />, badge: lookbook.length },
    { id: 'reviews', label: 'Testimonios Clientas', icon: <Star className="w-4 h-4 text-[#C59B27]" />, badge: reviews.length },
    { id: 'faqs', label: 'Preguntas Frecuentes', icon: <HelpCircle className="w-4 h-4 text-[#8F6317]" />, badge: faqs.length },
    { id: 'about', label: 'Sobre Mí (Historia)', icon: <Heart className="w-4 h-4 text-[#E61E78]" /> },
    { id: 'contact', label: 'Contacto & WhatsApp', icon: <Phone className="w-4 h-4 text-[#25D366]" /> },
    { id: 'promo', label: 'Banner Promocional', icon: <Gift className="w-4 h-4 text-[#E61E78]" /> },
    { id: 'backup', label: 'Copia de Seguridad', icon: <Download className="w-4 h-4 text-[#7E5F6D]" /> }
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="bg-gradient-to-b from-[#FFFDFE] via-[#FCF8F9] to-[#FAF7F6] rounded-3xl w-full max-w-6xl h-[92vh] flex flex-col border-2 border-[#E6C894] shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-[#2A1720] via-[#451D30] to-[#2A1720] text-white flex items-center justify-between border-b-2 border-[#E6C894] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E6C894] to-[#FFF0E8] text-[#2A1720] flex items-center justify-center shadow-md">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                    Panel de Control — MANU STUDIO
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E61E78] text-[10px] font-extrabold uppercase tracking-wider text-white">
                    Super Admin
                  </span>
                </div>
                <p className="text-xs text-[#DCAE9E]">
                  {isSaving ? 'Guardando en la nube...' : lastSavedText}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body with Sidebar and Main Content */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-[#F2D7DE] p-3 overflow-x-auto md:overflow-y-auto shrink-0 flex md:flex-col gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer text-left ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-[#E61E78] to-[#F0789E] text-white shadow-xs'
                      : 'text-[#543743] hover:bg-[#FFF0F5]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                        activeTab === item.id
                          ? 'bg-white text-[#E61E78]'
                          : 'bg-[#FCE8EE] text-[#E61E78]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Main Panel Content Area */}
            <div className="flex-1 p-4 sm:p-8 overflow-y-auto space-y-6">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2A1720]">
                      Bienvenida a tu Centro de Control, Manu ♡
                    </h3>
                    <p className="text-xs text-[#7E5F6D]">
                      Desde aquí puedes gestionar todos los precios, servicios, fotos, testimonios y el banner promocional de tu estudio.
                    </p>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-3xl bg-white border border-[#F2D7DE] shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-[#E61E78]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E5F6D]">Servicios</span>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="font-serif text-3xl font-bold text-[#2A1720] block">{services.length}</span>
                      <p className="text-[10px] text-[#7E5F6D]">Activos en catálogo</p>
                    </div>

                    <div className="p-4 rounded-3xl bg-white border border-[#F2D7DE] shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-[#8F6317]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E5F6D]">Casos de Éxito</span>
                        <Eye className="w-4 h-4" />
                      </div>
                      <span className="font-serif text-3xl font-bold text-[#2A1720] block">{gallery.length}</span>
                      <p className="text-[10px] text-[#7E5F6D]">Antes y después</p>
                    </div>

                    <div className="p-4 rounded-3xl bg-white border border-[#F2D7DE] shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-[#E61E78]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E5F6D]">Lookbook</span>
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <span className="font-serif text-3xl font-bold text-[#2A1720] block">{lookbook.length}</span>
                      <p className="text-[10px] text-[#7E5F6D]">Fotos publicadas</p>
                    </div>

                    <div className="p-4 rounded-3xl bg-white border border-[#F2D7DE] shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-[#C59B27]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E5F6D]">Testimonios</span>
                        <Star className="w-4 h-4" />
                      </div>
                      <span className="font-serif text-3xl font-bold text-[#2A1720] block">{reviews.length}</span>
                      <p className="text-[10px] text-[#7E5F6D]">Clientas verificadas</p>
                    </div>
                  </div>

                  {/* Fast Action Shortcuts */}
                  <div className="rounded-3xl bg-gradient-to-r from-[#FFF0F5] to-white border-2 border-[#E6C894] p-6 space-y-4">
                    <h4 className="font-serif text-lg font-bold text-[#2A1720] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#E61E78]" />
                      Acciones Rápidas
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <button
                        onClick={() => {
                          setIsCreatingService(true);
                        }}
                        className="p-3.5 rounded-2xl bg-white border border-[#F2D7DE] hover:border-[#E61E78] font-bold text-[#2A1720] flex items-center gap-2.5 shadow-xs hover:shadow-md transition-all cursor-pointer text-left"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#FCE8EE] text-[#E61E78] flex items-center justify-center shrink-0">
                          <Plus className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block font-bold">Agregar Servicio</span>
                          <span className="text-[10px] text-[#7E5F6D] font-normal">Nuevo tratamiento o combo</span>
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('lookbook')}
                        className="p-3.5 rounded-2xl bg-white border border-[#F2D7DE] hover:border-[#E61E78] font-bold text-[#2A1720] flex items-center gap-2.5 shadow-xs hover:shadow-md transition-all cursor-pointer text-left"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#FCE8EE] text-[#E61E78] flex items-center justify-center shrink-0">
                          <Upload className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block font-bold">Subir Fotos</span>
                          <span className="text-[10px] text-[#7E5F6D] font-normal">Al Lookbook o Galería</span>
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('promo')}
                        className="p-3.5 rounded-2xl bg-white border border-[#F2D7DE] hover:border-[#E61E78] font-bold text-[#2A1720] flex items-center gap-2.5 shadow-xs hover:shadow-md transition-all cursor-pointer text-left"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#FCE8EE] text-[#E61E78] flex items-center justify-center shrink-0">
                          <Gift className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block font-bold">Configurar Promo</span>
                          <span className="text-[10px] text-[#7E5F6D] font-normal">Banner superior activo</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Cloud Connection & Status */}
                  <div className="p-4 rounded-2xl bg-white border border-[#F2D7DE] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-bold text-[#2A1720]">
                        Conexión en Tiempo Real: Firebase Firestore & Caché Local
                      </span>
                    </div>
                    <span className="text-[11px] text-[#7E5F6D]">
                      {lastSavedText}
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 2: SERVICES */}
              {activeTab === 'services' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#2A1720]">
                        Catálogo de Servicios ({services.length})
                      </h3>
                      <p className="text-xs text-[#7E5F6D]">
                        Edita precios, duraciones, etiquetas destacadas y fotos en tiempo real.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsCreatingService(true)}
                      className="px-5 py-2.5 rounded-full bg-[#E61E78] hover:bg-[#F0789E] text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Crear Nuevo Servicio</span>
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#7E5F6D] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Buscar por nombre, categoría o etiqueta..."
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#F2D7DE] text-xs text-[#2A1720] focus:outline-none focus:ring-2 focus:ring-[#E6C894]"
                    />
                  </div>

                  {/* Services List Table / Cards */}
                  <div className="space-y-3">
                    {filteredServices.map((service) => (
                      <div
                        key={service.id}
                        className="p-4 rounded-3xl bg-white border border-[#F2D7DE] hover:border-[#E6C894] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-14 h-14 rounded-2xl object-cover border border-[#F2D7DE] shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-serif text-base font-bold text-[#2A1720]">
                                {service.name}
                              </h4>
                              {service.popular && (
                                <span className="px-2 py-0.5 rounded-full bg-[#FFF0E8] text-[#C59B27] text-[10px] font-bold border border-[#E6C894]">
                                  ★ Popular
                                </span>
                              )}
                              {service.tag && (
                                <span className="px-2 py-0.5 rounded-full bg-[#FCE8EE] text-[#E61E78] text-[10px] font-bold">
                                  {service.tag}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-[#7E5F6D] mt-0.5">
                              <span className="capitalize font-semibold text-[#543743]">
                                Categoría: {service.category}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#C59B27]" /> {service.duration}
                              </span>
                              <span>•</span>
                              <span className="font-bold text-[#E61E78]">
                                ${service.price} USD
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() =>
                              updateService({ ...service, popular: !service.popular })
                            }
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                              service.popular
                                ? 'bg-[#FFF0E8] text-[#8F6317] border-[#E6C894]'
                                : 'bg-white text-[#7E5F6D] border-[#F2D7DE] hover:bg-[#FFF0F5]'
                            }`}
                            title="Alternar estado destacado"
                          >
                            {service.popular ? '★ Destacado' : 'Hacer Destacado'}
                          </button>

                          <button
                            onClick={() => setEditingService(service)}
                            className="p-2 rounded-xl bg-[#FCE8EE] hover:bg-[#F0789E] text-[#E61E78] hover:text-white transition-colors cursor-pointer"
                            title="Editar Servicio"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`¿Estás segura de eliminar el servicio "${service.name}"?`)) {
                                deleteService(service.id);
                              }
                            }}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-500 text-red-600 hover:text-white transition-colors cursor-pointer"
                            title="Eliminar Servicio"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: GALLERY (ANTES & DESPUÉS) */}
              {activeTab === 'gallery' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#2A1720]">
                        Casos de Antes y Después ({gallery.length})
                      </h3>
                      <p className="text-xs text-[#7E5F6D]">
                        Muestra el poder de transformación con comparativas deslizables.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddGallery(!showAddGallery)}
                      className="px-5 py-2.5 rounded-full bg-[#E61E78] hover:bg-[#F0789E] text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Agregar Caso</span>
                    </button>
                  </div>

                  {/* Add Gallery Form */}
                  {showAddGallery && (
                    <form onSubmit={handleAddGallery} className="p-6 rounded-3xl bg-white border-2 border-[#E6C894] shadow-md space-y-4 text-xs">
                      <h4 className="font-serif text-lg font-bold text-[#2A1720]">Nuevo Caso Antes / Después</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-[#543743] mb-1">Título del Caso *</label>
                          <input
                            type="text"
                            required
                            placeholder="Ej: Lifting de Pestañas + Lash Botox"
                            value={newGalleryItem.title}
                            onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-[#543743] mb-1">Etiqueta / Tag *</label>
                          <input
                            type="text"
                            required
                            placeholder="Ej: Pestañas Naturales"
                            value={newGalleryItem.tag}
                            onChange={(e) => setNewGalleryItem({ ...newGalleryItem, tag: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-[#543743] mb-1">URL Foto ANTES *</label>
                          <input
                            type="text"
                            required
                            placeholder="URL imagen antes"
                            value={newGalleryItem.beforeImage}
                            onChange={(e) => setNewGalleryItem({ ...newGalleryItem, beforeImage: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-[#543743] mb-1">URL Foto DESPUÉS *</label>
                          <input
                            type="text"
                            required
                            placeholder="URL imagen después"
                            value={newGalleryItem.afterImage}
                            onChange={(e) => setNewGalleryItem({ ...newGalleryItem, afterImage: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-[#543743] mb-1">Descripción del Procedimiento</label>
                        <textarea
                          rows={2}
                          placeholder="Detalles de la técnica aplicada y beneficios logrados..."
                          value={newGalleryItem.description}
                          onChange={(e) => setNewGalleryItem({ ...newGalleryItem, description: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddGallery(false)}
                          className="px-4 py-2 rounded-full border border-[#F2D7DE] text-[#7E5F6D]"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-full bg-[#E61E78] text-white font-bold"
                        >
                          Guardar Caso
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {gallery.map((item) => (
                      <div key={item.id} className="p-4 rounded-3xl bg-white border border-[#F2D7DE] shadow-xs space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-[#7E5F6D] uppercase block">Antes:</span>
                            <img src={item.beforeImage} alt="Antes" className="w-full aspect-[4/3] object-cover rounded-xl border border-[#F2D7DE]" />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-[#E61E78] uppercase block">Después:</span>
                            <img src={item.afterImage} alt="Después" className="w-full aspect-[4/3] object-cover rounded-xl border border-[#F2D7DE]" />
                          </div>
                        </div>

                        <div className="flex items-start justify-between gap-2 pt-1">
                          <div>
                            <span className="px-2 py-0.5 rounded-full bg-[#FCE8EE] text-[#E61E78] text-[10px] font-bold">
                              {item.tag}
                            </span>
                            <h4 className="font-serif text-base font-bold text-[#2A1720] mt-1">{item.title}</h4>
                            <p className="text-xs text-[#7E5F6D] line-clamp-2">{item.description}</p>
                          </div>

                          <button
                            onClick={() => {
                              if (window.confirm(`¿Eliminar caso "${item.title}"?`)) {
                                deleteGalleryItem(item.id);
                              }
                            }}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-500 text-red-600 hover:text-white transition-colors cursor-pointer shrink-0"
                            title="Eliminar Caso"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: LOOKBOOK */}
              {activeTab === 'lookbook' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#2A1720]">
                        Lookbook de Inspiración ({lookbook.length} Fotos)
                      </h3>
                      <p className="text-xs text-[#7E5F6D]">
                        Sube fotos directamente desde tu celular o computadora o pega enlaces directos.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={lookbookFileRef}
                        accept="image/*"
                        onChange={handleLookbookFileUpload}
                        className="hidden"
                      />
                      <button
                        onClick={() => lookbookFileRef.current?.click()}
                        disabled={uploadingLookbook}
                        className="px-5 py-2.5 rounded-full bg-[#E61E78] hover:bg-[#F0789E] text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{uploadingLookbook ? 'Subiendo...' : '+ Subir Foto desde Archivo'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Add by URL input */}
                  <form onSubmit={handleAddLookbookUrl} className="p-4 rounded-2xl bg-white border border-[#F2D7DE] flex flex-wrap sm:flex-nowrap gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="O pega una URL de imagen..."
                      value={newLookbookUrl}
                      onChange={(e) => setNewLookbookUrl(e.target.value)}
                      className="flex-1 p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Título (opcional)"
                      value={newLookbookTitle}
                      onChange={(e) => setNewLookbookTitle(e.target.value)}
                      className="w-full sm:w-48 p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                    />
                    <select
                      value={newLookbookCategory}
                      onChange={(e) => setNewLookbookCategory(e.target.value)}
                      className="p-2.5 rounded-xl border border-[#F2D7DE] bg-white font-medium"
                    >
                      <option value="Pestañas">Pestañas</option>
                      <option value="Cejas">Cejas</option>
                      <option value="Estudio">Estudio</option>
                      <option value="Experiencia">Experiencia</option>
                    </select>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#2A1720] hover:bg-[#451D30] text-white font-bold shrink-0 cursor-pointer"
                    >
                      Agregar URL
                    </button>
                  </form>

                  {/* Lookbook Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {lookbook.map((item, idx) => (
                      <div key={item.id || idx} className="group relative rounded-2xl overflow-hidden border border-[#F2D7DE] aspect-[4/5] bg-[#FCE8EE] shadow-xs">
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 transition-opacity p-3 flex flex-col justify-between text-white">
                          <span className="self-start px-2 py-0.5 rounded-full bg-white/90 text-[#2A1720] text-[9px] font-bold">
                            {item.category}
                          </span>
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-serif text-xs font-bold truncate">{item.title}</span>
                            <button
                              onClick={() => {
                                if (window.confirm('¿Eliminar esta foto del lookbook?')) {
                                  deleteLookbookItem(item.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white shrink-0 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: REVIEWS */}
              {activeTab === 'reviews' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#2A1720]">
                        Testimonios & Reseñas ({reviews.length})
                      </h3>
                      <p className="text-xs text-[#7E5F6D]">
                        Agrega o edita las opiniones de tus clientas para potenciar la confianza de nuevas visitantes.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddReview(!showAddReview)}
                      className="px-5 py-2.5 rounded-full bg-[#E61E78] hover:bg-[#F0789E] text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Nueva Reseña</span>
                    </button>
                  </div>

                  {/* Add Review Form */}
                  {showAddReview && (
                    <form onSubmit={handleSaveReview} className="p-6 rounded-3xl bg-white border-2 border-[#E6C894] shadow-md space-y-4 text-xs">
                      <h4 className="font-serif text-lg font-bold text-[#2A1720]">Nueva Reseña de Clienta</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-[#543743] mb-1">Nombre de la Clienta *</label>
                          <input
                            type="text"
                            required
                            placeholder="Ej: Laura Ramírez"
                            value={newReview.name}
                            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-[#543743] mb-1">Servicio Realizado</label>
                          <input
                            type="text"
                            placeholder="Ej: Pestañas Híbridas + Laminado"
                            value={newReview.service}
                            onChange={(e) => setNewReview({ ...newReview, service: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-[#543743] mb-1">Calificación (Estrellas)</label>
                          <select
                            value={newReview.rating}
                            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                            className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white font-medium"
                          >
                            <option value={5}>⭐⭐⭐⭐⭐ (5 Estrellas)</option>
                            <option value={4}>⭐⭐⭐⭐ (4 Estrellas)</option>
                            <option value={3}>⭐⭐⭐ (3 Estrellas)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-[#543743] mb-1">Comentario / Opinión *</label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Escribe lo que dijo la clienta sobre su experiencia..."
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddReview(false)}
                          className="px-4 py-2 rounded-full border border-[#F2D7DE] text-[#7E5F6D]"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-full bg-[#E61E78] text-white font-bold"
                        >
                          Guardar Reseña
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Reviews List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-5 rounded-3xl bg-white border border-[#F2D7DE] shadow-xs space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-0.5 text-[#ECC277]">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                            <span className="text-[10px] text-[#7E5F6D]">{rev.date}</span>
                          </div>
                          <p className="text-xs text-[#543743] italic leading-relaxed">
                            "{rev.comment}"
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#F2D7DE] flex items-center justify-between">
                          <div>
                            <span className="font-bold text-[#2A1720] block text-xs">{rev.name}</span>
                            <span className="text-[10px] text-[#E61E78] font-semibold">{rev.service}</span>
                          </div>

                          <button
                            onClick={() => {
                              if (window.confirm(`¿Eliminar reseña de "${rev.name}"?`)) {
                                deleteReview(rev.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-500 text-red-600 hover:text-white transition-colors cursor-pointer"
                            title="Eliminar Reseña"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: FAQS */}
              {activeTab === 'faqs' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#2A1720]">
                        Preguntas Frecuentes ({faqs.length})
                      </h3>
                      <p className="text-xs text-[#7E5F6D]">
                        Resuelve las dudas principales de tus clientas antes de su primera cita.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddFaq(!showAddFaq)}
                      className="px-5 py-2.5 rounded-full bg-[#E61E78] hover:bg-[#F0789E] text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Nueva Pregunta</span>
                    </button>
                  </div>

                  {/* Add / Edit FAQ Form */}
                  {(showAddFaq || editingFaq) && (
                    <form onSubmit={handleSaveFaq} className="p-6 rounded-3xl bg-white border-2 border-[#E6C894] shadow-md space-y-4 text-xs">
                      <h4 className="font-serif text-lg font-bold text-[#2A1720]">
                        {editingFaq ? 'Editar Pregunta Frecuente' : 'Nueva Pregunta Frecuente'}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-[#543743] mb-1">Pregunta *</label>
                          <input
                            type="text"
                            required
                            placeholder="Ej: ¿Cuánto tiempo dura el lifting de pestañas?"
                            value={editingFaq ? editingFaq.question : newFaq.question}
                            onChange={(e) =>
                              editingFaq
                                ? setEditingFaq({ ...editingFaq, question: e.target.value })
                                : setNewFaq({ ...newFaq, question: e.target.value })
                            }
                            className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-[#543743] mb-1">Categoría</label>
                          <select
                            value={editingFaq ? editingFaq.category : newFaq.category}
                            onChange={(e) =>
                              editingFaq
                                ? setEditingFaq({ ...editingFaq, category: e.target.value as any })
                                : setNewFaq({ ...newFaq, category: e.target.value as any })
                            }
                            className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white font-medium"
                          >
                            <option value="lashes">Pestañas & Lifting</option>
                            <option value="brows">Cejas & Laminado</option>
                            <option value="general">Citas & Protocolos</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-[#543743] mb-1">Respuesta *</label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Escribe una respuesta clara y profesional..."
                          value={editingFaq ? editingFaq.answer : newFaq.answer}
                          onChange={(e) =>
                            editingFaq
                              ? setEditingFaq({ ...editingFaq, answer: e.target.value })
                              : setNewFaq({ ...newFaq, answer: e.target.value })
                          }
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddFaq(false);
                            setEditingFaq(null);
                          }}
                          className="px-4 py-2 rounded-full border border-[#F2D7DE] text-[#7E5F6D]"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-full bg-[#E61E78] text-white font-bold"
                        >
                          {editingFaq ? 'Guardar Cambios' : 'Agregar Pregunta'}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* FAQ List */}
                  <div className="space-y-3">
                    {faqs.map((faq) => (
                      <div key={faq.id} className="p-4 rounded-2xl bg-white border border-[#F2D7DE] shadow-xs flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="px-2 py-0.5 rounded-full bg-[#FAF0F3] text-[#8E4355] text-[10px] font-bold uppercase">
                            {faq.category === 'lashes' ? 'Pestañas' : faq.category === 'brows' ? 'Cejas' : 'General'}
                          </span>
                          <h4 className="font-serif text-base font-bold text-[#2A1720]">{faq.question}</h4>
                          <p className="text-xs text-[#543743] leading-relaxed">{faq.answer}</p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => setEditingFaq(faq)}
                            className="p-1.5 rounded-lg bg-[#FCE8EE] text-[#E61E78] hover:bg-[#F0789E] hover:text-white transition-colors cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('¿Eliminar esta pregunta frecuente?')) {
                                deleteFaq(faq.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: SOBRE MÍ */}
              {activeTab === 'about' && (
                <div className="space-y-6 animate-in fade-in duration-150 max-w-3xl">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2A1720]">
                      Página "Sobre mí" (Historia de Manuela)
                    </h3>
                    <p className="text-xs text-[#7E5F6D]">
                      Personaliza tu foto de bienvenida, saludo personal, historia y párrafos visibles para tus clientas.
                    </p>
                  </div>

                  <form onSubmit={handleSaveAbout} className="p-6 rounded-3xl bg-white border border-[#F2D7DE] shadow-xs space-y-5 text-xs">
                    
                    {/* Portrait Photo */}
                    <div className="p-4 rounded-2xl bg-[#FFFDFE] border border-[#F2D7DE] flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-24 h-32 rounded-2xl overflow-hidden border-2 border-[#E6C894] bg-[#FCE8EE] shrink-0 shadow-sm">
                        <img
                          src={aboutForm.portraitImage}
                          alt="Foto de Manuela"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="space-y-2 flex-1 text-center sm:text-left">
                        <span className="font-bold text-[#2A1720] block">Foto Principal de Manuela</span>
                        <p className="text-[11px] text-[#7E5F6D]">
                          Sube una foto tuya directamente desde tu galería o ingresa un enlace de imagen.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                          <input
                            type="file"
                            ref={aboutFileRef}
                            onChange={handleAboutPhotoUpload}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => aboutFileRef.current?.click()}
                            disabled={uploadingAboutImg}
                            className="px-4 py-2 rounded-full bg-[#E61E78] text-white font-bold hover:bg-[#F0789E] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploadingAboutImg ? 'Subiendo foto...' : 'Subir Foto desde Celular/PC'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-[#543743] mb-1">Saludo Principal *</label>
                        <input
                          type="text"
                          required
                          value={aboutForm.greeting}
                          onChange={(e) => setAboutForm({ ...aboutForm, greeting: e.target.value })}
                          placeholder="Hola, soy Manuela"
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#543743] mb-1">URL de la Foto (Opcional)</label>
                        <input
                          type="text"
                          value={aboutForm.portraitImage}
                          onChange={(e) => setAboutForm({ ...aboutForm, portraitImage: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white font-mono text-[11px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-[#543743] mb-1">Frase de Bienvenida / Tagline *</label>
                      <textarea
                        rows={2}
                        required
                        value={aboutForm.tagline}
                        onChange={(e) => setAboutForm({ ...aboutForm, tagline: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                      />
                    </div>

                    <div className="space-y-3 pt-2 border-t border-[#F2D7DE]">
                      <span className="font-bold text-[#2A1720] block">Párrafos de tu Carta / Historia:</span>
                      <div>
                        <label className="block text-[#7E5F6D] mb-1 font-semibold">Párrafo 1 (Pasión por la estética)</label>
                        <textarea
                          rows={2}
                          value={aboutForm.bio1}
                          onChange={(e) => setAboutForm({ ...aboutForm, bio1: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[#7E5F6D] mb-1 font-semibold">Párrafo 2 (Experiencia con las clientas)</label>
                        <textarea
                          rows={3}
                          value={aboutForm.bio2}
                          onChange={(e) => setAboutForm({ ...aboutForm, bio2: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[#7E5F6D] mb-1 font-semibold">Párrafo 3 (Escuchar y personalizar)</label>
                        <textarea
                          rows={2}
                          value={aboutForm.bio3}
                          onChange={(e) => setAboutForm({ ...aboutForm, bio3: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-full bg-[#E61E78] text-white font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Guardar en Firebase</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 7: CONTACT */}
              {activeTab === 'contact' && (
                <div className="space-y-6 animate-in fade-in duration-150 max-w-2xl">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2A1720]">
                      Información del Estudio & WhatsApp
                    </h3>
                    <p className="text-xs text-[#7E5F6D]">
                      Configura el número oficial de atención de WhatsApp, dirección y horarios.
                    </p>
                  </div>

                  <form onSubmit={handleSaveContact} className="p-6 rounded-3xl bg-white border border-[#F2D7DE] shadow-xs space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-[#543743] mb-1">WhatsApp Numérico (wa.me)</label>
                        <input
                          type="text"
                          required
                          value={contactForm.whatsappNumber}
                          onChange={(e) => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white font-mono"
                        />
                        <p className="text-[10px] text-[#7E5F6D] mt-0.5">Ej: 573136743859 (código país + número sin espacios)</p>
                      </div>

                      <div>
                        <label className="block font-bold text-[#543743] mb-1">WhatsApp Visible en Pantalla</label>
                        <input
                          type="text"
                          required
                          value={contactForm.whatsappDisplay}
                          onChange={(e) => setContactForm({ ...contactForm, whatsappDisplay: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white font-bold"
                        />
                        <p className="text-[10px] text-[#7E5F6D] mt-0.5">Ej: 313 674 3859</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-[#543743] mb-1">Instagram (@usuario)</label>
                        <input
                          type="text"
                          value={contactForm.instagram}
                          onChange={(e) => setContactForm({ ...contactForm, instagram: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#543743] mb-1">Email de Contacto</label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-[#543743] mb-1">Horario de Atención</label>
                      <input
                        type="text"
                        value={contactForm.schedule}
                        onChange={(e) => setContactForm({ ...contactForm, schedule: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-[#543743] mb-1">Dirección / Suite</label>
                        <input
                          type="text"
                          value={contactForm.address}
                          onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#543743] mb-1">Ciudad</label>
                        <input
                          type="text"
                          value={contactForm.city}
                          onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-full bg-[#E61E78] text-white font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Guardar en Firebase</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 8: PROMO BANNER */}
              {activeTab === 'promo' && (
                <div className="space-y-6 animate-in fade-in duration-150 max-w-2xl">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2A1720]">
                      Banner Promocional & Cupones VIP
                    </h3>
                    <p className="text-xs text-[#7E5F6D]">
                      Muestra un cintillo satinado en la parte superior del sitio con ofertas especiales o promociones del mes.
                    </p>
                  </div>

                  <form onSubmit={handleSavePromo} className="p-6 rounded-3xl bg-white border-2 border-[#E6C894] shadow-md space-y-4 text-xs">
                    
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFF0F5] border border-[#F2D7DE]">
                      <div>
                        <span className="font-bold text-[#2A1720] block">Estado del Banner Superior</span>
                        <span className="text-[11px] text-[#7E5F6D]">¿Deseas que sea visible para todas las clientas?</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={promoForm.promoActive}
                          onChange={(e) => setPromoForm({ ...promoForm, promoActive: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E61E78]"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block font-bold text-[#543743] mb-1">Texto del Anuncio *</label>
                      <input
                        type="text"
                        required
                        value={promoForm.promoText}
                        onChange={(e) => setPromoForm({ ...promoForm, promoText: e.target.value })}
                        placeholder="✨ PROMOCIÓN VIP: 15% OFF en Dúo Lifting + Laminado con el código #MANUGLOW ✨"
                        className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-[#543743] mb-1">Insignia / Badge</label>
                        <input
                          type="text"
                          value={promoForm.promoBadge}
                          onChange={(e) => setPromoForm({ ...promoForm, promoBadge: e.target.value })}
                          placeholder="Descuento Exclusivo"
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#543743] mb-1">Código de Descuento (opcional)</label>
                        <input
                          type="text"
                          value={promoForm.promoCode}
                          onChange={(e) => setPromoForm({ ...promoForm, promoCode: e.target.value })}
                          placeholder="MANUGLOW"
                          className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-white font-mono uppercase"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-full bg-[#E61E78] text-white font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Guardar Promoción</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 9: BACKUP & RESTORE */}
              {activeTab === 'backup' && (
                <div className="space-y-6 animate-in fade-in duration-150 max-w-2xl">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2A1720]">
                      Copia de Seguridad & Restauración
                    </h3>
                    <p className="text-xs text-[#7E5F6D]">
                      Exporta todo el contenido de tu web a un archivo JSON seguro o restaura copias anteriores.
                    </p>
                  </div>

                  {importStatus && (
                    <div className="p-4 rounded-2xl bg-[#FFF0E8] border border-[#E6C894] text-xs font-bold text-[#8F6317]">
                      {importStatus}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Export */}
                    <div className="p-6 rounded-3xl bg-white border border-[#F2D7DE] shadow-xs space-y-3 text-xs text-center flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-[#FCE8EE] text-[#E61E78] flex items-center justify-center mx-auto shadow-xs">
                          <Download className="w-6 h-6" />
                        </div>
                        <h4 className="font-serif text-lg font-bold text-[#2A1720]">Exportar Copia de Seguridad</h4>
                        <p className="text-[#7E5F6D]">
                          Descarga un archivo .json con todos los servicios, precios, fotos, textos y testimonios actuales.
                        </p>
                      </div>
                      <button
                        onClick={handleDownloadBackup}
                        className="w-full py-2.5 rounded-full bg-[#2A1720] hover:bg-[#451D30] text-white font-bold cursor-pointer"
                      >
                        Descargar Archivo JSON
                      </button>
                    </div>

                    {/* Import */}
                    <div className="p-6 rounded-3xl bg-white border border-[#F2D7DE] shadow-xs space-y-3 text-xs text-center flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-[#FFF0E8] text-[#C59B27] flex items-center justify-center mx-auto shadow-xs">
                          <Upload className="w-6 h-6" />
                        </div>
                        <h4 className="font-serif text-lg font-bold text-[#2A1720]">Restaurar desde Archivo</h4>
                        <p className="text-[#7E5F6D]">
                          Carga un archivo .json previamente descargado para restablecer el contenido en Firebase.
                        </p>
                      </div>
                      <input
                        type="file"
                        ref={backupFileRef}
                        accept=".json"
                        onChange={handleImportBackup}
                        className="hidden"
                      />
                      <button
                        onClick={() => backupFileRef.current?.click()}
                        className="w-full py-2.5 rounded-full bg-[#E61E78] hover:bg-[#F0789E] text-white font-bold cursor-pointer"
                      >
                        Seleccionar Archivo JSON
                      </button>
                    </div>
                  </div>

                  {/* Reset Factory */}
                  <div className="p-6 rounded-3xl bg-red-50/50 border border-red-200 text-xs space-y-3">
                    <h4 className="font-serif text-base font-bold text-red-900 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-red-600" />
                      Restablecer Valores de Fábrica Originales
                    </h4>
                    <p className="text-red-700">
                      Esta acción reemplazará todos los textos, servicios y fotos con los valores predeterminados de diseño de MANU STUDIO.
                    </p>
                    <button
                      onClick={() => {
                        if (window.confirm('¿Confirmas restablecer todo el contenido del sitio a los valores iniciales de fábrica?')) {
                          resetToDefaults();
                          alert('¡Contenido restablecido!');
                        }
                      }}
                      className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer"
                    >
                      Restablecer Todo a Original
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <EditServiceModal
          isOpen={!!editingService}
          onClose={() => setEditingService(null)}
          service={editingService}
        />
      )}

      {/* Create Service Modal */}
      {isCreatingService && (
        <EditServiceModal
          isOpen={isCreatingService}
          onClose={() => setIsCreatingService(false)}
          service={{
            id: `servicio-${Date.now()}`,
            name: 'Nuevo Tratamiento VIP',
            category: 'lashes',
            shortDescription: 'Descripción breve del tratamiento.',
            fullDescription: 'Descripción detallada del procedimiento, visagismo y cuidado.',
            duration: '1h 30m',
            price: 35,
            popular: false,
            tag: 'Nuevo',
            image: '/src/assets/images/eyelash_extensions_1787346129559.jpg',
            included: ['Visagismo anatómico', 'Parches de colágeno', 'Insumos certificados'],
            idealFor: 'Todo tipo de miradas',
            retouchTime: 'Cada 20 días'
          }}
          isNew={true}
        />
      )}
    </>
  );
};
