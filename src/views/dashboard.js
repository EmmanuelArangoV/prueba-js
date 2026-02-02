import { Sidebar } from '../components/Sidebar.js';
import { Topbar } from '../components/Topbar.js';
import { PageHeader } from '../components/PageHeader.js';
import { StatsGrid } from '../components/StatsGrid.js';
import { TaskTable } from '../components/TaskTable.js';
import { getStore } from "../state/store.js";
import JsonServices from "../services/jsonServices.js";

export function DashboardView() {
    const body = document.createElement('div');
    body.classList.add('dashboard-layout');

    body.appendChild(Sidebar());

    const mainContent = document.createElement('div');
    mainContent.classList.add('main-content', 'light-bg');

    mainContent.appendChild(Topbar());

    const content = document.createElement('main');
    content.classList.add('content');

    content.appendChild(PageHeader('Dashboard Overview', 'Track your academic performance and progress', true));

    const store = getStore();
    const user = store.user;
    const isAdmin = user && user.role === 'admin';
    const userId = user ? user.id : null;

    JsonServices.getTaskStats(isAdmin ? null : userId).then(statsResponse => {
        if (statsResponse.success) {
            const s = statsResponse.stats;
            const stats = [
                {
                    label: 'Total Tasks',
                    value: s.total.toString(),
                    iconColor: 'blue',
                    iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
                    footer: { type: 'info', content: `${s.inProgress} In Progress` }
                },
                {
                    label: 'Completed',
                    value: s.completed.toString(),
                    iconColor: 'green',
                    iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
                    footer: { type: 'info', content: '✓ On track' }
                },
                {
                    label: 'Pending',
                    value: s.pending.toString(),
                    iconColor: 'orange',
                    iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
                    footer: s.highPriority > 0 ? { type: 'warning', content: `⚠ ${s.highPriority} High Priority` } : null
                },
                {
                    label: 'Overall Progress',
                    value: `${s.progress}%`,
                    iconColor: 'purple',
                    iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>',
                    footer: { type: s.progress >= 50 ? 'positive' : 'warning', content: s.progress >= 50 ? '📈 Keep it up' : '📊 Keep working' }
                }
            ];

            content.appendChild(StatsGrid(stats));
        }
    });

    // Cargar tareas
    const tasksPromise = isAdmin ? JsonServices.getAllTasks() : JsonServices.getTasksByUser(userId || 0);

    tasksPromise.then(async (tasks) => {
        if(tasks.success) {
            if (tasks.tasks.length > 0) {
                const tableElement = await TaskTable(tasks.tasks);
                content.appendChild(tableElement);
            } else {
                const noTasksMessage = document.createElement('div');
                noTasksMessage.innerHTML = `<p>No tasks found.</p>`;
                content.appendChild(noTasksMessage);
            }
        }
    });

    mainContent.appendChild(content);
    body.appendChild(mainContent);

    return body;
}
