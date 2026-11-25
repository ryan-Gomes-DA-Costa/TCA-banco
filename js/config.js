import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm';

export const supabase = createClient(
    'https://hbkukzlbghhastuifevf.supabase.co',   // sem /rest/v1/
    'sb_publishable_W3EgsRx9n9uIN7BJ2CKP7A_rsACh15K'
);