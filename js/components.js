class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="site-header">
                <img src="img/logo.png" alt="Logo" height="40" onerror="this.style.display='none'">
                <h1>Movie Reviews</h1>
            </header>`;
    }
}

class SiteNav extends HTMLElement {
    connectedCallback() {
        let usuario = null;
        try {
            usuario = JSON.parse(localStorage.getItem('usuario'));
        } catch {}

        this.innerHTML = `
            <nav class="site-nav">
                <a href="index.html">Filmes</a>
                ${usuario
                    ? `<span class="nav-usuario">Olá, ${usuario.name}</span>
                       <a href="#" id="sair">Sair</a>`
                    : `<a href="login.html">Login</a>
                       <a href="account.html">Criar conta</a>`}
            </nav>`;

        const sair = this.querySelector('#sair');
        if (sair) {
            sair.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('usuario');
                window.location.href = 'login.html';
            });
        }
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="site-footer">
                <p>&copy; 2026 Ryan - Trabalho Final de JavaScript</p>
            </footer>`;
    }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-nav', SiteNav);
customElements.define('site-footer', SiteFooter);