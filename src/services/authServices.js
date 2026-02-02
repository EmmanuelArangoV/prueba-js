import { setUser } from "../state/store.js";
const API_BASE = "http://localhost:3000";

class AuthServices {
    async register(user) {
        try {
            const response = await fetch(`${API_BASE}/users?email=${user.email}`);

            if(!response.ok) {
                throw new Error('Error verifying user credentials');
            }

            const exitingUser = await response.json();

            if (Array.isArray(exitingUser) && exitingUser.length > 0) {
                throw new Error('Email is already registered');
            }

            const userApi = {
                ...user,
                createdAt: new Date().toLocaleDateString('es-ES')
            }

            const registerResponse = await fetch(`${API_BASE}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userApi)
            });

            if(!registerResponse.ok) {
                throw new Error('Error registering user');
            }

            const newUser = registerResponse.json();

            return { success:true, newUser};
        }catch(error) {
            return { success:false, error: error.message};
        }
    }

    async login(email, password) {
        try {
            const response = await fetch(
                `${API_BASE}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);

            if (!response.ok) {
                throw new Error('Error to verify user credentials');
            }

            const users = await response.json();

            if (users.length === 0 || !Array.isArray(users)) {
                throw new Error('Invalid credentials');
            }

            const user = users[0];
            setUser(user);

            return {success: true, user};
        } catch (error) {
            return {success: false, error: error.message};
        }
    }
}

export default new AuthServices();