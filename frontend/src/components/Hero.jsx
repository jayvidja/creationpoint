import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/mainimage_1.jpg",
    smallText: "Discover",
    bigText: "Timeless Marble",
  },
  {
    image: "/images/mainimage_3.jpg",
    smallText: "Explore",
    bigText: "Luxury Tiles",
  },
  {
    image: "/images/mainimage_4.jpeg",
    smallText: "Experience",
    bigText: "Modern Designs",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero"
      id="hero"
      style={{
        backgroundImage: `url(${slides[current].image})`,
      }}
    >
      <div className="overlay"></div>

      {/* TEXT ON IMAGE */}
      <div className="slide-text">
        <span id="slideSmall">{slides[current].smallText}</span>
        <h1 id="slideBig">{slides[current].bigText}</h1>
      </div>

      {/* DOTS */}
      <div className="dots" id="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${current === index ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}
