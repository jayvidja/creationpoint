import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS, { normalizeImageUrl } from "../config/api";

export default function Collection() {

  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  // ✅ Fetch from backend
  useEffect(() => {
    fetchTiles();
  }, []);

  const fetchTiles = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.gallery);
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="collection-section">

      <h2>Our Collection</h2>
      <div className="collection-line"></div>

      <div className="collection-slider">

        {items.map((item) => (
          <div
            className="collection-card"
            key={item._id}
            onClick={() => navigate("/collection")}
          >
            <img src={item.image} alt="" />
            <span>{item.name}</span>
          </div>
        ))}

      </div>

    </section>
  );
}