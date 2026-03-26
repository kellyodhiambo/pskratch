import { useState } from 'react';
import { Link } from 'react-router-dom';
import { trendingMixes } from '../../../mocks/mixes';

export default function TrendingMixes() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const featured = trendingMixes.find((m) => m.isFeatured)!;
  const secondary = trendingMixes.filter((m) => !m.isFeatured);

  return (
    <section id="mixes" className="py-20 md:py-28" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <span className="font-barlow text-xs tracking-widest uppercase mb-2 block" style={{ color: 'var(--gold)' }}>Sounds</span>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-bebas text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>Trending Mixes</h2>
            <Link
              to="/mixes"
              className="flex items-center gap-1.5 font-barlow text-xs font-600 tracking-widest uppercase transition-all duration-200 cursor-pointer whitespace-nowrap hover:gap-2.5 pb-1"
              style={{ color: 'var(--gold)', borderBottom: '1px solid var(--border-gold)' }}
            >
              View All Mixes
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line" />
              </div>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Featured */}
          <div
            className="lg:col-span-3 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="relative h-64 md:h-80">
              <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={() => setActiveId(activeId === featured.id ? null : featured.id)}
                aria-label={`Play ${featured.title}`}
              >
                {activeId === featured.id ? (
                  <div className="w-16 h-16 flex items-center justify-center rounded-full glow-btn" style={{ backgroundColor: 'var(--gold)' }}>
                    <i className="ri-pause-line text-black text-2xl" />
                  </div>
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 transition-all duration-200"
                    style={{ borderColor: 'var(--gold)', boxShadow: '0 0 20px var(--gold-glow)' }}>
                    <i className="ri-play-fill text-2xl" style={{ color: 'var(--gold)' }} />
                  </div>
                )}
              </button>
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 rounded-full">
                <span className="text-white/70 text-xs">{featured.duration}</span>
              </div>
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-barlow tracking-wide"
                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}>
                Featured
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bebas text-2xl tracking-wide mb-1" style={{ color: 'var(--text)' }}>{featured.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{featured.description}</p>
              <div className="flex gap-3 mt-4">
                {['Audio', 'Video'].map((label) => (
                  <a key={label} href="#"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-all duration-200 cursor-pointer whitespace-nowrap"
                    style={{ border: '1px solid var(--border)', color: 'var(--text-2)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'}
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className={`${label === 'Audio' ? 'ri-download-line' : 'ri-video-download-line'} text-xs`} />
                    </div>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary mixes */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {secondary.map((mix) => (
              <div key={mix.id}
                className="flex gap-4 rounded-xl overflow-hidden group cursor-pointer transition-all duration-200"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-gold)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
              >
                <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden">
                  <img src={mix.thumbnail} alt={mix.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                    onClick={() => setActiveId(activeId === mix.id ? null : mix.id)}
                    aria-label={`Play ${mix.title}`}
                  >
                    <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ backgroundColor: 'var(--gold)' }}>
                      <i className={`${activeId === mix.id ? 'ri-pause-line' : 'ri-play-fill'} text-black text-sm`} />
                    </div>
                  </button>
                  <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/70 rounded text-white/70 text-xs">{mix.duration}</div>
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bebas text-base tracking-wide mb-1" style={{ color: 'var(--text)' }}>{mix.title}</h3>
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-3)' }}>{mix.description}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {['ri-download-line', 'ri-share-line'].map((icon) => (
                      <a key={icon} href="#"
                        className="w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer"
                        style={{ border: '1px solid var(--border)', color: 'var(--text-3)' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'}
                      >
                        <i className={`${icon} text-xs`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
