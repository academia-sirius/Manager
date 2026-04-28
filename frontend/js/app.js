class ManagerApp {
    constructor() {
        this.currentView = 'presentation';
        this.centro = null; // Usuário logado
        this.turmas = JSON.parse(localStorage.getItem('manager_turmas')) || [];
        this.alunos = JSON.parse(localStorage.getItem('manager_alunos')) || [];
        
        this.currentTurmaId = null;
        this.currentAlunoId = null;
        
        this.init();
    }

    init() {
        // Atualizar data na topbar
        const dateElement = document.getElementById('current-date');
        if(dateElement) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateElement.textContent = new Date().toLocaleDateString('pt-BR', options);
        }

        // Verificar sessão
        const session = localStorage.getItem('manager_session');
        if (session) {
            this.centro = JSON.parse(session);
            this.navigate('home');
        } else {
            this.navigate('presentation');
        }
    }

    // Navegação Principal
    navigate(view) {
        // Esconder todas as views
        document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
        document.getElementById('layout-app').classList.add('hidden');

        this.currentView = view;

        if (view === 'presentation' || view === 'login' || view === 'signup') {
            document.getElementById(`view-${view}`).classList.add('active');
        } else {
            // Views autenticadas
            document.getElementById('layout-app').classList.remove('hidden');
            
            // Atualizar infos do usuário
            if (this.centro) {
                document.getElementById('user-name').textContent = this.centro.nome;
                document.getElementById('user-avatar').textContent = this.centro.nome.charAt(0).toUpperCase();
            }

            if (view === 'home') {
                document.getElementById('view-home').classList.add('active');
                document.getElementById('topbar-title').textContent = 'Dashboard / Turmas';
                this.renderTurmas();
            } else if (view === 'turma') {
                document.getElementById('view-turma').classList.add('active');
                document.getElementById('topbar-title').textContent = 'Detalhes da Turma';
                this.renderAlunos();
            } else if (view === 'aluno') {
                document.getElementById('view-aluno').classList.add('active');
                document.getElementById('topbar-title').textContent = 'Avaliação do Aluno';
                this.renderAlunoPerfil();
            }
        }
    }

    // Autenticação
    handleSignup(e) {
        e.preventDefault();
        const nome = e.target[0].value;
        const email = e.target[1].value;
        const senha = e.target[2].value;

        this.centro = { id: Date.now(), nome, email };
        localStorage.setItem('manager_session', JSON.stringify(this.centro));
        
        this.showNotification('Conta criada com sucesso!');
        this.navigate('home');
    }

    handleLogin(e) {
        e.preventDefault();
        const email = e.target[0].value;
        // Mock simples
        this.centro = { id: Date.now(), nome: 'Centro de Avaliação', email };
        localStorage.setItem('manager_session', JSON.stringify(this.centro));
        
        this.showNotification('Login realizado com sucesso!');
        this.navigate('home');
    }

    logout() {
        localStorage.removeItem('manager_session');
        this.centro = null;
        this.navigate('presentation');
    }

    // Modais
    openModal(id) {
        document.getElementById(id).classList.remove('hidden');
    }

    closeModal(id) {
        document.getElementById(id).classList.add('hidden');
        // Reset formulários
        const form = document.querySelector(`#${id} form`);
        if (form) form.reset();
    }

    // Gestão de Turmas
    handleCreateTurma(e) {
        e.preventDefault();
        const nome = document.getElementById('turma-nome').value;
        const curso = document.getElementById('turma-curso').value;
        const turno = document.getElementById('turma-turno').value;

        const novaTurma = {
            id: Date.now(),
            centroId: this.centro.id,
            nome,
            curso,
            turno,
            dataCriacao: new Date().toISOString()
        };

        this.turmas.push(novaTurma);
        this.saveData('manager_turmas', this.turmas);
        
        this.closeModal('modal-turma');
        this.showNotification('Turma criada com sucesso!');
        this.renderTurmas();
    }

    renderTurmas() {
        const container = document.getElementById('lista-turmas');
        const emptyState = document.getElementById('empty-turmas');
        
        const minhasTurmas = this.turmas; // Simplificado

        if (minhasTurmas.length === 0) {
            emptyState.style.display = 'block';
            container.innerHTML = '';
            return;
        }

        emptyState.style.display = 'none';
        container.innerHTML = minhasTurmas.map(turma => {
            const alunosCount = this.alunos.filter(a => a.turmaId === turma.id).length;
            
            return `
                <div class="turma-card" onclick="app.viewTurma(${turma.id})">
                    <div class="turma-header">
                        <div class="turma-title">${turma.nome}</div>
                        <span class="badge">${turma.turno}</span>
                    </div>
                    <div class="turma-info">
                        <i class="fa-solid fa-graduation-cap"></i> ${turma.curso}
                    </div>
                    <div class="turma-stats">
                        <i class="fa-solid fa-users"></i> ${alunosCount} Aluno(s) cadastrados
                    </div>
                </div>
            `;
        }).join('');
    }

    viewTurma(id) {
        this.currentTurmaId = id;
        const turma = this.turmas.find(t => t.id === id);
        
        if (turma) {
            document.getElementById('turma-title').textContent = turma.nome;
            document.getElementById('turma-subtitle').textContent = `${turma.curso} | ${turma.turno}`;
            this.navigate('turma');
        }
    }

    // Gestão de Alunos
    handleCreateAluno(e) {
        e.preventDefault();
        const nome = document.getElementById('aluno-nome').value;
        const matricula = document.getElementById('aluno-matricula').value;
        const email = document.getElementById('aluno-email').value;
        const telefone = document.getElementById('aluno-telefone').value;

        const novoAluno = {
            id: Date.now(),
            turmaId: this.currentTurmaId,
            nome,
            matricula,
            email,
            telefone,
            statusAvaliacao: 'Pendente'
        };

        this.alunos.push(novoAluno);
        this.saveData('manager_alunos', this.alunos);
        
        this.closeModal('modal-aluno');
        this.showNotification('Aluno cadastrado com sucesso!');
        this.renderAlunos();
    }

    renderAlunos() {
        const container = document.getElementById('lista-alunos');
        const emptyState = document.getElementById('empty-alunos');
        
        const alunosDaTurma = this.alunos.filter(a => a.turmaId === this.currentTurmaId);

        if (alunosDaTurma.length === 0) {
            emptyState.style.display = 'block';
            container.innerHTML = '';
            return;
        }

        emptyState.style.display = 'none';
        container.innerHTML = alunosDaTurma.map(aluno => `
            <div class="list-item" onclick="app.viewAluno(${aluno.id})">
                <div class="item-info">
                    <div class="item-avatar">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="item-details">
                        <h4>${aluno.nome}</h4>
                        <p>Matrícula: ${aluno.matricula}</p>
                    </div>
                </div>
                <div>
                    <span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #f59e0b;">
                        ${aluno.statusAvaliacao}
                    </span>
                    <i class="fa-solid fa-chevron-right" style="margin-left: 16px; color: var(--text-muted);"></i>
                </div>
            </div>
        `).join('');
    }

    viewAluno(id) {
        this.currentAlunoId = id;
        this.navigate('aluno');
    }

    backToTurma() {
        this.currentAlunoId = null;
        this.navigate('turma');
    }

    renderAlunoPerfil() {
        const aluno = this.alunos.find(a => a.id === this.currentAlunoId);
        if (aluno) {
            document.getElementById('aluno-nome-display').textContent = aluno.nome;
            document.getElementById('aluno-matricula-display').textContent = `Matrícula: ${aluno.matricula}`;
            document.getElementById('aluno-email-display').textContent = aluno.email;
            document.getElementById('aluno-telefone-display').textContent = aluno.telefone;
        }
    }

    // Utilidades
    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    showNotification(message) {
        const container = document.getElementById('notification-container');
        const notif = document.createElement('div');
        notif.className = 'notification';
        notif.innerHTML = `<i class="fa-solid fa-check-circle"></i> <span>${message}</span>`;
        
        container.appendChild(notif);
        
        setTimeout(() => {
            notif.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }
}

// Inicializar aplicação
const app = new ManagerApp();
