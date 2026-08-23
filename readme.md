# Anime List 🎌

A full-stack anime list application where you can search for anime, view anime details, manage your personal anime list, and keep a separate watchlist.

## ✨ Features

* 🔎 **Anime Search** — Search for anime using the Kitsu API.
* 📋 **Anime List** — Add anime to your main list and manage them.
* ⭐ **Watchlist** — Keep anime you want to watch later in a separate list.
* ➕ **Move to List** — Add an anime from your watchlist to your main list.
* 🗑️ **Remove from Watchlist** — Remove anime from your watchlist.
* 📖 **Anime Details** — View detailed information about an anime.
* 🔄 **REST API** — Backend API built with Express.
* 💾 **MongoDB Database** — Store anime list and watchlist data persistently.

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* DaisyUI
* Axios
* Lucide React
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Axios

### External API

* Kitsu API — used for anime search and anime information.

## 📁 Project Structure

```text
Anime-list/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
│
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kshitijpachpande12-max/Anime-list.git
cd Anime-list
```

### 2. Install dependencies

Install the dependencies for both the frontend and backend.

```bash
npm install
```

If the frontend and backend have separate `package.json` files:

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend directory and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

Replace `your_mongodb_connection_string` with your MongoDB connection string.

### 4. Start the backend

```bash
cd backend
npm run dev
```

The backend runs on:

```text
http://localhost:5001
```

### 5. Start the frontend

In another terminal:

```bash
cd frontend
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

## 🔌 API Routes

The backend provides REST endpoints for managing anime.

| Method | Route            | Description               |
| ------ | ---------------- | ------------------------- |
| GET    | `/`              | Get all anime             |
| GET    | `/search/:title` | Search for anime          |
| GET    | `/:id`           | Get anime by ID           |
| POST   | `/`              | Add/create an anime entry |
| PUT    | `/:id`           | Update an anime entry     |
| DELETE | `/:id`           | Delete an anime entry     |
| GET    | `/watchlist`     | Get watchlist anime       |
| POST   | `/watchlist`     | Add anime to watchlist    |

## 🔄 Watchlist Workflow

The application keeps the watchlist separate from the main anime list.

```text
Search Anime
     │
     ▼
Add to Watchlist
     │
     ▼
Watchlist
     │
     │ Add
     ▼
Main Anime List
     │
     ▼
Removed from Watchlist
```

When **Add** is pressed on an anime in the watchlist, the anime is added to the main list and removed from the watchlist.

## 🧩 Frontend Routes

```text
/                  → Home Page
/search            → Anime Search
/anime/:id         → Anime Details
/search/:anime     → Search Result Details
```

## 📌 Future Improvements

* User authentication
* Anime ratings and reviews
* Watched / watching / completed status
* Pagination and improved search
* Better filtering and sorting
* Responsive UI improvements
* Anime recommendations

## 👨‍💻 Author

**Kshitij Pachpande**

GitHub: [kshitijpachpande12-max](https://github.com/kshitijpachpande12-max?utm_source=chatgpt.com)
