import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

type Booking = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  location: string;
  message: string;
  status: 'pending' | 'confirmed' | 'declined';
  created_at: string;
};

const STATUS_COLORS = {
  pending:   { bg: 'rgba(212,175,55,0.1)',  border: 'var(--border-gold)', color: 'var(--gold)' },
  confirmed: { bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.4)', color: '#22c55e' },
  declined:  { bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.4)', color: '#ef4444' },
};

export default function BookingsTab() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'declined'>('all');

  const fetch = async () => {
    const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (data) setBookings(data as Booking[]);
  };

  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id: number, status: Booking['status']) => {
    await supabase.from('bookings').update({ status }).eq('id', id);
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
  };

  const deleteBooking = async (id: number) => {
    await supabase.from('bookings').delete().eq('id', id);
    setBookings((prev) => prev.filter((b) => b.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    declined: bookings.filter((b) => b.status === 'declined').length,
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-bebas text-2xl tracking-widest" style={{ color: 'var(--text)' }}>Booking Requests</h2>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'pending', 'confirmed', 'declined'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 font-barlow text-xs tracking-widest uppercase rounded-full cursor-pointer transition-all duration-200"
              style={filter === f
                ? { backgroundColor: 'var(--gold)', color: '#000' }
                : { border: '1px solid var(--border)', color: 'var(--text-2)' }}
            >
              {f} ({counts[f]})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* List */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 && (
            <div className="py-12 text-center rounded-xl" style={{ border: '1px solid var(--border)', color: 'var(--text-3)' }}>
              No {filter} bookings yet.
            </div>
          )}
          {filtered.map((b) => {
            const s = STATUS_COLORS[b.status];
            const isSelected = selected?.id === b.id;
            return (
              <div
                key={b.id}
                onClick={() => setSelected(isSelected ? null : b)}
                className="rounded-xl p-4 cursor-pointer transition-all duration-200"
                style={{
                  backgroundColor: 'var(--bg-alt)',
                  border: `1px solid ${isSelected ? 'var(--border-gold)' : 'var(--border)'}`,
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="font-barlow font-600 text-sm" style={{ color: 'var(--text)' }}>{b.full_name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-3)' }}>{b.event_type} · {b.event_date}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-barlow tracking-wide"
                    style={{ backgroundColor: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
                    {b.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-map-pin-line text-xs" style={{ color: 'var(--gold)' }} />
                  <span className="text-xs" style={{ color: 'var(--text-2)' }}>{b.location}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>
                  {new Date(b.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="rounded-xl p-6 h-fit sticky top-8" style={{ backgroundColor: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
          {!selected ? (
            <div className="py-12 text-center">
              <i className="ri-file-list-3-line text-4xl mb-3 block" style={{ color: 'var(--text-3)' }} />
              <p className="font-barlow text-xs tracking-widest uppercase" style={{ color: 'var(--text-3)' }}>Select a booking to view details</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bebas text-xl tracking-widest" style={{ color: 'var(--text)' }}>Booking Details</h3>
                <button onClick={() => setSelected(null)} className="text-xs cursor-pointer" style={{ color: 'var(--text-3)' }}>✕ Close</button>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                {[
                  { icon: 'ri-user-line', label: 'Name', value: selected.full_name },
                  { icon: 'ri-mail-line', label: 'Email', value: selected.email },
                  { icon: 'ri-phone-line', label: 'Phone', value: selected.phone || 'N/A' },
                  { icon: 'ri-calendar-event-line', label: 'Event Type', value: selected.event_type },
                  { icon: 'ri-calendar-line', label: 'Event Date', value: selected.event_date },
                  { icon: 'ri-map-pin-line', label: 'Location', value: selected.location },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <div className="w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(212,175,55,0.1)' }}>
                      <i className={`${item.icon} text-xs`} style={{ color: 'var(--gold)' }} />
                    </div>
                    <div>
                      <p className="font-barlow text-xs tracking-widest uppercase" style={{ color: 'var(--text-3)' }}>{item.label}</p>
                      <p className="text-sm font-barlow" style={{ color: 'var(--text)' }}>{item.value}</p>
                    </div>
                  </div>
                ))}
                {selected.message && (
                  <div className="flex gap-3">
                    <div className="w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(212,175,55,0.1)' }}>
                      <i className="ri-chat-1-line text-xs" style={{ color: 'var(--gold)' }} />
                    </div>
                    <div>
                      <p className="font-barlow text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--text-3)' }}>Message</p>
                      <p className="text-sm font-barlow leading-relaxed" style={{ color: 'var(--text)' }}>{selected.message}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Status actions */}
              <div className="flex flex-col gap-3">
                <p className="font-barlow text-xs tracking-widest uppercase" style={{ color: 'var(--text-3)' }}>Update Status</p>
                <div className="flex gap-2">
                  {(['confirmed', 'pending', 'declined'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      className="flex-1 py-2 font-barlow text-xs tracking-widest uppercase rounded-full cursor-pointer transition-all duration-200"
                      style={selected.status === s
                        ? { backgroundColor: STATUS_COLORS[s].color, color: s === 'pending' ? '#000' : '#fff' }
                        : { border: `1px solid ${STATUS_COLORS[s].border}`, color: STATUS_COLORS[s].color }}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Contact via Instagram */}
                <a
                  href={`https://ig.me/m/pskratch_kenya`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-full py-2.5 font-barlow text-xs font-600 tracking-widest uppercase rounded-full text-center transition-all duration-200 cursor-pointer"
                  style={{ border: '1px solid var(--border-gold)', color: 'var(--gold)' }}
                >
                  <i className="ri-instagram-line mr-2" />
                  Reply on Instagram
                </a>

                <button
                  onClick={() => deleteBooking(selected.id)}
                  className="w-full py-2 font-barlow text-xs tracking-widest uppercase rounded-full cursor-pointer"
                  style={{ border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}
                >
                  Delete Booking
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
