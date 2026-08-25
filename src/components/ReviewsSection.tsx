import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { ReviewItem } from '../types';
import { Sparkles, Star, Plus, Edit2, Trash2, CheckCircle, Quote, Heart, Crown } from 'lucide-react';
import { EditReviewModal } from './EditReviewModal';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview, updateReview, deleteReview, isAdminLoggedIn } = useAdmin();
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);
  const [creatingReview, setCreatingReview] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F5] border border-[#F4A6B8]/30 text-[#D81B60] text-[11px] font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#E61E78]" />
            <span>Experiencias Reales & Glow</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
            Lo Que Dicen Nuestras Princesas ♡
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6E73]">
            Historias de miradas transformadas con delicadeza, amor y confort.
          </p>
        </div>

        {isAdminLoggedIn && (
          <button
            id="admin-add-review-btn"
            onClick={() => setCreatingReview(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#E61E78] to-[#F0789E] hover:from-[#D81B60] hover:to-[#E61E78] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Nueva Reseña</span>
          </button>
        )}
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="group relative rounded-3xl bg-white/85 backdrop-blur-xl border border-[#F4A6B8]/20 hover:border-[#E61E78]/40 p-6 sm:p-7 shadow-[0_8px_30px_rgba(244,166,184,0.08)] hover:shadow-[0_16px_40px_rgba(230,30,120,0.12)] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top decorative pink glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FFF0F5] to-transparent rounded-tr-3xl pointer-events-none -z-10" />

            <div className="space-y-4">
              {/* Stars & Quote Icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'text-[#C5A059] fill-[#C5A059]'
                          : 'text-[#E5E5EA]'
                      }`}
                    />
                  ))}
                </div>

                <Quote className="w-6 h-6 text-[#F4A6B8]/40 group-hover:text-[#E61E78]/50 transition-colors" />
              </div>

              {/* Comment text */}
              <p className="text-xs sm:text-sm text-[#2D2529] font-normal leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-4 mt-4 border-t border-[#F4A6B8]/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FCE8EE] to-[#FFF0F5] border border-[#F4A6B8]/40 flex items-center justify-center text-[#E61E78] font-serif font-bold text-sm shadow-2xs">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-serif text-xs font-bold text-[#1D1D1F]">
                      {rev.name}
                    </span>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-[#E61E78]" />
                    )}
                  </div>
                  <span className="text-[10px] text-[#86868B] block font-medium">
                    {rev.service} • {rev.date}
                  </span>
                </div>
              </div>

              {/* Admin Actions */}
              {isAdminLoggedIn && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingReview(rev)}
                    title="Editar reseña"
                    className="p-1.5 rounded-lg bg-[#FFF0F5] hover:bg-[#FCE8EE] text-[#E61E78] transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm(`¿Eliminar la reseña de "${rev.name}"?`)) {
                        await deleteReview(rev.id);
                      }
                    }}
                    title="Eliminar reseña"
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Review Modal */}
      {editingReview && (
        <EditReviewModal
          review={editingReview}
          isOpen={true}
          onClose={() => setEditingReview(null)}
          onSave={async (updated) => {
            await updateReview(updated);
            setEditingReview(null);
          }}
        />
      )}

      {/* Add Review Modal */}
      {creatingReview && (
        <EditReviewModal
          review={{
            id: `rev-${Date.now()}`,
            name: '',
            service: 'Laminado de Cejas & Pestañas',
            rating: 5,
            comment: '',
            date: 'Hoy',
            verified: true
          }}
          isOpen={true}
          isNew={true}
          onClose={() => setCreatingReview(false)}
          onSave={async (newR) => {
            await addReview(newR);
            setCreatingReview(false);
          }}
        />
      )}
    </section>
  );
};
