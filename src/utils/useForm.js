/* eslint-disable no-useless-escape */
import React, { useCallback } from "react";

export function useForm() {
  const [values, setValues] = React.useState({email: "", password: "", name: ""});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value.replace(/[*|\"<>[\]{}`;&$]+/, " ");
    setValues({ ...values, [name]: filteredValue });
    setErrors({...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}