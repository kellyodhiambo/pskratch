import { Link } from 'react-router-dom';
import { useCountdown } from '../../../hooks/useCountdown';
import type { Event } from '../../../store/adminStore';

export default function EventCard({ event, idx }: { event: Event; idx: number }) {
  const { days, passed } = useCountdown(event.date);

  const badge = passed
    ? { label: '🎉 Event Completed', bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.4)', color: '#22c55e' }
    : days === 0
    ? { label: '🔥 Today!', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', color: '#ef4444' }
    : days === 1
    ? { label: '⚡ Tomorrow', bg: 'rgba(212,175,55,0.15)', border: 'var(--border-gold)', color: 'var(--gold)' }
    : { label: `${days} Days to Go`, bg: 'rgba(212,175,55,0.1)', border: 'var(--border-gold)', color: 'var(--gold)' };

  return (
    <div
      className="min-w-[280px] sm:min-w-[320px] snap-start rounded-2xl overflow-hidden group flex-shrink-0 transition-all duration-300 hover:-translate-y-2"
      style={{ backgroundColor: 'var(--bg-card)', border: `1px solid ${passed ? 'rgba(34,197,94,0.3)' : 'var(--border)'}` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {passed && <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} />}
        <div className="absolute top-4 left-4 font-bebas text-5xl text-white/10 leading-none">{String(idx + 1).padStart(2, '0')}</div>

        {/* Countdown / status badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-barlow font-600 tracking-wide"
          style={{ background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color }}>
          {badge.label}
        </div>

        {/* Passed overlay text */}
        {passed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bebas text-3xl tracking-widest" style={{ color: '#22c55e', textShadow: '0 0 20px rgba(34,197,94,0.5)' }}>
              EVENT DONE ✓
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bebas text-xl tracking-wide mb-3" style={{ color: passed ? 'var(--text-3)' : 'var(--text)' }}>
          {event.title}
        </h3>

        {/* Countdown bar */}
        {!passed && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-barlow text-xs tracking-widest uppercase" style={{ color: 'var(--text-3)' }}>Countdown</span>
              <span className="font-bebas text-lg" style={{ color: 'var(--gold)' }}>{days}d</span>
            </div>
            <div className="w-full h-1 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
              <div
                className="h-1 rounded-full transition-all duration-500"
                style={{ backgroundColor: 'var(--gold)', width: `${Math.max(5, Math.min(100, 100 - (days / 365) * 100))}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 mb-5">
          {[
            { icon: 'ri-calendar-line', text: new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) },
            { icon: 'ri-map-pin-line', text: event.location },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <i className={`${item.icon} text-xs`} style={{ color: 'var(--gold)' }} />
              <span className="text-xs" style={{ color: 'var(--text-2)' }}>{item.text}</span>
            </div>
          ))}
        </div>

        {passed ? (
          <div className="w-full py-2.5 text-center font-barlow text-xs font-600 tracking-widest uppercase rounded-full"
            style={{ border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e' }}>
            Event Completed ✓
          </div>
        ) : (
          <Link
            to="/booking"
            className="block w-full py-2.5 text-center font-barlow text-xs font-600 tracking-widest uppercase rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
            style={{ border: '1px solid var(--border-gold)', color: 'var(--gold)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
          >
            Get Tickets
          </Link>
        )}
      </div>
    </div>
  );
}
