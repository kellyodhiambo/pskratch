import { Link } from 'react-router-dom';
import { useEvents } from '../../../store/adminStore';

export default function HeroSection() {
  const { events } = useEvents();
  const nextEvent = events[0];

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://i.postimg.cc/j5k4DwqL/Whats-App-Image-2026-04-17-at-5-29-51-PM.jpg"
          alt="DJ PSKRATCH performing live"
          className="w-full h-full object-cover object-center"
        />
        {/* Cinematic overlay — heavy dim for full text readability */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
        <div className="absolute bottom-0 left-0 right-0 h-56" style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }} />
      </div>

      {/* Gold accent lines */}
      <div className="absolute top-1/3 left-0 w-44 h-px" style={{ background: 'linear-gradient(to right, var(--gold), transparent)', opacity: 0.5 }} />
      <div className="absolute top-1/2 left-0 w-24 h-px" style={{ background: 'linear-gradient(to right, var(--gold), transparent)', opacity: 0.25 }} />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pb-0 pt-20 flex flex-col justify-center min-h-screen">
        <div className="max-w-3xl mb-16 md:mb-20">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 animate-fadeInUp"
            style={{ border: '1px solid rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.08)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--gold)' }} />
            <span className="font-barlow text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>
              Available for Bookings 2026
            </span>
          </div>

          {/* Name */}
          <h1 className="font-bebas leading-none text-white animate-fadeInUp delay-100"
            style={{ fontSize: 'clamp(4.5rem, 14vw, 11rem)' }}>
            
          </h1>
          <h1 className="font-bebas leading-none text-shimmer animate-fadeInUp delay-200"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)' }}>
            PSKRATCH
          </h1>

          {/* Tagline */}
          <p className="font-barlow text-sm md:text-base tracking-widest uppercase mt-4 mb-8 animate-fadeInUp delay-300 text-white/80">
            Scratch the Beat &mdash; Own the Night
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12 animate-fadeInUp delay-400">
            <a
              href="https://www.instagram.com/pskratch_kenya/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="px-7 py-3 font-barlow font-700 text-sm tracking-widest uppercase rounded-full glow-btn transition-all duration-200 cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: 'var(--gold)', color: '#000' }}
            >
              Book DJ PSKRATCH
            </a>
            <Link
              to="/mixes"
              className="px-7 py-3 font-barlow font-600 text-sm tracking-widest uppercase rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap text-white/75 hover:text-white"
              style={{ border: '1px solid rgba(255,255,255,0.25)' }}
            >
              Hear the Mixes
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 animate-fadeInUp delay-500">
            {[
              { value: '500+', label: 'Live Shows' },
              { value: '50K+', label: 'Monthly Plays' },
              { value: '10+', label: 'Years' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-bebas text-2xl md:text-3xl" style={{ color: 'var(--gold)' }}>{stat.value}</div>
                <div className="text-xs tracking-widest uppercase text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Event Bar */}
      {nextEvent && (
      <div className="relative z-10 w-full" style={{ borderTop: '1px solid var(--border-gold)', backgroundColor: 'var(--overlay)', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-1 h-10 rounded-full" style={{ backgroundColor: 'var(--gold)' }} />
            <div>
              <p className="font-barlow text-xs tracking-widest uppercase leading-none mb-0.5" style={{ color: 'var(--gold)' }}>Next Event</p>
              <p className="font-barlow text-xs tracking-wide" style={{ color: 'var(--text-3)' }}>Coming Up</p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10" style={{ backgroundColor: 'var(--border)' }} />

          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
            <h2 className="font-bebas text-xl md:text-2xl tracking-wide whitespace-nowrap" style={{ color: 'var(--text)' }}>
              {nextEvent.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-calendar-line text-xs" style={{ color: 'var(--gold)' }} />
                </div>
                <span className="text-sm" style={{ color: 'var(--text-2)' }}>{nextEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-map-pin-line text-xs" style={{ color: 'var(--gold)' }} />
                </div>
                <span className="text-sm" style={{ color: 'var(--text-2)' }}>{nextEvent.location}</span>
              </div>
            </div>
          </div>

          <Link
            to="/booking"
            className="flex-shrink-0 px-6 py-2.5 font-barlow font-600 text-xs tracking-widest uppercase rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
            style={{ border: '1px solid var(--border-gold)', color: 'var(--gold)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
          >
            Get Tickets
          </Link>
        </div>
      </div>
      )}
    </section>
  );
}
