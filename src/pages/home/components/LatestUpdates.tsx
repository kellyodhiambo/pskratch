import { useBlogs } from '../../../store/adminStore';

const categoryTokens: Record<string, { light: string; dark: string; border: string }> = {
  Music:   { light: '#B8922C', dark: '#D4AF37', border: 'rgba(184,146,44,0.3)' },
  Academy: { light: '#9333ea', dark: '#c084fc', border: 'rgba(192,132,252,0.3)' },
  Events:  { light: '#c2410c', dark: '#fb923c', border: 'rgba(251,146,60,0.3)' },
};

export default function LatestUpdates() {
  const { blogs } = useBlogs();
  return (
    <section className="py-20 md:py-28 section-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-barlow text-xs tracking-widest uppercase mb-2 block" style={{ color: 'var(--gold)' }}>News</span>
            <h2 className="font-bebas text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>Latest Updates</h2>
          </div>
          <a href="https://instagram.com/djpskratch" target="_blank" rel="noopener noreferrer nofollow"
            className="flex items-center gap-2 text-sm transition-colors duration-200 cursor-pointer whitespace-nowrap"
            style={{ color: 'var(--text-3)' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'}
          >
            <span>Follow for more</span>
            <div className="w-4 h-4 flex items-center justify-center"><i className="ri-instagram-line" /></div>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {blogs.map((update, idx) => {
            const cat = categoryTokens[update.category];
            return (
              <article
                key={update.id}
                className="rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fadeInUp"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  animationDelay: `${idx * 0.1}s`,
                  animationFillMode: 'both',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-gold)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 border rounded-full text-xs font-barlow font-600 tracking-wide"
                    style={{ color: cat?.light ?? 'var(--text-2)', borderColor: cat?.border ?? 'var(--border)', background: `${cat?.border ?? 'var(--border)'}22` }}>
                    {update.category}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-3)' }}>{update.date}</span>
                </div>

                <h4 className="font-barlow text-base font-700 mb-2 leading-snug transition-colors duration-200" style={{ color: 'var(--text)' }}>
                  <a href="#" className="cursor-pointer hover:underline" style={{ color: 'inherit' }}>{update.title}</a>
                </h4>

                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>{update.excerpt}</p>

                <a href="#" className="flex items-center gap-1 text-xs font-barlow font-600 tracking-wide hover:gap-2 transition-all duration-200 cursor-pointer whitespace-nowrap" style={{ color: 'var(--gold)' }}>
                  Read More
                  <div className="w-4 h-4 flex items-center justify-center"><i className="ri-arrow-right-line" /></div>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
