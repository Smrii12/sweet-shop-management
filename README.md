# 🍬 Sweet Shop Management System (TDD Kata)

A full-stack Sweet Shop Management System built using **Node.js, Express, SQLite, and React**, following **Test-Driven Development (TDD)** principles.

This project was developed as part of the **Incubyte Internship TDD Kata** and demonstrates backend API design, authentication, database handling, frontend UI, testing, and responsible AI usage.

---

## 📌 Project Overview

The application allows users to:
- Register and log in securely
- View and search available sweets
- Purchase sweets (quantity reduces)
- Manage inventory as an admin (add, update, delete, restock)

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- SQLite (persistent database)
- JWT Authentication
- bcryptjs (password hashing)
- Jest & Supertest (testing)

### Frontend
- React (Create React App)
- Fetch API
- CSS (custom UI)

---

## 🔐 Authentication

- Users can register and log in
- JWT tokens are issued on login
- Protected routes require valid JWT
- Admin users have elevated permissions

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

---

### Sweets (Protected)
| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/sweets` | Add a new sweet (Admin only) |
| GET | `/api/sweets` | Get all sweets |
| GET | `/api/sweets/search` | Search sweets |
| PUT | `/api/sweets/:id` | Update sweet (Admin only) |
| DELETE | `/api/sweets/:id` | Delete sweet (Admin only) |

---

### Inventory (Protected)
| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/sweets/:id/purchase` | Purchase sweet |
| POST | `/api/sweets/:id/restock` | Restock sweet (Admin only) |

---

## 🍭 Sweet Model

Each sweet contains:
- `id`
- `name`
- `category`
- `price`
- `quantity`

---

## 🖥️ Frontend Features

- User registration & login
- Dashboard displaying sweets
- Search by name, category, and price range
- Purchase button (disabled if out of stock)
- Admin-only controls:
  - Add sweet
  - Update sweet
  - Delete sweet
  - Restock sweet
- Clean, responsive UI with images

---

## 🧪 Testing (TDD)

- Backend developed using **Test-Driven Development**
- Jest used for unit and integration tests
- Supertest used for API testing
- Tests cover:
  - Authentication
  - Sweet operations
  - Inventory actions

### Run Tests
```bash
cd backend
npm test

## 🤖 My AI Usage

AI tools were used responsibly during the development of this project to assist with learning, productivity, and problem-solving. All code generated with AI assistance was reviewed, understood, and adapted by me.

### AI Tools Used
- ChatGPT (OpenAI)

### How I Used AI
- To brainstorm and design RESTful API endpoints for authentication, sweets management, and inventory operations.
- To generate initial boilerplate code for Express routes, middleware, and React components, which I then customized and extended.
- To debug backend issues related to JWT authentication, SQLite database operations, and role-based access control.
- To resolve frontend–backend integration issues such as CORS, API routing, and proxy configuration.
- To write and refine Jest test cases while following Test-Driven Development (TDD) practices.
- To improve UI structure and styling ideas for the login page and dashboard.

### Reflection on AI Usage
Using AI significantly improved my development speed and helped me understand best practices while building a full-stack application. AI acted as a support tool for learning and debugging, but all architectural decisions, final implementations, and testing strategies were made and verified by me.
