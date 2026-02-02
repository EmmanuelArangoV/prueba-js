import { Sidebar } from '../components/Sidebar.js';
import { Topbar } from '../components/Topbar.js';
import { PageHeader } from '../components/PageHeader.js';
import { MyTaskTable } from '../components/MyTaskTable.js';
import { StatsGrid } from '../components/StatsGrid.js';
import { getStore } from "../state/store.js";
import JsonServices from "../services/jsonServices.js";

export function MyTasks() {
    const body = document.createElement('div');
    body.classList.add('dashboard-layout');

    body.appendChild(Sidebar());

    const mainContent = document.createElement('div');
    mainContent.classList.add('main-content', 'dark-bg');

    mainContent.appendChild(Topbar());

    const content = document.createElement('main');
    content.classList.add('content');

    content.appendChild(PageHeader('My Tasks', 'Manage and track all your tasks', true));

    const store = getStore();
    const user = store.user;
    const isAdmin = user && user.role === 'admin';
    const userId = user ? user.id : null;

    // Cargar Estadísticas
    JsonServices.getTaskStats(isAdmin ? null : userId).then(statsResponse => {
        if (statsResponse.success) {
            const s = statsResponse.stats;
            const stats = [
                {
                    label: 'Total Tasks',
                    value: s.total.toString(),
                    iconColor: 'blue',
                    iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>'
                },
                {
                    label: 'In Progress',
                    value: s.inProgress.toString(),
                    iconColor: 'blue',
                    iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>'
                },
                {
                    label: 'Completed',
                    value: s.completed.toString(),
                    iconColor: 'blue',
                    iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
                },
                {
                    label: 'Pending Review',
                    value: s.pending.toString(),
                    iconColor: 'blue',
                    iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
                }
            ];

            // Insertar StatsGrid antes de la tabla (si existe) o al final
            const statsGridElement = StatsGrid(stats);
            const tableContainer = content.querySelector('.table-container') || content.querySelector('.no-tasks-message');
            if (tableContainer) {
                content.insertBefore(statsGridElement, tableContainer);
            } else {
                content.appendChild(statsGridElement);
            }
        }
    });

    const tasksPromise = isAdmin ? JsonServices.getAllTasks() : JsonServices.getTasksByUser(userId || 0);

    tasksPromise.then((tasks) => {
        if(tasks.success) {
            if (tasks.tasks.length > 0) {
                const tableElement = MyTaskTable(tasks.tasks);
                content.appendChild(tableElement);
            } else {
                const noTasksMessage = document.createElement('div');
                noTasksMessage.classList.add('no-tasks-message');
                noTasksMessage.innerHTML = `
                    <p>You have no tasks at the moment. Start by creating a new task!</p>
                    <a href="#create-task" class="btn btn-primary">Create New Task</a>
                `;
                content.appendChild(noTasksMessage);
            }
        } else {
            console.error('Error fetching tasks:', tasks.error);
        }
    });

    mainContent.appendChild(content);
    body.appendChild(mainContent);

    return body;
}
