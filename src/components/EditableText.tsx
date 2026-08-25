import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Edit2, Check, X, RefreshCw, Save } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void | Promise<void>;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  multiline?: boolean;
  className?: string;
  placeholder?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  as: Component = 'span',
  multiline = false,
  className = '',
  placeholder = 'Texto...'
}) => {
  const { isAdminLoggedIn } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [currentVal, setCurrentVal] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  if (!isAdminLoggedIn) {
    return <Component className={className}>{value}</Component>;
  }

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaving(true);
    try {
      await onSave(currentVal);
      setIsEditing(false);
    } catch (err) {
      console.error('Error guardando texto:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentVal(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <span 
        className="inline-flex flex-col gap-2 w-full my-1 relative z-20 p-2 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#E61E78] shadow-[0_8px_30px_rgba(230,30,120,0.2)] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {multiline ? (
          <textarea
            value={currentVal}
            onChange={(e) => setCurrentVal(e.target.value)}
            rows={3}
            className="w-full p-2.5 text-xs sm:text-sm bg-[#FAF7F6] border border-[#F4A6B8]/50 rounded-xl text-[#1D1D1F] focus:outline-none focus:bg-white"
            placeholder={placeholder}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={currentVal}
            onChange={(e) => setCurrentVal(e.target.value)}
            className="w-full p-2.5 text-xs sm:text-sm bg-[#FAF7F6] border border-[#F4A6B8]/50 rounded-xl text-[#1D1D1F] focus:outline-none focus:bg-white font-medium"
            placeholder={placeholder}
            autoFocus
          />
        )}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] text-[#86868B] font-medium">
            Sincroniza con Firebase Firestore
          </span>
          <div className="flex items-center gap-1.5 self-end">
            <button
              type="button"
              onClick={handleCancel}
              className="px-2.5 py-1.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancelar</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#E61E78] to-[#F0789E] hover:from-[#D81B60] hover:to-[#E61E78] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>💾 Guardar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </span>
    );
  }

  return (
    <Component
      className={`group relative cursor-pointer border border-dashed border-transparent hover:border-[#E61E78]/50 hover:bg-[#FFF0F5]/40 rounded px-1 transition-all ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        setCurrentVal(value);
        setIsEditing(true);
      }}
      title="Clic para editar texto (Admin)"
    >
      {value}
      <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 text-[#E61E78] align-middle transition-opacity">
        <Edit2 className="w-3.5 h-3.5 inline" />
      </span>
    </Component>
  );
};
