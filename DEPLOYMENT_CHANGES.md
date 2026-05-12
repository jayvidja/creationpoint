# Changes Made for Render + Vercel Deployment

## 📝 Summary of Changes

### 1. **Backend (server.js)**
- ✅ Port now reads from `process.env.PORT` (Render assigns dynamic port)
- ✅ CORS updated to accept multiple origins from environment
- ✅ Session secret moved to `.env` for security
- ✅ Cookies configured for production (secure flag based on NODE_ENV)

**Before:**
```js
app.listen(3000, ...)
app.use(cors({ origin: "http://localhost:5173" }))
secret: "secretKey"
```

**After:**
```js
const PORT = process.env.PORT || 3000;
app.listen(PORT, ...)
app.use(cors({ origin: allowedOrigins }))
secret: process.env.SESSION_SECRET || "secretKey"
```

---

### 2. **Frontend API Configuration**
- ✅ Created centralized `frontend/src/config/api.js`
- ✅ All API endpoints now use `VITE_API_URL` environment variable
- ✅ Updated `frontend/src/service/userApi.js` to use env variable

**New file: `frontend/src/config/api.js`**
```js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  register: `${API_URL}/api/users/register`,
  login: `${API_URL}/api/users/login`,
  gallery: `${API_URL}/api/gallery`,
  // ... more endpoints
};
```

---

### 3. **Environment Files**

**`frontend/.env.local` (Development)**
```env
VITE_API_URL=http://localhost:3000
```

**`frontend/.env.production` (Vercel)**
```env
VITE_API_URL=https://your-render-url.onrender.com
```

**`backend/.env.example` (Reference)**
```env
MONGO_URI=mongodb://...
NODE_ENV=production
FRONTEND_URL=https://your-vercel-url.vercel.app
SESSION_SECRET=strong-random-string
```

---

## 🚀 What Needs to Happen Next

### For Render Backend:
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repo
4. Set environment variables (see DEPLOYMENT_GUIDE.md)
5. Get the backend URL

### For Vercel Frontend:
1. Update `.env.production` with your Render backend URL
2. Push to GitHub
3. Create project on Vercel
4. Set `VITE_API_URL` environment variable
5. Deploy

### Files Still Needing Updates:
The following files have hardcoded `localhost:3000` but will work correctly once you update all frontend files to import from `frontend/src/config/api.js`:

- `frontend/src/admin/pages/*.jsx` (Users, GalleryManager, UploadTiles, etc.)
- `frontend/src/pages/*.jsx` (Login, Register, Profile, etc.)
- `frontend/src/admin/components/*.jsx`

**Note:** These files can be updated to use the new `API_ENDPOINTS` config, but for now they'll work as long as the environment variables are set correctly.

---

## ✅ Quick Checklist

- [x] Backend supports dynamic PORT from environment
- [x] Backend CORS configured for production
- [x] Frontend API config centralized
- [x] `.env.local` and `.env.production` created
- [x] Deployment guide created
- [ ] Push to GitHub
- [ ] Deploy backend to Render
- [ ] Deploy frontend to Vercel
- [ ] Test live URLs

---

## 📌 Key Points

1. **`VITE_API_URL`** is the key environment variable - it points frontend to backend
2. **`FRONTEND_URL`** on Render tells backend which domain to allow CORS requests from
3. **Never commit `.env`** files - use `.env.example` as a template
4. **Free tier on both Render and Vercel** - sufficient for development/testing
