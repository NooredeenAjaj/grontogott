import React from "react";
import { Container, Button } from "react-bootstrap";
import "../custom.css";

function PromoSection() {
  return (
    <div className="promo-section py-5">
      <Container className="text-center py-5">
        <h2 className="promo-title prim-text-color">
          Samla stämplar med vårt digitala stämpelkort
        </h2>
        <p className="promo-subtitle prim-text-color">
          Vill du att ditt företag ska synas i vår app?
        </p>
        <button type="button" className="btn pink-navbar text-white">
          Läs mer
        </button>
      </Container>
    </div>
  );
}
export default PromoSection;
