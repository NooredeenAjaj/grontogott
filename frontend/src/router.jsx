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
const urls = [
  "http://localhost:8080/foundations/",
  "http://localhost:8080/proteins/",
  "http://localhost:8080/extras/",
  "http://localhost:8080/dressings/",
];

async function inventoryLoader() {
  const inventoryPromises = [];

  try {
    const categoryPromises = urls.map((url) => safeFetchJson(url));
    const results = await Promise.all(categoryPromises);

    results.forEach((categoryData, index) => {
      const categoryUrl = urls[index];

      categoryData.forEach((ingredient) => {
        inventoryPromises.push(fetchIngredient(categoryUrl, ingredient));
      });
    });
  } catch (error) {
    console.error("Error loading inventory:", error);
  }

  const inventoryArray = await Promise.all(inventoryPromises);
  const test = inventoryArray;
  console.log(test);
  //kopierar dem in i ett nytt tomt objekt {}, vilket i slutändan gör att alla objekt i inventoryArray kombineras till ett enda objekt där nycklarna är ingrediensnamnen, och värdena är deras respektive data.
  const inventory = Object.assign({}, ...inventoryArray);
  console.log(inventory);
  await new Promise((resolve) => setTimeout(resolve, 100));
  return inventory;
}

async function fetchIngredient(base, ing) {
  const response = await fetch(base + ing);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return { [ing]: data };
}

function safeFetchJson(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${url} returned status ${response.status}`);
    }
    return response.json();
  });
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
        //loader: inventoryLoader,
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
