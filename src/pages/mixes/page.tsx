import { useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import MixCard from './components/MixCard';
import { useMixes } from '../../store/adminStore';

const genres = ['All', 'Hip-Hop / Trap', 'Old School Hip-Hop', 'Afrobeats / R&B', 'Bass / Drum & Bass', 'Neo-Soul / Jazz R&B', 'Trap / Hip-Hop'];

export default function MixesPage() {
  const { mixes } = useMixes();
  const [activeGenre, setActiveGenre] = useState('All');

  const featured = mixes.find((m) => m.isFeatured) ?? mixes[0];
  const rest = mixes.filter((m) => !m.isFeatured);

  if (!featured) return null;

  const filtered = activeGenre === 'All'
    ? rest
    : rest.filter((m) => m.genre === activeGenre);

  return (
    <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-20">
        <div className="relative h-52 md:h-64">
          <img
            src="https://readdy.ai/api/search-image?query=DJ%20performing%20music%20studio%20live%20session%20dark%20warm%20golden%20amber%20lighting%20turntable%20professional%20close%20up%20premium%20atmosphere%20bokeh%20sound%20waves&width=1920&height=400&seq=mixeshero1&orientation=landscape"
            alt="DJ PSKRATCH Mixes"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/65 to-black/85" />
          <div
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-10 px-4">
            <span
              className="font-barlow text-xs tracking-widest uppercase mb-3"
              style={{ color: 'var(--gold)' }}
            >
              Stream &amp; Download
            </span>
            <h1 className="font-bebas text-5xl md:text-6xl text-white text-center">
              DJ PSKRATCH <span className="text-shimmer">Mixes</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Featured Mix */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 rounded-full" style={{ backgroundColor: 'var(--gold)' }} />
              <div>
                <span className="font-barlow text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>
                  Featured
                </span>
                <h2 className="font-bebas text-2xl md:text-3xl" style={{ color: 'var(--text)' }}>
                  Latest Mix
                </h2>
              </div>
            </div>
            <MixCard mix={featured} featured />
          </div>

          {/* Genre Filter */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-8 rounded-full" style={{ backgroundColor: 'var(--gold)' }} />
              <h2 className="font-bebas text-2xl md:text-3xl" style={{ color: 'var(--text)' }}>
                All Mixes
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => setActiveGenre(g)}
                  className="px-4 py-2 rounded-full font-barlow text-xs font-600 tracking-wide uppercase transition-all duration-200 cursor-pointer whitespace-nowrap"
                  style={
                    activeGenre === g
                      ? { backgroundColor: 'var(--gold)', color: '#000' }
                      : { border: '1px solid var(--border)', color: 'var(--text-2)', backgroundColor: 'transparent' }
                  }
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Mixes Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((mix) => (
                <MixCard key={mix.id} mix={mix} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4 rounded-full" style={{ border: '1px solid var(--border)' }}>
                <i className="ri-music-2-line text-2xl" style={{ color: 'var(--text-3)' }} />
              </div>
              <p className="font-bebas text-xl" style={{ color: 'var(--text-3)' }}>No mixes in this genre yet</p>
            </div>
          )}

          {/* YouTube CTA */}
          <div
            className="mt-16 rounded-2xl p-8 md:p-12 text-center"
            style={{ backgroundColor: 'var(--bg-alt)', border: '1px solid var(--border-gold)' }}
          >
            <div className="w-14 h-14 flex items-center justify-center mx-auto mb-5 rounded-full" style={{ border: '1px solid var(--border-gold)' }}>
              <i className="ri-youtube-line text-2xl" style={{ color: 'var(--gold)' }} />
            </div>
            <h2 className="font-bebas text-3xl md:text-4xl mb-3" style={{ color: 'var(--text)' }}>
              Want More Mixes?
            </h2>
            <p className="text-sm leading-relaxed max-w-md mx-auto mb-6" style={{ color: 'var(--text-2)' }}>
              Subscribe to DJ PSKRATCH on YouTube and SoundCloud for new mixes every week. Turn on notifications so you never miss a drop.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-barlow font-700 text-sm tracking-widest uppercase glow-btn transition-all duration-200 cursor-pointer whitespace-nowrap"
                style={{ backgroundColor: 'var(--gold)', color: '#000' }}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-youtube-line" />
                </div>
                Subscribe on YouTube
              </a>
              <a
                href="https://soundcloud.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-barlow font-600 text-sm tracking-widest uppercase transition-all duration-200 cursor-pointer whitespace-nowrap"
                style={{ border: '1px solid var(--border-gold)', color: 'var(--gold)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-soundcloud-line" />
                </div>
                Follow on SoundCloud
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
