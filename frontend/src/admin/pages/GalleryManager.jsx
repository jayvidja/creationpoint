import { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import "../styles/admin.css";

function GalleryManager() {

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await axios.get(API_ENDPOINTS.gallery);
    setImages(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this gallery item?")) return;

    try {
      await axios.delete(`${API_ENDPOINTS.gallery}/${id}`);
      setImages((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete the gallery item. Please try again.");
    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-main">

        <AdminHeader />

        <div className="upload-container">

          <h2>Gallery Manager</h2>

          <div className="gallery-grid">

            {images.map((item) => (
              <div key={item._id} className="gallery-card">

                <img src={item.image} alt={item.name} />

                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default GalleryManager;