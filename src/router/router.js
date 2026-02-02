import { LoginView } from "../views/login.js";
import { RegisterView } from "../views/register.js";
import { MyTasks } from "../views/mytasks.js";
import { DashboardView } from "../views/dashboard.js";
import { CreateTaskView } from "../views/createTask.js";
import { ProfileView } from "../views/profile.js";

import { render } from "../app.js";
import { isAuth } from "../state/store.js";

const routes = {
    'login': LoginView,
    'register': RegisterView,
    'my-tasks': MyTasks,
    'dashboard': DashboardView,
    'create-task': CreateTaskView,
    'profile': ProfileView
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
    }

    const viewFactory = routes[hash];

    if (viewFactory) {
        render(viewFactory());
    } else {
        console.error('Ruta no encontrada:', hash);
    }

}