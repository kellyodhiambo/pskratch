import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  ticketUrl: string;
};

export type Mix = {
  id: number;
  title: string;
  description: string;
  duration: string;
  genre: string;
  thumbnail: string;
  youtubeId: string;
  plays: string;
  isFeatured: boolean;
  audioDownload: string;
  videoDownload: string;
};

export type Blog = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  category: string;
};

// ── row mappers ──────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toEvent = (r: any): Event => ({ id: r.id, title: r.title, date: r.date, location: r.location, image: r.image ?? '', ticketUrl: r.ticket_url ?? '#' });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toMix = (r: any): Mix => ({ id: r.id, title: r.title, description: r.description ?? '', duration: r.duration ?? '', genre: r.genre ?? '', thumbnail: r.thumbnail ?? '', youtubeId: r.youtube_id ?? '', plays: r.plays ?? '0', isFeatured: r.is_featured ?? false, audioDownload: r.audio_download ?? '#', videoDownload: r.video_download ?? '#' });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toBlog = (r: any): Blog => ({ id: r.id, title: r.title, date: r.date, excerpt: r.excerpt ?? '', category: r.category ?? '' });

// ── Events ───────────────────────────────────────────────────
export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const fetch = async () => { const { data } = await supabase.from('events').select('*').order('id'); setEvents((data ?? []).map(toEvent)); };
  useEffect(() => { fetch(); }, []);
  const addEvent = async (e: Omit<Event, 'id'>) => { await supabase.from('events').insert({ title: e.title, date: e.date, location: e.location, image: e.image, ticket_url: e.ticketUrl }); fetch(); };
  const updateEvent = async (e: Event) => { await supabase.from('events').update({ title: e.title, date: e.date, location: e.location, image: e.image, ticket_url: e.ticketUrl }).eq('id', e.id); fetch(); };
  const deleteEvent = async (id: number) => { await supabase.from('events').delete().eq('id', id); fetch(); };
  return { events, addEvent, updateEvent, deleteEvent };
}

// ── Mixes ────────────────────────────────────────────────────
export function useMixes() {
  const [mixes, setMixes] = useState<Mix[]>([]);
  const fetch = async () => { const { data } = await supabase.from('mixes').select('*').order('id'); setMixes((data ?? []).map(toMix)); };
  useEffect(() => { fetch(); }, []);
  const addMix = async (m: Omit<Mix, 'id'>) => { await supabase.from('mixes').insert({ title: m.title, description: m.description, duration: m.duration, genre: m.genre, thumbnail: m.thumbnail, youtube_id: m.youtubeId, plays: m.plays, is_featured: m.isFeatured, audio_download: m.audioDownload, video_download: m.videoDownload }); fetch(); };
  const updateMix = async (m: Mix) => { await supabase.from('mixes').update({ title: m.title, description: m.description, duration: m.duration, genre: m.genre, thumbnail: m.thumbnail, youtube_id: m.youtubeId, plays: m.plays, is_featured: m.isFeatured, audio_download: m.audioDownload, video_download: m.videoDownload }).eq('id', m.id); fetch(); };
  const deleteMix = async (id: number) => { await supabase.from('mixes').delete().eq('id', id); fetch(); };
  return { mixes, addMix, updateMix, deleteMix };
}

// ── Blogs ────────────────────────────────────────────────────
export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const fetch = async () => { const { data } = await supabase.from('blogs').select('*').order('id'); setBlogs((data ?? []).map(toBlog)); };
  useEffect(() => { fetch(); }, []);
  const addBlog = async (b: Omit<Blog, 'id'>) => { await supabase.from('blogs').insert({ title: b.title, date: b.date, excerpt: b.excerpt, category: b.category }); fetch(); };
  const updateBlog = async (b: Blog) => { await supabase.from('blogs').update({ title: b.title, date: b.date, excerpt: b.excerpt, category: b.category }).eq('id', b.id); fetch(); };
  const deleteBlog = async (id: number) => { await supabase.from('blogs').delete().eq('id', id); fetch(); };
  return { blogs, addBlog, updateBlog, deleteBlog };
}
