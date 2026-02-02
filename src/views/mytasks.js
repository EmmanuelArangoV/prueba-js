import { Sidebar } from '../components/Sidebar.js';
import { Topbar } from '../components/Topbar.js';
import { PageHeader } from '../components/PageHeader.js';
import { MyTaskTable } from '../components/MyTaskTable.js';
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
    const userId = store.user ? store.user.id : null;

    JsonServices.getTasksByUser(userId || 0).then((tasks) => {
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
