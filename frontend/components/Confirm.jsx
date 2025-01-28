import { useParams, useOutletContext } from "react-router-dom";

function Confirm() {
  const { uuid } = useParams(); // Get the UUID from the URL
  const { shopCards } = useOutletContext(); // Accessing shared data passed from ViewOrder

  const order = shopCards.find((o) => o.uuid === uuid); // Find the specific order by UUID

  return (
    <div className="container mt-5">
      {order ? (
        <div className="alert alert-success">
          <h6 className="mb-3">Order Confirmation</h6>

          <p>
            En sallad har lagts till i varukorgen:
            {order.ingredients.foundation} {order.ingredients.dressing}{" "}
            {order.ingredients.extras.join(", ")}{" "}
          </p>
        </div>
      ) : (
        <div className="alert alert-danger">
          <p>Order not found. Please check your order ID.</p>
        </div>
      )}
    </div>
  );
}

export default Confirm;
