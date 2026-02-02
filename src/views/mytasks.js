import { Sidebar } from '../components/Sidebar.js';
import { Topbar } from '../components/Topbar.js';
import { PageHeader } from '../components/PageHeader.js';
import { StatsGrid } from '../components/StatsGrid.js';
import { TaskTable } from '../components/TaskTable.js';
import { myTasksStats } from "../state/store.js";

export function MyTasks() {
    const body = document.createElement('div');
    body.classList.add('dashboard-layout');

    body.appendChild(Sidebar());

    const mainContent = document.createElement('div');
    mainContent.classList.add('main-content', 'dark-bg');

    mainContent.appendChild(Topbar());

    const content = document.createElement('main');
    content.classList.add('content');

    content.appendChild(PageHeader('Task Management', 'Organize and track all your academic tasks', true));

    const stats = myTasksStats;

    content.appendChild(StatsGrid(stats));

    const tasks = [
        {
            title: 'Advanced Calculus Finals Prep',
            meta: 'ID: #MATH-402 • Due in 2 days',
            category: 'Mathematics',
            priority: 'High',
            status: 'Pending'
        },
        {
            title: 'Database Systems Project: Phase 1',
            meta: 'ID: #CS-204 • Group Assignment',
            category: 'Computer Science',
            priority: 'High',
            status: 'In Progress'
        }
    ];
    content.appendChild(TaskTable(tasks));

    mainContent.appendChild(content);
    body.appendChild(mainContent);

    return body;
}
