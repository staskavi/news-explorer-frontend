import {React, useState} from "react";
import "./Register.css";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import PopupFormInput from "../PopupFormInput/PopupFormInput";

export default function Register({
  isOpen,
  onClose,
  onSubmit,
  onSignInClick,
  isError,
  resError,
}) 
  {
    const [values, setValues] = useState({email: "", password: "", name: ""});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
       /* eslint-disable no-useless-escape */
      let filteredValue = value.replace(/[*|\"<>[\]{}`;&$]+/, " ");
      setValues({ ...values, [name]: filteredValue });
      setErrors({...errors, [name]: e.target.validationMessage });
      setIsValid(e.target.closest("form").checkValidity());
    };
  
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <PopupWithForm
      name="signup"
      title="Sign up"
      buttonTitle="Sign up"
      linkTitle="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLinkClick={onSignInClick}
      isValid={isValid}
      isError={isError}
      resError={resError}
    >
      <PopupFormInput
        values={values}
        errors={errors}
        handleChange={handleChange}
      />
      <p className="popup__form-input-title">Username</p>
      <input
        className="popup__form-input"
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Enter your username"
        required
      />
      {errors.name && (
        <span className="popup__form-input-error">{errors.name}</span>
      )}
    </PopupWithForm>
  );
}
