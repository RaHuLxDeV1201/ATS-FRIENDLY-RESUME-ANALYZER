@echo off
title ATS Local Launcher
echo ========================================================
echo Starting local ATS Resume Analyzer servers...
echo ========================================================
echo.

start "ATS Backend Server (Port 8000)" cmd /k "cd /d C:\Users\rupal\OneDrive\Desktop\ATS\ATS-FRIENDLY-RESUME-ANALYZER\backend && .\venv\Scripts\python.exe -m uvicorn app.main:app --port 8000"
start "ATS Frontend Server (Port 5173)" cmd /k "cd /d C:\Users\rupal\OneDrive\Desktop\ATS\ATS-FRIENDLY-RESUME-ANALYZER\frontend && npx vite --port 5173 --strictPort"

echo.
echo Backend URL:  http://localhost:8000
echo Frontend URL: http://localhost:5173
echo.
echo Waiting 3 seconds for servers to start...
ping 127.0.0.1 -n 4 >nul
start http://localhost:5173
