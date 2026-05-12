import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS, { normalizeImageUrl } from "../config/api";
import "./MasonryGallery.css";

export default function MasonryGallery() {
  const [tiles, setTiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTiles();
  }, []);

  const fetchTiles = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.gallery);
      setTiles(res.data);
    } catch (error) {
      console.error("Error fetching tiles:", error);
    }
  };

  return (
    <section className="masonry-section">
      <h2 className="title">Our Collection</h2>

      <div className="masonry-columns">
        {tiles.map((tile) => (
          <div
            key={tile._id}
            className="masonry-card"
            onClick={() => navigate(`/collection/${tile._id}`)}
          >
            <img src={normalizeImageUrl(tile.image)} alt={tile.name} />

            <div className="overlay">
              <h3>{tile.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}