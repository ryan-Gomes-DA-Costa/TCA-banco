import { supabase } from './config.js';

const lista = document.querySelector('#lista_filmes');
const mensagem = document.querySelector('#mensagem');

async function carregar_filmes() {
    const { data: filmes, error } = await supabase
        .from('movie')
        .select('id, name, release')
        .order('name');

    if (error) {
        mensagem.textContent = `Erro ao carregar filmes: ${error.message}`;
        return;
    }
    if (filmes.length === 0) {
        mensagem.textContent = 'Nenhum filme cadastrado.';
        return;
    }

    lista.innerHTML = filmes.map(f => `
        <li><a href="filme.html?id=${f.id}"><strong>${f.name}</strong> (${f.release})</a></li>
    `).join('');
}

carregar_filmes();