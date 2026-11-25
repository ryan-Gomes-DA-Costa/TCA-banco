import { supabase } from './config.js';
import { getUsuario } from './auth.js';

// ---------- preparação ----------
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
    const { data: filme, error } = await supabase
        .from('movie')
        .select('id, name, release, synopsis, duration_minutes, age_rating, language, director(name), actor(name), genre(name)')
        .eq('id', movie_id)
        .maybeSingle();

    if (error) {
        mensagem.textContent = `Erro ao carregar filme: ${error.message}`;
        return;
    }
    if (!filme) {
        detalhes.innerHTML = '<p>Filme não encontrado.</p>';
        return;
    }
    const generos = filme.genre.map(g => g.name).join(', ') || 'Não informado';
    const diretores = filme.director.map(d => d.name).join(', ') || 'Não informado';
    const atores = filme.actor.map(a => a.name).join(', ') || 'Não informado';

    document.title = filme.name;
    detalhes.innerHTML = `
        <h2>${filme.name} (${filme.release})</h2>
        <p>${filme.synopsis ?? 'Sem sinopse.'}</p>
        <p><strong>Direção:</strong> ${diretores}</p>
        <p><strong>Elenco:</strong> ${atores}</p>
        <p><strong>Gênero:</strong> ${generos}</p>
        <p>Duração: ${filme.duration_minutes ?? 'N/A'} minutos</p>
        <p>Classificação etária: ${filme.age_rating ?? 'N/A'}</p>
        <p>Idioma: ${filme.language ?? 'N/A'}</p>
    `;
}

// ---------- READ: reviews do filme ----------
async function carregar_reviews() {
    const { data: reviews, error } = await supabase
        .from('review')
        .select('id, rating, review, heart, reviewer_id, reviewer(name)')
        .eq('movie_id', movie_id)
        .order('id', { ascending: false });

    if (error) {
        mensagem.textContent = `Erro ao carregar reviews: ${error.message}`;
        return;
    }
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

    // guarda os dados para usar na edição
    lista_reviews._dados = reviews;
}

// ---------- cliques em Editar / Excluir ----------
lista_reviews.addEventListener('click', async (e) => {
    const botao = e.target.closest('button[data-acao]');
    if (!botao) return;

    const id = Number(botao.dataset.id);

    // DELETE
    if (botao.dataset.acao === 'excluir') {
        if (!confirm('Excluir esta review?')) return;

        const { error } = await supabase
            .from('review')
            .delete()
            .eq('id', id)
            .eq('reviewer_id', usuario.id);

        if (error) {
            mensagem.textContent = `Erro ao excluir: ${error.message}`;
            return;
        }
        mensagem.textContent = 'Review excluída.';
        carregar_reviews();
    }

    // prepara o formulário para edição
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

        let error;

        if (review_id.value) {
            // UPDATE
            ({ error } = await supabase
                .from('review')
                .update(dados)
                .eq('id', review_id.value)
                .eq('reviewer_id', usuario.id));
        } else {
            // CREATE
            ({ error } = await supabase
                .from('review')
                .insert({
                    ...dados,
                    reviewer_id: usuario.id,
                    movie_id: Number(movie_id)
                }));
        }

        if (error) {
            mensagem.textContent = `Erro: ${error.message}`;
            return;
        }

        mensagem.textContent = review_id.value ? 'Review atualizada!' : 'Review enviada!';
        resetar_form();
        carregar_reviews();
    });
}

// ---------- ao abrir a página ----------
carregar_filme();
carregar_reviews();