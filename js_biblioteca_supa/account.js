import { supabase } from './config.js';

const usuario_Form = document.querySelector('#usuario_Form');
const mensagem = document.querySelector('#mensagem');

usuario_Form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('reviewer').insert({
        name: usuario_nome.value,
        email: usuario_email.value,
        password: usuario_senha.value
    });

    if (error) {
        mensagem.textContent = `Erro ao criar conta: ${error.message}`;
        return;
    }

    mensagem.textContent = 'Conta criada com sucesso! Redirecionando para o login...';
    usuario_Form.reset();
    setTimeout(() => { window.location.href = 'index.html'; }, 1500);
});