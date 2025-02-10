import React from "react";
import { Container } from "react-bootstrap";
import "../custom.css";

function PromoSectionWithBg() {
  return (
    <>
      {/* Section with white background */}
      <div className="white-section py-5">
        <Container className="text-center py-5">
          <h2
            className="promo-title"
            style={{ fontSize: "2.5rem", color: "#dc2579" }}
          >
            Vill du veta mer om oss?
          </h2>
          <button type="button" className="btn pink-navbar text-white">
            Om Oss
          </button>
        </Container>
      </div>

      {/* Footer with pink background */}
      <footer className="pink-footer py-4">
        <Container className="text-center">
          <img
            src="../path-to-logo.png"
            alt="Logo"
            style={{ width: "150px", marginBottom: "20px" }}
          />
          <p className="text-white mb-1">Integritetspolicy | Jobba hos oss</p>
          <p className="text-white">&copy; 2025 Grontogott i Lund AB</p>
        </Container>
      </footer>
    </>
  );
}

export default PromoSectionWithBg;
