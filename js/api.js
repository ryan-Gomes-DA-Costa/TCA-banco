import { PUBLISHABLE_KEY, API_URL } from './config.js';

async function requisicao(caminho, opcoes = {}) {
    const response = await fetch(`${API_URL}${caminho}`, {
        ...opcoes,
        headers: {
            apikey: PUBLISHABLE_KEY,
            'Content-Type': 'application/json',
            ...opcoes.headers
        }
    });

    if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.message);
    }

    return response.status === 204 ? null : response.json();
}

export const listar = (caminho) => requisicao(caminho);

export const criar = (tabela, dados) =>
    requisicao(tabela, {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify(dados)
    });

export const atualizar = (caminho, dados) =>
    requisicao(caminho, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify(dados)
    });

export const excluir = (caminho) =>
    requisicao(caminho, { method: 'DELETE' });