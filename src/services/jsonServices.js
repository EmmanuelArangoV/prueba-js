const API_BASE = "http://localhost:3000";

class JsonServices {

    async createTask(task) {
        try {
            const createResponse = await fetch(`${API_BASE}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });

            if(!createResponse.ok) {
                throw new Error('Error creating task');
            }

            const newTask = await createResponse.json();

            return { success:true, newTask};
        } catch(error) {
            return { success:false, error: error.message};
        }
    }

    async getTasksByUser(userId) {
        try {
            const response = await fetch(`${API_BASE}/tasks?userId=${userId}`);

            if(!response.ok) {
                throw new Error('Error fetching tasks');
            }

            const tasks = await response.json();
            return { success:true, tasks};
        } catch (error) {
            return { success:false, error: error.message};
        }
    }

    async getUserName(userId) {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}`);

            if(!response.ok) {
                throw new Error('Error fetching user');
            }

            const user = await response.json();
            return { success:true, name: user.fullname};
        } catch (error) {
            return { success:false, error: error.message};
        }
    }

    async getTaskStats(userId) {
        try {
            const response = await fetch(`${API_BASE}/tasks?userId=${userId}`);
            const tasks = await response.json();

            const total = tasks.length;
            const completed = tasks.filter(t => t.status === 'completed').length;
            const pending = tasks.filter(t => t.status === 'pending').length;
            const inProgress = tasks.filter(t => t.status === 'in-progress').length;
            const highPriority = tasks.filter(t => t.status === 'pending' && t.priority === 'High').length;
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

            return {
                success: true,
                stats: {
                    total,
                    completed,
                    pending,
                    inProgress,
                    highPriority,
                    progress
                }
            };
        } catch (error) {
            return {
                success: false,
                error: 'Error fetching task statistics'
            };
        }
    }

    async getAllTasks() {
        try {
            const response = await fetch(`${API_BASE}/tasks`);

            if(!response.ok) {
                throw new Error('Error fetching all tasks');
            }

            const tasks = await response.json();

            return { success:true, tasks};
        } catch (error) {
            return { success:false, error: error.message};
        }
    }

    async getTaskById(taskId) {
        try {
            const response = await fetch(`${API_BASE}/tasks/${taskId}`);
            if (!response.ok) throw new Error('Error fetching task');
            const task = await response.json();
            return { success: true, task };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async updateTask(taskId, taskData) {
        try {
            const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
            if (!response.ok) throw new Error('Error updating task');
            const updatedTask = await response.json();
            return { success: true, updatedTask };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async deleteTask(taskId) {
        try {
            const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error deleting task');
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async getUserById(userId) {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}`);

            if (!response.ok) {
                throw new Error('Error fetching user');
            }

            const user = await response.json();

            return { success: true, user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

export default new JsonServices();