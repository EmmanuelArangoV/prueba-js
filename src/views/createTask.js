import { getStore, clearEditingTask } from "../state/store.js";
import JsonServices from "../services/jsonServices.js";
import { Topbar } from "../components/Topbar.js";

export function CreateTaskView() {
    const store = getStore();
    const editingTask = store.editingTask;
    const isEditing = !!editingTask;

    const main = document.createElement('main');
    main.classList.add('create-task-page');

    // Header
    const header = Topbar();

    // Content
    const content = document.createElement('div');
    content.classList.add('create-task-content');
    content.innerHTML = `
        <div class="breadcrumb-standalone">
            <a href="#dashboard" class="breadcrumb-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                Dashboard
            </a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">${isEditing ? 'Edit Task' : 'Create New'}</span>
        </div>

        <h1 class="create-task-title">${isEditing ? 'Edit Task' : 'Create New Task'}</h1>
    `;

    // Form
    const form = document.createElement('form');
    form.classList.add('task-form');
    form.innerHTML = `
        <div class="form-card">
            <div class="form-group-full">
                <label class="form-label-required" for="task-title">
                    Task Title <span class="required-star">*</span>
                </label>
                <input type="text" id="task-title" class="form-input" placeholder="Enter task title" value="${isEditing ? editingTask.title : ''}">
            </div>

            <div class="form-row">
                <div class="form-group-half">
                    <label class="form-label-required" for="category">
                        Category <span class="required-star">*</span>
                    </label>
                    <select id="category" class="form-select">
                        <option value="">Select category</option>
                        <option value="development" ${isEditing && editingTask.category === 'development' ? 'selected' : ''}>Development</option>
                        <option value="design" ${isEditing && editingTask.category === 'design' ? 'selected' : ''}>Design</option>
                        <option value="marketing" ${isEditing && editingTask.category === 'marketing' ? 'selected' : ''}>Marketing</option>
                        <option value="testing" ${isEditing && editingTask.category === 'testing' ? 'selected' : ''}>Testing</option>
                    </select>
                </div>

                <div class="form-group-half">
                    <label class="form-label-required" for="priority">
                        Priority <span class="required-star">*</span>
                    </label>
                    <select id="priority" class="form-select">
                        <option value="">Select priority</option>
                        <option value="high" ${isEditing && editingTask.priority.toLowerCase() === 'high' ? 'selected' : ''}>High</option>
                        <option value="medium" ${isEditing && editingTask.priority.toLowerCase() === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="low" ${isEditing && editingTask.priority.toLowerCase() === 'low' ? 'selected' : ''}>Low</option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group-half">
                    <label class="form-label" for="status">Status</label>
                    <select id="status" class="form-select">
                        <option value="pending" ${isEditing && editingTask.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="in-progress" ${isEditing && editingTask.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                        <option value="completed" ${isEditing && editingTask.status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </div>

                <div class="form-group-half">
                    <label class="form-label" for="due-date">Due Date</label>
                    <input type="date" id="due-date" class="form-input" value="${isEditing ? editingTask.dueDate : ''}">
                </div>
            </div>

            <div class="form-group-full">
                <label class="form-label" for="description">Description</label>
                <textarea id="description" class="form-textarea" placeholder="Add task description...">${isEditing ? (editingTask.description || '') : ''}</textarea>
            </div>

            <p id="create-error" class="form-error" style="display:none;color:red;"></p>

            <div class="form-actions">
                <button type="button" class="btn-cancel">Cancel</button>
                <button type="submit" class="btn-save">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    ${isEditing ? 'Update Task' : 'Save Task'}
                </button>
            </div>
        </div>
    `;

    // Append child
    content.appendChild(form);
    main.appendChild(header);
    main.appendChild(content);

    taskRequest(main, isEditing, editingTask?.id);

    return main;
}

function taskRequest(main, isEditing, taskId) {
    const form = main.querySelector('.task-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect form data
        const title = form.querySelector('#task-title').value;
        const category = form.querySelector('#category').value;
        const priority = form.querySelector('#priority').value;
        const status = form.querySelector('#status').value;
        const dueDate = form.querySelector('#due-date').value;
        const description = form.querySelector('#description').value;

        // Get userId from store
        const store = getStore();
        const userId = store.user ? store.user.id : null;

        // Create object to send
        const taskData = {
            title,
            category,
            priority: priority.charAt(0).toUpperCase() + priority.slice(1), // Capitalize priority
            status,
            dueDate,
            description,
            userId
        }

        let taskResponse;
        if (isEditing) {
            taskResponse = await JsonServices.updateTask(taskId, taskData);
        } else {
            taskResponse = await JsonServices.createTask(taskData);
        }

        if (taskResponse.error) {
            const errorElem = form.querySelector('#create-error');
            errorElem.style.display = 'block';
            errorElem.textContent = taskResponse.error;
        } else {
            // Clear editing state and redirect
            clearEditingTask();
            window.location.hash = '#dashboard';
        }
    })

    // Cancel button functionality
    const cancelBtn = form.querySelector('.btn-cancel');
    cancelBtn.addEventListener('click', () => {
        clearEditingTask();
        window.location.hash = '#dashboard';
    });
}
