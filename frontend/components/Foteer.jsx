import React from "react";
import { Container } from "react-bootstrap";
import "../custom.css";

function Footer() {
  return (
    <footer className="pink-navbar py-4">
      <Container className="text-center">
        <img
          src="../src/assets/images/logo.png"
          alt="Grönt o Gott Logo"
          style={{ width: "150px", marginBottom: "20px" }}
        />
        <p className="text-white mb-1">
          <a
            href="/integritetspolicy"
            className="text-white text-decoration-none"
          >
            Integritetspolicy
          </a>{" "}
          |
          <a href="/jobba-hos-oss" className="text-white text-decoration-none">
            {" "}
            Jobba hos oss
          </a>
        </p>
        <p className="text-white">&copy; 2025 Grönt o Gott i Lund AB</p>
      </Container>
    </footer>
  );
}

export default Footer;
