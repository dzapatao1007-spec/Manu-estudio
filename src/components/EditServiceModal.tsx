import React, { useState, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { ServiceItem, ServiceCategory } from '../types';
import { X, Check, Trash2, Camera, Upload, Sparkles, Plus } from 'lucide-react';

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem;
  isNew?: boolean;
}

export const EditServiceModal: React.FC<EditServiceModalProps> = ({
  isOpen,
  onClose,
  service,
  isNew = false
}) => {
  const { updateService, addService, deleteService, uploadImage } = useAdmin();

  const [formData, setFormData] = useState<ServiceItem>({ ...service });
  const [includedText, setIncludedText] = useState(formData.included.join('\n'));
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const dataUri = await uploadImage(file);
      setFormData((prev) => ({ ...prev, image: dataUri }));
    } catch (err) {
      console.error('Error al subir imagen:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedService: ServiceItem = {
      ...formData,
      included: includedText.split('\n').filter((item) => item.trim().length > 0)
    };

    if (isNew) {
      await addService(updatedService);
    } else {
      await updateService(updatedService);
    }
    onClose();
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Estás segura de eliminar el servicio "${formData.name}"?`)) {
      await deleteService(formData.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#FFFDFE] via-[#FCF8F9] to-[#FAF7F6] border-2 border-[#E6C894] rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F2D7DE]">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#2A1720]">
              {isNew ? 'Nuevo Servicio de Lujo' : 'Editar Servicio'}
            </h3>
            <p className="text-xs text-[#7E5F6D]">
              Los cambios se sincronizarán directamente en Firebase Firestore
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
          
          {/* Row 1: Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
                Nombre del Servicio
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ServiceCategory })}
                className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
              >
                <option value="brows">Cejas (Cejas Perfectas)</option>
                <option value="lashes">Pestañas (Lashes & Lifting)</option>
                <option value="micropigmentation">Micropigmentación (Powder & Latín Brows)</option>
                <option value="combos">Combos Dúo VIP</option>
                <option value="care">Cuidado & Spa</option>
              </select>
            </div>
          </div>

          {/* Row 2: Price, Duration & Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
                Precio (USD / COP)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
                className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
                Duración Estimada
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="1h 30m"
                required
                className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
                Etiqueta / Tag Chic
              </label>
              <input
                type="text"
                value={formData.tag || ''}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="Más Solicitado, Dúo Favorito..."
                className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
              />
            </div>
          </div>

          {/* Image & Upload */}
          <div>
            <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
              Fotografía del Procedimiento
            </label>
            <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-[#F2D7DE]">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FCE8EE] border border-[#E6C894] flex-shrink-0">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2 bg-[#FCF8F9] border border-[#F2D7DE] rounded-lg text-[11px]"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-[#FCE8EE] text-[#E61E78] font-bold text-[11px] hover:bg-[#F9BDD0]/60 flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'Subiendo...' : 'Subir Foto de mi Dispositivo'}</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
              Descripción Corta (Para tarjetas de catálogo)
            </label>
            <textarea
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              rows={2}
              required
              className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
              Descripción Detallada & Protocolo
            </label>
            <textarea
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              rows={3}
              required
              className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
            />
          </div>

          {/* Inclusions (One per line) */}
          <div>
            <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
              ¿Qué incluye el servicio? (Un beneficio por línea)
            </label>
            <textarea
              value={includedText}
              onChange={(e) => setIncludedText(e.target.value)}
              rows={4}
              placeholder="Visagismo de mirada&#10;Limpieza profunda con foam&#10;Insumos hipoalergénicos"
              className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78] font-mono text-[11px]"
            />
          </div>

          {/* Retouch time & Ideal for */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
                Ideal Para
              </label>
              <input
                type="text"
                value={formData.idealFor}
                onChange={(e) => setFormData({ ...formData, idealFor: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
                Frecuencia / Retoque Sugerido
              </label>
              <input
                type="text"
                value={formData.retouchTime || ''}
                onChange={(e) => setFormData({ ...formData, retouchTime: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#F2D7DE] flex items-center justify-between">
            {!isNew ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 font-bold flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar Servicio</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
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
                <span>Guardar en Firebase</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
