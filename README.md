# Task Management SPA

Academic task management application built with Vanilla JavaScript, modular architecture, and `json-server` as a development REST API.

## 🚀 Key Features

- Framework-less SPA (Vanilla JavaScript ES Modules).
- Hash-based frontend routing.
- Task management: Create, View, Edit, and Delete.
- Task statistics visualization.
- Role system:
  - **Admin**: Views and manages all system tasks.
  - **User**: Manages only their own tasks.
- Modern interface with Sidebar, Topbar, and interactive tables.

## 📁 Project Structure

- `src/`
    - `components/` → Reusable components (Sidebar, Topbar, TaskTable, StatsGrid, etc.).
    - `views/` → Main views (Dashboard, MyTasks, CreateTask, Profile, Login).
    - `services/` → `jsonServices.js` for API communication.
    - `state/` → `store.js` for global state management and `db.json` for the database.
    - `router/` → Hash-based routing logic.
- `index.html` → Entry point.
- `styles.css` → Global styles.

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended).
- Modern web browser.

## 📦 Installation and Usage

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server (Vite):
   ```bash
   npm run dev
   ```
4. Run the simulated database (json-server):
   ```bash
   npx json-server --watch src/state/db.json --port 3000
   ```

*Note: Ensure that `json-server` is running on port 3000, as it is the port configured in the services.*

## 👤 Test Users (db.json)

- **Admin**: `admin@gmail.com` / `admin123`
- **User**: `emmanuel@correro.com` / `emma1221`

## 🔗 API Consumption (`json-server`)

Generic example of available endpoints (depends on `db.json` content):

- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`

- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

`json-server` supports:

- Filtering: `/products?category=coffee`
- Sorting: `/products?_sort=price&_order=asc`
- Pagination: `/products?_page=1&_limit=10`

## 🧩 SPA Architecture

### 1. Entry Point

- `src/app.js` is responsible for:
    - Initializing the application.
    - Configuring the router (if any).
    - Rendering the initial view in the DOM `root`.

### 2. Views (`views`)

Each view is generally a function that:

- Creates and returns an `HTMLElement` node (e.g., a `main` or a `section`).
- Connects events (click, submit, etc.).
- Optionally consumes services to fetch data from `json-server`.

Typical examples:

- `HomeView`
- `AdminView`
- `LoginView`
- `NotFoundView`

### 3. Components (`components`)

Reusable UI elements such as:

- `Navbar`, `Sidebar`, `Footer`
- `Card`, `Table`, `Modal`
- Generic forms

Each component usually returns a pre-configured `HTMLElement`.

### 4. Services (`services`)

Modules that encapsulate all API access logic. For example:

- `jsonService.js` or resource-specific services.

Typical responsibilities:

- Define a `BASE_URL` (e.g., `http://localhost:3000`).
- Provide CRUD functions: `getAll`, `getById`, `create`, `update`, `remove`.
- Handle errors and return a uniform structure (e.g., `{ success, data, error }`).

### 5. Utilities (`utils`)

Helper functions, for example:

- Date and price formatting.
- Data normalization.
- Local/session storage management.
- DOM helpers (create elements, clear nodes, etc.).

## 🧪 Tests (optional)

If the project includes tests, a typical setup:

- `jest` or `vitest` for unit tests.
- `@testing-library/dom` or similar for testing pure views/components.

Example scripts:

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch"
  }
}
```

## 🧱 Recommended Best Practices

- Separate business logic (services) from presentation (views and components).
- Avoid calling `fetch` directly in small components; use services instead.
- Handle loading and error states in the UI (loading spinners, error messages).
- Keep `db.json` as close as possible to the real model expected from a backend.
- Use ES modules (`import` / `export`) for all code in `src/`.

## 🔧 Build and Deployment (generic)

Depending on the bundler (e.g., Vite):

```bash
npm run build
```

This will generate a `dist/` folder ready to be deployed on any static hosting (Netlify, Vercel, GitHub Pages, etc.).
