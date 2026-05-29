# Personal Portfolio — Full Stack

React + Node.js/Express + MySQL  
Deploy: Vercel (frontend) + Railway (backend + database)

---

## Folder Structure

```
portfolio/
├── frontend/    ← React app (Vite)
└── backend/     ← Express API
```

---

## Local Development Setup

### 1. Clone & install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Set up the database

- Create a free MySQL database on [Railway](https://railway.app)
- Copy the connection details
- Open Railway's query console and paste the contents of `backend/config/schema.sql`
- This creates all tables and sample data

### 3. Configure environment variables

```bash
# In /backend
cp .env.example .env
# Fill in your Railway DB credentials and JWT secret

# In /frontend
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
```

### 4. Create your admin account

Start the backend, then run this **once**:

```bash
curl -X POST http://localhost:5000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"yourpassword"}'
```

Then **comment out or remove** the `/auth/setup` route in `backend/routes/index.js`.

### 5. Start both servers

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

---

## Deployment

### Deploy Backend to Railway

1. Push `backend/` folder to a GitHub repo
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Add all your `.env` variables in Railway's Variables tab
4. Railway auto-detects Node.js and deploys

### Deploy Frontend to Vercel

1. Push `frontend/` folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Set environment variable: `VITE_API_URL = https://your-backend.railway.app/api`
4. Deploy

---

## Admin Panel

Visit `/admin/login` on your deployed site.  
Log in with the email/password you created during setup.

From the dashboard you can:
- Add, edit, delete projects
- Add/delete skills with proficiency levels
- Read and manage contact form messages

---

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | /api/projects | — | All projects |
| POST | /api/projects | ✓ | Add project |
| PUT | /api/projects/:id | ✓ | Edit project |
| DELETE | /api/projects/:id | ✓ | Delete project |
| GET | /api/skills | — | All skills |
| POST | /api/skills | ✓ | Add skill |
| DELETE | /api/skills/:id | ✓ | Delete skill |
| POST | /api/contact | — | Submit message |
| GET | /api/contact | ✓ | View messages |
| POST | /api/auth/login | — | Admin login |
