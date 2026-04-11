import { Routes, Route, Navigate } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import Home from "./pages/Home";
import CollectionsPage from "./pages/CollectionsPage";
import CollectionDetailpage from "./pages/CollectionDetailpage";
import RedirectToCollection from "./components/RedirectToCollection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// ADMIN
import AdminDashboard from "./admin/pages/AdminDashboard";
import UploadTiles from "./admin/pages/UploadTiles";
import GalleryManager from "./admin/pages/GalleryManager";
import Users from "./admin/pages/Users";

function App() {
  return (
    <>
      <PageLoader />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* ✅ MAIN COLLECTION ROUTES */}
        <Route path="/collection" element={<CollectionsPage />} />
        <Route path="/collection/:id" element={<CollectionDetailpage />} />

        {/* 🔥 PERMANENT FIX (redirect old /tile → new route) */}
        <Route path="/tile/:id" element={<RedirectToCollection />} />

        {/* OTHER ROUTES */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/upload" element={<UploadTiles />} />
        <Route path="/admin/gallery" element={<GalleryManager />} />
        <Route path="/admin/users" element={<Users />} />

        {/* ❌ Unknown routes fallback */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;