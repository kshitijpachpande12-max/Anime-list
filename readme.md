# Anime List

A full-stack anime tracking application built with **React, Express.js, Node.js, and MongoDB**. Users can search for anime, manage their watchlist, and keep track of the anime they are watching or have completed.

## 🌐 Live Demo

**Frontend:**
https://anime-list-mkbr.vercel.app/

**Backend API:**
https://anime-list-sigma.vercel.app/

## ✨ Features

* 🔎 Search for anime
* 📋 Add anime to your watchlist
* ▶️ Move anime to your main anime list
* 🗑️ Remove anime from your list
* 📱 Responsive React interface
* 🔄 Persistent data using MongoDB
* 🌐 Deployed frontend and backend
* 🎌 Anime information fetched using the Kitsu API

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Axios
* CORS

### Deployment

* Vercel — Frontend
* Vercel — Backend
* MongoDB Atlas — Database

## 📁 Project Structure

```text
Anime-list/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── routes/
│   │   ├── models/
│   │   └── server.js
│   ├── package.json
│   └── ...
│
└── README.md
```

## ⚙️ Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/kshitijpachpande12-max/Anime-list.git
cd Anime-list
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` directory:

```env
DB_url=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

The backend will run locally on:

```text
http://localhost:5001
```

### 3. Frontend setup

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## 🔑 Environment Variables

The backend requires:

```env
DB_url=your_mongodb_connection_string
```

The `.env` file should **not** be committed to GitHub.

## 🚀 Deployment

The application is deployed as two separate Vercel projects.

### Frontend

The React/Vite frontend is deployed on Vercel:

https://anime-list-mkbr.vercel.app/

### Backend

The Express backend is deployed on Vercel:

https://anime-list-sigma.vercel.app/

The backend connects to MongoDB Atlas for persistent data storage.

## 📡 API

The main backend API is available at:

```text
https://anime-list-sigma.vercel.app/api/Anime-list
```

## 📚 External API

Anime information is retrieved using the **Kitsu API**.

## 👨‍💻 Author

**Kshitij Pachpande**

GitHub:
https://github.com/kshitijpachpande12-max

---

⭐ If you found this project interesting, consider giving the repository a star!
