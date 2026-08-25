import React, { useState, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { X, Check, Upload, Sparkles, User, Image as ImageIcon, Save, RefreshCw } from 'lucide-react';
import { compressImageFile } from '../utils/imageCompressor';

interface EditAboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditAboutModal: React.FC<EditAboutModalProps> = ({ isOpen, onClose }) => {
  const { about, updateAbout, isSaving, lastSavedText } = useAdmin();

  const [formData, setFormData] = useState({
    name: about.name || 'Manuela',
    greeting: about.greeting || 'Hola, soy Manuela',
    tagline: about.tagline || 'Quiero darte la bienvenida a Manu Studio, un espacio creado con muchísimo amor, dedicación y un sueño que poco a poco se ha convertido en realidad.',
    bio1: about.bio1 || 'Me apasiona el mundo de la estética, porque creo que los pequeños detalles pueden transformar por completo y hacernos sentir mucho más seguras de nosotras mismas.',
    bio2: about.bio2 || 'Para mí, trabajar con cada una de mis clientas es mucho más que realizar un servicio. Me gusta que desde el momento en que llegues te sientas cómoda, tranquila, consentida y en confianza. Quiero que este sea un espacio donde puedas desconectarte un poquito de la rutina, disfrutar de tu momento y regalarte tiempo para ti.',
    bio3: about.bio3 || 'Me encanta escuchar lo que quieres, conocer tus gustos y ayudarte a encontrar un diseño que resalte tu belleza natural y vaya de acuerdo con tu personalidad.',
    bio4: about.bio4 || 'Mi mayor satisfacción es ver tu reacción cuando terminas y saber que te vas sintiéndote linda, feliz y segura de ti misma.',
    portraitImage: about.portraitImage || '/src/assets/images/manu_founder_portrait_1787431485341.jpg'
  });

  const [isUploading, setIsUploading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 1200, 0.85);
      setFormData((prev) => ({ ...prev, portraitImage: compressedDataUrl }));
    } catch (err) {
      console.error('Error al subir imagen de perfil:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAbout(formData);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Error guardando sobre mí:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-white via-[#FFFDFE] to-[#FFF8F0] border-2 border-[#E6C894] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#1D1D1F]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F4A6B8]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FFF0F5] to-[#FCE8EE] border border-[#F4A6B8]/40 flex items-center justify-center text-[#E61E78] shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1D1D1F]">
                Editar Sección "Sobre Mí"
              </h3>
              <p className="text-xs text-[#86868B]">
                Todos los cambios se guardan y sincronizan directamente en Firebase Firestore
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Portrait Photo Section */}
          <div className="p-4 rounded-2xl bg-white border border-[#F4A6B8]/30 shadow-xs space-y-3">
            <label className="block font-bold text-[#1D1D1F] uppercase tracking-wider text-[11px]">
              Foto Principal de Manuela
            </label>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-32 rounded-2xl overflow-hidden bg-[#FAF7F6] border-2 border-[#E6C894] shrink-0 shadow-sm relative group">
                <img
                  src={formData.portraitImage}
                  alt="Vista previa foto de Manuela"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] text-white font-bold">Vista Previa</span>
                </div>
              </div>

              <div className="flex-1 space-y-2 w-full">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.portraitImage}
                    onChange={(e) => setFormData({ ...formData, portraitImage: e.target.value })}
                    placeholder="Enlace URL o foto subida..."
                    className="flex-1 p-2.5 bg-[#FAF7F6] border border-[#F4A6B8]/40 rounded-xl text-xs text-[#1D1D1F] focus:outline-none focus:border-[#E61E78]"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-4 py-2.5 rounded-xl bg-[#FFF0F5] hover:bg-[#FCE8EE] text-[#E61E78] font-bold text-xs flex items-center gap-1.5 border border-[#F4A6B8]/40 shadow-xs transition-colors shrink-0"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'Subiendo...' : 'Subir Foto'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-[#86868B]">
                  💡 Puedes subir una foto desde tu celular/computadora o pegar el enlace directo.
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Row: Name & Greeting */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#1D1D1F] mb-1.5 uppercase tracking-wider text-[11px]">
                Nombre de la Fundadora
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full p-3 bg-white border border-[#F4A6B8]/40 rounded-xl text-[#1D1D1F] focus:outline-none focus:border-[#E61E78] shadow-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1D1D1F] mb-1.5 uppercase tracking-wider text-[11px]">
                Título / Saludo Principal
              </label>
              <input
                type="text"
                value={formData.greeting}
                onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
                required
                className="w-full p-3 bg-white border border-[#F4A6B8]/40 rounded-xl text-[#1D1D1F] focus:outline-none focus:border-[#E61E78] shadow-xs"
              />
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block font-bold text-[#1D1D1F] mb-1.5 uppercase tracking-wider text-[11px]">
              Mensaje de Bienvenida Destacado (Cita)
            </label>
            <textarea
              rows={2}
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              required
              className="w-full p-3 bg-white border border-[#F4A6B8]/40 rounded-xl text-[#1D1D1F] focus:outline-none focus:border-[#E61E78] shadow-xs leading-relaxed"
            />
          </div>

          {/* Bio Paragraphs */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-[#1D1D1F] mb-1 uppercase tracking-wider text-[10px]">
                Párrafo 1 (Pasión por la belleza & detalles)
              </label>
              <textarea
                rows={2}
                value={formData.bio1}
                onChange={(e) => setFormData({ ...formData, bio1: e.target.value })}
                required
                className="w-full p-2.5 bg-white border border-[#F4A6B8]/40 rounded-xl text-[#1D1D1F] focus:outline-none focus:border-[#E61E78]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1D1D1F] mb-1 uppercase tracking-wider text-[10px]">
                Párrafo 2 (Experiencia, confort & desconexión)
              </label>
              <textarea
                rows={3}
                value={formData.bio2}
                onChange={(e) => setFormData({ ...formData, bio2: e.target.value })}
                required
                className="w-full p-2.5 bg-white border border-[#F4A6B8]/40 rounded-xl text-[#1D1D1F] focus:outline-none focus:border-[#E61E78]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1D1D1F] mb-1 uppercase tracking-wider text-[10px]">
                Párrafo 3 (Asesoría personalizada & visagismo)
              </label>
              <textarea
                rows={2}
                value={formData.bio3}
                onChange={(e) => setFormData({ ...formData, bio3: e.target.value })}
                required
                className="w-full p-2.5 bg-white border border-[#F4A6B8]/40 rounded-xl text-[#1D1D1F] focus:outline-none focus:border-[#E61E78]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1D1D1F] mb-1 uppercase tracking-wider text-[10px]">
                Párrafo 4 (Mayor satisfacción)
              </label>
              <textarea
                rows={2}
                value={formData.bio4}
                onChange={(e) => setFormData({ ...formData, bio4: e.target.value })}
                required
                className="w-full p-2.5 bg-white border border-[#F4A6B8]/40 rounded-xl text-[#1D1D1F] focus:outline-none focus:border-[#E61E78]"
              />
            </div>
          </div>

          {/* Action Buttons with Prominent Save Button */}
          <div className="pt-4 border-t border-[#F4A6B8]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-[#86868B]">
              {isSaving ? 'Guardando en Firebase...' : lastSavedText}
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-black/[0.1] text-[#6E6E73] hover:text-[#1D1D1F] font-semibold text-xs transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs text-white transition-all flex items-center justify-center gap-2 shadow-md ${
                  saveSuccess
                    ? 'bg-[#34C759]'
                    : 'bg-gradient-to-r from-[#E61E78] via-[#F0789E] to-[#E61E78] hover:shadow-[0_8px_20px_rgba(230,30,120,0.35)] hover:scale-[1.02]'
                } ${isSaving ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Guardando en Firebase...</span>
                  </>
                ) : saveSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Guardado con Éxito!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>💾 Guardar Cambios en Firebase</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
