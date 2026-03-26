import { useState } from 'react';

interface Mix {
  id: number;
  title: string;
  description: string;
  duration: string;
  genre: string;
  thumbnail: string;
  youtubeId: string;
  audioDownload: string;
  videoDownload: string;
  isFeatured: boolean;
  plays: string;
}

interface Props {
  mix: Mix;
  featured?: boolean;
}

export default function MixCard({ mix, featured = false }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={`rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 ${featured ? '' : ''}`}
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-gold)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
    >
      {/* Player / Thumbnail */}
      <div className={`relative overflow-hidden ${featured ? 'h-72 md:h-96' : 'h-52'}`}>
        {playing ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${mix.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={mix.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={mix.thumbnail}
              alt={mix.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Play button */}
            <button
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${mix.title}`}
            >
              <div
                className="flex items-center justify-center rounded-full border-2 transition-all duration-200 group-hover:scale-110"
                style={{
                  width: featured ? '72px' : '56px',
                  height: featured ? '72px' : '56px',
                  borderColor: 'var(--gold)',
                  boxShadow: '0 0 24px var(--gold-glow)',
                  background: 'rgba(0,0,0,0.4)',
                }}
              >
                <i
                  className="ri-play-fill"
                  style={{
                    color: 'var(--gold)',
                    fontSize: featured ? '2rem' : '1.5rem',
                    marginLeft: '3px',
                  }}
                />
              </div>
            </button>

            {/* Duration badge */}
            <div
              className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-inter"
              style={{ background: 'rgba(0,0,0,0.65)', color: 'rgba(255,255,255,0.85)' }}
            >
              {mix.duration}
            </div>

            {/* Plays */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-play-circle-line text-xs" style={{ color: 'var(--gold)' }} />
              </div>
              <span className="text-xs font-barlow text-white/80">{mix.plays} plays</span>
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className={`${featured ? 'p-6 md:p-7' : 'p-5'}`}>
        {/* Genre tag */}
        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-barlow font-600 tracking-wide mb-3"
          style={{
            backgroundColor: 'rgba(var(--gold-rgb,184,146,44),0.1)',
            border: '1px solid var(--border-gold)',
            color: 'var(--gold)',
          }}
        >
          {mix.genre}
        </span>

        <h3
          className={`font-bebas tracking-wide mb-2 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}
          style={{ color: 'var(--text)' }}
        >
          {mix.title}
        </h3>

        <p
          className={`text-sm leading-relaxed mb-5 ${featured ? '' : 'line-clamp-2'}`}
          style={{ color: 'var(--text-2)' }}
        >
          {mix.description}
        </p>

        {/* Action row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Play / Stop button */}
          <button
            onClick={() => setPlaying(!playing)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full font-barlow font-600 text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer whitespace-nowrap glow-btn"
            style={{ backgroundColor: 'var(--gold)', color: '#000' }}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className={playing ? 'ri-stop-line' : 'ri-play-fill'} />
            </div>
            {playing ? 'Stop' : 'Play Mix'}
          </button>

          {/* Download Audio */}
          <a
            href={mix.audioDownload}
            download
            className="flex items-center gap-2 px-4 py-2.5 rounded-full font-barlow font-600 text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer whitespace-nowrap"
            style={{ border: '1px solid var(--border)', color: 'var(--text-2)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'; }}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-music-2-line" />
            </div>
            Audio
          </a>

          {/* Download Video */}
          <a
            href={mix.videoDownload}
            download
            className="flex items-center gap-2 px-4 py-2.5 rounded-full font-barlow font-600 text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer whitespace-nowrap"
            style={{ border: '1px solid var(--border)', color: 'var(--text-2)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'; }}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-video-download-line" />
            </div>
            Video
          </a>

          {/* Share */}
          <a
            href={`https://www.youtube.com/watch?v=${mix.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer ml-auto"
            style={{ border: '1px solid var(--border)', color: 'var(--text-3)' }}
            aria-label="Open on YouTube"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; }}
          >
            <i className="ri-youtube-line text-base" />
          </a>
        </div>
      </div>
    </div>
  );
}
