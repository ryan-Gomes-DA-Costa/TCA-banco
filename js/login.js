import { PUBLISHABLE_KEY, API_URL } from './config.js';

const login_Form = document.querySelector('#login_Form');
const login_email = document.querySelector('#login_email');
const login_senha = document.querySelector('#login_senha');
const mensagem = document.querySelector('#mensagem');

login_Form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = encodeURIComponent(login_email.value);
    const senha = encodeURIComponent(login_senha.value);

    try {
        const response = await fetch(
            `${API_URL}reviewer?email=eq.${email}&password=eq.${senha}&select=id,name`,
            { headers: { apikey: PUBLISHABLE_KEY } }
        );
        if (!response.ok) throw new Error('Erro na requisição');

        const usuarios = await response.json();
        if (usuarios.length === 0) {
            mensagem.textContent = 'Email ou senha incorretos';
            return;
        }

        // guarda quem está logado
        localStorage.setItem('usuario', JSON.stringify(usuarios[0]));
        window.location.href = 'lista.html';
    } catch (error) {
        console.error(error);
        mensagem.textContent = 'Erro ao fazer login';
    }
});