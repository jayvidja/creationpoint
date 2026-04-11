import { useState } from "react";
import "../contact.css";

export default function ContactContent() {

  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-copy">
          <h1>
            VISIT <span>CREATION </span>POINT
          </h1>
          <p>
            Experience premium tile design in our exclusive studio space.
          </p>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="contact-info-section">
        <div className="contact-info-box">
          <h2>Studio Information</h2>

          <p className="info-desc">
            Our studio offers a curated collection of luxury tiles tailored for
            modern interiors and architectural excellence.
          </p>

          <div className="info-grid">

            <div className="info-card">
              <h4>Location</h4>
              <p>210 Marble Avenue, New York, NY</p>
            </div>

            <div className="info-card">
              <h4>Email</h4>
              <p>enquiries@creationpoint.com</p>
            </div>

            <div className="info-card">
              <h4>Phone</h4>
              <p>+1 212 555 1234</p>
            </div>

            <div className="info-card">
              <h4>Working Hours</h4>
              <p>Mon – Sat: 9:00 AM – 6:00 PM</p>
            </div>

          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="map-modern" style={{ position: "relative" }}>

        {/* 🔥 Loader */}
        {!mapLoaded && (
          <div className="map-loader">
            Loading Map...
          </div>
        )}

        <iframe
          title="map"
          src="https://www.google.com/maps?q=panchasarroadMorbi%20Gujarat&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          onLoad={() => setMapLoaded(true)}
        ></iframe>

      </section>

    </div>
  );
}