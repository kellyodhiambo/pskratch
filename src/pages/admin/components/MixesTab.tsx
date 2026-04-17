import { useState } from 'react';
import { useMixes, type Mix } from '../../../store/adminStore';

const empty: Omit<Mix, 'id'> = { title: '', description: '', duration: '', genre: '', thumbnail: '', youtubeId: '', plays: '0', isFeatured: false, audioDownload: '#', videoDownload: '#' };

export default function MixesTab() {
  const { mixes, addMix, updateMix, deleteMix } = useMixes();
  const [editing, setEditing] = useState<Mix | null>(null);
  const [form, setForm] = useState<Omit<Mix, 'id'>>(empty);
  const [open, setOpen] = useState(false);

  const openAdd = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (m: Mix) => { setEditing(m); setForm(m); setOpen(true); };
  const close = () => setOpen(false);

  const save = async () => {
    if (!form.title.trim()) return;
    editing ? await updateMix({ ...form, id: editing.id }) : await addMix(form);
    close();
  };

  const textFields = ['title', 'genre', 'duration', 'youtubeId', 'thumbnail', 'plays'] as const;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bebas text-2xl tracking-widest" style={{ color: 'var(--text)' }}>Mixes</h2>
        <button onClick={openAdd} className="px-5 py-2 font-barlow text-xs font-600 tracking-widest uppercase rounded-full cursor-pointer" style={{ backgroundColor: 'var(--gold)', color: '#000' }}>
          + Add Mix
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-alt)' }}>
              {['Title', 'Genre', 'Duration', 'Plays', 'Featured', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-barlow text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mixes.map((m) => (
              <tr key={m.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-3 font-barlow max-w-xs truncate" style={{ color: 'var(--text)' }}>{m.title}</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{m.genre}</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{m.duration}</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{m.plays}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: m.isFeatured ? 'rgba(212,175,55,0.15)' : 'transparent', color: m.isFeatured ? 'var(--gold)' : 'var(--text-3)', border: '1px solid ' + (m.isFeatured ? 'var(--border-gold)' : 'var(--border)') }}>
                    {m.isFeatured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-3">
                  <button onClick={() => openEdit(m)} className="text-xs font-barlow tracking-widest uppercase cursor-pointer" style={{ color: 'var(--gold)' }}>Edit</button>
                  <button onClick={() => deleteMix(m.id)} className="text-xs font-barlow tracking-widest uppercase cursor-pointer" style={{ color: '#ef4444' }}>Delete</button>
                </td>
              </tr>
            ))}
            {mixes.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-sm" style={{ color: 'var(--text-3)' }}>No mixes yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-lg rounded-2xl p-8 overflow-y-auto max-h-[90vh]" style={{ backgroundColor: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
            <h3 className="font-bebas text-2xl tracking-widest mb-6" style={{ color: 'var(--text)' }}>{editing ? 'Edit Mix' : 'New Mix'}</h3>
            <div className="flex flex-col gap-4">
              {textFields.map((field) => (
                <div key={field}>
                  <label className="block font-barlow text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>{field}</label>
                  <input
                    value={form[field] as string}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm font-barlow outline-none"
                    style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                </div>
              ))}
              <div>
                <label className="block font-barlow text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg text-sm font-barlow outline-none resize-none"
                  style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
                <span className="font-barlow text-xs tracking-widest uppercase" style={{ color: 'var(--text-2)' }}>Featured</span>
              </label>
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
