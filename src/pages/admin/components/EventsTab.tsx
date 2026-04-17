import { useState } from 'react';
import { useEvents, type Event } from '../../../store/adminStore';

const empty: Omit<Event, 'id'> = { title: '', date: '', location: '', image: '', ticketUrl: '#' };

export default function EventsTab() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState<Omit<Event, 'id'>>(empty);
  const [open, setOpen] = useState(false);

  const openAdd = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (e: Event) => { setEditing(e); setForm(e); setOpen(true); };
  const close = () => setOpen(false);

  const save = async () => {
    if (!form.title.trim()) return;
    editing ? await updateEvent({ ...form, id: editing.id }) : await addEvent(form);
    close();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bebas text-2xl tracking-widest" style={{ color: 'var(--text)' }}>Events</h2>
        <button onClick={openAdd} className="px-5 py-2 font-barlow text-xs font-600 tracking-widest uppercase rounded-full cursor-pointer" style={{ backgroundColor: 'var(--gold)', color: '#000' }}>
          + Add Event
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-alt)' }}>
              {['Title', 'Date', 'Location', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-barlow text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-3 font-barlow" style={{ color: 'var(--text)' }}>{e.title}</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{e.date}</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{e.location}</td>
                <td className="px-4 py-3 flex gap-3">
                  <button onClick={() => openEdit(e)} className="text-xs font-barlow tracking-widest uppercase cursor-pointer" style={{ color: 'var(--gold)' }}>Edit</button>
                  <button onClick={() => deleteEvent(e.id)} className="text-xs font-barlow tracking-widest uppercase cursor-pointer" style={{ color: '#ef4444' }}>Delete</button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-sm" style={{ color: 'var(--text-3)' }}>No events yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-lg rounded-2xl p-8" style={{ backgroundColor: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
            <h3 className="font-bebas text-2xl tracking-widest mb-6" style={{ color: 'var(--text)' }}>{editing ? 'Edit Event' : 'New Event'}</h3>
            <div className="flex flex-col gap-4">
              {(['title', 'date', 'location', 'image', 'ticketUrl'] as const).map((field) => (
                <div key={field}>
                  <label className="block font-barlow text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>{field}</label>
                  <input
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm font-barlow outline-none"
                    style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex-1 py-2.5 font-barlow font-600 text-sm tracking-widest uppercase rounded-full cursor-pointer" style={{ backgroundColor: 'var(--gold)', color: '#000' }}>Save</button>
              <button onClick={close} className="flex-1 py-2.5 font-barlow font-600 text-sm tracking-widest uppercase rounded-full cursor-pointer" style={{ border: '1px solid var(--border)', color: 'var(--text-2)' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
