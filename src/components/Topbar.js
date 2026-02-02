import {logout} from "../state/store.js";

export function Topbar() {
    const header = document.createElement('header');
    header.classList.add('topbar');

    header.innerHTML = `
        <div class="breadcrumb">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>›</span>
            <span class="breadcrumb-current">${window.location.hash.slice(1)}</span>
        </div>

        <div class="topbar-right">
            <div class="user-menu">
                <svg id="avatar" class="user-avatar" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </div>

            <span class="logout-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
            </span>
        </div>
    `;

    functionalities(header);

    return header;
}

function functionalities(header) {
    const houseBttn = header.querySelector('.breadcrumb');

    houseBttn.addEventListener('click', () => {
        window.location.hash = '#dashboard';
    });

    const logoutIcon = header.querySelector('.logout-icon');

    logoutIcon.addEventListener('click', () => {
        logout();
        window.location.hash = '#login';
    });

    const avatar = header.querySelector('#avatar');
    avatar.addEventListener('click', () => {
        window.location.hash = '#profile';
    })
}
