# 🗂️ MERN CRUD Auth — TaskFlow

A full-stack **Task Management** application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) featuring **JWT-based authentication** stored in HTTP-only cookies.

This project is designed for **learning and reverse-engineering**. Every file is well-commented and the architecture is kept simple and beginner-friendly.

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Features](#-features)
3. [Technologies Used](#-technologies-used)
4. [Folder Structure](#-folder-structure)
5. [How Authentication Works](#-how-authentication-works)
6. [How JWT Works in This Project](#-how-jwt-works-in-this-project)
7. [How CRUD Works](#-how-crud-works)
8. [How Frontend Communicates with Backend](#-how-frontend-communicates-with-backend)
9. [Environment Variables](#-environment-variables)
10. [MongoDB Setup](#-mongodb-setup)
11. [Backend Installation](#-backend-installation)
12. [Frontend Installation](#-frontend-installation)
13. [How to Run the Project](#-how-to-run-the-project)
14. [API Endpoints](#-api-endpoints)
15. [Example API Requests](#-example-api-requests)
16. [Common Errors and Solutions](#-common-errors-and-solutions)
17. [File-by-File Purpose Guide](#-file-by-file-purpose-guide)
18. [Recommended Learning Order](#-recommended-learning-order)

---

## 🎯 Project Overview

**TaskFlow** is a task management app where authenticated users can:
- Create an account and log in securely
- Create, read, update, and delete (CRUD) their own tasks
- Filter tasks by status (pending, in-progress, completed)

Each user can only see and manage **their own tasks** — no user can access another user's data.

---

## ✨ Features

### Authentication
- User registration with password hashing (bcryptjs)
- User login with JWT token generation
- JWT stored in HTTP-only cookies (secure against XSS attacks)
- Protected routes — unauthorized users are redirected to login
- Logout clears the JWT cookie

### Task Management (CRUD)
- Create tasks with title, description, and status
- View all your tasks on a dashboard
- Update task details and status
- Delete tasks with confirmation dialog
- Filter tasks by status (all, pending, in-progress, completed)
- Task statistics overview

### UI/UX
- Clean, modern responsive design
- Loading states during API requests
- Error messages for failed operations
- Success feedback after actions
- Mobile-friendly layout

---

## 🛠️ Technologies Used

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework for building the API |
| **MongoDB** | NoSQL database for data storage |
| **Mongoose** | MongoDB ODM (Object Document Mapper) |
| **jsonwebtoken** | Creating and verifying JWT tokens |
| **bcryptjs** | Password hashing |
| **cookie-parser** | Reading cookies from requests |
| **cors** | Enabling cross-origin requests |
| **dotenv** | Loading environment variables |

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI library |
| **Vite** | Build tool and dev server |
| **React Router DOM** | Client-side routing |
| **Axios** | HTTP client for API requests |
| **Context API** | Global state management |
| **Vanilla CSS** | Styling (no external CSS frameworks) |

---

## 📁 Folder Structure

```
mern-crud-auth/
│
├── backend/                      # Backend (API server)
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js     # Register, login, logout, getMe logic
│   │   └── itemController.js     # Task CRUD logic (create, read, update, delete)
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification & route protection
│   │   └── errorMiddleware.js    # Global error handler
│   ├── models/
│   │   ├── User.js               # User schema with password hashing
│   │   └── Item.js               # Task schema with user reference
│   ├── routes/
│   │   ├── authRoutes.js         # Maps URLs to auth controller functions
│   │   └── itemRoutes.js         # Maps URLs to task controller functions
│   ├── utils/
│   │   └── generateToken.js      # JWT creation & cookie setting
│   ├── .env.example              # Environment variable template
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express app entry point
│
├── frontend/                     # Frontend (React app)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Top navigation bar
│   │   │   ├── ProtectedRoute.jsx # Route guard for auth
│   │   │   ├── TaskCard.jsx      # Single task display card
│   │   │   └── TaskForm.jsx      # Reusable task create/edit form
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Authentication state (Context API)
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   ├── Dashboard.jsx     # Main dashboard with task list
│   │   │   ├── CreateTask.jsx    # Create new task page
│   │   │   ├── EditTask.jsx      # Edit existing task page
│   │   │   └── NotFound.jsx      # 404 page
│   │   ├── services/
│   │   │   ├── api.js            # Centralized Axios configuration
│   │   │   ├── authService.js    # Auth API call functions
│   │   │   └── taskService.js    # Task CRUD API call functions
│   │   ├── App.jsx               # Main app component with routes
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # All styles
│   ├── .env.example              # Frontend env variable template
│   ├── index.html                # HTML entry point
│   ├── package.json              # Frontend dependencies
│   └── vite.config.js            # Vite configuration
│
├── .gitignore                    # Files to exclude from Git
└── README.md                     # This file
```

---

## 🔐 How Authentication Works

### Registration Flow
```
1. User fills in name, email, password on the Register page
2. Frontend sends POST /api/auth/register with the user data
3. Backend checks if email already exists
4. Backend hashes the password using bcryptjs (NEVER stores plain text)
5. Backend creates the user in MongoDB
6. Backend generates a JWT and sets it as an HTTP-only cookie
7. Backend responds with the user data (without password)
8. Frontend stores the user in AuthContext state
9. User is redirected to the Dashboard
```

### Login Flow
```
1. User fills in email, password on the Login page
2. Frontend sends POST /api/auth/login
3. Backend finds the user by email
4. Backend compares the entered password with the stored hash (bcrypt.compare)
5. If password matches: generates JWT, sets cookie, returns user data
6. If password doesn't match: returns 401 error
7. Frontend stores the user in AuthContext state
8. User is redirected to the Dashboard
```

### Auth Check (On Page Reload)
```
1. App starts → AuthProvider runs useEffect → calls GET /api/auth/me
2. Browser automatically sends the JWT cookie with the request
3. Auth middleware reads the cookie, verifies the JWT, finds the user
4. If valid: returns user data → AuthContext sets user state → app loads
5. If invalid: returns 401 → AuthContext sets user to null → redirected to login
```

---

## 🔑 How JWT Works in This Project

### What is JWT?
JWT (JSON Web Token) is a compact token format with three parts:
```
Header.Payload.Signature
```

- **Header**: Token type and signing algorithm
- **Payload**: Data stored in the token (in our case, the user's ID)
- **Signature**: Ensures the token hasn't been tampered with

### Why HTTP-Only Cookies?
We store the JWT in an **HTTP-only cookie** instead of localStorage because:

| Feature | HTTP-Only Cookie | localStorage |
|---|---|---|
| **XSS Protection** | ✅ Cannot be read by JavaScript | ❌ Vulnerable to XSS |
| **Automatic Sending** | ✅ Browser sends it automatically | ❌ Must be manually attached |
| **Persistence** | ✅ Survives page refreshes | ✅ Survives page refreshes |
| **CSRF Protection** | ⚠️ Needs `sameSite: strict` | ✅ Not vulnerable |

### JWT Flow in Code
```
1. generateToken.js → jwt.sign({ userId }, SECRET) → res.cookie('jwt', token)
2. authMiddleware.js → req.cookies.jwt → jwt.verify(token, SECRET) → decoded.userId
3. User.findById(decoded.userId) → req.user = user → next()
```

---

## 📝 How CRUD Works

### Create a Task
```
Frontend: POST /api/tasks with { title, description, status }
Backend: Creates task in MongoDB with user: req.user._id
Response: { success: true, data: { task } }
```

### Read Tasks
```
Frontend: GET /api/tasks
Backend: Task.find({ user: req.user._id }) — finds only YOUR tasks
Response: { success: true, count: N, data: [tasks] }
```

### Update a Task
```
Frontend: PUT /api/tasks/:id with { title, description, status }
Backend: Finds task → checks ownership → updates if authorized
Response: { success: true, data: { updatedTask } }
```

### Delete a Task
```
Frontend: DELETE /api/tasks/:id
Backend: Finds task → checks ownership → deletes if authorized
Response: { success: true, message: "Task deleted" }
```

### Ownership Check
Every CRUD operation checks:
```javascript
if (task.user.toString() !== req.user._id.toString()) {
  return 403 Forbidden;
}
```

---

## 🔗 How Frontend Communicates with Backend

```
React Component
    ↓ calls
Service Function (authService.js / taskService.js)
    ↓ uses
Axios Instance (api.js — includes base URL + withCredentials)
    ↓ sends HTTP request
Express Route (authRoutes.js / itemRoutes.js)
    ↓ runs middleware (protect → verify JWT → find user)
Controller Function (authController.js / itemController.js)
    ↓ queries
MongoDB (via Mongoose models)
    ↓ returns data
Express sends JSON response
    ↓
Axios receives response
    ↓
React updates state and re-renders UI
```

### Key Configuration
```javascript
// api.js — Axios must send cookies cross-origin
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,  // ← CRITICAL for cookie auth
});
```

```javascript
// server.js — Express must accept cookies from the frontend origin
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,  // ← CRITICAL for cookie auth
}));
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
Create this file by copying `backend/.env.example`:

```env
PORT=5000                              # Server port
MONGO_URI=your_mongodb_connection_string  # MongoDB connection string
JWT_SECRET=your_super_secret_jwt_key   # Secret key for signing JWTs
NODE_ENV=development                   # Environment (development/production)
CLIENT_URL=http://localhost:5173       # Frontend URL (for CORS)
```

### Frontend (`frontend/.env`)
Create this file by copying `frontend/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api  # Backend API base URL
```

> ⚠️ **Never commit `.env` files!** They contain secrets. Only `.env.example` files (templates) should be committed.

---

## 🍃 MongoDB Setup

### Option 1: MongoDB Atlas (Cloud — Recommended for Beginners)
1. Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier is fine)
4. Create a database user with a username and password
5. Add your IP address to the whitelist (or allow all IPs: `0.0.0.0/0`)
6. Click "Connect" → "Connect your application"
7. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority
   ```
8. Replace `<username>` and `<password>` with your database user credentials
9. Paste this string as `MONGO_URI` in your `backend/.env` file

### Option 2: Local MongoDB
1. Install MongoDB Community Edition
2. Start the MongoDB service
3. Use `mongodb://localhost:27017/taskflow` as your `MONGO_URI`

---

## 🔧 Backend Installation

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create the .env file from the template
cp .env.example .env
# On Windows: copy .env.example .env

# Edit .env with your actual values (MongoDB URI, JWT secret, etc.)
```

---

## 🎨 Frontend Installation

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Create the .env file from the template
cp .env.example .env
# On Windows: copy .env.example .env

# The default VITE_API_URL should work if the backend runs on port 5000
```

---

## 🚀 How to Run the Project

You need **two terminal windows** — one for the backend, one for the frontend.

### Terminal 1 — Backend
```bash
cd backend
npm run dev
```
The backend will start on `http://localhost:5000`

### Terminal 2 — Frontend
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

### Open the App
Visit `http://localhost:5173` in your browser.

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and get JWT cookie |
| POST | `/api/auth/logout` | Public | Clear JWT cookie |
| GET | `/api/auth/me` | Private | Get current user profile |

### Tasks
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/tasks` | Private | Get all user's tasks |
| GET | `/api/tasks/:id` | Private | Get a single task |
| POST | `/api/tasks` | Private | Create a new task |
| PUT | `/api/tasks/:id` | Private | Update a task |
| DELETE | `/api/tasks/:id` | Private | Delete a task |

---

## 📬 Example API Requests

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Task (with cookie)
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Learn MERN","description":"Build a full-stack app","status":"in-progress"}'
```

### Get All Tasks
```bash
curl http://localhost:5000/api/tasks -b cookies.txt
```

### Update Task
```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID_HERE \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"status":"completed"}'
```

### Delete Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID_HERE -b cookies.txt
```

---

## ❗ Common Errors and Solutions

### "MongoDB Connection Error"
- **Cause**: Wrong `MONGO_URI` or MongoDB is not running
- **Fix**: Check your `.env` file, verify your MongoDB Atlas credentials, ensure your IP is whitelisted

### "Not authorized - No token provided"
- **Cause**: JWT cookie is missing (not logged in)
- **Fix**: Log in first. If using curl, make sure to use `-c cookies.txt` when logging in and `-b cookies.txt` for subsequent requests

### "CORS error" in browser console
- **Cause**: `CLIENT_URL` in backend `.env` doesn't match the frontend URL, or `credentials: true` is missing
- **Fix**: Ensure `CLIENT_URL=http://localhost:5173` in backend `.env` and both `withCredentials: true` (Axios) and `credentials: true` (CORS) are set

### "A user with this email already exists"
- **Cause**: Trying to register with an email that's already in the database
- **Fix**: Use a different email or log in with the existing account

### "Cannot find module" error
- **Cause**: Dependencies not installed
- **Fix**: Run `npm install` in both `backend/` and `frontend/` directories

### Frontend shows blank page
- **Cause**: Build error or missing dependencies
- **Fix**: Check the browser console and terminal for errors, run `npm install`

---

## 📖 File-by-File Purpose Guide

### Backend Files
| File | What It Does |
|---|---|
| `server.js` | Entry point — sets up Express, middleware, routes, starts server |
| `config/db.js` | Connects to MongoDB using Mongoose |
| `models/User.js` | Defines User schema with password hashing (pre-save hook) |
| `models/Item.js` | Defines Task schema with user reference and timestamps |
| `utils/generateToken.js` | Creates JWT and sets HTTP-only cookie |
| `middleware/authMiddleware.js` | Verifies JWT, finds user, attaches to request |
| `middleware/errorMiddleware.js` | Catches errors and sends consistent JSON responses |
| `controllers/authController.js` | Handles register, login, logout, getMe logic |
| `controllers/itemController.js` | Handles task CRUD with ownership checks |
| `routes/authRoutes.js` | Maps auth URLs to controller functions |
| `routes/itemRoutes.js` | Maps task URLs to controller functions (all protected) |

### Frontend Files
| File | What It Does |
|---|---|
| `main.jsx` | Entry point — wraps App with Router and AuthProvider |
| `App.jsx` | Defines all routes (public, protected, 404) |
| `index.css` | All styles — design system with CSS variables |
| `context/AuthContext.jsx` | Manages auth state with Context API |
| `services/api.js` | Axios instance with base URL and credentials |
| `services/authService.js` | Functions for auth API calls |
| `services/taskService.js` | Functions for task CRUD API calls |
| `components/Navbar.jsx` | Navigation bar (conditional rendering based on auth) |
| `components/ProtectedRoute.jsx` | Redirects unauthenticated users to login |
| `components/TaskCard.jsx` | Displays a single task with edit/delete buttons |
| `components/TaskForm.jsx` | Reusable form for creating/editing tasks |
| `pages/Login.jsx` | Login page with email/password form |
| `pages/Register.jsx` | Registration page with validation |
| `pages/Dashboard.jsx` | Main page — task stats, filters, task grid |
| `pages/CreateTask.jsx` | Form to create a new task |
| `pages/EditTask.jsx` | Form to edit an existing task |
| `pages/NotFound.jsx` | 404 page for unknown URLs |

---

## 🧭 Recommended Learning Order

Follow this path to understand the project from the ground up:

### Phase 1: Backend Foundation
1. **`server.js`** — Understand how Express starts, middleware order, route mounting
2. **`config/db.js`** — How MongoDB connects using Mongoose
3. **`models/User.js`** — Schema definition, pre-save hooks, password hashing with bcryptjs
4. **`controllers/authController.js` → `registerUser`** — How registration creates a user
5. **`utils/generateToken.js`** — How JWT is created and stored in cookies
6. **`controllers/authController.js` → `loginUser`** — Password comparison and token generation
7. **`middleware/authMiddleware.js`** — How JWT verification works, how `req.user` is set
8. **`routes/authRoutes.js`** — How routes map to controllers, public vs. protected

### Phase 2: CRUD Operations
9. **`models/Item.js`** — Task schema with user reference (ObjectId)
10. **`controllers/itemController.js`** — All 5 CRUD functions with ownership checks
11. **`routes/itemRoutes.js`** — Router-level middleware, route chaining

### Phase 3: Error Handling
12. **`middleware/errorMiddleware.js`** — CastError, ValidationError, duplicate key handling

### Phase 4: Frontend Foundation
13. **`services/api.js`** — Axios configuration, `withCredentials`
14. **`services/authService.js`** & **`services/taskService.js`** — API call functions
15. **`context/AuthContext.jsx`** — Context API, state management, auth check on load

### Phase 5: Frontend Routing & Protection
16. **`main.jsx`** — App wrapping order (StrictMode → Router → AuthProvider)
17. **`App.jsx`** — Route definitions, public vs. protected
18. **`components/ProtectedRoute.jsx`** — Route guard pattern

### Phase 6: Frontend Pages
19. **`pages/Login.jsx`** & **`pages/Register.jsx`** — Form handling, error display
20. **`pages/Dashboard.jsx`** — Data fetching, filtering, state management
21. **`pages/CreateTask.jsx`** & **`pages/EditTask.jsx`** — Form submission, navigation
22. **`components/TaskCard.jsx`** & **`components/TaskForm.jsx`** — Reusable components

### Phase 7: Full Flow
23. **Trace a complete request**: Register → Login → Create Task → View Dashboard → Edit Task → Delete Task
24. **Understand the cookie flow**: Login sets cookie → every request sends cookie → middleware verifies → logout clears cookie

---

## 📝 License

This project is open source and available for learning purposes.
