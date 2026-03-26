import React, { useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { Link } from 'react-router-dom';

const experienceLevels = ['Complete Beginner','Some Experience','Intermediate','Advanced'];
const benefits = [
  { icon: 'ri-disc-line', title: 'Real Equipment', desc: 'Train on industry-standard turntables, mixers, and CDJs used by top DJs worldwide.' },
  { icon: 'ri-user-star-line', title: 'Expert Mentorship', desc: 'Learn directly from DJ PSKRATCH — over 10 years of professional performance experience.' },
  { icon: 'ri-trophy-line', title: 'Certified Skills', desc: 'Graduate with a recognized certificate and the skills to perform at real events.' },
  { icon: 'ri-group-line', title: 'Community', desc: 'Join a network of DJs, producers, and music creators. Collaborate and grow together.' },
  { icon: 'ri-video-line', title: 'Recorded Sessions', desc: 'Every session is recorded so you can review your progress and share your sets.' },
  { icon: 'ri-calendar-check-line', title: 'Flexible Schedule', desc: 'Morning, evening, and weekend classes available to fit your lifestyle.' },
];

type FormState = { fullName: string; age: string; email: string; phone: string; experienceLevel: string; message: string; };
const initialForm: FormState = { fullName:'', age:'', email:'', phone:'', experienceLevel:'', message:'' };

export default function AcademyPage() {
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
      const res = await fetch('https://readdy.ai/api/form/d72fariaegmdqoca7t40', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: body.toString() });
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
        <div className="relative h-60 md:h-80">
          <img src="https://i.postimg.cc/Yq7LgGDb/Whats-App-Image-2026-03-26-at-12-33-14-PM-(1).jpg"
            alt="SCRATCH AND KUTS Academy" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/65 to-black/85" />
          <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-10 px-4">
            <span className="font-barlow text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>DJ Education &amp; Training</span>
            <h1 className="font-bebas text-4xl md:text-6xl text-white text-center leading-tight">
              SCRATCH <span className="text-shimmer">&amp;</span> KUTS
            </h1>
            <p className="font-bebas text-xl md:text-2xl tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>DJ ACADEMY</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <span className="font-barlow text-xs tracking-widest uppercase mb-3 block" style={{ color: 'var(--gold)' }}>About the Academy</span>
              <h2 className="font-bebas text-4xl md:text-5xl mb-5 leading-tight" style={{ color: 'var(--text)' }}>
                Learn to DJ from<br />a <span className="text-shimmer">Professional</span>
              </h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-2)' }}>
                <strong style={{ color: 'var(--text)' }}>SCRATCH AND KUTS Academy</strong> is DJ PSKRATCH&apos;s premier DJ training program, designed to take you from zero to performing in front of real crowds.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-2)' }}>
                Our hands-on approach means you&apos;ll be behind real equipment from day one — gaining the muscle memory, ear, and confidence that separates great DJs from good ones.
              </p>
              <div className="flex flex-col gap-3">
                {['Beginner to Advanced courses','1-on-1 and group sessions','Certificate upon completion','Performance opportunities'].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-2)' }}>
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                      <i className="ri-checkbox-circle-line" style={{ color: 'var(--gold)' }} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden h-72 md:h-96" style={{ border: '1px solid var(--border-gold)' }}>
                <img src="https://i.postimg.cc/Yq7LgGDb/Whats-App-Image-2026-03-26-at-12-33-14-PM-(1).jpg"
                  alt="DJ PSKRATCH teaching" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl px-5 py-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-gold)' }}>
                <div className="font-bebas text-3xl" style={{ color: 'var(--gold)' }}>200+</div>
                <div className="text-xs tracking-wide" style={{ color: 'var(--text-3)' }}>Graduates</div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <span className="font-barlow text-xs tracking-widest uppercase mb-2 block" style={{ color: 'var(--gold)' }}>Why Choose Us</span>
              <h2 className="font-bebas text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>Academy Benefits</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map(b => (
                <div key={b.title}
                  className="rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-gold)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
                >
                  <div className="w-11 h-11 flex items-center justify-center rounded-full mb-4" style={{ border: '1px solid var(--border-gold)' }}>
                    <i className={`${b.icon} text-lg`} style={{ color: 'var(--gold)' }} />
                  </div>
                  <h3 className="font-barlow text-base font-700 mb-2" style={{ color: 'var(--text)' }}>{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Enrollment Form */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="font-barlow text-xs tracking-widest uppercase mb-2 block" style={{ color: 'var(--gold)' }}>Spring 2026 Enrollment</span>
              <h2 className="font-bebas text-4xl md:text-5xl mb-2" style={{ color: 'var(--text)' }}>Enroll Now</h2>
              <p className="text-sm" style={{ color: 'var(--text-3)' }}>Limited spots available. Secure your place today.</p>
            </div>
            <div className="rounded-2xl p-6 md:p-10" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-gold)' }}>
              {submitted ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 mb-6 glow-btn" style={{ borderColor: 'var(--gold)' }}>
                    <i className="ri-check-line text-3xl" style={{ color: 'var(--gold)' }} />
                  </div>
                  <h2 className="font-bebas text-3xl mb-3" style={{ color: 'var(--text)' }}>Enrollment Sent!</h2>
                  <p className="text-sm leading-relaxed max-w-sm mb-6" style={{ color: 'var(--text-2)' }}>
                    Welcome to the SCRATCH AND KUTS family! DJ PSKRATCH will contact you within 48 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)}
                    className="px-6 py-3 font-barlow text-xs font-600 tracking-widest uppercase rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
                    style={{ border: '1px solid var(--border-gold)', color: 'var(--gold)' }}>
                    Submit Another Form
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="font-bebas text-2xl mb-1" style={{ color: 'var(--text)' }}>Enrollment Application</h3>
                    <p className="text-sm" style={{ color: 'var(--text-3)' }}>Tell us about yourself and your goals.</p>
                  </div>
                  <form onSubmit={handleSubmit} data-readdy-form id="academy-enrollment-form" className="flex flex-col gap-5">
                    <div className="grid grid-cols-3 gap-5">
                      <div className="col-span-2 flex flex-col gap-2">
                        <label className="font-barlow text-xs font-600 tracking-widest uppercase" style={{ color: 'var(--gold)' }}>Full Name *</label>
                        <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Your full name" style={inputStyle} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-barlow text-xs font-600 tracking-widest uppercase" style={{ color: 'var(--gold)' }}>Age *</label>
                        <input type="number" name="age" value={form.age} onChange={handleChange} required min="10" max="99" placeholder="Age" style={inputStyle} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="font-barlow text-xs font-600 tracking-widest uppercase" style={{ color: 'var(--gold)' }}>Email *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" style={inputStyle} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-barlow text-xs font-600 tracking-widest uppercase" style={{ color: 'var(--gold)' }}>Phone Number</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" style={inputStyle} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-barlow text-xs font-600 tracking-widest uppercase" style={{ color: 'var(--gold)' }}>Experience Level *</label>
                      <select name="experienceLevel" value={form.experienceLevel} onChange={handleChange} required className="appearance-none cursor-pointer"
                        style={{ ...inputStyle, color: form.experienceLevel ? 'var(--text)' : 'var(--text-3)' }}>
                        <option value="" disabled>Select your level...</option>
                        {experienceLevels.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-barlow text-xs font-600 tracking-widest uppercase" style={{ color: 'var(--gold)' }}>Goals &amp; Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} required rows={5} maxLength={500}
                        placeholder="Tell us about your musical background and what you hope to achieve..."
                        style={{ ...inputStyle, resize: 'none' as const }} />
                      <span className="text-xs text-right" style={{ color: 'var(--text-3)' }}>{form.message.length}/500</span>
                    </div>
                    {error && <div className="px-4 py-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}><p className="text-red-500 text-sm">{error}</p></div>}
                    <button type="submit" disabled={loading}
                      className="w-full py-4 flex items-center justify-center gap-3 font-barlow font-700 text-sm tracking-widest uppercase rounded-full glow-btn transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                      style={{ backgroundColor: 'var(--gold)', color: '#000' }}>
                      {loading ? 'Sending...' : (<>Enroll Now <div className="w-5 h-5 flex items-center justify-center"><i className="ri-arrow-right-line text-base" /></div></>)}
                    </button>
                    <p className="text-xs text-center" style={{ color: 'var(--text-3)' }}>
                      Questions? DM us{' '}
                      <a href="https://instagram.com/djpskratch" target="_blank" rel="noopener noreferrer nofollow" className="hover:underline cursor-pointer" style={{ color: 'var(--gold)' }}>@djpskratch</a>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14" style={{ backgroundColor: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-bebas text-3xl md:text-4xl mb-3" style={{ color: 'var(--text)' }}>
            Not ready yet? <span className="text-shimmer">Book a Free Demo</span>
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-3)' }}>Come in for a free 30-minute demo session and experience the academy yourself.</p>
          <Link to="/booking"
            className="inline-block px-8 py-3 font-barlow font-600 text-sm tracking-widest uppercase rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
            style={{ border: '1px solid var(--border-gold)', color: 'var(--gold)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
          >
            Contact Us
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
