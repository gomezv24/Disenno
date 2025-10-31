import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://opptodvvohelldblkuws.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wcHRvZHZ2b2hlbGxkYmxrdXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NTcwMjQsImV4cCI6MjA3NzQzMzAyNH0.TuBzGTx4uULRqyONn7FjU-sYw9SiHexfivkDMayRsAc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);