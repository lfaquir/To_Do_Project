# MERN To-Do List App

This project is a simple MERN stack To-Do List with user authentication and task management.

## Features

- User registration and login with JWT
- Protected task routes for each authenticated user
- Create, read, and delete tasks
- Responsive React UI
- MongoDB with Mongoose
- Environment variables support

## Project Structure

- `backend/` - Express API, MongoDB models, authentication, routes
- `frontend/` - React app for login and task management

## Setup

### 1. Backend

1. Open a terminal in `backend/`
2. Copy `.env to `.env`
3. Update `mongoURI` and `JWT_SECRET` in `.env`
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend

1. Open a terminal in `frontend/`
2. Copy `.env` to `.env` if you want to override the API URL
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the React app:
   ```bash
   npm start
   ```

## API Endpoints

- `POST /api/auth/register` - register with `email` and `password`
- `POST /api/auth/login` - login with `email` and `password`
- `GET /api/tasks` - get authenticated user tasks
- `POST /api/tasks` - create a new task
- `DELETE /api/tasks/:id` - delete a task by id

## Notes

- The backend defaults to `mongodb://127.0.0.1:27017/mern-todo-app` if no `mongoURI` is provided.
- The frontend uses `http://localhost:3001/api` by default.
- If you deploy the backend or change ports, update `frontend/.env` accordingly.
