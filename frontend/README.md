# Advertisement Management Frontend

React + Vite frontend for the Advertisement Management System.

## Features

- Student homepage for active advertisements (`/`)
- Manager dashboard for full advertisement CRUD (`/manager`)
- Axios service layer in `src/services/api.js`
- React Router navigation with clean UI styling

## API Endpoints Expected

- `GET /api/manager/advertisements`
- `GET /api/student/advertisements`
- `POST /api/manager/advertisements`
- `PUT /api/manager/advertisements/{id}`
- `DELETE /api/manager/advertisements/{id}`

Base URL defaults to `http://localhost:8080/api` and can be overridden with:

- `VITE_API_BASE_URL`

## Quick Start

```powershell
npm install
npm run dev
```

## Build

```powershell
npm run build
npm run preview
```

