# iNotebook 📝

A secure cloud-based note management application built with the **MERN Stack** that allows users to create, edit, organize, and manage their personal notes from anywhere.

## 🚀 Overview

iNotebook is a full-stack web application designed to provide users with a simple and secure platform for storing important notes online. It includes authentication, CRUD functionality, and a responsive user interface for a smooth user experience.

This project demonstrates practical implementation of:

- Frontend development with React
- Backend API development with Node.js & Express
- Database integration using MongoDB
- User authentication & authorization
- State management and API handling

---

## ✨ Features

- 🔐 User Authentication (Register/Login)
- 📝 Create Notes
- ✏️ Edit Existing Notes
- ❌ Delete Notes
- ☁️ Cloud Storage for Notes
- 📱 Responsive UI
- 🔒 Protected Routes

---

## 🛠 Tech Stack

### Frontend
- React.js
- JavaScript
- Bootstrap / CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcrypt.js

---

## 📂 Project Structure

```bash
iNotebook/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── context/
│   └── App.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/prince728/iNotebook.git
```

### 2. Navigate into project

```bash
cd iNotebook
```

### 3. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

⚠️ Never upload your `.env` file to GitHub.

---

## ▶️ Running the Project

### Start Backend

```bash
npm run server
```

### Start Frontend

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

Backend runs on:

```bash
http://localhost:5000
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

### Notes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Fetch all notes |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |

---

## 📸 Screenshots

Add your project screenshots here.

Example:

- Login Page
- Signup Page
- Dashboard
- Notes Page

---

## 🎯 Learning Outcomes

This project helped me understand:

- REST API development
- Authentication systems
- MongoDB schema design
- React state management
- Full-stack application deployment

---

## 👨‍💻 Author

**Prince**

GitHub:  
https://github.com/prince728

---

## ⭐ Support

If you like this project, give it a star on GitHub.
