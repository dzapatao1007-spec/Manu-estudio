import React, { useState, useRef } from 'react';
import { Camera, Sparkles, Upload, Link, Check, X, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { compressImageFile } from '../utils/imageCompressor';

interface EditableImageProps {
  src: string;
  alt: string;
  label?: string;
  onSave?: (newUrl: string) => Promise<void> | void;
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  draggable?: boolean;
}

const LUXURY_PRESETS = [
  {
    title: 'Manuela / Master Artist',
    url: '/src/assets/images/manu_founder_portrait_1787431485341.jpg',
    category: 'Fundadora'
  },
  {
    title: 'Logo Oficial Manu Studio',
    url: '/src/assets/images/manu_studio_official_logo_1787618363052.jpg',
    category: 'Branding'
  },
  {
    title: 'Estudio Boutique & Cabina VIP',
    url: '/src/assets/images/hero_beauty_studio_1787346116993.jpg',
    category: 'Espacio'
  },
  {
    title: 'Brow Lamination & Keratina',
    url: '/src/assets/images/brow_lamination_1787346140737.jpg',
    category: 'Cejas'
  },
  {
    title: 'Pestañas Pelo a Pelo & Volumen',
    url: '/src/assets/images/eyelash_extensions_1787346129559.jpg',
    category: 'Pestañas'
  },
  {
    title: 'Diseño de Ceja & Henna Gold',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    category: 'Cejas'
  },
  {
    title: 'Powder Brows Luxury Look',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    category: 'Micropigmentación'
  },
  {
    title: 'Latín Brows Fusión Perfecta',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
    category: 'Micropigmentación'
  }
];

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  label = 'Foto',
  onSave,
  className = '',
  containerClassName = '',
  style,
  loading = 'lazy'
}) => {
  const { isAdminLoggedIn } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [previewUrl, setPreviewUrl] = useState(src);
  const [inputUrl, setInputUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setPreviewUrl(src);
    setInputUrl(src.startsWith('http') ? src : '');
    setSaveSuccess(false);
    setHasPendingChange(false);
    setModalOpen(true);
  };

  const [hasPendingChange, setHasPendingChange] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      // Compress image for optimal performance and Firestore storage
      const compressedDataUrl = await compressImageFile(file, 1200, 0.85);
      setPreviewUrl(compressedDataUrl);
      setHasPendingChange(true);
    } catch (err) {
      console.error('Error compressing file:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyUrl = () => {
    if (inputUrl.trim()) {
      setPreviewUrl(inputUrl.trim());
      setHasPendingChange(true);
    }
  };

  const handleSelectPreset = (url: string) => {
    setPreviewUrl(url);
    setHasPendingChange(true);
  };

  const handleSave = async () => {
    if (!onSave) return;
    setIsProcessing(true);
    try {
      await onSave(previewUrl);
      setSaveSuccess(true);
      setHasPendingChange(false);
      setTimeout(() => {
        setModalOpen(false);
        setSaveSuccess(false);
      }, 1000);
    } catch (error) {
      console.error('Error saving image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`relative group/img ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
      />

      {/* Admin Edit Trigger Pill - Apple Liquid Glass Style */}
      {isAdminLoggedIn && onSave && (
        <div className="absolute inset-0 pointer-events-none flex items-start justify-end p-2.5 z-20">
          <button
            onClick={handleOpenModal}
            title={`Cambiar ${label} (Modo Admin)`}
            className="pointer-events-auto opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-300 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 hover:bg-white text-[#1D1D1F] text-xs font-semibold backdrop-blur-xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.15)] cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="hidden sm:inline">Cambiar {label}</span>
            <span className="sm:hidden">Editar</span>
          </button>
        </div>
      )}

      {/* Apple-tier Liquid Glass Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/60 shadow-[0_24px_64px_rgba(0,0,0,0.2)] text-[#1D1D1F] space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FFF0F3] to-[#FFF8F0] border border-[#C5A059]/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold tracking-tight text-[#1D1D1F]">
                    Cambiar {label}
                  </h3>
                  <p className="text-xs text-[#86868B]">
                    El cambio se guardará y sincronizará en Firebase automáticamente
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Banner */}
            <div className="relative rounded-2xl overflow-hidden bg-[#F5F5F7] border border-black/[0.04] flex items-center justify-center h-48 sm:h-56">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Vista previa"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#86868B]">
                  <ImageIcon className="w-8 h-8 opacity-40" />
                  <span className="text-xs">Sin imagen seleccionada</span>
                </div>
              )}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium tracking-wide">
                Vista Previa
              </div>
              {hasPendingChange && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#E61E78] text-white text-[10px] font-bold tracking-wide animate-pulse shadow-md">
                  ✨ Nueva Foto Seleccionada
                </div>
              )}
            </div>

            {/* Pending Confirmation Callout if changed */}
            {hasPendingChange && (
              <div className="p-3.5 rounded-2xl bg-[#FFF0F5] border border-[#F4A6B8]/50 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#D81B60]">
                  <Sparkles className="w-4 h-4 shrink-0 text-[#E61E78]" />
                  <span className="font-semibold text-[11px]">
                    Foto lista. Presiona <strong>"Guardar en Firebase"</strong> para aplicar los cambios en la base de datos.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 rounded-xl bg-[#E61E78] hover:bg-[#D81B60] text-white font-bold text-xs shrink-0 flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Guardar Ya</span>
                </button>
              </div>
            )}

            {/* Segmented Control Tabs */}
            <div className="grid grid-cols-3 p-1 rounded-2xl bg-[#EBEBED]/60 border border-black/[0.04] text-xs font-semibold text-[#6E6E73]">
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'upload'
                    ? 'bg-white text-[#1D1D1F] shadow-xs'
                    : 'hover:text-[#1D1D1F]'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Subir Foto</span>
              </button>
              <button
                onClick={() => setActiveTab('url')}
                className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'url'
                    ? 'bg-white text-[#1D1D1F] shadow-xs'
                    : 'hover:text-[#1D1D1F]'
                }`}
              >
                <Link className="w-3.5 h-3.5" />
                <span>Enlace URL</span>
              </button>
              <button
                onClick={() => setActiveTab('presets')}
                className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'presets'
                    ? 'bg-white text-[#1D1D1F] shadow-xs'
                    : 'hover:text-[#1D1D1F]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Galería VIP</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="min-h-[90px]">
              {activeTab === 'upload' && (
                <div className="space-y-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#C5A059]/40 hover:border-[#C5A059] bg-[#FFF8F0]/30 hover:bg-[#FFF8F0]/60 rounded-2xl p-6 text-center cursor-pointer transition-all duration-200"
                  >
                    <Upload className="w-6 h-6 text-[#C5A059] mx-auto mb-2" />
                    <p className="text-xs font-semibold text-[#1D1D1F]">
                      Haz clic para seleccionar una foto desde tu dispositivo
                    </p>
                    <p className="text-[11px] text-[#86868B] mt-1">
                      Se optimiza y comprime automáticamente para máxima velocidad
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'url' && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://ejemplo.com/foto-alta-resolucion.jpg"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.1] text-xs focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20"
                    />
                    <button
                      onClick={handleApplyUrl}
                      className="px-4 py-2.5 rounded-xl bg-[#1D1D1F] hover:bg-black text-white text-xs font-semibold transition-colors"
                    >
                      Probar
                    </button>
                  </div>
                  <p className="text-[11px] text-[#86868B]">
                    Pega el enlace directo de una foto (Unsplash, Cloudinary, Imgur, etc.)
                  </p>
                </div>
              )}

              {activeTab === 'presets' && (
                <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1">
                  {LUXURY_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPreset(preset.url)}
                      className={`relative rounded-xl overflow-hidden border transition-all text-left group ${
                        previewUrl === preset.url
                          ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30 scale-95'
                          : 'border-black/[0.08] hover:border-[#C5A059]/60'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.title}
                        className="w-full h-14 object-cover"
                      />
                      <div className="p-1 bg-white/95 text-[9px] font-medium text-[#1D1D1F] truncate">
                        {preset.title}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-black/[0.06] pt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                disabled={isProcessing || !previewUrl}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-2 shadow-md ${
                  saveSuccess
                    ? 'bg-[#34C759]'
                    : 'bg-gradient-to-r from-[#E61E78] via-[#F0789E] to-[#E61E78] hover:shadow-[0_8px_20px_rgba(230,30,120,0.35)] hover:scale-[1.02]'
                } ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Guardando en Firebase...</span>
                  </>
                ) : saveSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Guardado en Firebase con Éxito!</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>💾 Guardar Imagen en Firebase</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
