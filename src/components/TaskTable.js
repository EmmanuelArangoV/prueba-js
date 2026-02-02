import JsonServices from "../services/jsonServices.js";

export async function TaskTable(tasks) {
    const container = document.createElement('div');
    container.classList.add('table-container');

    const header = document.createElement('div');
    header.classList.add('table-header');
    header.innerHTML = `
        <input type="text" class="search-bar" placeholder="Search tasks...">
    `;

    // Obtener nombres de usuarios para todas las tareas
    const tasksWithUserNames = await Promise.all(
        tasks.map(async (task) => {
            const userResponse = await JsonServices.getUserName(task.userId);
            return {
                ...task,
                assignedTo: userResponse.success ? userResponse.name : 'Unknown'
            };
        })
    );

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Task Name</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${tasksWithUserNames.map(task => `
                <tr>
                    <td class="task-name">${task.title}</td>
                    <td>
                        <div class="assignee">
                            <span class="assignee-name">${task.assignedTo}</span>
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
                    <td class="due-date">${formatDate(task.dueDate)}</td>
                    <td class="actions">
                        <button class="action-btn edit" data-id="${task.id}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button><button class="action-btn delete" data-id="${task.id}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;

    container.appendChild(header);
    container.appendChild(table);

    setupActionListeners(container);

    return container;
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function setupActionListeners(container) {
    container.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskId = e.currentTarget.dataset.id;
            window.location.hash = `#edit-task/${taskId}`;
        });
    });

    container.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const taskId = e.currentTarget.dataset.id;
            if (confirm('¿Estás seguro de eliminar esta tarea?')) {
                console.log('Delete task:', taskId);
                // await JsonServices.deleteTask(taskId);
            }
        });
    });
}
