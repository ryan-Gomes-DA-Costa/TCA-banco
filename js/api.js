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

    // lê como texto: respostas de POST/PATCH/DELETE (return=minimal) vêm sem corpo
    const texto = await response.text();
    const dados = texto ? JSON.parse(texto) : null;

    if (!response.ok) {
        throw new Error(dados?.message ?? `Erro ${response.status}`);
    }

    return dados;
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