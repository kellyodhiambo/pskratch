import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { upcomingEvents } from '../../../mocks/events';

export default function UpcomingEvents() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28 section-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-barlow text-xs tracking-widest uppercase mb-2 block" style={{ color: 'var(--gold)' }}>Live Dates</span>
            <h2 className="font-bebas text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>Upcoming Events</h2>
          </div>
          <div className="flex items-center gap-3">
            {(['left', 'right'] as const).map((dir) => (
              <button key={dir} onClick={() => scroll(dir)}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer"
                style={{ border: '1px solid var(--border)', color: 'var(--text-3)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-gold)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
              >
                <i className={`ri-arrow-${dir}-line`} />
              </button>
            ))}
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {upcomingEvents.map((event, idx) => (
            <div
              key={event.id}
              className="min-w-[280px] sm:min-w-[320px] snap-start rounded-2xl overflow-hidden group flex-shrink-0 transition-all duration-300 hover:-translate-y-2"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 font-bebas text-5xl text-white/10 leading-none">{String(idx + 1).padStart(2, '0')}</div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-barlow tracking-wide"
                  style={{ background: 'rgba(var(--gold-rgb,184,146,44),0.15)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}>
                  Upcoming
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bebas text-xl tracking-wide mb-3 group-hover:transition-colors duration-200" style={{ color: 'var(--text)' }}>
                  {event.title}
                </h3>
                <div className="flex flex-col gap-2 mb-5">
                  {[
                    { icon: 'ri-calendar-line', text: event.date },
                    { icon: 'ri-map-pin-line', text: event.location },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className={`${item.icon} text-xs`} style={{ color: 'var(--gold)' }} />
                      </div>
                      <span className="text-xs" style={{ color: 'var(--text-2)' }}>{item.text}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/booking"
                  className="block w-full py-2.5 text-center font-barlow text-xs font-600 tracking-widest uppercase rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
                  style={{ border: '1px solid var(--border-gold)', color: 'var(--gold)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
                >
                  Get Tickets
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
