# Anime List

A full-stack anime list application where you can search for anime, add them to your list, and rate them.

I built this project while learning and working with React, Node.js, Express, and MongoDB.

## What it can do

* Search for anime
* Add anime to your list
* Give anime a rating
* Edit ratings
* Delete anime from your list
* View all the anime you've added

## Tech used

**Frontend**

* React
* Vite
* Tailwind CSS
* Axios
* React Router
* Lucide React
* React Hot Toast

**Backend**

* Node.js
* Express
* MongoDB
* Mongoose

**Anime API**

* Kitsu API

## Project structure

```text
Anime-list/
├── Backend/
├── Frontend/
├── .gitignore
└── README.md
```

## Running the project

First clone the repository:

```bash
git clone https://github.com/kshitijpachpande12-max/Anime-list.git
cd Anime-list
```

### Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

Then start the backend:

```bash
npm run dev
```

### Frontend

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

The frontend should then be available at the Vite development URL shown in the terminal.

## Note

The `.env` file is not included in the repository since it contains private configuration such as the MongoDB connection string.

## Future plans

Some things I might add later:

* User authentication
* Different anime statuses like Watching and Completed
* Episode tracking
* Better filtering and sorting
* Anime recommendations

## Author

Kshitij Pachpande

GitHub: https://github.com/kshitijpachpande12-max
