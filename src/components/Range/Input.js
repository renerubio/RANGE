import React from "react";
import { useTranslation } from "react-i18next";

const Input = (props) => {
  const { id } = props;
  const [t] = useTranslation("global");
  return <input {...props} type="number" name={id} data-cy={id} />;
};

export default Input;
