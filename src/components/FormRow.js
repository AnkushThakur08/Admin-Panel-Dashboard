import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row-login">
      <label htmlFor={name} className="form-label-login">
        {name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input-login"
      />
    </div>
  );
};

export default FormRow;
