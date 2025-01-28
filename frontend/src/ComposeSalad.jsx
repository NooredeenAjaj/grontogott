import { useState } from "react";
import SelectInput from "../components/SelectInput";
import Salad from "./Salad.mjs";
//import inventory from "./inventory.mjs";
import { useOutletContext, useNavigate, useLoaderData } from "react-router-dom";

function ComposeSalad() {
  const { setShopCards } = useOutletContext();
  const navigate = useNavigate();
  const inventory = useLoaderData();
  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [dressing, setDressing] = useState("");
  const [touched, setTouched] = useState(false);
  const extrasList = Object.keys(inventory).filter(
    (name) => inventory[name].extra
  );
  const foundationList = Object.keys(inventory).filter(
    (name) => inventory[name].foundation
  );
  const proteinList = Object.keys(inventory).filter(
    (name) => inventory[name].protein
  );
  const dressingList = Object.keys(inventory).filter(
    (name) => inventory[name].dressing
  );
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
    setTouched(true); // Mark the form as touched to show feedback
    if (!event.target.checkValidity()) {
      event.preventDefault(); // Prevent form submission if validation fails
      return; // Exit the function if validation fails
    }

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

    //console.log(saladObj.uuid);

    setTouched(false);
    //avigate("/view-order" ``);
    //det var ``och inte ´´
    navigate(`/view-order/confirm/${saladObj.uuid}`);

    event.preventDefault();
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
