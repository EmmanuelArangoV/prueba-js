import {initStore} from "./state/store.js";
import { router } from "./router/router.js";

initStore();
const app = document.getElementById('app');

export function render(view) {
    app.innerHTML = '';
    app.appendChild(view);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);