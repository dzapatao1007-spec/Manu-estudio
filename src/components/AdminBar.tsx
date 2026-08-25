import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Crown, Plus, RefreshCw, LogOut, Check, Phone, Settings, Sparkles, Image as ImageIcon, LayoutDashboard, Gift } from 'lucide-react';
import { EditInfoModal } from './EditInfoModal';
import { EditServiceModal } from './EditServiceModal';
import { AdminDashboardModal } from './AdminDashboardModal';
import { ServiceItem } from '../types';

export const AdminBar: React.FC = () => {
  const {
    isAdminLoggedIn,
    logout,
    lastSavedText,
    isSaving,
    saveSuccess,
    resetToDefaults,
    addService
  } = useAdmin();

  const [editInfoOpen, setEditInfoOpen] = useState(false);
  const [newServiceModalOpen, setNewServiceModalOpen] = useState(false);
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);

  if (!isAdminLoggedIn) return null;

  const handleReset = () => {
    if (window.confirm('¿Deseas restablecer todos los textos y servicios a los valores originales de fábrica?')) {
      resetToDefaults();
    }
  };

  const handleCreateEmptyService = () => {
    setNewServiceModalOpen(true);
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#2A1720] via-[#451D30] to-[#2A1720] text-white border-b-2 border-[#E6C894] shadow-xl py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Status & Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#E6C894] to-[#FFF0E8] flex items-center justify-center text-[#2A1720] shadow-xs">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm tracking-wide text-[#FFF0F5]">
                  Modo Administradora Activo
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#E61E78] text-[10px] font-extrabold uppercase tracking-wider text-white">
                  Manu
                </span>
              </div>
              <p className="text-[11px] text-[#DCAE9E]">
                {isSaving ? 'Guardando en Firebase...' : lastSavedText}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Master Dashboard Button */}
            <button
              id="admin-open-master-dashboard-btn"
              onClick={() => setDashboardModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#ECC277] via-[#FFF4D0] to-[#ECC277] text-[#2A1720] font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#2A1720]" />
              <span>👑 Panel de Control General</span>
            </button>

            <button
              onClick={handleCreateEmptyService}
              className="px-3 py-1.5 rounded-full bg-[#E61E78] hover:bg-[#F0789E] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Nuevo Servicio</span>
            </button>

            <button
              onClick={() => setEditInfoOpen(true)}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#E6C894]" />
              <span className="hidden sm:inline">Editar Contacto</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              title="Restablecer contenido original"
            >
              <RefreshCw className="w-3 h-3" />
              <span className="hidden md:inline">Restablecer</span>
            </button>

            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-full bg-red-900/40 hover:bg-red-800 text-red-200 hover:text-white font-bold text-xs flex items-center gap-1.5 border border-red-500/30 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          </div>

        </div>
      </div>

      {/* Master Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={dashboardModalOpen}
        onClose={() => setDashboardModalOpen(false)}
      />

      {/* Edit Info Modal */}
      <EditInfoModal isOpen={editInfoOpen} onClose={() => setEditInfoOpen(false)} />

      {/* New Service Modal */}
      {newServiceModalOpen && (
        <EditServiceModal
          isOpen={newServiceModalOpen}
          onClose={() => setNewServiceModalOpen(false)}
          service={{
            id: `servicio-${Date.now()}`,
            name: 'Nuevo Servicio Luxury',
            category: 'lashes',
            shortDescription: 'Descripción corta del nuevo procedimiento.',
            fullDescription: 'Descripción completa detallando el procedimiento y beneficios.',
            duration: '1h 30m',
            price: 35,
            popular: false,
            tag: 'Nuevo',
            image: '/src/assets/images/eyelash_extensions_1787346129559.jpg',
            included: ['Visagismo personalizado', 'Insumos certificados'],
            idealFor: 'Todo tipo de miradas',
            retouchTime: 'Cada 20 días'
          }}
          isNew={true}
        />
      )}
    </>
  );
};
