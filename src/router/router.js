import { LoginView } from "../views/login.js";
import { RegisterView } from "../views/register.js";
import { MyTasks } from "../views/mytasks.js";
import { DashboardView } from "../views/dashboard.js";
import { CreateTaskView } from "../views/createTask.js";
import { ProfileView } from "../views/profile.js";

import { render } from "../app.js";
import { isAuth, getRole } from "../state/store.js";

const routes = {
    'login': { factory: LoginView, roles: [] },
    'register': { factory: RegisterView, roles: [] },
    'my-tasks': { factory: MyTasks, roles: ['user', 'admin'] },
    'dashboard': { factory: DashboardView, roles: ['user', 'admin'] },
    'create-task': { factory: CreateTaskView, roles: ['user', 'admin'] },
    'profile': { factory: ProfileView, roles: ['user', 'admin'] }
};

const publicRoutes = ['login', 'register'];

export function router() {

    let hash = window.location.hash.slice(1);

    if (!hash || hash === '/') {
        hash = 'login';
        window.location.hash = 'login';
    }

    if (!publicRoutes.includes(hash) && !isAuth()) {
        hash = 'login';
        window.location.hash = 'login';
        return;
    }

    const route = routes[hash];

    if (route) {
        if (route.roles.length > 0) {
            const userRole = getRole();
            if (!route.roles.includes(userRole)) {
                window.location.hash = '#dashboard';
                return;
            }
        }
        render(route.factory());
    } else {
        console.error('Ruta no encontrada:', hash);
        window.location.hash = '#dashboard';
    }

}