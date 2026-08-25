import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles, Crown } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const InstagramFeedSection: React.FC = () => {
  const { studioInfo, lookbook } = useAdmin();

  const defaultInstagramPosts = [
    {
      id: 'ig-1',
      image: '/src/assets/images/eyelash_extensions_1787346129559.jpg',
      caption: 'Lifting de pestañas efecto mirada abierta & descansada. Cero rímel, 100% natural ♡',
      likes: '142',
      tag: '#LiftingPestañas'
    },
    {
      id: 'ig-2',
      image: '/src/assets/images/brow_lamination_1787346140737.jpg',
      caption: 'Laminado orgánico con visagismo personalizado. Resaltando la estructura de tu rostro ✨',
      likes: '189',
      tag: '#CejasPerfectas'
    },
    {
      id: 'ig-3',
      image: '/src/assets/images/hero_beauty_studio_1787346116993.jpg',
      caption: 'Momentos de desconexión y consentirte en nuestro studio. Tu espacio de confort y mimos ♡',
      likes: '215',
      tag: '#ManuStudio'
    },
    {
      id: 'ig-4',
      image: '/src/assets/images/manu_founder_portrait_1787431485341.jpg',
      caption: 'Cuidando cada detalle para que salgas sintiéndote linda, segura y renovada ♡',
      likes: '320',
      tag: '#LashArtist'
    }
  ];

  const igUrl = studioInfo.instagramUrl || `https://instagram.com/${studioInfo.instagram.replace('@', '')}`;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF0F5] border border-[#F4A6B8]/40 text-[#E61E78] text-[11px] font-bold tracking-wide">
              <Instagram className="w-3.5 h-3.5" />
              <span>Comunidad & Trabajos Diarios</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
              Síguenos en Instagram
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6E73]">
              Mira transformaciones reales, testimonios y el día a día en nuestro studio.
            </p>
          </div>

          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-90 text-white text-xs font-bold shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            <Instagram className="w-4 h-4" />
            <span>Seguir {studioInfo.instagram}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Instagram Grid Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {defaultInstagramPosts.map((post) => (
            <a
              key={post.id}
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-3xl overflow-hidden bg-[#FAF7F6] border border-[#F4A6B8]/30 shadow-xs hover:shadow-xl transition-all duration-500 block cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Hover Overlay with Likes & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                    {post.tag}
                  </span>
                  <Instagram className="w-4 h-4 text-white/80" />
                </div>

                <div className="space-y-1.5">
                  <p className="text-[11px] font-medium line-clamp-2 leading-tight">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-pink-200">
                    <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
                    <span>{post.likes} likes</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
