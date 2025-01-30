import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import React from "react";

function decodeToken(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

function ViewOrder() {
  const { shopCards } = useOutletContext();

  const sendOrder = async () => {
    const token = localStorage.getItem("userToken"); // Hämta token
    if (!token) {
      toast.error("Not authenticated");
      return;
    }

    const decodedToken = decodeToken(token);
    if (!decodedToken || !decodedToken.user_id) {
      toast.error("Invalid token");
      return;
    }

    const userId = decodedToken.user_id; // Extrahera user_id

    for (const order of shopCards) {
      const orderData = {
        user_id: userId,
        foundation: order.ingredients.foundation || "Unknown",
        protein: order.ingredients.protein || "Unknown",
        dressing: order.ingredients.dressing || "Unknown",
        extras: order.ingredients.extras?.join(", ") || "None",
        uuid: order.uuid || null,
      };

      console.log("Sending order:", orderData); // Logga för felsökning

      try {
        const response = await fetch("http://localhost:5001/orders/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();
        if (response.ok) {
          toast.success(`Order ${data.order} is ${data.status}`);
        } else {
          toast.error(data.message || "Failed to process order");
        }
      } catch (error) {
        console.error("Failed to send order", error);
        toast.error(`Failed to send order: ${error.toString()}`);
      }
    }
  };

  return (
    <div>
      <Toaster position="top-center" />
      <ul>
        {shopCards.map((order, index) => (
          <li key={order.uuid}>
            <strong>Order {index + 1}</strong>
            <br />
            <strong>Foundation:</strong>{" "}
            {order.ingredients.foundation || "Unknown"} <br />
            <strong>Protein:</strong> {order.ingredients.protein || "Unknown"}{" "}
            <br />
            <strong>Dressing:</strong> {order.ingredients.dressing || "Unknown"}{" "}
            <br />
            <strong>Extras:</strong>{" "}
            {order.ingredients.extras?.join(", ") || "None"} <br />
            <strong>UUID:</strong> {order.uuid || "N/A"}
          </li>
        ))}
      </ul>
      <button onClick={sendOrder} className="btn btn-success">
        Place Order
      </button>
    </div>
  );
}

export default ViewOrder;
