import JsonServices from "../services/jsonServices.js";
import { getStore, setEditingTask } from "../state/store.js";

export async function TaskTable(tasks) {
    const container = document.createElement('div');
    container.classList.add('table-container');

    const store = getStore();
    const currentUser = store.user;

    const header = document.createElement('div');
    header.classList.add('table-header');
    header.innerHTML = `
        <input type="text" class="search-bar" id="task-search" placeholder="Search tasks...">
        <div class="table-tabs">
            <button class="tab active" data-filter="all">All</button>
            <button class="tab" data-filter="pending">Pending</button>
            <button class="tab" data-filter="completed">Completed</button>
        </div>
    `;

    const tasksWithUserNames = await Promise.all(
        tasks.map(async (task) => {
            const userResponse = await JsonServices.getUserName(task.userId);
            return {
                ...task,
                userName: userResponse.success ? userResponse.name : 'Unknown User'
            };
        })
    );

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Task Name</th>
                <th>Category</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${renderTableRows(tasksWithUserNames, currentUser)}
        </tbody>
    `;

    const tabs = header.querySelectorAll('.tab');
    const searchInput = header.querySelector('#task-search');
    const tbody = table.querySelector('tbody');

    setupFilterTabs(tabs, tasksWithUserNames, tbody, searchInput, currentUser);
    setupSearchInput(searchInput, tasksWithUserNames, tbody, tabs, currentUser);

    container.appendChild(header);
    container.appendChild(table);

    container.addEventListener('click', async (e) => {
        const editBtn = e.target.closest('.edit');
        const deleteBtn = e.target.closest('.delete');

        if (editBtn) {
            const taskId = editBtn.dataset.id;
            const task = tasksWithUserNames.find(t => t.id == taskId);
            if (task) {
                // Remove userName and other temporary UI fields if they exist
                const { userName, ...taskData } = task;
                setEditingTask(taskData);
                window.location.hash = '#create-task';
            }
        }

        if (deleteBtn) {
            const taskId = deleteBtn.dataset.id;
            if (confirm('Are you sure you want to delete this task?')) {
                const response = await JsonServices.deleteTask(taskId);
                if (response.success) {
                    // Refresh view
                    window.location.reload();
                } else {
                    alert('Error deleting task: ' + response.error);
                }
            }
        }
    });

    return container;
}

function setupFilterTabs(tabs, tasks, tbody, searchInput, currentUser) {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;
            const searchTerm = searchInput.value;
            applyFilters(tasks, filter, searchTerm, tbody, currentUser);
        });
    });
}

function setupSearchInput(searchInput, tasks, tbody, tabs, currentUser) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value;
        const activeTab = Array.from(tabs).find(tab => tab.classList.contains('active'));
        const filter = activeTab ? activeTab.dataset.filter : 'all';
        applyFilters(tasks, filter, searchTerm, tbody, currentUser);
    });
}

function applyFilters(tasks, filter, searchTerm, tbody, currentUser) {
    let filteredTasks = filterByStatus(tasks, filter);
    filteredTasks = filterBySearch(filteredTasks, searchTerm);
    tbody.innerHTML = renderTableRows(filteredTasks, currentUser);
}

function filterByStatus(tasks, filter) {
    if (filter === 'pending') {
        return tasks.filter(t => t.status === 'pending');
    } else if (filter === 'completed') {
        return tasks.filter(t => t.status === 'completed');
    }
    return tasks;
}

function filterBySearch(tasks, searchTerm) {
    if (!searchTerm) return tasks;

    const term = searchTerm.toLowerCase();
    return tasks.filter(task =>
        task.title.toLowerCase().includes(term) ||
        task.category.toLowerCase().includes(term) ||
        task.userName.toLowerCase().includes(term)
    );
}

function renderTableRows(tasks, currentUser) {
    if (tasks.length === 0) {
        return `<tr><td colspan="7" style="text-align: center; padding: 32px; color: #6b7280;">No tasks found</td></tr>`;
    }

    return tasks.map(task => {
        const isOwnTask = currentUser && task.userId === currentUser.id;
        const isAdmin = currentUser && currentUser.role === 'admin';
        const showActions = isAdmin || isOwnTask;

        return `
        <tr>
            <td class="task-name">${task.title}</td>
            <td>
                <span class="category-badge">${task.category}</span>
            </td>
            <td>
                <div class="assignee">
                    <div class="assignee-avatar"></div>
                    <span class="assignee-name">${task.userName}</span>
                </div>
            </td>
            <td>
                <div class="priority">
                    <span class="priority-dot ${task.priority.toLowerCase()}"></span>
                    ${task.priority}
                </div>
            </td>
            <td>
                <span class="status-badge ${task.status.replace(' ', '-').toLowerCase()}">
                    ${task.status}
                </span>
            </td>
            <td class="due-date ${isOverdue(task.dueDate) ? 'overdue' : ''}">
                ${task.dueDate || 'N/A'}
            </td>
            <td>
                <div class="actions">
                    ${showActions ? `
                        <button class="action-btn edit" title="Edit" data-id="${task.id}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="action-btn delete" title="Delete" data-id="${task.id}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    ` : '-'}
                </div>
            </td>
        </tr>`;
    }).join('');
}

function isOverdue(dateString) {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
}
