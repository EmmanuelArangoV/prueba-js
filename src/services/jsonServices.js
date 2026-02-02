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
}

export default new JsonServices();