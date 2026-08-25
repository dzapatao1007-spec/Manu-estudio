import React, { useState } from 'react';
import { ReviewItem } from '../types';
import { X, Star, Sparkles, Check } from 'lucide-react';

interface EditReviewModalProps {
  review: ReviewItem;
  isOpen: boolean;
  isNew?: boolean;
  onClose: () => void;
  onSave: (review: ReviewItem) => Promise<void>;
}

export const EditReviewModal: React.FC<EditReviewModalProps> = ({
  review,
  isOpen,
  isNew = false,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<ReviewItem>({ ...review });
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#FFFDFE] via-[#FCF8F9] to-[#FAF7F6] border-2 border-[#E6C894] rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-[#F2D7DE] flex items-center justify-center text-[#7E5F6D] hover:text-[#E61E78] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-[#E61E78] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{isNew ? 'Nueva Reseña' : 'Editar Reseña'}</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#2A1720]">
            {isNew ? 'Agregar Opinión de Princesa' : 'Modificar Reseña'}
          </h3>
          <p className="text-xs text-[#7E5F6D]">
            Las reseñas se mostrarán en la página de inicio y se guardan en Firebase.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
              Nombre de la Clienta
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Valentina Morales"
              required
              className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
                Servicio Realizado
              </label>
              <input
                type="text"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                placeholder="Ej: Pestañas Clásicas"
                required
                className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
                Fecha / Tiempo
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="Ej: Hace 2 días"
                required
                className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
              Calificación (Estrellas)
            </label>
            <div className="flex items-center gap-2 p-2 bg-white border border-[#F2D7DE] rounded-xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="p-1 text-base transition-transform hover:scale-125 cursor-pointer"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= formData.rating
                        ? 'text-[#C5A059] fill-[#C5A059]'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs text-[#7E5F6D] ml-2 font-medium">
                {formData.rating} de 5 estrellas
              </span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#543743] mb-1 uppercase tracking-wider">
              Comentario / Reseña
            </label>
            <textarea
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Escribe la experiencia o testimonio..."
              required
              className="w-full p-2.5 bg-white border border-[#F2D7DE] rounded-xl text-[#2A1720] focus:border-[#E61E78]"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-[#F2D7DE]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white border border-[#F2D7DE] text-[#7E5F6D] hover:bg-gray-50 font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-gradient-to-r from-[#E61E78] to-[#F0789E] hover:from-[#D81B60] hover:to-[#E61E78] text-white font-bold shadow-md cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? 'Guardando...' : 'Guardar Reseña'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
