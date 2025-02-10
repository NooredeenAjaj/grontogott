import React from "react";
import { Container } from "react-bootstrap";
import "../custom.css";

function PromoSection({ title, subtitle, buttonText, buttonLink }) {
  return (
    <div className="white-section py-5">
      <Container className="text-center py-5">
        <h2
          className="promo-title"
          style={{ fontSize: "2.5rem", color: "#dc2579" }}
        >
          {title}
        </h2>
        <p className="promo-subtitle prim-text-color">{subtitle}</p>
        <a href={buttonLink} className="btn pink-navbar text-white">
          {buttonText}
        </a>
      </Container>
    </div>
  );
}

export default PromoSection;
