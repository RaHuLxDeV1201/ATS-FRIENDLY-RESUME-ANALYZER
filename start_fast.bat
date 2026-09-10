@echo off
title ATS High-Speed Launcher
echo ========================================================
echo Launching High-Speed ATS Resume Analyzer...
echo ========================================================
echo.

echo Compiling optimized production bundle...
call npm --prefix "%~dp0frontend" run build

start "ATS Backend Server (Port 8000)" /D "%~dp0backend" cmd /k ".\venv\Scripts\python.exe -m uvicorn app.main:app --port 8000"
start "ATS Production Frontend (Port 5173)" /D "%~dp0frontend" cmd /k "npm run preview"

echo.
echo Backend URL:   http://localhost:8000
echo Frontend URL:  http://localhost:5173 (Optimized Production Build)
echo.
echo Waiting 2 seconds for servers to start...
ping 127.0.0.1 -n 3 >nul
start http://localhost:5173
