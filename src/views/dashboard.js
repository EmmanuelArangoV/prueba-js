import { Sidebar } from '../components/Sidebar.js';
import { Topbar } from '../components/Topbar.js';
import { PageHeader } from '../components/PageHeader.js';
import { StatsGrid } from '../components/StatsGrid.js';
import { TaskTable } from '../components/TaskTable.js';
import { dashboardStats, getStore } from "../state/store.js";
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

    // Header
    content.appendChild(PageHeader('Dashboard Overview', 'Track your academic performance and progress', true));

    // Stats
    const stats = dashboardStats;

    content.appendChild(StatsGrid(stats));

    // Get userId from store
    const store = getStore();
    const userId = store.user ? store.user.id : null;

    JsonServices.getTasksByUser(userId || 0).then(async (tasks) => {
        if(tasks.success) {

            if (tasks.tasks.length > 0) {
                // Task Table
                const tableElement = await TaskTable(tasks.tasks);
                content.appendChild(tableElement);
            } else {
                // No tasks message
                const noTasksMessage = document.createElement('div');
                noTasksMessage.classList.add('no-tasks-message');
                noTasksMessage.innerHTML = `
                <p>You have no tasks at the moment. Start by creating a new task to manage your workload effectively!</p>
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
