import { supabase } from './config.js';

const mensagem = document.querySelector('#mensagem');

login_Form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
        .from('reviewer')
        .select('id, name')
        .eq('email', login_email.value)
        .eq('password', login_senha.value);

    if (error) {
        mensagem.textContent = 'Erro ao fazer login';
        return;
    }
    if (data.length === 0) {
        mensagem.textContent = 'Email ou senha incorretos';
        return;
    }

    localStorage.setItem('usuario', JSON.stringify(data[0]));
    window.location.href = 'lista.html';
});