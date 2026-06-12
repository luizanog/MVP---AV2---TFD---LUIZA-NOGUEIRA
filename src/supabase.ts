import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bxeiscfucqljasmeqadz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4ZWlzY2Z1Y3FsamFzbWVxYWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5ODI1MzcsImV4cCI6MjA5NjU1ODUzN30.Le63Bg0xuzrpZdlRKCFeqJJEP30b61nhs5b0_d0zQXk';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
