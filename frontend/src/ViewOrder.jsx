import { Outlet, useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import React from "react";

function decodeToken(token) {
  // Implement the JWT decode logic here to extract user_id from the token
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

function ViewOrder() {
  const { shopCards } = useOutletContext();

  const sendOrder = async () => {
    const token = localStorage.getItem("userToken"); // Retrieves token from localStorage
    if (!token) {
      toast.error("Not authenticated");
      return;
    }

    const userId = decodeToken(token).user_id; // Decode token to get user_id

    const orders = shopCards.map((order) => ({
      user_id: userId, // Include user_id in each order
      foundation: order.ingredients.foundation,
      protein: order.ingredients.protein,
      dressing: order.ingredients.dressing,
      extras: order.ingredients.extras.join(", "),
      uuid: order.uuid,
    }));

    try {
      const response = await fetch("http://localhost:5001/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Adds token to request headers
        },
        body: JSON.stringify(orders),
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
  };

  return (
    <div>
      <Toaster position="top-center" />
      <ul>
        {shopCards.map((order, index) => (
          <li key={order.uuid}>
            <strong>Order {index + 1}</strong>
            <br />
            <strong>Foundation:</strong> {order.ingredients.foundation} <br />
            <strong>Protein:</strong> {order.ingredients.protein} <br />
            <strong>Dressing:</strong> {order.ingredients.dressing} <br />
            <strong>Extras:</strong> {order.ingredients.extras.join(", ")}{" "}
            <br />
            <strong>UUID:</strong> {order.uuid}
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
