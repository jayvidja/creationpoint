import { useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import "../styles/admin.css";

function UploadTiles() {

  const [tileName, setTileName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    // Create preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {

    if (!tileName || !description || !image) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", tileName);
    formData.append("description", description);

    try {
      await axios.post(
        "http://localhost:3000/api/gallery/upload",
        formData
      );

      alert("Uploaded Successfully ✓");

      setTileName("");
      setDescription("");
      setImage(null);
      setPreview(null);

    } catch (err) {
      console.log(err);
      alert("Upload Failed ✗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-main">

        <AdminHeader />

        <div className="upload-container">

          <div className="upload-box">
            <h2 className="page-title">Upload New Tile</h2>

            <div>
              <label>Tile Name</label>
              <input
                type="text"
                placeholder="Enter tile name..."
                value={tileName}
                onChange={(e) => setTileName(e.target.value)}
                className="tile-input"
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                placeholder="Enter detailed description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="tile-input"
                rows="5"
              />
            </div>

            <div className="file-input">
              <label>Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="tile-input"
              />
            </div>

            {preview && (
              <div>
                <label>Image Preview</label>
                <img src={preview} alt="Preview" className="preview-img" />
              </div>
            )}

            <button 
              onClick={handleUpload}
              className="upload-btn"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Tile"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default UploadTiles;