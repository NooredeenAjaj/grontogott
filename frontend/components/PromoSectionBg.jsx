import React from "react";
import { Container } from "react-bootstrap";
import "../custom.css";

function PromoSectionWithBg() {
  return (
    <div className="promo-section-bg py-6">
      <div className="black-overlay"></div>
      <Container className="text-center py-5">
        <h2
          className="promo-title prim-text-color"
          style={{ fontSize: "3.2rem" }}
        >
          Har du en stor beställning?
        </h2>
        <p
          className="promo-subtitle text-white"
          style={{ fontSize: "1.1rem", fontWeight: "bold" }}
        >
          Om du har en beställning på fler än 20 sallader eller en beställning
          <br></br>
          som utmärker sig så kan du skicka in en specialbeställning. Det gör du
          <br></br>
          genom att klicka på knappen nedan!
        </p>
        <button type="button" className="btn pink-navbar text-white">
          Läs mer
        </button>
      </Container>
    </div>
  );
}

export default PromoSectionWithBg;
