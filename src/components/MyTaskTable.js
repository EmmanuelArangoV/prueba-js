import JsonServices from "../services/jsonServices.js";
import { setEditingTask } from "../state/store.js";

export function MyTaskTable(tasks) {
    const container = document.createElement('div');
    container.classList.add('table-container');

    const header = document.createElement('div');
    header.classList.add('table-header');
    header.innerHTML = `
        <input type="text" class="search-bar search-bar-wide" id="my-task-search" placeholder="Search tasks...">
    `;

    const table = document.createElement('table');
    const renderRows = (filteredTasks) => `
        <thead>
            <tr>
                <th><input type="checkbox" id="select-all"></th>
                <th>Task Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${filteredTasks.map(task => `
                <tr>
                    <td><input type="checkbox" class="task-checkbox" data-id="${task.id}"></td>
                    <td class="task-title">${task.title}</td>
                    <td>
                        <span class="category-badge">${task.category}</span>
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
                    <td>
                        <div class="actions">
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
                        </div>
                    </td>
                </tr>
            `).join('')}
            ${filteredTasks.length === 0 ? '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #6b7280;">No tasks found</td></tr>' : ''}
        </tbody>
    `;

    table.innerHTML = renderRows(tasks);

    const setupEventListeners = (tableElement, currentTasks) => {
        // Funcionalidad "Select All"
        const selectAllCheckbox = tableElement.querySelector('#select-all');
        const taskCheckboxes = tableElement.querySelectorAll('.task-checkbox');

        selectAllCheckbox?.addEventListener('change', (e) => {
            taskCheckboxes.forEach(checkbox => {
                checkbox.checked = e.target.checked;
            });
        });

        // Manejo de acciones Editar y Eliminar
        tableElement.addEventListener('click', async (e) => {
            const editBtn = e.target.closest('.edit');
            const deleteBtn = e.target.closest('.delete');

            if (editBtn) {
                const taskId = editBtn.dataset.id;
                const task = currentTasks.find(t => t.id == taskId);
                if (task) {
                    setEditingTask(task);
                    window.location.hash = '#create-task';
                }
            }

            if (deleteBtn) {
                const taskId = deleteBtn.dataset.id;
                if (confirm('Are you sure you want to delete this task?')) {
                    const response = await JsonServices.deleteTask(taskId);
                    if (response.success) {
                        window.location.reload();
                    } else {
                        alert('Error deleting task: ' + response.error);
                    }
                }
            }
        });
    };

    setupEventListeners(table, tasks);

    const searchInput = header.querySelector('#my-task-search');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredTasks = tasks.filter(task => 
            task.title.toLowerCase().includes(searchTerm) || 
            task.category.toLowerCase().includes(searchTerm)
        );
        table.innerHTML = renderRows(filteredTasks);
        setupEventListeners(table, filteredTasks);
    });

    container.appendChild(header);
    container.appendChild(table);

    return container;
}
