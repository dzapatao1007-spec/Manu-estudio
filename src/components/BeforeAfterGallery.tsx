import React, { useState } from 'react';
import { EditableImage } from './EditableImage';
import { EditableText } from './EditableText';
import { useAdmin } from '../context/AdminContext';
import { 
  Sparkles, 
  ArrowLeftRight, 
  CheckCircle2, 
  Crown, 
  Plus, 
  Trash2, 
  MessageCircle,
  Clock,
  Heart,
  ChevronRight,
  Eye
} from 'lucide-react';
import { BeforeAfterItem } from '../types';

interface BeforeAfterGalleryProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({ onOpenBooking }) => {
  const {
    gallery,
    studioInfo,
    updateGalleryItem,
    addGalleryItem,
    deleteGalleryItem,
    isAdminLoggedIn
  } = useAdmin();

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todas las Transformaciones' },
    { id: 'lashes', label: 'Pestañas & Lifting' },
    { id: 'brows', label: 'Cejas & Laminado' },
    { id: 'micro', label: 'Micropigmentación' }
  ];

  const filteredGallery = selectedCategory === 'all'
    ? gallery
    : gallery.filter((item) => {
        const text = (item.service + ' ' + item.tag + ' ' + item.title).toLowerCase();
        if (selectedCategory === 'lashes') return text.includes('pestaña') || text.includes('lash') || text.includes('lifting') || text.includes('volumen');
        if (selectedCategory === 'brows') return text.includes('ceja') || text.includes('brow') || text.includes('laminado') || text.includes('visagismo');
        if (selectedCategory === 'micro') return text.includes('micro') || text.includes('powder') || text.includes('pelo a pelo');
        return true;
      });

  const safeIndex = Math.min(activeItemIndex, Math.max(0, filteredGallery.length - 1));
  const currentItem: BeforeAfterItem | undefined = filteredGallery[safeIndex] || gallery[0];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - container.left;
    const percentage = Math.max(5, Math.min(95, (x / container.width) * 100));
    setSliderPosition(percentage);
  };

  const handleAddBeforeAfter = async () => {
    const newItem: BeforeAfterItem = {
      id: `ba-${Date.now()}`,
      title: 'Nueva Transformación Manu Studio',
      service: 'Lifting & Visagismo de Cejas',
      beforeImage: '/src/assets/images/brow_lamination_1787346140737.jpg',
      afterImage: '/src/assets/images/brow_lamination_1787346140737.jpg',
      description: 'Resultados reales y personalizados resaltando la mirada natural.',
      tag: 'Transformación Real'
    };
    await addGalleryItem(newItem);
    setActiveItemIndex(0);
  };

  const handleConsultWhatsApp = (item: BeforeAfterItem) => {
    const message = encodeURIComponent(
      `¡Hola Manu! Vi la transformación de *${item.title}* (${item.service}) en tu galería y me encantó. Quiero un resultado similar para mis cejas/pestañas ✨`
    );
    window.open(`https://wa.me/${studioInfo.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="py-8 sm:py-16 bg-[#FAF7F6] text-[#1D1D1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#F4A6B8]/30 text-[#E61E78] text-xs font-bold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portafolio de Resultados Reales</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1D1D1F]">
            Galería Antes & Después
          </h1>

          <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
            Desliza el divisor interactivo para comparar la precisión, simetría y delicadeza de nuestros procedimientos.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-[#F4A6B8]/30 shadow-xs overflow-x-auto max-w-full">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setActiveItemIndex(0);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#E61E78] to-[#F0789E] text-white shadow-xs font-bold'
                      : 'text-[#6E6E73] hover:text-[#E61E78] hover:bg-[#FFF0F5]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {isAdminLoggedIn && (
            <button
              onClick={handleAddBeforeAfter}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#E61E78] hover:bg-[#D81B60] text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Agregar Transformación</span>
            </button>
          )}
        </div>

        {/* Interactive Slider Showcase */}
        {currentItem && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Gallery Tabs Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {filteredGallery.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItemIndex(idx);
                    setSliderPosition(50);
                  }}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer border whitespace-nowrap ${
                    safeIndex === idx
                      ? 'bg-white text-[#E61E78] border-[#E61E78] shadow-md scale-102 font-extrabold'
                      : 'bg-white/80 text-[#6E6E73] border-[#F4A6B8]/30 hover:border-[#E6C894] hover:bg-[#FFF0F5]'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Interactive Split View Container */}
            <div className="rounded-3xl bg-white border-2 border-[#E6C894] p-4 sm:p-6 shadow-[0_16px_48px_rgba(230,30,120,0.12)] space-y-6">
              
              <div
                className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none bg-[#FAF7F6] border border-[#F4A6B8]/30 shadow-inner"
                onMouseMove={(e) => {
                  if (e.buttons === 1 || isDragging) handleSliderMove(e);
                }}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onTouchMove={handleSliderMove}
                onClick={handleSliderMove}
              >
                {/* After Image (Background) */}
                <img
                  src={currentItem.afterImage}
                  alt={`Después - ${currentItem.title}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Before Image (Clipped Overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={currentItem.beforeImage}
                    alt={`Antes - ${currentItem.title}`}
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  
                  {/* Before Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase">
                    Antes
                  </div>
                </div>

                {/* After Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#E61E78] backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
                  Después ✨
                </div>

                {/* Slider Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-9 h-9 rounded-full bg-white border-2 border-[#E61E78] text-[#E61E78] flex items-center justify-center shadow-lg">
                    <ArrowLeftRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Hint Bottom Overlay */}
                <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
                  <span className="px-3.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-medium tracking-wide">
                    ↔ Arrastra para comparar
                  </span>
                </div>
              </div>

              {/* Transformation Info & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E61E78]">
                      {currentItem.service}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFF0F5] text-[#D81B60]">
                      {currentItem.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1D1D1F]">
                    {currentItem.title}
                  </h3>

                  <p className="text-xs text-[#6E6E73] max-w-xl leading-relaxed">
                    {currentItem.description}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => onOpenBooking()}
                    className="px-5 py-2.5 rounded-2xl bg-[#1D1D1F] hover:bg-black text-white font-bold text-xs shadow-xs hover:scale-102 transition-all cursor-pointer"
                  >
                    Agendar Cita
                  </button>

                  <button
                    onClick={() => handleConsultWhatsApp(currentItem)}
                    title="Consultar por WhatsApp"
                    className="p-2.5 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  </button>

                  {isAdminLoggedIn && (
                    <button
                      onClick={() => deleteGalleryItem(currentItem.id)}
                      title="Eliminar elemento"
                      className="p-2.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Admin Image Replacement Controls */}
              {isAdminLoggedIn && (
                <div className="p-4 rounded-2xl bg-[#FFF0F5] border border-[#F4A6B8]/40 space-y-3">
                  <span className="text-xs font-bold text-[#1D1D1F] block">
                    👑 Controles de Administradora:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <EditableImage
                      src={currentItem.beforeImage}
                      alt="Foto Antes"
                      label="Foto Antes"
                      onSave={async (newUrl) => {
                        await updateGalleryItem({ ...currentItem, beforeImage: newUrl });
                      }}
                      className="h-20 w-full object-cover rounded-xl"
                      containerClassName="w-full"
                    />

                    <EditableImage
                      src={currentItem.afterImage}
                      alt="Foto Después"
                      label="Foto Después"
                      onSave={async (newUrl) => {
                        await updateGalleryItem({ ...currentItem, afterImage: newUrl });
                      }}
                      className="h-20 w-full object-cover rounded-xl"
                      containerClassName="w-full"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Grid of Results for Quick Glance */}
        <div className="space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1D1D1F]">
            Todos los Resultados de Portafolio
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveItemIndex(idx);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="group p-4 rounded-3xl bg-white border border-[#F4A6B8]/30 hover:border-[#E61E78]/50 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3"
              >
                <div className="grid grid-cols-2 gap-2 aspect-[16/10] rounded-2xl overflow-hidden bg-[#FAF7F6]">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.beforeImage}
                      alt="Antes"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/60 text-white text-[9px] font-bold">
                      Antes
                    </span>
                  </div>
                  <div className="relative overflow-hidden">
                    <img
                      src={item.afterImage}
                      alt="Después"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-full bg-[#E61E78] text-white text-[9px] font-bold">
                      Después
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E61E78] block">
                    {item.service}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-[#1D1D1F] group-hover:text-[#E61E78] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#6E6E73] line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
