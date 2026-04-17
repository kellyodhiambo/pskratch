import { useState } from 'react';
import { useBlogs, type Blog } from '../../../store/adminStore';
import ImageUpload from '../../../components/feature/ImageUpload';

const empty: Omit<Blog, 'id'> = { title: '', date: '', excerpt: '', category: '', image: '' };
const CATEGORIES = ['Music', 'Events', 'Academy', 'News'];

export default function BlogsTab() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useBlogs();
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState<Omit<Blog, 'id'>>(empty);
  const [open, setOpen] = useState(false);

  const openAdd = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (b: Blog) => { setEditing(b); setForm(b); setOpen(true); };
  const close = () => setOpen(false);

  const save = async () => {
    if (!form.title.trim()) return;
    editing ? await updateBlog({ ...form, id: editing.id }) : await addBlog(form);
    close();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bebas text-2xl tracking-widest" style={{ color: 'var(--text)' }}>Blog / Updates</h2>
        <button onClick={openAdd} className="px-5 py-2 font-barlow text-xs font-600 tracking-widest uppercase rounded-full cursor-pointer" style={{ backgroundColor: 'var(--gold)', color: '#000' }}>
          + Add Post
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-alt)' }}>
              {['Title', 'Category', 'Date', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-barlow text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-3 font-barlow max-w-xs truncate" style={{ color: 'var(--text)' }}>{b.title}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(212,175,55,0.1)', color: 'var(--gold)', border: '1px solid var(--border-gold)' }}>{b.category}</span>
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{b.date}</td>
                <td className="px-4 py-3 flex gap-3">
                  <button onClick={() => openEdit(b)} className="text-xs font-barlow tracking-widest uppercase cursor-pointer" style={{ color: 'var(--gold)' }}>Edit</button>
                  <button onClick={() => deleteBlog(b.id)} className="text-xs font-barlow tracking-widest uppercase cursor-pointer" style={{ color: '#ef4444' }}>Delete</button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-sm" style={{ color: 'var(--text-3)' }}>No posts yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-lg rounded-2xl p-8" style={{ backgroundColor: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
            <h3 className="font-bebas text-2xl tracking-widest mb-6" style={{ color: 'var(--text)' }}>{editing ? 'Edit Post' : 'New Post'}</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block font-barlow text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>Cover Image</label>
                <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} folder="blogs" />
              </div>
              {(['title', 'date'] as const).map((field) => (
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
              <div>
                <label className="block font-barlow text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg text-sm font-barlow outline-none"
                  style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-barlow text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>Excerpt</label>
                <textarea
                  rows={3}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg text-sm font-barlow outline-none resize-none"
                  style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                />
              </div>
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
