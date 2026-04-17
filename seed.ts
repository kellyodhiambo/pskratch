import { supabase } from './src/lib/supabase.ts';

const events = [
  { title: 'BERLIN OFFICIAL LAUNCH DAY TWO', date: 'April 2ND, 2026', location: 'MAMBOLEO FLYOVER OPP LAKE BASIN MALL', image: 'https://i.postimg.cc/63tvBsX9/Whats-App-Image-2026-03-26-at-12-43-30-PM.jpg', ticket_url: '#' },
];

const mixes = [
  { title: 'Pskratch inferno hit mix 24 (club hits 2025)', description: 'An electrifying blend of hip-hop, trap, and electronic music to get the crowd moving all night long.', duration: '1:23:16', genre: 'Hip-Hop / Trap', thumbnail: 'https://i.postimg.cc/hjcp63Zd/BQi-Wb2d1SUo-HD.jpg', youtube_id: 'BQiWb2d1SUo', plays: '641', is_featured: true, audio_download: '#', video_download: '#' },
  { title: 'DJ P SKRATCH INFERNO HIT MIX 23 2025', description: 'Old school meets new school. A high-energy scratch session featuring timeless hip-hop classics.', duration: '1:38:59', genre: 'Old School Hip-Hop', thumbnail: 'https://i.postimg.cc/Z5Y3kz4G/64upo-LOf-LU-HD.jpg', youtube_id: '64upoLOf-LU', plays: '1K', is_featured: false, audio_download: '#', video_download: '#' },
  { title: 'DJ P SKRATCH INFERNO HIT MIX 22 (UGANDA CLUB HITS) 2025', description: 'Afrobeats, dancehall, and R&B fusion — pure vibes from start to finish.', duration: '1:45:54', genre: 'Afrobeats / R&B', thumbnail: 'https://i.postimg.cc/DzjRQhwr/v-X-R4T1MW1s-HD.jpg', youtube_id: 'vX-R4T1MW1s', plays: '50.2K', is_featured: false, audio_download: '#', video_download: '#' },
  { title: 'DJ P SKRATCH INFERNO HIT MIX 21(dancehall)2025', description: 'Hard-hitting bass music, drum and bass, and grime anthems.', duration: '1:20:07', genre: 'Bass / Drum & Bass', thumbnail: 'https://i.postimg.cc/rFHdH0ZJ/Sey0f6Qf-PXk-HD.jpg', youtube_id: 'Sey0f6QfPXk', plays: '29.8K', is_featured: false, audio_download: '#', video_download: '#' },
];

const blogs = [
  { title: 'DJ PSKRATCH Drops New Collab Mix', date: 'Mar 20, 2026', excerpt: 'The highly anticipated collaboration with producer KLVR is finally here.', category: 'Music' },
  { title: 'SCRATCH AND KUTS Academy Spring Enrollment Open', date: 'Mar 15, 2026', excerpt: 'Spring semester enrollment is now open. Limited spots available.', category: 'Academy' },
  { title: 'Neon Nights Vol. 4 Lineup Announced', date: 'Mar 10, 2026', excerpt: 'The full lineup for April\'s Neon Nights Vol. 4 has been revealed.', category: 'Events' },
  { title: 'Featured on SoundCloud\'s Weekly Playlist', date: 'Mar 5, 2026', excerpt: 'VIBEZ FREQUENCY EP.12 landed on SoundCloud\'s curated weekly electronic playlist.', category: 'Music' },
];

await supabase.from('events').insert(events);
await supabase.from('mixes').insert(mixes);
await supabase.from('blogs').insert(blogs);

console.log('✅ Seed complete');
