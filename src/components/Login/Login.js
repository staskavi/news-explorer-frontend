import React from "react";
import PopupFormInput from "../PopupFormInput/PopupFormInput";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function Login({
  isOpen,
  onClose,
  onSignUpClick,
  onSubmit,
  isError,
  resError,
}) 
  {
    const [values, setValues] = React.useState({email: "", password: "", name: ""});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);
  
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
      name="signin"
      title="Sign in"
      buttonTitle="Sign in"
      linkTitle="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onLinkClick={onSignUpClick}
      onSubmit={handleSubmit}
      isValid={isValid}
      isError={isError}
      resError={resError}
    >
      <PopupFormInput
        values={values}
        errors={errors}
        handleChange={handleChange}
      />
    </PopupWithForm>
  );
}
