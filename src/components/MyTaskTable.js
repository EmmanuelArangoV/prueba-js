export function MyTaskTable(tasks) {
    const container = document.createElement('div');
    container.classList.add('table-container');

    const header = document.createElement('div');
    header.classList.add('table-header');
    header.innerHTML = `
        <input type="text" class="search-bar search-bar-wide" placeholder="Search tasks...">
    `;

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th><input type="checkbox" id="select-all"></th>
                <th>Task Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            ${tasks.map(task => `
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
                </tr>
            `).join('')}
        </tbody>
    `;

    // Funcionalidad "Select All"
    const selectAllCheckbox = table.querySelector('#select-all');
    const taskCheckboxes = table.querySelectorAll('.task-checkbox');

    selectAllCheckbox?.addEventListener('change', (e) => {
        taskCheckboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
    });

    container.appendChild(header);
    container.appendChild(table);

    return container;
}
