import { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS, { normalizeImageUrl } from "../../config/api";

function Gallery() {

  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const res = await axios.get(API_ENDPOINTS.gallery);
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="gallery">

      {images.map((item) => (
        <div key={item._id} className="card">

          <img src={normalizeImageUrl(item.image)} alt="" />

          <h3>{item.name}</h3>
          <p>{item.description}</p>

        </div>
      ))}

    </div>
  );
}

export default Gallery;