import React, { useState } from "react";
import bg from "../src/assets/videos/gronto-background.mp4";
import { Container, Button } from "react-bootstrap";
import logo from "../src/assets/images/logo.png"; // Se till att lägga till en logotypbild
import "../custom.css";

function VideoBackground() {
  // useState-hook för att hålla koll på om videon har spelats klart
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
  };

  return (
    <div className={`video-bg-container ${isVideoEnded ? "bg-pink" : ""} `}>
      <video
        autoPlay
        muted
        className="video-bg" // CSS-klass för videons stil och positionering
        onEnded={handleVideoEnd} // Kör funktionen handleVideoEnd när videon är slut
      >
        <source src={bg} type="video/mp4" />
      </video>
      <Container className="overlay-content text-center  ">
        {/* Logotypbilden, centreras på skärmen */}
        <img src={logo} alt="Logotyp" className="logo" />
        {/* Bootstrap-knapp som visas under logotypen */}
        <button type="button" className=" btn pink-navbar text-white px-3">
          Beställa
        </button>
      </Container>
    </div>
  );
}

export default VideoBackground;
