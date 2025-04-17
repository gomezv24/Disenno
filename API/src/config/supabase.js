import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aiyuoqjwzevphzjpymgs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpeXVvcWp3emV2cGh6anB5bWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0ODE0MjgsImV4cCI6MjA2MDA1NzQyOH0.Uu79K31NK3RCK40XRBQ_X1vbaYxx3yene0Tiwf-cXno';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);