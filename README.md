
# Eco-Find-Recommend Application

This project consists of a React frontend and a Flask backend with MongoDB integration.

## Project Structure

- `/src` - React frontend application
- `/backend` - Flask backend API with MongoDB integration

## Setup Instructions

### Prerequisites

- Node.js and npm for the frontend
- Python 3.8+ for the backend
- MongoDB installed and running locally

### Running the Backend (Flask with MongoDB)

1. Make sure MongoDB is running on your system:
   ```
   # On most systems, MongoDB can be started with:
   mongod
   ```

2. Set up the Python environment and install dependencies:
   ```
   cd backend
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   
   # Install dependencies
   pip install -r requirements.txt
   ```

3. Run the Flask backend:
   ```
   python app.py
   ```
   The Flask API will start on http://localhost:5003

### Running the Frontend (React)

1. In a new terminal, install frontend dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```
   The frontend will start on http://localhost:8080

### Configuration

By default, the frontend application is configured to use the MongoDB backend. This is controlled in the `src/utils/apiService.ts` file:

```javascript
const config = {
  useLocalApi: false,  // Set to false to use MongoDB backend
  apiBaseUrl: 'http://localhost:5003/api',  // Flask API URL
};
```

## Troubleshooting

- If you encounter network errors connecting to the API, ensure:
  1. MongoDB is running
  2. The Flask backend is running
  3. The API URL in `src/utils/apiService.ts` matches your Flask server address

## Available Features

- Browse sustainable products
- Search for products
- Admin dashboard for adding new products
- Shopping cart functionality
