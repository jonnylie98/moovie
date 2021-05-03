import { useState } from "react";

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  const resetValues = () => {
    setValues(initialState);
  };

  return [
    values,
    (e) => {
      // Return function to set value of the html element based on triggered event.
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
    resetValues,
  ];
};

export default useForm;
