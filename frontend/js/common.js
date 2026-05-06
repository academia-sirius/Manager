// common.js - Utilidades compartilhadas e verificação de sessão

const App = {
    // Em desenvolvimento aponta directamente para o backend.
    // Em produção (Docker + Nginx) usa URL relativa — o Nginx faz o proxy de /api/.
    API_URL: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '')
        ? 'http://localhost:4000/api'
        : '/api',

    // Helper para fazer requests à API com token JWT
    request: async (endpoint, options = {}) => {
        const token = localStorage.getItem('manager_token');
        const headers = options.headers || {};

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Se não for FormData, adicionar Content-Type json
        if (!(options.body instanceof FormData) && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${App.API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            throw { status: response.status, message: data.message || 'Erro na requisição' };
        }

        return data;
    },

    // Retorna o centro de avaliação logado ou redireciona
    checkAuth: async () => {
        const token = localStorage.getItem('manager_token');
        if (!token) {
            window.location.href = 'login.html';
            return null;
        }

        try {
            const centro = await App.request('/auth/me');

            // Aplicar identidade visual do centro
            App.applyBranding(centro);

            // Atualizar informações da sidebar se ela existir
            const userNameEl = document.getElementById('user-name');
            const userAvatarEl = document.getElementById('user-avatar');

            if (userNameEl && userAvatarEl) {
                userNameEl.textContent = centro.nome;
                userAvatarEl.textContent = centro.nome.charAt(0).toUpperCase();
            }

            // Atualizar a data na topbar se existir
            const dateElement = document.getElementById('current-date');
            if (dateElement) {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                dateElement.textContent = new Date().toLocaleDateString('pt-BR', options);
            }

            return centro;
        } catch (err) {
            // Token inválido ou expirado
            localStorage.removeItem('manager_token');
            window.location.href = 'login.html';
            return null;
        }
    },

    // Aplicar cores dinâmicas do centro
    applyBranding: (centro) => {
        if (!centro) return;
        const root = document.documentElement;
        
        console.log('Aplicando cores do centro:', { prim: centro.corPrimaria, sec: centro.corSecundaria });

        if (centro.corPrimaria) {
            root.style.setProperty('--primary', centro.corPrimaria);
            root.style.setProperty('--primary-hover', centro.corPrimaria); // Pode ser melhorado com cor calculada
            root.style.setProperty('--primary-glow', `${centro.corPrimaria}44`);
        }
        
        if (centro.corSecundaria) {
            root.style.setProperty('--secondary', centro.corSecundaria);
        }
    },

    // Redirecionar se já estiver logado
    redirectIfAuthenticated: () => {
        const token = localStorage.getItem('manager_token');
        if (token) {
            window.location.href = 'home.html';
        }
    },

    // Fazer logout
    logout: async () => {
        try {
            await App.request('/auth/logout', { method: 'POST' });
        } catch (e) {
            // Ignora erro — o importante é limpar o token local
        }
        localStorage.removeItem('manager_token');
        window.location.href = 'index.html';
    },

    // Construir URL completa para logo
    getLogoUrl: (logoFilename) => {
        if (!logoFilename) return '';
        if (logoFilename.startsWith('http') || logoFilename.startsWith('data:')) return logoFilename;
        
        const baseUrl = App.API_URL.replace('/api', '');
        return `${baseUrl}/uploads/logos/${logoFilename}`;
    },

    // Exibir notificação toast
    showNotification: (message, type = 'success') => {
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            document.body.appendChild(container);
        }

        const notif = document.createElement('div');
        notif.className = `notification ${type}`;
        notif.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> <span>${message}</span>`;

        container.appendChild(notif);

        setTimeout(() => {
            notif.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    },

    // Funções de Modal
    openModal: (id) => {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('hidden');
    },

    closeModal: (id) => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('hidden');
            const form = modal.querySelector('form');
            if (form) form.reset();
        }
    },

    // Funções de leitura de parâmetros de URL
    getQueryParams: () => {
        const params = new URLSearchParams(window.location.search);
        const entries = {};
        for(const [key, value] of params.entries()) {
            entries[key] = value;
        }
        return entries;
    }
};
