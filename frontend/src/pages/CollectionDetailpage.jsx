import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "../config/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./CollectionDetailpage.css";

export default function CollectionDetailpage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // ✅ 1. Get current image
      const currentRes = await axios.get(
        `${API_ENDPOINTS.gallery}/${id}`
      );
      setCurrentImage(currentRes.data);

      // ✅ 2. Get all images (for related)
      const allRes = await axios.get(
        API_ENDPOINTS.gallery
      );

      const filtered = allRes.data.filter(
        (img) => img._id !== id
      );

      setRelatedImages(filtered);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // 🔄 Navigate instead of local state change
  const handleRelatedClick = (imgId) => {
    navigate(`/collection/${imgId}`);
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!currentImage) {
    return (
      <div className="collection-detail-page">
        <Navbar />
        <div className="container">
          <h2>Collection not found</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="collection-detail-page">
        <Navbar />

        <div className="container">
          <div className="collection-detail">
            
            {/* IMAGE */}
            <div className="detail-image-container">
              <img
                src={currentImage.image}
                alt={currentImage.name}
                className="detail-image"
                onClick={() => setFullscreenImage(currentImage)}
              />
            </div>

            {/* CONTENT */}
            <div className="detail-content">
              <h1>{currentImage.name}</h1>
              <p>{currentImage.description}</p>

              <button
                className="back-button"
                onClick={() => navigate("/collection")}
              >
                ← Back to Collections
              </button>
            </div>
          </div>
        </div>

        {/* RELATED */}
        <div className="related-images">
          <h3>More from this Collection</h3>

          <div className="related-gallery">
            {relatedImages.map((img) => (
              <div
                key={img._id}
                className="related-item"
                onClick={() => handleRelatedClick(img._id)}
              >
                <img src={img.image} alt={img.name} />

                <div className="image-info">
                  <h4>{img.name}</h4>
                  <p>{img.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>

      {/* FULLSCREEN VIEW */}
      {fullscreenImage && (
        <div
          className="image-viewer"
          onClick={() => setFullscreenImage(null)}
        >
          <span
            className="close-viewer"
            onClick={() => setFullscreenImage(null)}
          >
            &times;
          </span>

          <img
            src={fullscreenImage.image}
            alt={fullscreenImage.name}
          />
        </div>
      )}
    </>
  );
}