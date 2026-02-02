import { Sidebar } from '../components/Sidebar.js';
import { Topbar } from '../components/Topbar.js';

export function MyTasks() {
    const body = document.createElement('div');
    body.classList.add('dashboard-layout');

    // Agregar Sidebar
    body.appendChild(Sidebar());

    // Contenido principal
    const mainContent = document.createElement('div');
    mainContent.classList.add('main-content', 'dark-bg');

    // Agregar Topbar
    mainContent.appendChild(Topbar());

    // Contenido de la página
    const content = document.createElement('main');
    content.classList.add('content');
    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1 class="page-title">Task Management</h1>
                <p class="page-subtitle">Organize and track all your academic tasks</p>
            </div>
            <button class="btn-new-task">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>New Task</span>
            </button>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Total Tasks</span>
                    <div class="stat-icon blue">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">24</div>
                <div class="stat-footer positive">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="19" x2="12" y2="5"></line>
                        <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                    <span>+12% from last week</span>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Completed</span>
                    <div class="stat-icon green">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">18</div>
                <div class="stat-footer info">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>On track</span>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Pending</span>
                    <div class="stat-icon orange">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">6</div>
                <div class="stat-footer warning">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <span>2 High Priority</span>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Overall Progress</span>
                    <div class="stat-icon purple">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="stat-value">75%</div>
                <div class="stat-footer positive">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                    <span>Keep it up</span>
                </div>
            </div>
        </div>

        <div class="table-container">
            <div class="table-header">
                <input type="text" class="search-bar search-bar-wide" placeholder="Search by title, ID, or tag...">
            </div>

            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox"></th>
                        <th>TASK NAME</th>
                        <th>CATEGORY</th>
                        <th>PRIORITY</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>
                            <div class="task-title">Advanced Calculus Finals Prep</div>
                            <div class="task-meta">ID: #MATH-402 • Due in 2 days</div>
                        </td>
                        <td>
                            <span class="category-badge">Mathematics</span>
                        </td>
                        <td>
                            <div class="priority">
                                <span class="priority-dot high"></span>
                                <span>High</span>
                            </div>
                        </td>
                        <td>
                            <span class="status-badge pending">Pending</span>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>
                            <div class="task-title">Physics Lab Report: Quantum Mechanics</div>
                            <div class="task-meta">ID: #PHYS-301 • Due tomorrow</div>
                        </td>
                        <td>
                            <span class="category-badge">Physics</span>
                        </td>
                        <td>
                            <div class="priority">
                                <span class="priority-dot medium"></span>
                                <span>Medium</span>
                            </div>
                        </td>
                        <td>
                            <span class="status-badge in-progress">In Progress</span>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>
                            <div class="task-title">History Essay: Industrial Revolution</div>
                            <div class="task-meta">ID: #HIST-101 • Submitted</div>
                        </td>
                        <td>
                            <span class="category-badge">History</span>
                        </td>
                        <td>
                            <div class="priority">
                                <span class="priority-dot low"></span>
                                <span>Low</span>
                            </div>
                        </td>
                        <td>
                            <span class="status-badge completed">Completed</span>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>
                            <div class="task-title">Database Systems Project: Phase 1</div>
                            <div class="task-meta">ID: #CS-204 • Group Assignment</div>
                        </td>
                        <td>
                            <span class="category-badge">Computer Science</span>
                        </td>
                        <td>
                            <div class="priority">
                                <span class="priority-dot high"></span>
                                <span>High</span>
                            </div>
                        </td>
                        <td>
                            <span class="status-badge in-progress">In Progress</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="table-footer">
                <span>Showing 4 of 24 tasks</span>
                <div style="display: flex; gap: 16px;">
                    <span class="pagination">←</span>
                    <span class="pagination">→</span>
                </div>
            </div>
        </div>
    `;

    mainContent.appendChild(content);
    body.appendChild(mainContent);

    return body;
}
