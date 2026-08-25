import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Lock, Sparkles, X, User, KeyRound, Crown } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { showLoginModal, setShowLoginModal, login, loginError } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!showLoginModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#FFFDFE] via-[#FCF8F9] to-[#FFF0F5] border-2 border-[#E6C894] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(230,30,120,0.2)]">
        
        {/* Close Button */}
        <button
          onClick={() => setShowLoginModal(false)}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 border border-[#F2D7DE] text-[#7E5F6D] hover:text-[#E61E78] transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Crown Emblem */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-[#FCE8EE] to-[#FFF0E8] border border-[#E6C894] flex items-center justify-center shadow-md">
            <Crown className="w-8 h-8 text-[#C59B27]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#2A1720]">
            Acceso Administradora
          </h3>
          <p className="text-xs text-[#7E5F6D] mt-1">
            Inicia sesión para editar todas las fotos, servicios y textos de Manu Studio
          </p>
        </div>

        {/* Error Notification */}
        {loginError && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
            {loginError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#543743] mb-1">
              Usuario
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A38190]">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="manu"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/90 border border-[#F2D7DE] rounded-xl text-sm text-[#2A1720] placeholder-[#A38190]/60 focus:outline-none focus:border-[#E61E78] focus:ring-2 focus:ring-[#E61E78]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#543743] mb-1">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A38190]">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                required
                className="w-full pl-10 pr-12 py-3 bg-white/90 border border-[#F2D7DE] rounded-xl text-sm text-[#2A1720] placeholder-[#A38190]/60 focus:outline-none focus:border-[#E61E78] focus:ring-2 focus:ring-[#E61E78]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-[#7E5F6D] hover:text-[#E61E78]"
              >
                {showPassword ? 'Ocultar' : 'Ver'}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E61E78] via-[#F0789E] to-[#E61E78] text-white font-bold text-sm shadow-[0_8px_20px_rgba(230,30,120,0.35)] hover:shadow-[0_12px_28px_rgba(230,30,120,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Entrar al Modo de Edición</span>
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-[#F2D7DE] text-center">
          <p className="text-[11px] text-[#A38190]">
            Credenciales de acceso: Usuario: <span className="font-bold text-[#E61E78]">manu</span> • Contraseña: <span className="font-bold text-[#E61E78]">manu123</span>
          </p>
        </div>

      </div>
    </div>
  );
};
