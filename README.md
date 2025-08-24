# 🌱 Urvann Plant Store

A full-stack **plant catalog application** built for the **Urvann Software Development Intern assignment**.

---

## ✨ Features

- 🌿 **Plant Catalog**: Browse 50+ plants with search and category filtering  
- 🔑 **Admin Panel**: Add new plants (username: `admin`, password: `admin`)  
- 📱 **Responsive Design**: Optimized for both mobile and desktop  
- ⚡ **Real-time Search**: Instant filtering by name or category  

---

## 🛠️ Tech Stack

**Frontend**
- ⚛️ React  
- 🎨 Tailwind CSS  
- ⚡ Vite  

**Backend**
- 🟢 Node.js  
- 🚀 Express  
- 🍃 MongoDB  

---

## ⚡ Quick Setup

### 🔹 Backend
```bash
cd backend
npm install
npm run seed    # Load sample data
npm run dev     # Runs on http://localhost:3000
```
### 🔹 Frontend
Create a backend/.env file:

```bash
cd frontend
npm install
npm run dev     # Runs on http://localhost:5173
```

### ⚙️ Environment Setup
```bash
MONGODB_URI=
PORT=
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/plants` | Get all plants |
| POST   | `/api/plants` | Add plant (admin only) |
| GET    | `/api/plants/categories/list` | Get categories |

### 🔎 Query Parameters
- `search` → Search by name/category  
- `category` → Filter by category  
- `availability` → Filter by stock (`true`/`false`)  

---

## 🔑 Admin Access

- **Username**: `admin`  
- **Password**: `admin`  

👉 Only admins can add new plants via the web interface.

## 🗄️ Database Schema

```javascript
Plant {
  name: String,           // Required
  price: Number,          // Required
  categories: [String],   // Required array
  availability: Boolean,  // Default: true
  description: String,    // Optional
  image: String           // Optional
}
```

