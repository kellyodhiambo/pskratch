import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Session } from '@supabase/supabase-js';
import EventsTab from './components/EventsTab';
import MixesTab from './components/MixesTab';
import BlogsTab from './components/BlogsTab';
import SettingsTab from './components/SettingsTab';
import BookingsTab from './components/BookingsTab';
import EnrollmentsTab from './components/EnrollmentsTab';

const TABS = ['Bookings', 'Enrollments', 'Events', 'Mixes', 'Blogs', 'Settings'] as const;
type Tab = typeof TABS[number];

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState<Tab>('Events');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  const login = async () => {
    if (!email || !password) return;
    setSubmitting(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError(err.message);
    setSubmitting(false);
  };

  const logout = async () => { await supabase.auth.signOut(); };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="w-full max-w-sm rounded-2xl p-10" style={{ backgroundColor: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
          <div className="text-center mb-8">
            <img src="/plogo.png" alt="PSKRATCH" className="w-16 h-16 object-contain mx-auto mb-4" />
            <h1 className="font-bebas text-3xl tracking-widest" style={{ color: 'var(--text)' }}>Admin Panel</h1>
            <p className="font-barlow text-xs tracking-widest uppercase mt-1" style={{ color: 'var(--text-3)' }}>Sign in to continue</p>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-barlow text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && login()}
                placeholder="admin@email.com"
                className="w-full px-4 py-3 rounded-lg text-sm font-barlow outline-none"
                style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
            </div>
            <div>
              <label className="block font-barlow text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && login()}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg text-sm font-barlow outline-none"
                style={{ backgroundColor: 'var(--bg)', border: `1px solid ${error ? '#ef4444' : 'var(--border)'}`, color: 'var(--text)' }}
              />
            </div>
            {error && <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>}
            <button
              onClick={login}
              disabled={submitting}
              className="w-full py-3 font-barlow font-600 text-sm tracking-widest uppercase rounded-full cursor-pointer mt-2"
              style={{ backgroundColor: 'var(--gold)', color: '#000', opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-alt)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/plogo.png" alt="PSKRATCH" className="w-8 h-8 object-contain" />
            <span className="font-bebas text-xl tracking-widest" style={{ color: 'var(--text)' }}>
              DJ <span style={{ color: 'var(--gold)' }}>PSKRATCH</span> — Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-barlow text-xs hidden sm:block" style={{ color: 'var(--text-3)' }}>{session.user.email}</span>
            <button onClick={logout} className="font-barlow text-xs tracking-widest uppercase cursor-pointer" style={{ color: 'var(--text-3)' }}>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-16">
        <div className="flex gap-1 mb-8 p-1 rounded-xl w-fit" style={{ backgroundColor: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-6 py-2 font-barlow text-xs font-600 tracking-widest uppercase rounded-lg transition-all duration-200 cursor-pointer"
              style={tab === t ? { backgroundColor: 'var(--gold)', color: '#000' } : { color: 'var(--text-2)' }}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Bookings' && <BookingsTab />}
        {tab === 'Enrollments' && <EnrollmentsTab />}
        {tab === 'Events' && <EventsTab />}
        {tab === 'Mixes' && <MixesTab />}
        {tab === 'Blogs' && <BlogsTab />}
        {tab === 'Settings' && <SettingsTab />}
      </div>
    </div>
  );
}
