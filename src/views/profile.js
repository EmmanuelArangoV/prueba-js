import { Sidebar } from '../components/Sidebar.js';
import { Topbar } from '../components/Topbar.js';
import JsonServices from "../services/jsonServices.js";
import { getStore } from "../state/store.js";

export function ProfileView() {
    const body = document.createElement('div');
    body.classList.add('dashboard-layout');

    body.appendChild(Sidebar());

    const mainContent = document.createElement('div');
    mainContent.classList.add('main-content', 'light-bg');

    mainContent.appendChild(Topbar());

    const content = document.createElement('main');
    content.classList.add('content');

    const profileContainer = document.createElement('div');
    profileContainer.classList.add('profile-container');

    // Estado inicial con esqueleto o datos por defecto
    profileContainer.innerHTML = `
        <h1 class="profile-main-title">My Profile</h1>
        <div class="profile-grid">
            <div class="profile-card profile-overview-card">
                <div class="profile-header-bg"></div>
                <div class="profile-overview-content">
                    <div class="profile-avatar-wrapper">
                        <img src="https://w7.pngwing.com/pngs/823/900/png-transparent-user-avatar-profile-man-people-account-3d-icon.png" alt="" class="profile-avatar-img">
                    </div>
                    <h2 class="profile-name" id="prof-name">Loading...</h2>
                    <span class="profile-badge" id="prof-role">...</span>
                    
                    <div class="profile-email-box">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span id="prof-email">...</span>
                    </div>
                    
                    <div class="profile-stats">
                        <div class="profile-stat-item">
                            <span class="profile-stat-value" id="prof-tasks-count">0</span>
                            <span class="profile-stat-label">Tasks</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="profile-card personal-info-card">
                <div class="personal-info-header">
                    <h2 class="personal-info-title">Personal Information</h2>
                    <button class="btn-edit-profile">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Edit Profile
                    </button>
                </div>
                
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Full Name</span>
                        <span class="info-value" id="info-fullname">...</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Employee ID</span>
                        <span class="info-value">CZ-882103</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Phone</span>
                        <span class="info-value">+1 (555) 123-4567</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Department</span>
                        <span class="info-badge-dept">Computer Science</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Role Level</span>
                        <span class="info-value" id="info-role">...</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Join Date</span>
                        <span class="info-value" id="info-join-date">September 14, 2020</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    const store = getStore();
    const userId = store.user ? store.user.id : null;

    if (userId) {
        // Cargar datos del usuario
        JsonServices.getUserById(userId).then(response => {
            if (response.success) {
                const user = response.user;
                profileContainer.querySelector('#prof-name').textContent = user.fullname;
                profileContainer.querySelector('#prof-role').textContent = user.role;
                profileContainer.querySelector('#prof-email').textContent = user.email;
                profileContainer.querySelector('#info-fullname').textContent = user.fullname;
                profileContainer.querySelector('#info-role').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
                
                if (user.createdAt) {
                    profileContainer.querySelector('#info-join-date').textContent = user.createdAt;
                }
            }
        });

        // Cargar estadísticas
        JsonServices.getTaskStats(userId).then(response => {
            if (response.success) {
                profileContainer.querySelector('#prof-tasks-count').textContent = response.stats.total;
            }
        });
    }

    content.appendChild(profileContainer);
    mainContent.appendChild(content);
    body.appendChild(mainContent);

    return body;
}

function renderProfile() {
}
