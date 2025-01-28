function SelectInput({ label, id, value, onChange, options }) {
  const getFeedbackMessage = () => {
    return id ? `Vänligen välj en  ${id}` : `Vänligen gör ett val`;
  };
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        required
        value={value}
        className="form-select"
        id={id}
        onChange={onChange}
      >
        <option value="">Gör ditt val</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}{" "}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{getFeedbackMessage()}</div>
      {/* FRÅGA: varför ska denna div läggs efter  */}
    </div>
  );
}

export default SelectInput;
