import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function CTASection() {
  return (
    <div className="bg-success py-5">
      <Container className="px-0">
        {/* Första raden */}
        <Row
          className="align-items-center bg-white mx-auto"
          style={{ maxWidth: "1000px" }}
        >
          <Col md={6} className="p-4 text-center text-md-start">
            <h2 className="h4 text-danger mb-3">Hitta våra restauranger</h2>
            <hr className="my-3 mx-auto mx-md-0 w-25 border-2 border-dark" />
            <p className="text-muted mb-4">
              Information om våra restauranger finns på sidan våra restauranger.
              Där finns information som öppettider, adress och övrig info! Vi
              finns i både Malmö och Lund!
            </p>
            <Button
              href="/vara-restauranger"
              variant="danger"
              className="px-4 py-2"
            >
              Våra Restauranger →
            </Button>
          </Col>
          <Col md={6} className="p-0">
            <img
              src="/src/assets/images/cta1.png"
              alt="Restaurang"
              className="img-fluid"
              style={{
                maxHeight: "100%",
                width: "100%",
                objectFit: "cover",
                margin: "0",
              }}
            />
          </Col>
        </Row>

        {/* Andra raden */}
        <Row
          className="align-items-center bg-white mx-auto"
          style={{ maxWidth: "1000px" }}
        >
          <Col md={6} className="p-0">
            <img
              src="/src/assets/images/cta2.png"
              alt="Restaurang"
              className="img-fluid"
              style={{
                maxHeight: "100%",
                width: "100%",
                objectFit: "cover",
                margin: "0",
              }}
            />
          </Col>
          <Col md={6} className="p-4 text-center text-md-start">
            <h2 className="h4 text-danger mb-3">Hitta våra restauranger</h2>
            <hr className="my-3 mx-auto mx-md-0 w-25 border-2 border-dark" />
            <p className="text-muted mb-4">
              Information om våra restauranger finns på sidan våra restauranger.
              Där finns information som öppettider, adress och övrig info! Vi
              finns i både Malmö och Lund!
            </p>
            <Button
              href="/vara-restauranger"
              variant="danger"
              className="px-4 py-2"
            >
              Våra Restauranger →
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CTASection;
