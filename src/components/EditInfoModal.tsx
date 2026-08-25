import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { StudioInfo } from '../types';
import { X, Check, Phone, MapPin, Instagram, Clock, Mail } from 'lucide-react';

interface EditInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditInfoModal: React.FC<EditInfoModalProps> = ({ isOpen, onClose }) => {
  const { studioInfo, updateStudioInfo } = useAdmin();
  const [formData, setFormData] = useState<StudioInfo>({ ...studioInfo });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStudioInfo(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#FFFDFE] via-[#FCF8F9] to-[#FAF7F6] border-2 border-[#E6C894] rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F2D7DE]">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#2A1720]">
              Información de Contacto & Redes
            </h3>
            <p className="text-xs text-[#7E5F6D]">
              Actualiza el número de WhatsApp para reservas, horarios y ubicación
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#F2D7DE] flex items-center justify-center text-[#7E5F6D] hover:text-[#E61E78]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
                WhatsApp Numérico (para API wa.me)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  placeholder="573136743859"
                  required
                  className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
                />
              </div>
              <p className="text-[10px] text-[#7E5F6D] mt-0.5">Ejemplo: 573136743859</p>
            </div>

            <div>
              <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
                WhatsApp Visible (en pantalla)
              </label>
              <input
                type="text"
                value={formData.whatsappDisplay}
                onChange={(e) => setFormData({ ...formData, whatsappDisplay: e.target.value })}
                placeholder="313 674 3859"
                required
                className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
                Instagram
              </label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="@manustudio.lashes"
                className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
                Email de Contacto
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contacto@manustudio.com"
                className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
              Horario de Atención
            </label>
            <input
              type="text"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              placeholder="Lunes a Sábado: 8:00 AM – 7:00 PM (Citas programadas)"
              className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
                Dirección / Ubicación
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Calle de las Rosas 14-22..."
                className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
                Ciudad
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Medellín, Colombia"
                className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF0F5] border border-[#F2D7DE] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[#2A1720] block">Banner Promocional Superior</span>
                <span className="text-[10px] text-[#7E5F6D]">Mostrar cintillo VIP arriba de la página</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.promoActive ?? true}
                  onChange={(e) => setFormData({ ...formData, promoActive: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E61E78]"></div>
              </label>
            </div>

            <div>
              <label className="block font-bold text-[#543743] mb-1">Texto del Anuncio</label>
              <input
                type="text"
                value={formData.promoText || ''}
                onChange={(e) => setFormData({ ...formData, promoText: e.target.value })}
                placeholder="✨ PROMOCIÓN VIP: 15% OFF con el código #MANUGLOW ✨"
                className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#543743] mb-1">Insignia / Badge</label>
                <input
                  type="text"
                  value={formData.promoBadge || ''}
                  onChange={(e) => setFormData({ ...formData, promoBadge: e.target.value })}
                  placeholder="Descuento Exclusivo"
                  className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#543743] mb-1">Código de Cupón</label>
                <input
                  type="text"
                  value={formData.promoCode || ''}
                  onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                  placeholder="MANUGLOW"
                  className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] uppercase font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F2D7DE] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full border border-[#F2D7DE] text-[#7E5F6D] hover:bg-white font-bold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E61E78] via-[#F0789E] to-[#E61E78] text-white font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Guardar Información</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
