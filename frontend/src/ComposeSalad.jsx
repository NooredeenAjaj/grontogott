import { useState } from "react";
import SelectInput from "../components/SelectInput";
import Salad from "./Salad.mjs";
import { useOutletContext, useNavigate, useLoaderData } from "react-router-dom";

function ComposeSalad() {
  const { setShopCards } = useOutletContext();
  const navigate = useNavigate();

  // Antag att `useLoaderData` returnerar en array av objekt
  const inventory = useLoaderData();
  console.log(inventory);
  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [dressing, setDressing] = useState("");
  const [touched, setTouched] = useState(false);

  // Skapa listor baserade på datan, inte på objektnycklar
  const extrasList = inventory
    .filter((item) => item.extra)
    .map((item) => item.name);
  const foundationList = inventory
    .filter((item) => item.foundation)
    .map((item) => item.name);
  const proteinList = inventory
    .filter((item) => item.protein)
    .map((item) => item.name);
  const dressingList = inventory
    .filter((item) => item.dressing)
    .map((item) => item.name);

  const [extras, setExtra] = useState(
    extrasList.reduce((acc, name) => {
      acc[name] = false;
      return acc;
    }, {})
  );

  function toggleExtra(event) {
    setExtra((extras) => ({
      ...extras,
      [event.target.name]: event.target.checked,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault(); // Always prevent form submission as default action
    setTouched(true); // Mark the form as touched to show feedback

    const selectedExtras = Object.keys(extras).filter((extra) => extras[extra]);

    const saladObj = new Salad({
      ingredients: {
        foundation,
        protein,
        dressing,
        extras: selectedExtras,
      },
    });

    setShopCards(saladObj);

    setTouched(false);
    navigate(`/view-order/confirm/${saladObj.uuid}`);
  }

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <form
          onSubmit={handleSubmit}
          className={touched ? "was-validated" : ""}
          noValidate
        >
          <SelectInput
            label="Välj bas"
            id="foundation"
            value={foundation}
            onChange={(e) => setFoundation(e.target.value)}
            options={foundationList}
          />

          <SelectInput
            label="Välj protein"
            id="protein"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            options={proteinList}
          />

          <SelectInput
            label="Välj dressing"
            id="dressing"
            value={dressing}
            onChange={(e) => setDressing(e.target.value)}
            options={dressingList}
          />

          {extrasList.map((elem) => (
            <label key={elem} className="col-4">
              <input
                className="form-check-input"
                type="checkbox"
                id={elem}
                name={elem}
                checked={!!extras[elem]}
                onChange={toggleExtra}
              />
              {elem}
            </label>
          ))}

          <button type="submit" className="btn btn-primary mt-3">
            Beställ Sallad
          </button>
        </form>
      </div>
    </div>
  );
}

export default ComposeSalad;
