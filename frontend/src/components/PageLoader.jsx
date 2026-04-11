import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loader visible for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div id="page-loader">
      <div className="loader-box">
        <span className="loader-logo">
          <span className="loader-orange">CREATION</span> POINT
        </span>
        <div className="loader-line"></div>
      </div>
    </div>
  );
}
