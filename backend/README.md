# Backend (Express + MongoDB)

This folder contains a small Express backend that connects to MongoDB using Mongoose.

Quick start

1. Copy `.env.example` to `.env` and set `MONGODB_URI`.
2. Install deps:

   npm install

3. Run dev server:

   npm run dev

API endpoints

- GET  /api/items      - list items
- POST /api/items      - create item (JSON body: { name, description, quantity })
- GET  /api/items/:id  - get item
- PUT  /api/items/:id  - update
- DELETE /api/items/:id - delete

Notes

- The backend listens on PORT (defaults to 4000). Ensure your frontend calls the correct host (e.g. http://localhost:4000/api/...)
- Use a managed MongoDB Atlas connection string or a local MongoDB URI.
