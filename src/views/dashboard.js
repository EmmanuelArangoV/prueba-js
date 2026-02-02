import { Sidebar } from '../components/Sidebar.js';
import { Topbar } from '../components/Topbar.js';
import { PageHeader } from '../components/PageHeader.js';
import { StatsGrid } from '../components/StatsGrid.js';
import { TaskTable } from '../components/TaskTable.js';
import { dashboardStats } from "../state/store.js";

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
    content.appendChild(PageHeader('Dashboard Overview', 'Track your academic performance and progress', false));

    // Stats
    const stats = dashboardStats;

    content.appendChild(StatsGrid(stats));

    // Table
    const tasks = [
        {
            title: 'Advanced Calculus Finals Prep',
            meta: 'ID: #MATH-402 • Due in 2 days',
            category: 'Mathematics',
            priority: 'High',
            status: 'Pending'
        },
        {
            title: 'Physics Lab Report: Quantum Mechanics',
            meta: 'ID: #PHYS-301 • Due tomorrow',
            category: 'Physics',
            priority: 'Medium',
            status: 'In Progress'
        }
    ];
    content.appendChild(TaskTable(tasks));

    mainContent.appendChild(content);
    body.appendChild(mainContent);

    return body;
}
