# Backend for Ace-Clothing

This folder contains a simple Express + MongoDB backend with example models and routes.

Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI`.
2. Install dependencies and run in development:

```powershell
cd backend
npm install
npm run dev
```

Seed sample data

```powershell
cd backend
npm run seed
```

API

- `GET /api/products` - list products
- `GET /api/products/:id` - single product
- `POST /api/products` - create product
- `POST /api/orders` - create order

Connect from frontend

Use fetch or axios to call `http://localhost:5000/api/...` (set `PORT` in `.env` if you change it).
