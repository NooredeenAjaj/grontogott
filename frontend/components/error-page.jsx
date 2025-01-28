import { useRouteError } from "react-router-dom";
export default function ErroPage() {
  const error = useRouteError();
  return (
    <div className="container" id="error-page">
      <h1> There is no such page</h1>
    </div>
  );
}
