import { useState, useEffect } from 'react';
import { supabase, supabaseAdmin } from '../../../lib/supabase';

type AdminUser = { id: string; email: string; created_at: string };

export default function SettingsTab() {
  // Password change
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwMsg, setPwMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [pwLoading, setPwLoading] = useState(false);

  // Admin management
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [newAdminPw, setNewAdminPw] = useState('');
  const [adminMsg, setAdminMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [adminLoading, setAdminLoading] = useState(false);

  const fetchAdmins = async () => {
    const { data } = await supabaseAdmin.auth.admin.listUsers();
    if (data) setAdmins(data.users.map((u) => ({ id: u.id, email: u.email ?? '', created_at: u.created_at })));
  };

  useEffect(() => { fetchAdmins(); }, []);

  const changePassword = async () => {
    if (!newPassword || newPassword !== confirmPassword) {
      setPwMsg({ text: 'Passwords do not match', ok: false }); return;
    }
    if (newPassword.length < 6) {
      setPwMsg({ text: 'Password must be at least 6 characters', ok: false }); return;
    }
    setPwLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPwMsg(error ? { text: error.message, ok: false } : { text: 'Password updated successfully', ok: true });
    if (!error) { setNewPassword(''); setConfirmPassword(''); }
    setPwLoading(false);
  };

  const addAdmin = async () => {
    if (!newEmail || !newAdminPw) return;
    setAdminLoading(true);
    const { error } = await supabaseAdmin.auth.admin.createUser({ email: newEmail, password: newAdminPw, email_confirm: true });
    if (error) {
      setAdminMsg({ text: error.message, ok: false });
    } else {
      setAdminMsg({ text: `Admin ${newEmail} added`, ok: true });
      setNewEmail(''); setNewAdminPw('');
      fetchAdmins();
    }
    setAdminLoading(false);
  };

  const removeAdmin = async (id: string, email: string) => {
    if (email === 'pskratch1@gmail.com') { setAdminMsg({ text: 'Cannot remove the main admin', ok: false }); return; }
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (!error) { setAdminMsg({ text: 'Admin removed', ok: true }); fetchAdmins(); }
    else setAdminMsg({ text: error.message, ok: false });
  };

  return (
    <div className="flex flex-col gap-10 max-w-2xl">
      {/* Change Password */}
      <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
        <h2 className="font-bebas text-2xl tracking-widest mb-6" style={{ color: 'var(--text)' }}>Change Password</h2>
        <div className="flex flex-col gap-4">
          {(['New Password', 'Confirm Password'] as const).map((label) => (
            <div key={label}>
              <label className="block font-barlow text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>{label}</label>
              <input
                type="password"
                value={label === 'New Password' ? newPassword : confirmPassword}
                onChange={(e) => label === 'New Password' ? setNewPassword(e.target.value) : setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg text-sm font-barlow outline-none"
                style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
            </div>
          ))}
          {pwMsg && <p className="text-xs" style={{ color: pwMsg.ok ? 'var(--gold)' : '#ef4444' }}>{pwMsg.text}</p>}
          <button
            onClick={changePassword}
            disabled={pwLoading}
            className="py-2.5 font-barlow font-600 text-sm tracking-widest uppercase rounded-full cursor-pointer"
            style={{ backgroundColor: 'var(--gold)', color: '#000', opacity: pwLoading ? 0.7 : 1 }}
          >
            {pwLoading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>

      {/* Admin Management */}
      <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
        <h2 className="font-bebas text-2xl tracking-widest mb-6" style={{ color: 'var(--text)' }}>Admin Users</h2>

        {/* Current admins */}
        <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}>
                {['Email', 'Added', 'Action'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-barlow text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="px-4 py-3 font-barlow text-sm" style={{ color: 'var(--text)' }}>
                    {a.email}
                    {a.email === 'pskratch1@gmail.com' && (
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(212,175,55,0.1)', color: 'var(--gold)', border: '1px solid var(--border-gold)' }}>Main</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-3)' }}>{new Date(a.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    {a.email !== 'pskratch1@gmail.com' && (
                      <button onClick={() => removeAdmin(a.id, a.email)} className="text-xs font-barlow tracking-widest uppercase cursor-pointer" style={{ color: '#ef4444' }}>Remove</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add new admin */}
        <h3 className="font-barlow text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>Add New Admin</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block font-barlow text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--text-2)' }}>Email</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="admin@email.com"
              className="w-full px-4 py-2.5 rounded-lg text-sm font-barlow outline-none"
              style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
            />
          </div>
          <div>
            <label className="block font-barlow text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--text-2)' }}>Password</label>
            <input
              type="password"
              value={newAdminPw}
              onChange={(e) => setNewAdminPw(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg text-sm font-barlow outline-none"
              style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
            />
          </div>
          {adminMsg && <p className="text-xs" style={{ color: adminMsg.ok ? 'var(--gold)' : '#ef4444' }}>{adminMsg.text}</p>}
          <button
            onClick={addAdmin}
            disabled={adminLoading}
            className="py-2.5 font-barlow font-600 text-sm tracking-widest uppercase rounded-full cursor-pointer"
            style={{ backgroundColor: 'var(--gold)', color: '#000', opacity: adminLoading ? 0.7 : 1 }}
          >
            {adminLoading ? 'Adding...' : 'Add Admin'}
          </button>
        </div>
      </div>
    </div>
  );
}
