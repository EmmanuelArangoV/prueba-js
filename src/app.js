import { LoginView } from "./views/login.js";
import { RegisterView } from "./views/register.js";
import {initStore} from "./state/store.js";
import { MyTasks } from "./views/mytasks.js";
import { DashboardView } from "./views/dashboard.js";


initStore()
const app = document.getElementById('app')

app.appendChild(MyTasks());