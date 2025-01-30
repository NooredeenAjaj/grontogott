import { createBrowserRouter } from "react-router-dom";
import ErroPage from "../components/error-page";
import App from "./App";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import Confirm from "../components/Confirm";
import VideoBackground from "../components/VideoBackground";
import BootstrapSpinner from "../components/BootstrapSpinner";
import PromoSection from "../components/PromoSection";
import PromoSec2 from "../components/PromoSec2";
import LoginPage from "./LoginPage";

//import inventory from "./inventory.mjs";
// const urls = {
//   foundations: "http://localhost:8080/foundations/",
//   proteins: "http://localhost:8080/proteins/",
//   extras: "http://localhost:8080/extras/",
//   dressings: "http://localhost:8080/dressings/",
// };

async function inventoryLoader() {
  try {
    const response = await fetch("http://localhost:5001/inventory");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const items = await response.json();
    return items.map((item) => ({
      ...item,
      foundation: !!item.foundation,
      protein: !!item.protein,
      extra: !!item.extra, // Antar att extra finns i ditt objekt
      vegan: !!item.vegan,
      gluten: !!item.gluten,
      lactose: !!item.lactose,
    }));
  } catch (error) {
    console.error("Failed to fetch inventory:", error);
    throw error;
  }
}

const router = createBrowserRouter([
  {
    Component: App,

    children: [
      {
        index: true,
        element: (
          <>
            <VideoBackground />

            <PromoSection />
            <PromoSec2 />
          </>
        ),
      },

      {
        path: "compose-salad",
        loader: inventoryLoader,
        Component: ComposeSalad,
      },
      {
        path: "Login-page",

        Component: LoginPage,
      },
      {
        path: "view-order",
        Component: ViewOrder,
        children: [{ path: "confirm/:uuid", element: <Confirm /> }],
      },
      {
        index: true,
        element: <p>Welcome to my own salad bar</p>,
      },
      {
        path: "*",
        Component: ErroPage,
      },
    ],
  },
]);
export default router;
