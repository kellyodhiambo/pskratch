import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Mixes', path: '/mixes' },
  { label: 'Booking', path: '/booking' },
  { label: 'Academy', path: '/academy' },
];

const socialLinks = [
  { icon: 'ri-instagram-line', href: 'https://instagram.com/djpskratch', label: 'Instagram' },
  { icon: 'ri-youtube-line', href: 'https://youtube.com', label: 'YouTube' },
  { icon: 'ri-soundcloud-line', href: 'https://soundcloud.com', label: 'SoundCloud' },
  { icon: 'ri-twitter-x-line', href: 'https://twitter.com', label: 'Twitter/X' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }} className="pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <img src="/plogo.png" alt="DJ PSKRATCH" className="w-full h-full object-contain" />
              </div>
              <span className="font-bebas text-2xl tracking-widest" style={{ color: 'var(--text)' }}>
                DJ <span style={{ color: 'var(--gold)' }}>PSKRATCH</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: 'var(--text-3)' }}>
              Professional DJ &amp; music artist. High-energy performances at clubs, festivals, and private events worldwide.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer nofollow" aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-3)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-gold)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
                >
                  <i className={`${s.icon} text-base`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-barlow text-xs font-600 tracking-widest uppercase mb-5" style={{ color: 'var(--gold)' }}>Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm transition-colors duration-200 cursor-pointer" style={{ color: 'var(--text-3)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-barlow text-xs font-600 tracking-widest uppercase mb-5" style={{ color: 'var(--gold)' }}>Get In Touch</h4>
            <ul className="flex flex-col gap-3 text-sm" style={{ color: 'var(--text-3)' }}>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-instagram-line" style={{ color: 'var(--gold)' }} />
                </div>
                <a href="https://instagram.com/djpskratch" target="_blank" rel="noopener noreferrer nofollow" className="cursor-pointer transition-colors duration-200 hover:underline" style={{ color: 'inherit' }}>@djpskratch</a>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-mail-line" style={{ color: 'var(--gold)' }} />
                </div>
                <span>bookings@djpskratch.com</span>
              </li>
              <li className="mt-2">
                <Link to="/booking" className="text-sm font-barlow font-600 tracking-wide cursor-pointer whitespace-nowrap transition-colors duration-200" style={{ color: 'var(--gold)' }}>
                  Book For Your Event &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px gold-line mb-6 opacity-25" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>&copy; 2026 DJ PSKRATCH. All rights reserved.</p>
          <p className="text-xs" style={{ color: 'var(--text-3)', opacity: 0.6 }}>Built for the music. Built for the culture.</p>
        </div>
      </div>
    </footer>
  );
}
