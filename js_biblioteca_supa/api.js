const { data: filmes, error } = await supabase
    .from('movie')
    .select('id, name, release')
    .order('name');
if (error) throw error;