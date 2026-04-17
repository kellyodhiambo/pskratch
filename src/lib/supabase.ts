import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://nlhtmpfyyvewzhpiwxcp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5saHRtcGZ5eXZld3pocGl3eGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NDM3MTAsImV4cCI6MjA5MjAxOTcxMH0.cjzA54Z4syWXG-XjomB1AP53iZSnjkReo_vqUc_yRPg'
);

// Admin client — used only inside /admin panel
export const supabaseAdmin = createClient(
  'https://nlhtmpfyyvewzhpiwxcp.supabase.co',
  import.meta.env.VITE_SUPABASE_SERVICE_KEY ?? ''
);
