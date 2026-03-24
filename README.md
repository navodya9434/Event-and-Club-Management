# Event-and-Club-Management

Advertisement management is implemented end-to-end with Spring Boot (backend) and React + Vite (frontend).

## What is included

- Manager CRUD API under `/api/manager/advertisements`
- Student filtered API under `/api/student/advertisements`
- Manager image upload API under `/api/manager/advertisements/images`
- Seed data loaded from `Backend/src/main/resources/data.sql`
- Frontend manager form supports both image URL and file upload

## Run backend

```powershell
Set-Location "Backend"
.\mvnw.cmd spring-boot:run
```

## Run frontend

```powershell
Set-Location "frontend"
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Notes

- Uploaded images are saved to the local `uploads` folder (config: `app.upload-dir`)
- If you change ports/origins, update `cors.allowed-origins` and `VITE_API_BASE_URL`
