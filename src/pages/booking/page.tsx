import { useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

const eventTypes = ['Club Night','Festival','Private Party','Corporate Event','Wedding','Birthday Celebration','Graduation Party','Other'];

type FormState = { fullName: string; email: string; phone: string; eventType: string; eventDate: string; location: string; message: string; };
const initialForm: FormState = { fullName:'', email:'', phone:'', eventType:'', eventDate:'', location:'', message:'' };

export default function BookingPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setLoading(true); setError('');
    const body = new URLSearchParams();
    Object.entries(form).forEach(([k, v]) => body.append(k, v));
    try {
      const res = await fetch('https://readdy.ai/api/form/d72fariaegmdqoca7t3g', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: body.toString() });
      if (res.ok) { setSubmitted(true); setForm(initialForm); } else setError('Something went wrong. Please try again.');
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  const inputStyle = {
    backgroundColor: 'var(--bg-alt)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    width: '100%',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative h-52 md:h-60">
          <img src="https://readdy.ai/api/search-image?query=luxury%20DJ%20turntable%20professional%20equipment%20golden%20warm%20light%20dark%20studio%20premium%20bokeh%20elegant%20music%20production%20setup&width=1920&height=400&seq=bookgs2&orientation=landscape"
            alt="Book DJ PSKRATCH" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/65 to-black/80" />
          <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
            <span className="font-barlow text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>Let&apos;s Make It Happen</span>
            <h1 className="font-bebas text-5xl md:text-6xl text-white text-center">
              Book DJ <span className="text-shimmer">PSKRATCH</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-14 md:py-20">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-6 md:p-10 animate-pulse-gold" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-gold)' }}>
            {submitted ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 mb-6 glow-btn" style={{ borderColor: 'var(--gold)' }}>
                  <i className="ri-check-line text-3xl" style={{ color: 'var(--gold)' }} />
                </div>
                <h2 className="font-bebas text-3xl mb-3" style={{ color: 'var(--text)' }}>Booking Request Sent!</h2>
                <p className="text-sm leading-relaxed max-w-sm mb-6" style={{ color: 'var(--text-2)' }}>
                  Thanks for reaching out! DJ PSKRATCH will review your request and get back to you within 24–48 hours.
                </p>
                <button onClick={() => setSubmitted(false)}
                  className="px-6 py-3 font-barlow text-xs font-600 tracking-widest uppercase rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
                  style={{ border: '1px solid var(--border-gold)', color: 'var(--gold)' }}
                >Submit Another Request</button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="font-bebas text-2xl md:text-3xl mb-1" style={{ color: 'var(--text)' }}>Event Booking Form</h2>
                  <p className="text-sm" style={{ color: 'var(--text-3)' }}>Fill in the details and we&apos;ll get back to you shortly.</p>
                </div>
                <form onSubmit={handleSubmit} data-readdy-form id="booking-form" className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[{label:'Full Name', name:'fullName', type:'text', placeholder:'John Smith'},
                      {label:'Email', name:'email', type:'email', placeholder:'your@email.com'}
                    ].map(f => (
                      <div key={f.name} className="flex flex-col gap-2">
                        <label className="font-barlow text-xs font-600 tracking-widest uppercase" style={{ color: 'var(--gold)' }}>{f.label} *</label>
                        <input type={f.type} name={f.name} value={(form as Record<string,string>)[f.name]} onChange={handleChange} required placeholder={f.placeholder} style={inputStyle} />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="font-barlow text-xs font-600 tracking-widest uppercase" style={{ color: 'var(--gold)' }}>Phone Number</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+254712345678" style={inputStyle} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-barlow text-xs font-600 tracking-widest uppercase" style={{ color: 'var(--gold)' }}>Event Type *</label>
                      <select name="eventType" value={form.eventType} onChange={handleChange} required
                        className="appearance-none cursor-pointer"
                        style={{ ...inputStyle, color: form.eventType ? 'var(--text)' : 'var(--text-3)' }}>
                        <option value="" disabled>Select type...</option>
                        {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="font-barlow text-xs font-600 tracking-widest uppercase" style={{ color: 'var(--gold)' }}>Event Date *</label>
                      <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} required style={{ ...inputStyle, colorScheme: 'normal' }} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-barlow text-xs font-600 tracking-widest uppercase" style={{ color: 'var(--gold)' }}>Location *</label>
                      <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="City, Venue" style={inputStyle} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-barlow text-xs font-600 tracking-widest uppercase" style={{ color: 'var(--gold)' }}>Additional Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4} maxLength={500}
                      placeholder="Event details, expected crowd size, special requirements..."
                      style={{ ...inputStyle, resize: 'none' as const }} />
                    <span className="text-xs text-right" style={{ color: 'var(--text-3)' }}>{form.message.length}/500</span>
                  </div>
                  {error && <div className="px-4 py-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}><p className="text-red-500 text-sm">{error}</p></div>}
                  <button type="submit" disabled={loading}
                    className="w-full py-4 font-barlow font-700 text-sm tracking-widest uppercase rounded-full glow-btn transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    style={{ backgroundColor: 'var(--gold)', color: '#000' }}>
                    {loading ? 'Sending...' : 'Send Booking Request'}
                  </button>
                  <p className="text-xs text-center" style={{ color: 'var(--text-3)' }}>
                    Also reach us via{' '}
                    <a href="https://www.instagram.com/pskratch_kenya/" target="_blank" rel="noopener noreferrer nofollow" className="hover:underline cursor-pointer" style={{ color: 'var(--gold)' }}>@djpskratch</a>
                  </p>
                </form>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[{icon:'ri-time-line',title:'Fast Response',desc:'Replies within 24–48 hours'},
              {icon:'ri-shield-check-line',title:'Fully Insured',desc:'Professional & reliable'},
              {icon:'ri-music-2-line',title:'Any Event',desc:'Clubs to private events'},
            ].map(item => (
              <div key={item.title} className="rounded-xl p-5 text-center" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="w-10 h-10 flex items-center justify-center mx-auto mb-3"><i className={`${item.icon} text-xl`} style={{ color: 'var(--gold)' }} /></div>
                <div className="font-barlow text-sm font-700 mb-1" style={{ color: 'var(--text)' }}>{item.title}</div>
                <div className="text-xs" style={{ color: 'var(--text-3)' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
