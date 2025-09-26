// wwwroot/js/auth.js
class AuthService {
    constructor() {
        this.currentUser = null;
        this.checkAuth();
    }

    // Проверка авторизации при загрузке страницы
    async checkAuth() {
        try {
            const response = await fetch('/api/auth/current');
            if (response.ok) {
                const userData = await response.json();
                this.currentUser = userData;
                this.updateUI();
            }
        } catch (error) {
            console.log('Пользователь не авторизован');
        }
    }

    // Вход
    async login(username, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();
            
            if (response.ok) {
                this.currentUser = result.user;
                this.updateUI();
                return { success: true, message: result.message };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            return { success: false, message: 'Ошибка сети' };
        }
    }

    // Регистрация
    async register(username, password) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();
            return { success: response.ok, message: result.message };
        } catch (error) {
            return { success: false, message: 'Ошибка сети' };
        }
    }

    // Выход
    async logout() {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            this.currentUser = null;
            this.updateUI();
        } catch (error) {
            console.error('Ошибка выхода:', error);
        }
    }

    // Обновление интерфейса
    updateUI() {
        const loginForm = document.getElementById('loginForm');
        const userInfo = document.getElementById('userInfo');
        const adminPanel = document.getElementById('adminPanel');

        if (this.currentUser) {
            // Пользователь авторизован
            if (loginForm) loginForm.style.display = 'none';
            if (userInfo) {
                userInfo.style.display = 'block';
                userInfo.innerHTML = `
                    <p>Добро пожаловать, <strong>${this.currentUser.username}</strong>! 
                    Роль: ${this.currentUser.role}</p>
                    <button onclick="auth.logout()">Выйти</button>
                `;
            }

            // Показываем админ-панель для администраторов
            if (adminPanel) {
                adminPanel.style.display = this.currentUser.role === 'admin' ? 'block' : 'none';
            }
        } else {
            // Пользователь не авторизован
            if (loginForm) loginForm.style.display = 'block';
            if (userInfo) userInfo.style.display = 'none';
            if (adminPanel) adminPanel.style.display = 'none';
        }
    }

    // Проверка прав доступа
    hasRole(requiredRole) {
        return this.currentUser && this.currentUser.role === requiredRole;
    }

    // Проверка авторизации
    isAuthenticated() {
        return this.currentUser !== null;
    }
}

// Глобальный экземпляр
const auth = new AuthService();