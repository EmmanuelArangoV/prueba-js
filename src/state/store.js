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

export const dashboardStats = [
    {
        label: 'Total Tasks',
        value: '24',
        iconColor: 'blue',
        iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
        footer: { type: 'positive', content: '↑ +12% from last week' }
    },
    {
        label: 'Completed',
        value: '18',
        iconColor: 'green',
        iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        footer: { type: 'info', content: '✓ On track' }
    },
    {
        label: 'Pending',
        value: '6',
        iconColor: 'orange',
        iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
        footer: { type: 'warning', content: '⚠ 2 High Priority' }
    },
    {
        label: 'Overall Progress',
        value: '75%',
        iconColor: 'purple',
        iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>',
        footer: { type: 'positive', content: '📈 Keep it up' }
    }
];

export const myTasksStats = [
    {
        label: 'Total Tasks',
        value: '128',
        iconColor: 'blue',
        iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path></svg>'
    },
    {
        label: 'In Progress',
        value: '12',
        iconColor: 'purple',
        iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>'
    },
    {
        label: 'Completed',
        value: '84',
        iconColor: 'green',
        iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
    },
    {
        label: 'Pending Review',
        value: '32',
        iconColor: 'orange',
        iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>'
    }
];


