import { useRef } from 'react';
import { useEvents } from '../../../store/adminStore';
import EventCard from './EventCard';

export default function UpcomingEvents() {
  const { events } = useEvents();
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
          {events.map((event, idx) => (
            <EventCard key={event.id} event={event} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
