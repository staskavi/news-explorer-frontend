import React from "react";

export default function PopupFormInputs({ values, errors, handleChange }) {
  return (
    <>
      <p className="popup__form-input-title">Email</p>
      <input
        className="popup__form-input"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Enter email"
        required
      />
      {errors.email && (
        <span className="popup__form-input-error">{errors.email}</span>
      )}
      <p className="popup__form-input-title">Password</p>
      <input
        className="popup__form-input"
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Enter password"
        minLength="8"
        required
      />
      {errors.password && (
        <span className="popup__form-input-error">{errors.password}</span>
      )}
    </>
  );
}
