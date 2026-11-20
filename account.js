const usuario_Form = document.querySelector('#usuario_Form');
const usuario_nome = document.querySelector('#usuario_nome');
const usuario_email = document.querySelector('#usuario_email');
const usuario_senha = document.querySelector('#usuario_senha');
const mensagem = document.querySelector('#mensagem');
import { PUBLISHABLE_KEY, API_URL } from './config.js';





//Ouvintes de eventos
usuario_Form.addEventListener('submit', criar_usuario);

async function criar_usuario(e) {
    e.preventDefault();

    const usuario_Data = {
        name: usuario_nome.value,
        email: usuario_email.value,
        password: usuario_senha.value
    };

    try {
        const response = await fetch(`${API_URL}reviewer`, {
            method: 'POST',
            headers: {
                apikey: PUBLISHABLE_KEY,
                'Content-Type': 'application/json',
                Prefer: 'return=minimal'
            },
            body: JSON.stringify(usuario_Data)
        });

        if (!response.ok) {
            const erro = await response.json();
            throw new Error(erro.message);
        }

        mensagem.textContent = 'Conta criada com sucesso! Redirecionando para o login...';
        usuario_Form.reset();
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        mensagem.textContent = `Erro ao criar conta: ${error.message}`;
    }
}
