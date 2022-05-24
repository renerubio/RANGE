import React from "react";
import { useTranslation } from "react-i18next";

const Button = (props) => {
  const { currencyType, htmlFor } = props;
  const [t] = useTranslation("global");
  return (
    <button htmlFor={htmlFor} aria-label={t("label.currency")}>
      {currencyType}
    </button>
  );
};

export default Button;
