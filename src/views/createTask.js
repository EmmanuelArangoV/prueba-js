import { getStore } from "../state/store.js";
import JsonServices from "../services/jsonServices.js";
import { Topbar } from "../components/Topbar.js";

export function CreateTaskView() {
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
            <span class="breadcrumb-current">Create New</span>
        </div>

        <h1 class="create-task-title">Create New Task</h1>
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
                <input type="text" id="task-title" class="form-input" placeholder="Enter task title">
            </div>

            <div class="form-row">
                <div class="form-group-half">
                    <label class="form-label-required" for="category">
                        Category <span class="required-star">*</span>
                    </label>
                    <select id="category" class="form-select">
                        <option value="">Select category</option>
                        <option value="development">Development</option>
                        <option value="design">Design</option>
                        <option value="marketing">Marketing</option>
                        <option value="testing">Testing</option>
                    </select>
                </div>

                <div class="form-group-half">
                    <label class="form-label-required" for="priority">
                        Priority <span class="required-star">*</span>
                    </label>
                    <select id="priority" class="form-select">
                        <option value="">Select priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group-half">
                    <label class="form-label" for="status">Status</label>
                    <select id="status" class="form-select">
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div class="form-group-half">
                    <label class="form-label" for="due-date">Due Date</label>
                    <input type="date" id="due-date" class="form-input">
                </div>
            </div>

            <div class="form-group-full">
                <label class="form-label" for="description">Description</label>
                <textarea id="description" class="form-textarea" placeholder="Add task description..."></textarea>
            </div>

            <p id="create-error" class="form-error" style="display:none;color:red;"></p>

            <div class="form-actions">
                <button type="button" class="btn-cancel">Cancel</button>
                <button type="submit" class="btn-save">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Save Task
                </button>
            </div>
        </div>
    `;

    // Append child
    content.appendChild(form);
    main.appendChild(header);
    main.appendChild(content);

    taskRequest(main);

    return main;
}

function taskRequest(main) {
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
        const newTask = {
            title,
            category,
            priority,
            status,
            dueDate,
            description,
            userId
        }

        const taskResponse = await JsonServices.createTask(newTask);

        if (taskResponse.error) {
            const errorElem = form.querySelector('#create-error');
            errorElem.style.display = 'block';
            errorElem.textContent = taskResponse.error;
        } else {
            // Redirect to dashboard on success
            window.location.hash = '#dashboard';
            console.log(taskResponse);
        }
    })
}
