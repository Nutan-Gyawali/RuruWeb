# Stage 1: Build Frontend
FROM node:20 AS frontend-build
WORKDIR /src/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src/backend
COPY backend/ThorgaApi/ThorgaApi.csproj ./
RUN dotnet restore
COPY backend/ThorgaApi/ ./
# Copy frontend build output into backend wwwroot
COPY --from=frontend-build /src/frontend/dist ./wwwroot
RUN dotnet publish -c Release -o /app/publish

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=backend-build /app/publish .
# Ensure uploads directory exists and is writable
RUN mkdir -p /app/wwwroot/uploads

# Expose standard port (Railway injects PORT env variable)
EXPOSE 8080

# Environment variables
ENV ASPNETCORE_ENVIRONMENT=Production

# Start the application
ENTRYPOINT ["dotnet", "ThorgaApi.dll"]
