import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import "../styles/admin.css";

function GalleryManager() {

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await axios.get("http://localhost:3000/api/gallery");
    setImages(res.data);
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

                <img src={item.image} />

                <h4>{item.name}</h4>
                <p>{item.description}</p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default GalleryManager;