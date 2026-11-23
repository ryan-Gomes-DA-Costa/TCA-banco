import { listar, criar, atualizar, excluir } from './api.js';
import { getUsuario } from './auth.js';

const params = new URLSearchParams(window.location.search);
const movie_id = params.get('id');

const usuario = getUsuario(); // pode ser null (visitante)

const detalhes = document.querySelector('#detalhes_filme');
const lista_reviews = document.querySelector('#lista_reviews');
const mensagem = document.querySelector('#mensagem');
const area_form = document.querySelector('#area_form');
const form = document.querySelector('#review_Form');
const review_id = document.querySelector('#review_id');
const review_texto = document.querySelector('#review_texto');
const heart = document.querySelector('#heart');
const titulo_form = document.querySelector('#titulo_form');
const submitBtn = document.querySelector('#submitBtn');
const cancelarBtn = document.querySelector('#cancelarBtn');

if (!movie_id) {
    window.location.href = 'lista.html';
}

// visitante não vê o formulário
if (!usuario) {
    area_form.innerHTML = '<p><a href="index.html">Faça login</a> para escrever uma review.</p>';
}

// ---------- READ: detalhes do filme ----------
async function carregar_filme() {
    try {
        const dados = await listar(`movie?id=eq.${movie_id}&select=id,name,release,synopsis`);
        if (dados.length === 0) {
            detalhes.innerHTML = '<p>Filme não encontrado.</p>';
            return;
        }
        const f = dados[0];
        document.title = f.name;
        detalhes.innerHTML = `
            <h2>${f.name} (${f.release})</h2>
            <p>${f.synopsis ?? 'Sem sinopse.'}</p>
        `;
    } catch (error) {
        console.error(error);
        mensagem.textContent = `Erro ao carregar filme: ${error.message}`;
    }
}

// ---------- READ: reviews do filme ----------
async function carregar_reviews() {
    try {
        const reviews = await listar(
            `review?movie_id=eq.${movie_id}&select=id,rating,review,heart,reviewer_id,reviewer(name)&order=id.desc`
        );

        if (reviews.length === 0) {
            lista_reviews.innerHTML = '<li>Ainda não há reviews.</li>';
            return;
        }

        lista_reviews.innerHTML = reviews.map(r => {
            const dono = usuario && usuario.id === r.reviewer_id;
            return `
                <li>
                    <strong>${r.reviewer?.name ?? 'Anônimo'}</strong>
                    — nota ${r.rating}/5 ${r.heart ? '❤️' : ''}
                    <p>${r.review ?? ''}</p>
                    ${dono ? `
                        <button data-acao="editar" data-id="${r.id}">Editar</button>
                        <button data-acao="excluir" data-id="${r.id}">Excluir</button>
                    ` : ''}
                </li>
            `;
        }).join('');

        // guarda os dados para a edição
        lista_reviews._dados = reviews;
    } catch (error) {
        console.error(error);
        mensagem.textContent = `Erro ao carregar reviews: ${error.message}`;
    }
}

// ---------- cliques em Editar / Excluir ----------
lista_reviews.addEventListener('click', async (e) => {
    const botao = e.target.closest('button[data-acao]');
    if (!botao) return;

    const id = Number(botao.dataset.id);

    if (botao.dataset.acao === 'excluir') {
        if (!confirm('Excluir esta review?')) return;
        try {
            await excluir(`review?id=eq.${id}&reviewer_id=eq.${usuario.id}`);
            mensagem.textContent = 'Review excluída.';
            carregar_reviews();
        } catch (error) {
            console.error(error);
            mensagem.textContent = `Erro ao excluir: ${error.message}`;
        }
    }

    if (botao.dataset.acao === 'editar') {
        const r = lista_reviews._dados.find(x => x.id === id);
        review_id.value = r.id;
        document.querySelector(`#estrela${r.rating}`).checked = true;
        review_texto.value = r.review ?? '';
        heart.checked = r.heart;
        titulo_form.textContent = 'Editar review';
        submitBtn.textContent = 'Salvar alterações';
        cancelarBtn.hidden = false;
        area_form.scrollIntoView({ behavior: 'smooth' });
    }
});

// ---------- sair do modo edição ----------
function resetar_form() {
    form.reset();
    review_id.value = '';
    titulo_form.textContent = 'Escrever review';
    submitBtn.textContent = 'Enviar review';
    cancelarBtn.hidden = true;
}

if (cancelarBtn) cancelarBtn.addEventListener('click', resetar_form);

// ---------- CREATE / UPDATE ----------
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nota = document.querySelector('input[name="rating"]:checked');

        const dados = {
            rating: Number(nota.value),
            review: review_texto.value,
            heart: heart.checked
        };

        try {
            if (review_id.value) {
                // UPDATE
                await atualizar(`review?id=eq.${review_id.value}&reviewer_id=eq.${usuario.id}`, dados);
                mensagem.textContent = 'Review atualizada!';
            } else {
                // CREATE
                await criar('review', {
                    ...dados,
                    reviewer_id: usuario.id,
                    movie_id: Number(movie_id)
                });
                mensagem.textContent = 'Review enviada!';
            }
            resetar_form();
            carregar_reviews();
        } catch (error) {
            console.error(error);
            mensagem.textContent = `Erro: ${error.message}`;
        }
    });
}

carregar_filme();
carregar_reviews();