import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { BookingFormData } from '../types';
import { 
  Calendar, 
  Clock, 
  MessageCircle, 
  Sparkles, 
  X, 
  Heart, 
  User, 
  Phone, 
  Crown,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId
}) => {
  const { services, studioInfo } = useAdmin();
  const [formData, setFormData] = useState<BookingFormData>({
    clientName: '',
    phone: '',
    serviceId: initialServiceId || (services[0]?.id ?? 'servicio-1'),
    preferredDate: '',
    preferredTime: 'morning',
    stylePreference: 'Natural & Sofisticado',
    notes: '',
    isFirstTime: true
  });

  const [acceptedPrep, setAcceptedPrep] = useState(true);

  if (!isOpen) return null;

  const selectedService = services.find((s) => s.id === formData.serviceId) || services[0] || {
    id: 'default',
    name: 'Servicio de Belleza',
    price: 45,
    duration: '1h 30m'
  };

  const handleServiceChange = (id: string) => {
    setFormData((prev) => ({ ...prev, serviceId: id }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const timeLabel = formData.preferredTime === 'morning'
      ? 'Mañana (8:00 AM - 12:00 PM)'
      : formData.preferredTime === 'afternoon'
      ? 'Tarde (1:00 PM - 5:00 PM)'
      : 'Tarde-Noche (5:00 PM - 7:00 PM)';

    const firstTimeText = formData.isFirstTime ? 'Sí (Deseo asesoría de visagismo)' : 'Ya soy clienta de Manu Studio';

    const message = encodeURIComponent(
      `¡Hola Manu! Me gustaría solicitar una cita en *MANU STUDIO*:\n\n` +
      `👤 *Nombre:* ${formData.clientName || 'Clienta'}\n` +
      (formData.phone ? `📱 *Teléfono:* ${formData.phone}\n` : '') +
      `✨ *Servicio de Interés:* ${selectedService.name} ($${selectedService.price} USD / aprox ${selectedService.duration})\n` +
      `📅 *Fecha Tentativa:* ${formData.preferredDate || 'Lo más pronto posible'}\n` +
      `⏰ *Jornada:* ${timeLabel}\n` +
      `💖 *Estilo Deseado:* ${formData.stylePreference}\n` +
      `🌸 *¿Primera vez?:* ${firstTimeText}\n` +
      (formData.notes ? `📝 *Detalles/Alergias:* ${formData.notes}\n` : '') +
      `\n¿Me confirmas disponibilidad en tu agenda? Muchas gracias ♡`
    );

    window.open(`https://wa.me/${studioInfo.whatsappNumber}?text=${message}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-[#FFFDFE] via-white to-[#FAF7F6] rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto border-2 border-[#E6C894] shadow-2xl p-6 sm:p-8 space-y-6 relative text-[#1D1D1F]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/[0.04] text-[#86868B] flex items-center justify-center hover:text-[#1D1D1F] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F5] text-[#E61E78] text-xs font-bold border border-[#F4A6B8]/40">
            <Crown className="w-3.5 h-3.5" />
            <span>Cita Exclusiva Manu Studio</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D1D1F]">
            Reserva Tu Momento Especial
          </h3>

          <p className="text-xs text-[#6E6E73]">
            Completa los detalles y te conectaremos a WhatsApp con tu solicitud lista para confirmar fecha y hora.
          </p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
          
          {/* Service Selector */}
          <div>
            <label className="block text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
              1. Selecciona tu Servicio:
            </label>
            <select
              value={formData.serviceId}
              onChange={(e) => handleServiceChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4A6B8]/40 bg-white text-xs text-[#1D1D1F] font-semibold focus:outline-none focus:border-[#E61E78] shadow-xs"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — ${s.price} USD ({s.duration})
                </option>
              ))}
            </select>
          </div>

          {/* Selected Service Quick Preview Card */}
          <div className="p-3.5 rounded-2xl bg-[#FFF0F5] border border-[#F4A6B8]/40 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-[#E61E78] block">{selectedService.name}</span>
              <span className="text-[11px] text-[#86868B] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#E61E78]" /> {selectedService.duration} aprox.
              </span>
            </div>
            <div className="text-right">
              <span className="font-serif text-lg font-bold text-[#1D1D1F]">
                ${selectedService.price} <span className="text-[10px] font-sans font-normal text-[#86868B]">USD</span>
              </span>
            </div>
          </div>

          {/* Client Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1D1D1F] mb-1">
                Tu Nombre Completo *
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-[#E61E78] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Ej: Laura Gómez"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#F4A6B8]/40 bg-white text-xs text-[#1D1D1F] focus:outline-none focus:border-[#E61E78]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1D1D1F] mb-1">
                Número de Celular
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-[#E61E78] absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="Ej: 313 674 3859"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#F4A6B8]/40 bg-white text-xs text-[#1D1D1F] focus:outline-none focus:border-[#E61E78]"
                />
              </div>
            </div>
          </div>

          {/* Preferred Date & Time Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1D1D1F] mb-1">
                Fecha Tentativa
              </label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-[#E61E78] absolute left-3 top-3" />
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#F4A6B8]/40 bg-white text-xs text-[#1D1D1F] focus:outline-none focus:border-[#E61E78]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1D1D1F] mb-1">
                Jornada de Preferencia
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#F4A6B8]/40 bg-white text-xs text-[#1D1D1F] focus:outline-none focus:border-[#E61E78]"
              >
                <option value="morning">Mañana (8:00 AM - 12:00 PM)</option>
                <option value="afternoon">Tarde (1:00 PM - 5:00 PM)</option>
                <option value="evening">Tarde-Noche (5:00 PM - 7:00 PM)</option>
              </select>
            </div>
          </div>

          {/* Style Preference */}
          <div>
            <label className="block text-xs font-bold text-[#1D1D1F] mb-1">
              Estilo de mirada que buscas:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                'Natural & Sutil',
                'Definido & Elegante',
                'Glamour & Impacto'
              ].map((style) => (
                <button
                  type="button"
                  key={style}
                  onClick={() => setFormData({ ...formData, stylePreference: style })}
                  className={`p-2 rounded-xl text-[11px] font-bold border text-center transition-all cursor-pointer ${
                    formData.stylePreference === style
                      ? 'bg-[#E61E78] text-white border-[#E61E78] shadow-xs'
                      : 'bg-white text-[#6E6E73] border-[#F4A6B8]/40 hover:bg-[#FFF0F5]'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* First Time & Prep Etiquette check */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isFirstTimeCheckbox"
                checked={formData.isFirstTime}
                onChange={(e) => setFormData({ ...formData, isFirstTime: e.target.checked })}
                className="w-4 h-4 rounded text-[#E61E78] accent-[#E61E78]"
              />
              <label htmlFor="isFirstTimeCheckbox" className="text-xs text-[#1D1D1F] font-medium cursor-pointer">
                Es mi primera vez en MANU STUDIO (asesoría de visagismo)
              </label>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF7F6] border border-[#F4A6B8]/30 flex items-center gap-2 text-[11px] text-[#6E6E73]">
              <ShieldCheck className="w-4 h-4 text-[#34C759] shrink-0" />
              <span>Recordatorio: Llegar con la zona libre de máscara de pestañas o aceites.</span>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-bold text-[#1D1D1F] mb-1">
              Comentarios o dudas (opcional):
            </label>
            <textarea
              rows={2}
              placeholder="¿Tienes alguna duda o requieres retiro de pestañas previas?"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-[#F4A6B8]/40 bg-white text-xs text-[#1D1D1F] focus:outline-none focus:border-[#E61E78] resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              id="submit-booking-whatsapp-btn"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider font-bold text-white bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#128C7E] shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar Solicitud a WhatsApp Directo</span>
            </button>
            <p className="text-[10px] text-[#86868B] text-center mt-2">
              Se abrirá WhatsApp con tu mensaje listo. Manu te confirmará de inmediato ♡
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
