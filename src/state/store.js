const STORAGE_KEY = 'crudzaso_session';

const state = {
    user: null,
}

export function initStore() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const data = JSON.parse(raw);
            state.user = data?.user || null;
        }
    } catch {
        localStorage.removeItem(STORAGE_KEY);
    }
}

export function getStore() {
    return state;
}

export function setUser(user) {
    state.user = user;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }));
}

export function logout() {
    state.user = null;
    state.books = [];
    state.loans = [];
    localStorage.removeItem(STORAGE_KEY);
}

export function isAuth() {
    return !!state.user;
}

export function getRole() {
    return state.user?.role || null;
}

export function isAdmin() {
    return getRole() === 'admin';
}

export function isUser() {
    return getRole() === 'user';
}



