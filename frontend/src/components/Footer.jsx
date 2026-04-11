export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Brand */}
        <div className="footer-col brand">
          <div className="footer-box">
            <h2>
              <span className="orange-text">CREATION</span>{" "}
              <span className="white-text">POINT</span>
            </h2>
          </div>

          <p>
            Tile designers are creative professionals who combine artistic vision
            with technical skill to conceptualize, design, and produce patterns,
            textures.
          </p>

          <div className="social">
            <span><i className="fa-brands fa-linkedin-in"></i></span>
            <span><i className="fab fa-facebook-f"></i></span>
            <span><i className="fab fa-instagram"></i></span>
          </div>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h3>Links</h3>
          <ul>
            <li>Home</li>
            <li>Collection</li>
            <li>Contact</li>
            <li>About</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col contact">
          <h3>Have a Questions?</h3>

          <div className="info">
            <i className="fas fa-phone"></i>
            <span>+91 392 3929 210</span>
          </div>

          <div className="info">
            <i className="fas fa-envelope"></i>
            <span>VELORADESIGNS@gmail.com</span>
          </div>
        </div>

        {/* Address */}
        <div className="footer-col contact">
          <h3>Address</h3>

          <div className="info">
            <i className="fas fa-map-marker-alt"></i>
            <span>
              CREATION POINT, PANCHASAR ROAD, MORBI-363641
            </span>
          </div>

          <div className="info">
            <i className="fa-solid fa-building"></i>
            <span>
              9:30am – 7:00pm, MON – SAT
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
