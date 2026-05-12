# Deployment Guide: Render + Vercel

## 📋 Prerequisites
- Render account (render.com)
- Vercel account (vercel.com)
- GitHub repository with your code
- MongoDB Atlas connection string (already configured)

---

## 🚀 Part 1: Deploy Backend to Render

### Step 1: Prepare Backend
1. Push all backend code to GitHub
2. Ensure `.env` file is NOT committed (add to `.gitignore`)
3. Backend already uses `process.env.PORT` (dynamic port support)

### Step 2: Create Render Service
1. Go to **render.com** → Sign in
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Fill in details:
   - **Name**: `creation-point-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid)

### Step 3: Add Environment Variables
In Render dashboard → Environment tab, add:

```env
MONGO_URI=mongodb://jayvidja13_db_user:JAYVIDJA123@ac-eeizmsy-shard-00-00.voja2t0.mongodb.net:27017,ac-eeizmsy-shard-00-01.voja2t0.mongodb.net:27017,ac-eeizmsy-shard-00-02.voja2t0.mongodb.net:27017/cpDB?ssl=true&replicaSet=atlas-8a4rj6-shard-0&authSource=admin&appName=Cluster0
NODE_ENV=production
SESSION_SECRET=use-a-strong-random-string-here
FRONTEND_URL=https://your-vercel-url.vercel.app
```

⚠️ **Replace `FRONTEND_URL` after you deploy to Vercel**

### Step 4: Deploy
- Click **Create Web Service**
- Render will automatically deploy from GitHub
- Wait for build to complete (3-5 mins)
- Copy your backend URL: `https://your-service-name.onrender.com`

---

## 🌐 Part 2: Deploy Frontend to Vercel

### Step 1: Get Backend URL
- From Render dashboard, copy your backend service URL
- Example: `https://creation-point-backend.onrender.com`

### Step 2: Update Environment Variable
Edit `frontend/.env.production`:

```env
VITE_API_URL=https://creation-point-backend.onrender.com
```

### Step 3: Deploy to Vercel
Option A: Using Vercel CLI
```bash
cd frontend
npm install -g vercel
vercel
# Follow prompts and select your project
```

Option B: Using Vercel Dashboard
1. Go to **vercel.com** → Sign in
2. Click **Add New...** → **Project**
3. Import from GitHub (select your repo)
4. Fill in:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 4: Add Environment Variables
In Vercel dashboard → Settings → Environment Variables:

```
VITE_API_URL = https://creation-point-backend.onrender.com
```

### Step 5: Deploy
- Click **Deploy**
- Wait for build (1-2 mins)
- Your frontend is live!
- Copy your Vercel URL: `https://your-app.vercel.app`

---

## 🔄 Part 3: Update Backend CORS

Once Vercel deployment is complete:

1. Go to Render dashboard
2. Select your backend service
3. Go to **Environment** tab
4. Update `FRONTEND_URL`:
   ```env
   FRONTEND_URL=https://your-app.vercel.app
   ```
5. Click **Save** (Render will redeploy automatically)

---

## ✅ Testing

### Test Backend
```bash
curl https://your-render-url.onrender.com/api/gallery
```

Should return gallery data ✓

### Test Frontend
1. Visit `https://your-app.vercel.app`
2. Try login/register
3. Check admin gallery upload & delete

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot connect to API"
- Check Render backend is running (check logs on Render dashboard)
- Verify `VITE_API_URL` is set correctly in Vercel
- Check CORS is allowing your Vercel domain
- Make sure backend `.env` has correct `FRONTEND_URL`

### Issue: "Uploads not showing"
- Render might be removing uploaded files (free tier limitation)
- Solution: Use cloud storage (Cloudinary, AWS S3)
- For now, uploaded files persist during session but may reset

### Issue: "Cookies/Session not working"
- Set `cookie.secure = true` only in production ✓ (already done)
- Check cookies are being sent with `credentials: 'include'` ✓ (already done)

### Issue: Build fails on Vercel
- Check `frontend/package.json` has all dependencies
- Run locally: `npm run build` to test
- Check for any hardcoded `localhost` URLs (should be using `VITE_API_URL`)

---

## 🔐 Important Security Notes

1. **Never commit `.env` files** - They contain secrets
2. **Change `SESSION_SECRET`** on Render to a strong random string
3. **Set `NODE_ENV=production`** on Render
4. **Use HTTPS everywhere** (both Render and Vercel use HTTPS by default)

---

## 📊 Your URLs After Deployment

| Service | URL |
|---------|-----|
| Backend (Render) | `https://creation-point-backend.onrender.com` |
| Frontend (Vercel) | `https://your-app.vercel.app` |
| Admin Panel | `https://your-app.vercel.app/admin-login` |
| API | `https://creation-point-backend.onrender.com/api` |

---

## 🔄 Future Updates

To deploy updates:

1. **Push to GitHub**
2. **Backend**: Render auto-deploys from GitHub (if webhooks enabled)
3. **Frontend**: Vercel auto-deploys from GitHub (if connected)

Both will rebuild and deploy automatically! 🚀
