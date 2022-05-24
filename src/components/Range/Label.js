import React from "react";
import { useTranslation } from "react-i18next";

const Label = (props) => {
  const { currencyType, htmlFor } = props;
  const [t] = useTranslation("global");
  return (
    <label htmlFor={htmlFor} aria-label={t("label.currency")}>
      {currencyType}
    </label>
  );
};

export default Label;
