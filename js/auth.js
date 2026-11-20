export function getUsuario() {
    try {
        return JSON.parse(localStorage.getItem('usuario'));
    } catch {
        return null;
    }
}

export function exigirLogin() {
    const usuario = getUsuario();
    if (!usuario) {
        window.location.href = 'login.html';
        return null;
    }
    return usuario;
}

export function sair() {
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
}
