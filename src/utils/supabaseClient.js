import { createClient } from '@supabase/supabase-js';
import { eventDetails } from '../config/eventDetails';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || eventDetails.supabase?.url || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || eventDetails.supabase?.anonKey || '';

export const supabase = (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('PASTE_'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
