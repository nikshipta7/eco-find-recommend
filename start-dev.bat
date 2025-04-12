
@echo off
echo Starting development environment...

REM Check if MongoDB is running (Windows version)
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo MongoDB is running
) else (
    echo MongoDB is not running. Starting MongoDB...
    start "" mongod
    echo MongoDB started
    timeout /t 5
)

REM Start Flask backend
echo Starting Flask backend...
cd backend
python -m venv venv 2>NUL
call venv\Scripts\activate
pip install -r requirements.txt
start "" python app.py

REM Go back to root folder
cd ..

REM Start frontend
echo Starting React frontend...
call npm install
start "" npm run dev

echo Development environment is running
echo Backend: http://localhost:5003
echo Frontend: http://localhost:8080
echo Close the command windows to stop the servers

pause
