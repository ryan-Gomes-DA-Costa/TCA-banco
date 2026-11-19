const usuario_Form = document.querySelector('#usuario_Form');
const usuario_nome = document.querySelector('#usuario_nome');
const usuario_email = document.querySelector('#usuario_email');
const usuario_senha = document.querySelector('#usuario_senha');





//Ouvintes de eventos
usuario_Form.addEventListener('submit', criar_usuario);

async function criar_usuario(e) {
    e.preventDefault(); 

    const usuario_Data = {
        nome: usuario_nome.value,
        email: usuario_email.value,
        senha: usuario_senha.value
    };
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                apikey: PUBLISHABLE_KEY,
                'Content-Type': 'application/json',
                Prefer: 'return=representation'
            },
            body: JSON.stringify(usuario_DataData)
        });
        const novo_usuario = await response.json();
        mensagem.innerHTML = `Usuário criado com sucesso! <br>
                        Preencha o formulário novamente para criar outra notícia.`;
        noticiaForm.reset();
    } catch (error) {
        console.error('Erro ao criar notícia:', error);
    }
}
