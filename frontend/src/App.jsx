import "bootstrap/dist/css/bootstrap.css";
import inventory from "./inventory.mjs";
import ComposeSalad from "./ComposeSalad";
import { useState } from "react";
import ViewOrder from "./ViewOrder";
import Salad from "./Salad.mjs";
import Header from "../components/header";
import Foteer from "../components/Foteer";
import { useNavigation, Outlet } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";

import BootstrapSpinner from "../components/BootstrapSpinner";
import NiceNavbar from "../components/NiceNavbar";

function App() {
  const [shopCards, setShopCards] = useState(() => {
    const storedCards = window.localStorage.getItem("shopCards");
    return storedCards ? Salad.parse(storedCards) : [];
  });

  const update = (salad) => {
    const updatedCart = [...shopCards, salad];
    setShopCards(updatedCart);
    window.localStorage.setItem("shopCards", JSON.stringify(updatedCart));
  };

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <NiceNavbar />

      {isLoading ? (
        <BootstrapSpinner />
      ) : (
        <Outlet context={{ shopCards, setShopCards: update }} />
      )}

      <Foteer />
    </>
  );
}

export default App;
