@echo off
setlocal

rem ============================================================
rem  Starts the Joborganizer Spring Boot backend and the React
rem  frontend, each in its own window.
rem
rem  Expected folder layout (change the paths below if yours differ):
rem    <some folder>\Joborganizer   <- Spring Boot backend
rem    <some folder>\full-stack     <- this file + jo-frontend
rem ============================================================

set "ROOT=%~dp0"
set "BACKEND_DIR=%ROOT%..\Joborganizer"
set "FRONTEND_DIR=%ROOT%jo-frontend"
set "FRONTEND_URL=http://localhost:3000"

rem ---- Sanity checks ----
if not exist "%BACKEND_DIR%\mvnw.cmd" (
    echo [ERROR] Could not find the backend at "%BACKEND_DIR%".
    echo         Edit BACKEND_DIR at the top of this file.
    pause
    exit /b 1
)

if not exist "%FRONTEND_DIR%\package.json" (
    echo [ERROR] Could not find the frontend at "%FRONTEND_DIR%".
    echo         Edit FRONTEND_DIR at the top of this file.
    pause
    exit /b 1
)

where java >nul 2>nul
if errorlevel 1 if not defined JAVA_HOME (
    echo [ERROR] Java was not found. Install JDK 21 and add it to PATH or set JAVA_HOME.
    pause
    exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
    echo [ERROR] npm was not found. Install Node.js and try again.
    pause
    exit /b 1
)

rem ---- Backend ----
echo Starting backend...
start "Joborganizer backend" /D "%BACKEND_DIR%" cmd /k mvnw.cmd spring-boot:run

rem ---- Frontend (installs dependencies the first time) ----
if exist "%FRONTEND_DIR%\node_modules" (
    set "FRONTEND_CMD=npm run dev"
) else (
    set "FRONTEND_CMD=npm install && npm run dev"
)

echo Starting frontend...
start "Joborganizer frontend" /D "%FRONTEND_DIR%" cmd /k "%FRONTEND_CMD%"

rem ---- Open the app in the browser once things have had time to start ----
echo Opening %FRONTEND_URL% in 10 seconds...
timeout /t 10 /nobreak >nul
start "" "%FRONTEND_URL%"

echo.
echo Both servers are running in their own windows.
echo Close those windows (or press Ctrl+C in them) to stop the app.
endlocal
