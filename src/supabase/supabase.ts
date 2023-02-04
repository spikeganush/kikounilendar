import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://lmeuhlbwholczcnwgqyb.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtZXVobGJ3aG9sY3pjbndncXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwNjE2MDEsImV4cCI6MTk5MDYzNzYwMX0.vU2Io_RYjddvOfiEQjqHnnyG9O4VfnnKXmt-DxbrCpc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
