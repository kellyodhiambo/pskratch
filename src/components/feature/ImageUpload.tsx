import { useState } from 'react';
import { supabase } from '../../lib/supabase';

type Props = {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
};

export default function ImageUpload({ value, onChange, folder = 'general' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    const ext = file.name.split('.').pop();
    const path = `${folder}/${Date.now()}.${ext}`;
    const { error: err } = await supabase.storage.from('media').upload(path, file, { upsert: true });
    if (err) { setError(err.message); setUploading(false); return; }
    const { data } = supabase.storage.from('media').getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
    e.target.value = '';
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {/* Upload button */}
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer flex-shrink-0" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
          {uploading ? (
            <div className="w-4 h-4 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }} />
          ) : (
            <i className="ri-upload-2-line text-sm" style={{ color: 'var(--gold)' }} />
          )}
          <span className="font-barlow text-xs tracking-widest uppercase" style={{ color: 'var(--text-2)' }}>
            {uploading ? 'Uploading...' : value ? 'Change' : 'Upload'}
          </span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </label>

        {/* Small preview */}
        {value && (
          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--border)' }}>
            <img src={value} alt="preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '10px' }}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* URL input fallback */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste image URL"
        className="w-full px-4 py-2 rounded-lg text-xs font-barlow outline-none"
        style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
      />

      {error && <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>}
    </div>
  );
}
