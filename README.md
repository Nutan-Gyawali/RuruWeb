# RuruWeb

This workspace contains a starter full-stack setup for the Thorga Foundation site using:
- React frontend
- ASP.NET Core backend
- EF Core + MySQL
- ASP.NET Core Identity for authentication

## Structure
- frontend/: Vite React app
- backend/ThorgaApi/: ASP.NET Core Web API
- database/schema.sql: MySQL schema script

## Quick start

1. Create a MySQL database and run the SQL in database/schema.sql.
2. Update the connection string in backend/ThorgaApi/appsettings.json if needed.
3. Start the backend:
   - dotnet restore
   - dotnet ef database update
   - dotnet run --project backend/ThorgaApi
4. Start the frontend:
   - cd frontend
   - npm install
   - npm run dev

## Notes
- The backend exposes auth endpoints at /api/auth/register and /api/auth/login.
- The API also exposes member management at /api/members.
- The frontend is configured to call the backend at http://localhost:5173 via CORS and can be expanded into the full site UI.
