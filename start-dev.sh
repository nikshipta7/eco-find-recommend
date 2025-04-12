
#!/bin/bash

# This script starts both the frontend and backend servers
echo "Starting development environment..."

# Check if MongoDB is running
if pgrep -x "mongod" >/dev/null
then
    echo "MongoDB is running"
else
    echo "MongoDB is not running. Starting MongoDB..."
    mongod --fork --logpath /tmp/mongodb.log
    echo "MongoDB started"
fi

# Start Flask backend in the background
echo "Starting Flask backend..."
cd backend
python -m venv venv 2>/dev/null || echo "Virtual environment already exists"

# Activate virtual environment (platform-specific)
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

pip install -r requirements.txt
python app.py &
BACKEND_PID=$!
cd ..

# Start frontend in the background
echo "Starting React frontend..."
npm install
npm run dev &
FRONTEND_PID=$!

# Function to kill background processes on exit
cleanup() {
    echo "Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "Development servers stopped"
    exit
}

# Set up trap to call cleanup function on Ctrl+C
trap cleanup INT

echo "Development environment is running"
echo "Backend: http://localhost:5003"
echo "Frontend: http://localhost:8080"
echo "Press Ctrl+C to stop all servers"

# Wait for user to press Ctrl+C
wait
