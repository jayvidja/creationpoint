import { useEffect, useState } from "react";
import axios from "axios";

function Gallery() {

  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const res = await axios.get("http://localhost:3000/api/gallery");
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="gallery">

      {images.map((item) => (
        <div key={item._id} className="card">

          <img src={item.image} alt="" />

          <h3>{item.name}</h3>
          <p>{item.description}</p>

        </div>
      ))}

    </div>
  );
}

export default Gallery;