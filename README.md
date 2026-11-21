# ELORA Cosmetics — React + Backend

## Requirements
Install Node.js (LTS), then open this folder in VS Code.

## Run the project
Open the VS Code terminal in this project folder and run:

```bash
npm install
```

Start the backend in Terminal 1:
```bash
npm run server
```
Backend health check: http://localhost:5000/api/health

Start React/Vite in Terminal 2:
```bash
npm run dev
```
Open the localhost URL printed by Vite (normally http://localhost:5173).

## Backend features
- Express REST API
- Register and login connected to backend
- Passwords hashed with bcryptjs (not stored as plain text)
- JWT login token and protected `/api/auth/me`
- Demo order-saving endpoint `/api/orders`
- User and order data saved in `server/data.json`

## API endpoints
- `GET /api/health`
- `POST /api/auth/register` — `{ "name": "...", "email": "...", "password": "..." }`
- `POST /api/auth/login` — `{ "email": "...", "password": "..." }`
- `POST /api/auth/forgot-password` — demo response only
- `GET /api/auth/me` — requires `Authorization: Bearer <token>`
- `POST /api/orders` — requires JWT; demo order storage only

The frontend uses `http://localhost:5000/api` by default. To change it, create a `.env` file with:
`VITE_API_URL=http://localhost:5000/api`

For deployment, set a strong `JWT_SECRET`, use HTTPS, restrict CORS to your frontend domain, and replace the JSON-file demo store with a production database. Payments and real email-based password reset are not configured.
