import { useState, useEffect } from "react";
import "./CollectionHero.css";

const slides = [
  {
    image: "/images/mainimage_1.jpg",
    small: "EXPLORE",
    big: "Luxury Tiles",
  },
  {
    image: "/images/mainimage_2.jpg",
    small: "PREMIUM",
    big: "Marble Collection",
  },
  {
    image: "/images/mainimage_3.jpg",
    small: "MODERN",
    big: "Granite Designs",
  },
];

export default function CollectionHero() {
  const [index, setIndex] = useState(0);

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${slides[index].image})` }}
    >
      <div className="overlay"></div>

      {/* Text */}
      <div className="slide-text">
        <span>{slides[index].small}</span>
        <h1>{slides[index].big}</h1>
      </div>

      {/* Dots */}
      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </section>
  );
}
