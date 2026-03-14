/* js/auth.js - Mock Authentication System */

const USERS_KEY = 'tripPilotUsers';
const CURRENT_USER_KEY = 'tripPilotUser';

// Initialize mock DB
if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
}

function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'Email already exists!' };
    }
    const newUser = { id: Date.now().toString(), name, email, password, preferences: {} };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true, message: 'Registration successful!' };
}

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        const sessionUser = { id: user.id, name: user.name, email: user.email };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
        return { success: true, message: 'Login successful' };
    }
    return { success: false, message: 'Invalid credentials!' };
}

function logoutUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = 'index.html';
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

function requireAuth() {
    if (!getCurrentUser()) {
        window.location.href = 'login.html';
    }
}

function initializeNavbar() {
    const toggle = document.getElementById('navbar-toggle');
    const nav = document.getElementById('navbar-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            if (nav.style.display === 'flex') {
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = 'var(--bg-card)';
                nav.style.padding = '1rem';
            }
        });
    }

    const currentUser = getCurrentUser();
    const authLinks = document.getElementById('nav-auth-links');
    const myTrips = document.getElementById('nav-my-trips');

    if (currentUser && authLinks) {
        authLinks.innerHTML = `
            <div style="display: flex; gap: 1rem; align-items: center;">
                <span class="font-weight-bold d-none d-md-block" style="color:var(--text-main);">Hi, ${currentUser.name.split(' ')[0]}</span>
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=0D8ABC&color=fff" alt="Avatar" style="width: 35px; height: 35px; border-radius: 50%;">
                <a href="dashboard.html" class="btn btn-primary btn-sm">Dashboard</a>
            </div>
        `;
        if (myTrips) myTrips.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', initializeNavbar);

