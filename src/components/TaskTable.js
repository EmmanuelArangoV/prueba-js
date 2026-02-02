export function TaskTable(tasks) {
    const container = document.createElement('div');
    container.classList.add('table-container');

    container.innerHTML = `
        <div class="table-header">
            <input type="text" class="search-bar search-bar-wide" placeholder="Search by title, ID, or tag...">
        </div>

        <table>
            <thead>
                <tr>
                    <th><input type="checkbox"></th>
                    <th>TASK NAME</th>
                    <th>CATEGORY</th>
                    <th>PRIORITY</th>
                    <th>STATUS</th>
                </tr>
            </thead>
            <tbody>
                ${tasks.map(task => `
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>
                            <div class="task-title">${task.title}</div>
                            <div class="task-meta">${task.meta}</div>
                        </td>
                        <td>
                            <span class="category-badge">${task.category}</span>
                        </td>
                        <td>
                            <div class="priority">
                                <span class="priority-dot ${task.priority.toLowerCase()}"></span>
                                <span>${task.priority}</span>
                            </div>
                        </td>
                        <td>
                            <span class="status-badge ${task.status.toLowerCase().replace(' ', '-')}">${task.status}</span>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>

        <div class="table-footer">
            <span>Showing ${tasks.length} of ${tasks.length} tasks</span>
            <div style="display: flex; gap: 16px;">
                <span class="pagination">←</span>
                <span class="pagination">→</span>
            </div>
        </div>
    `;

    return container;
}
