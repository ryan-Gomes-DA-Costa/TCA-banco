import { listar } from './api.js';

const lista = document.querySelector('#lista_filmes');
const mensagem = document.querySelector('#mensagem');

async function carregar_filmes() {
    try {
        const filmes = await listar('movie?select=id,name,release&order=name');

        if (filmes.length === 0) {
            mensagem.textContent = 'Nenhum filme cadastrado.';
            return;
        }

        lista.innerHTML = filmes.map(f => `
            <li>
                <a href="filme.html?id=${f.id}">
                    <strong>${f.name}</strong> (${f.release})
                </a>
            </li>
        `).join('');
    } catch (error) {
        console.error(error);
        mensagem.textContent = `Erro ao carregar filmes: ${error.message}`;
    }
}

carregar_filmes();