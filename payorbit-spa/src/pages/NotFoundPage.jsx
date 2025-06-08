import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main style={{ textAlign: "center", padding: "50px", color: "var(--text-color)" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="btn btn-primary" style={{marginTop: "20px"}}>
        Go to Homepage
      </Link>
    </main>
  );
}