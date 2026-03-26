import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import HeroSection from './components/HeroSection';
import UpcomingEvents from './components/UpcomingEvents';
import TrendingMixes from './components/TrendingMixes';
import LatestUpdates from './components/LatestUpdates';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--bg)' }}>
      <Navbar />
      <HeroSection />
      <UpcomingEvents />
      <TrendingMixes />
      <LatestUpdates />

      {/* CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="absolute inset-0">
          <img
            src= "https://iili.io/qLeUZ91.md.jpg"
            alt="Book DJ PSKRATCH"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-8 text-center">
          <span className="font-barlow text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--gold)' }}>
            Let&apos;s Work Together
          </span>
          <h2 className="font-bebas text-5xl md:text-6xl text-white mb-4 leading-tight">
            Ready to Book<br />DJ PSKRATCH?
          </h2>
          <p className="text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto text-white/55">
            From club nights to corporate events, weddings to festivals — DJ PSKRATCH delivers an unforgettable experience every time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/booking"
              className="px-8 py-4 font-barlow font-700 text-sm tracking-widest uppercase rounded-full glow-btn transition-all duration-200 cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: 'var(--gold)', color: '#000' }}
            >
              Book Now
            </Link>
            <Link
              to="/academy"
              className="px-8 py-4 font-barlow font-600 text-sm tracking-widest uppercase rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap text-white/70 hover:text-white"
              style={{ border: '1px solid rgba(255,255,255,0.2)' }}
            >
              Join the Academy
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
