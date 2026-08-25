import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { EditableText } from './EditableText';
import { ChevronDown, Sparkles, MessageCircle, HelpCircle, ShieldCheck, Plus, Edit2, Trash2 } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQViewProps {
  onOpenBooking: () => void;
}

export const FAQView: React.FC<FAQViewProps> = ({ onOpenBooking }) => {
  const { faqs, studioInfo, updateFaq, addFaq, deleteFaq, isAdminLoggedIn } = useAdmin();
  const [openIndex, setOpenIndex] = useState<string | null>(faqs[0]?.id || '1');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'lashes' | 'brows' | 'general'>('all');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newCat, setNewCat] = useState<'lashes' | 'brows' | 'general'>('lashes');

  const filteredFaqs = selectedCategory === 'all'
    ? faqs
    : faqs.filter((f) => f.category === selectedCategory);

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('¡Hola Manu! Tengo una pregunta sobre los servicios de cejas y pestañas ✨');
    window.open(`https://wa.me/${studioInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleCreateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    const item: FAQItem = {
      id: `faq-${Date.now()}`,
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      category: newCat
    };
    await addFaq(item);
    setNewQuestion('');
    setNewAnswer('');
    setIsAddingNew(false);
    setOpenIndex(item.id);
  };

  return (
    <div className="py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5E1E6] text-[#7A3347] text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#C5A059]" />
            Respuestas Claras
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2D2529] font-medium">
            Preguntas Frecuentes
          </h2>
          <p className="text-xs sm:text-base text-[#6B5E65]">
            Todo lo que necesitas saber antes de tu primera cita en <strong className="text-[#8E4355]">MANU STUDIO</strong>.
          </p>
        </div>

        {/* Category Filters & Admin Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex justify-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
            {[
              { id: 'all', label: 'Todas las Preguntas' },
              { id: 'lashes', label: 'Pestañas & Lifting' },
              { id: 'brows', label: 'Cejas & Laminado' },
              { id: 'general', label: 'Citas & Protocolos' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border ${
                  selectedCategory === cat.id
                    ? 'bg-[#B86B7E] text-white border-[#B86B7E] shadow-2xs'
                    : 'bg-white text-[#5C5257] border-[#EAC2CD] hover:bg-[#FAF0F3]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {isAdminLoggedIn && (
            <button
              onClick={() => setIsAddingNew(!isAddingNew)}
              className="px-4 py-2 rounded-full bg-[#E61E78] hover:bg-[#F0789E] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ Nueva Pregunta</span>
            </button>
          )}
        </div>

        {/* Admin Create Form */}
        {isAdminLoggedIn && isAddingNew && (
          <form onSubmit={handleCreateFaq} className="p-5 rounded-3xl bg-white border-2 border-[#E6C894] shadow-md space-y-4 text-xs animate-in fade-in duration-200">
            <h4 className="font-serif text-base font-bold text-[#2A1720]">Agregar Nueva Pregunta Frecuente</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block font-bold text-[#543743] mb-1">Pregunta *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: ¿Puedo usar maquillaje después de la cita?"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-[#FAF7F6] text-[#1D1D1F]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#543743] mb-1">Categoría</label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-[#FAF7F6] font-medium text-[#1D1D1F]"
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
                placeholder="Escribe la respuesta clara y detallada..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#F2D7DE] bg-[#FAF7F6] text-[#1D1D1F]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 rounded-full border border-[#F2D7DE] text-[#7E5F6D] font-medium cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-[#E61E78] hover:bg-[#D81B60] text-white font-bold cursor-pointer"
              >
                Guardar Pregunta
              </button>
            </div>
          </form>
        )}

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIndex === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-[#F0D5DC] overflow-hidden transition-all shadow-xs"
              >
                <div className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-serif text-base sm:text-lg font-semibold text-[#2D2529] hover:text-[#8E4355] transition-colors">
                  <div 
                    onClick={() => toggleAccordion(faq.id)} 
                    className="flex-1 cursor-pointer"
                  >
                    <EditableText
                      value={faq.question}
                      onSave={async (val) => {
                        await updateFaq({ ...faq, question: val });
                      }}
                      className="inline"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isAdminLoggedIn && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`¿Deseas eliminar la pregunta "${faq.question}"?`)) {
                            deleteFaq(faq.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-500 text-red-500 hover:text-white transition-colors cursor-pointer"
                        title="Eliminar pregunta"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      id={`faq-toggle-${faq.id}`}
                      onClick={() => toggleAccordion(faq.id)}
                      className={`w-7 h-7 rounded-full bg-[#FAF0F3] text-[#8E4355] flex items-center justify-center shrink-0 transition-transform duration-300 cursor-pointer ${isOpen ? 'rotate-180 bg-[#F5E1E6]' : ''}`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#5C5056] leading-relaxed border-t border-[#FAF0F3] pt-3 animate-in fade-in duration-200">
                    <EditableText
                      value={faq.answer}
                      onSave={async (val) => {
                        await updateFaq({ ...faq, answer: val });
                      }}
                      multiline={true}
                      className="block"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FBF2F4] via-[#F5E1E6] to-[#FAF7F6] border border-[#F0D5DC] text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-white border border-[#EAC2CD] flex items-center justify-center mx-auto text-[#8E4355] shadow-2xs">
            <MessageCircle className="w-6 h-6 text-[#25D366]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2529]">
              ¿Tienes alguna duda específica sobre tu caso?
            </h3>
            <p className="text-xs sm:text-sm text-[#665A60] max-w-md mx-auto">
              Escríbenos directamente a WhatsApp y Manu te brindará una asesoría personalizada previa.
            </p>
          </div>
          <button
            id="faq-whatsapp-direct-btn"
            onClick={openWhatsApp}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-white bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:from-[#20BA5A] shadow-xs cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
