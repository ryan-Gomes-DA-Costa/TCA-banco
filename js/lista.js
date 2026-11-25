import { supabase } from './config.js';

const lista = document.querySelector('#lista_filmes');
const mensagem = document.querySelector('#mensagem');
const filtro_genero = document.querySelector('#filtro_genero');
const filtro_ano = document.querySelector('#filtro_ano');


async function carregar_filmes() {
    let genero_escolhido = filtro_genero.value;
    let ano_escolhido = filtro_ano.value;

    let colunas = 'id, name, release';
    if (genero_escolhido !== '') {
        colunas = 'id, name, release, genre!inner(name)';
    }

    let consulta = supabase
        .from('movie')
        .select(colunas)
        .order('name');

    if (genero_escolhido !== '') {
        consulta = consulta.eq('genre.name', genero_escolhido);
    }
    if (ano_escolhido !== '') {
        consulta = consulta.eq('release', ano_escolhido);
    }

    const { data, error } = await consulta;

    if (error) {
        mensagem.textContent = `Erro ao carregar filmes: ${error.message}`;
        return;
    }

    if (data.length === 0) {
        mensagem.textContent = 'Nenhum filme encontrado.';
    } else {
        mensagem.textContent = '';
    }

    lista.innerHTML = data.map(f => `
        <li><a href="filme.html?id=${f.id}"><strong>${f.name}</strong> (${f.release})</a></li>
    `).join('');
}


async function preencher_filtros() {
    
    const { data: generos } = await supabase
        .from('genre')
        .select('name')
        .order('name');

    filtro_genero.innerHTML += generos.map(g => `<option value="${g.name}">${g.name}</option>`).join('');

    const { data: filmes } = await supabase
        .from('movie')
        .select('release')
        .order('release', { ascending: false });

    let anos = [];
    for (let i = 0; i < filmes.length; i++) {
        if (!anos.includes(filmes[i].release)) {
            anos.push(filmes[i].release);
        }
    }

    filtro_ano.innerHTML += anos.map(a => `<option value="${a}">${a}</option>`).join('');
}


async function preencher_filtros() {
    
    const { data: generos } = await supabase
        .from('genre')
        .select('name')
        .order('name');

    filtro_genero.innerHTML += generos.map(g => `<option value="${g.name}">${g.name}</option>`).join('');

    
    const { data: filmes } = await supabase
        .from('movie')
        .select('release')
        .order('release', { ascending: false });

    let anos = [];
    for (let i = 0; i < filmes.length; i++) {
        if (!anos.includes(filmes[i].release)) {
            anos.push(filmes[i].release);
        }
    }

    filtro_ano.innerHTML += anos.map(a => `<option value="${a}">${a}</option>`).join('');
}

filtro_genero.addEventListener('change', carregar_filmes);
filtro_ano.addEventListener('change', carregar_filmes);

preencher_filtros();
carregar_filmes();