import React, { useState } from 'react';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';
import { EditServiceModal } from './EditServiceModal';
import { useAdmin } from '../context/AdminContext';
import { ServiceCategory, ServiceItem } from '../types';
import { 
  Sparkles, 
  Clock, 
  Check, 
  MessageCircle, 
  Plus, 
  Crown, 
  Edit2, 
  Calendar,
  ShieldCheck,
  Heart
} from 'lucide-react';

interface ServicesViewProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenBooking }) => {
  const { services, studioInfo, updateService, addService, isAdminLoggedIn } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [creatingNew, setCreatingNew] = useState(false);

  const categories = [
    { id: 'all', label: 'Todos los Servicios' },
    { id: 'brows', label: 'Cejas & Visagismo' },
    { id: 'lashes', label: 'Pestañas & Lifting' },
    { id: 'micropigmentation', label: 'Micropigmentación' }
  ] as const;

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter((s) => s.category === selectedCategory);

  const bookDirectWhatsApp = (service: ServiceItem) => {
    const message = encodeURIComponent(
      `¡Hola Manu! Me interesa agendar el servicio de *${service.name}* ($${service.price} USD / aprox ${service.duration}) en MANU STUDIO. ¿Qué fechas y horarios tienes disponibles? ✨`
    );
    window.open(`https://wa.me/${studioInfo.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="py-8 sm:py-16 bg-[#FAF7F6] text-[#1D1D1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#F4A6B8]/30 text-[#E61E78] text-xs font-bold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catálogo Exclusivo</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1D1D1F]">
            Servicios & Procedimientos
          </h1>

          <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
            Técnicas especializadas con visagismo personalizado, confort total e insumos médicos hipoalergénicos certificados.
          </p>
        </div>

        {/* Category Pills & Admin Add Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-[#F4A6B8]/30 shadow-xs overflow-x-auto max-w-full">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-btn-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
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
              onClick={() => setCreatingNew(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#E61E78] hover:bg-[#D81B60] text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Nuevo Servicio</span>
            </button>
          )}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-3xl bg-white/90 backdrop-blur-xl border border-[#F4A6B8]/30 hover:border-[#E61E78]/50 overflow-hidden shadow-[0_4px_24px_rgba(244,166,184,0.08)] hover:shadow-[0_16px_48px_rgba(230,30,120,0.12)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Service Image with Universal EditableImage Component */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FFF5F8]">
                  <EditableImage
                    src={service.image}
                    alt={service.name}
                    label={`Foto de ${service.name}`}
                    onSave={async (newUrl) => {
                      await updateService({ ...service, image: newUrl });
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                  />

                  {service.popular && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#E61E78] text-[10px] font-bold shadow-xs pointer-events-none border border-[#F4A6B8]/30">
                      <Sparkles className="w-3 h-3 text-[#E61E78]" />
                      <span>Más Solicitado</span>
                    </div>
                  )}

                  {isAdminLoggedIn && (
                    <button
                      onClick={() => setEditingService(service)}
                      title="Editar datos del servicio"
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-[#1D1D1F] hover:bg-white shadow-xs cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3 text-[#E61E78]" />
                    </button>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E61E78]">
                      {service.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#86868B] font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#E61E78]" />
                      {service.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#1D1D1F] leading-snug">
                    {service.name}
                  </h3>

                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    {service.shortDescription || service.fullDescription}
                  </p>

                  {/* Features Included */}
                  {service.included && service.included.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-[#F4A6B8]/20">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] block">
                        Incluye en tu cita:
                      </span>
                      <div className="space-y-1">
                        {service.included.map((inc, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#1D1D1F]">
                            <Check className="w-3.5 h-3.5 text-[#34C759] shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="p-6 pt-0 border-t border-[#F4A6B8]/20 mt-2">
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <span className="text-[10px] text-[#86868B] block font-medium">Inversión</span>
                    <span className="font-serif text-xl font-bold text-[#1D1D1F]">
                      ${service.price} <span className="text-xs font-normal text-[#86868B]">USD</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenBooking(service.id)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E61E78] to-[#F0789E] hover:from-[#D81B60] hover:to-[#E61E78] text-white text-xs font-bold shadow-xs hover:scale-102 active:scale-98 transition-all cursor-pointer"
                    >
                      Agendar Cita
                    </button>

                    <button
                      onClick={() => bookDirectWhatsApp(service)}
                      title="Consultar por WhatsApp"
                      className="p-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Admin Edit Modal */}
      {editingService && (
        <EditServiceModal
          service={editingService}
          isOpen={true}
          onClose={() => setEditingService(null)}
          onSave={async (updated) => {
            await updateService(updated);
            setEditingService(null);
          }}
        />
      )}

      {/* Admin Create Modal */}
      {creatingNew && (
        <EditServiceModal
          service={{
            id: `service-${Date.now()}`,
            name: '',
            category: 'brows',
            shortDescription: '',
            fullDescription: '',
            price: 45,
            duration: '1h 15m',
            image: '/src/assets/images/brow_lamination_1787346140737.jpg',
            included: ['Diseño y Visagismo Personalizado', 'Insumos Hipoalergénicos'],
            popular: false,
            idealFor: 'Todo tipo de miradas'
          }}
          isOpen={true}
          onClose={() => setCreatingNew(false)}
          onSave={async (newS) => {
            await addService(newS);
            setCreatingNew(false);
          }}
        />
      )}
    </div>
  );
};
