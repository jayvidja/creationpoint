import "../about.css";

export default function AboutContent() {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About  <span className="orange">CREATION </span>
            <span>POINT</span></h1>
          <p>
            Designing elegant spaces with premium tiles and modern interior
            solutions that redefine luxury living.
          </p>
        </div>
      </section>

      {/* COMPANY SECTION */}
      <section className="about-contact-section">
        <div className="about-content-container">

          <div className="about-text-5">
            <h2>Who We Are</h2>
            <p>
              We are a premier tile design firm committed
               to delivering high-quality, functional 
               surfacing solutions for contemporary living. 
               With years of industry expertise, we specialize 
               in sourcing premium materials and engineering 
               layouts that balance durability with sophisticated style. 
                
            </p>
            <p>
              Our goal is to simplify the renovation process by providing 
               expert guidance, technical precision, and a curated selection 
               of world-class designs.
            </p>
          </div>

          <div className="about-contact-image">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
              alt="Interior Design"
            />
          </div>

        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          To provide world-class tile collections that combine style,
          strength, and sustainability — making every space timeless.
        </p>
      </section>

      {/* VALUES SECTION */}
      <section className="about-values">
        <div className="value-card">
          <h3>Quality</h3>
          <p>Premium materials crafted with precision and durability.</p>
        </div>

        <div className="value-card">
          <h3>Innovation</h3>
          <p>Modern designs inspired by global interior trends.</p>
        </div>

        <div className="value-card">
          <h3>Trust</h3>
          <p>Building long-term relationships with transparency.</p>
        </div>
      </section>

    </div>
  );
}
