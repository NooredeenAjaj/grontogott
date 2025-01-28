import React from "react";
import { Container, Button } from "react-bootstrap";
import "../custom.css";
function PromoSec2() {
  return (
    <>
      <Container>
        <h2 className="promo-title prim-text-color">Hitta våra restauranger</h2>
        <p className="promo-subtitle prim-text-color">
          Information om våra restauranger finns på sidan våra restauranger. Där
          finns information som öppettider, adress och övrig info! Vi finns i
          både Malmö och Lund!
        </p>
        <button type="button" className=" btn pink-navbar text-white px-3">
          Beställa
        </button>
      </Container>
    </>
  );
}
export default PromoSec2;
