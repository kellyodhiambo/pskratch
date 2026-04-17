import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Mixes', path: '/mixes' },
  { label: 'Booking', path: '/booking' },
  { label: 'Academy', path: '/academy' },
];

const socialLinks = [
  { icon: 'ri-instagram-line', href: 'https://www.instagram.com/pskratch_kenya/', label: 'Instagram' },
  { icon: 'ri-youtube-line', href: 'https://www.youtube.com/@PskratchKenya', label: 'YouTube' },
  { icon: 'ri-soundcloud-line', href: 'https://soundcloud.com', label: 'SoundCloud' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={scrolled ? {
          backgroundColor: 'var(--bg-navbar)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--border)',
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center">
              <img src="/plogo.png" alt="DJ PSKRATCH" className="w-full h-full object-contain" />
            </div>
            <span className="hidden sm:block font-bebas text-xl md:text-2xl tracking-widest" style={{ color: 'var(--text)' }}>
              DJ <span style={{ color: 'var(--gold)' }}>PSKRATCH</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-barlow text-sm font-600 tracking-widest uppercase transition-all duration-200 relative group cursor-pointer whitespace-nowrap"
                  style={{ color: isActive ? 'var(--gold)' : 'var(--text-2)' }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                    style={{ background: 'var(--gold)', width: isActive ? '100%' : '0' }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Social + CTA */}
          <div className="hidden md:flex items-center gap-4">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer nofollow" aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center transition-colors duration-200 cursor-pointer"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'}
              >
                <i className={`${s.icon} text-lg`} />
              </a>
            ))}
            <Link
              to="/booking"
              className="ml-1 px-5 py-2 font-barlow font-700 text-sm tracking-widest uppercase rounded-full glow-btn transition-all duration-200 cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: 'var(--gold)', color: '#000' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold-light)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold)'}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center transition-colors duration-200 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ color: 'var(--text-2)' }}
          >
            <i className={`text-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ backgroundColor: 'var(--bg)', borderLeft: '1px solid var(--border)' }}
        >
          <div className="flex flex-col h-full pt-20 px-6 pb-8">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="font-bebas text-4xl py-3 tracking-widest transition-colors duration-200 cursor-pointer"
                    style={{ color: isActive ? 'var(--gold)' : 'var(--text-2)', borderBottom: '1px solid var(--border)' }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-8 flex gap-3">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer nofollow" aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-3)' }}
                >
                  <i className={`${s.icon} text-lg`} />
                </a>
              ))}
            </div>
            <Link
              to="/booking"
              className="mt-8 py-4 font-barlow font-700 text-base tracking-widest uppercase rounded-full text-center glow-btn cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: 'var(--gold)', color: '#000' }}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
