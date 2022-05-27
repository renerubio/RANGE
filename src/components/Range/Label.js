import React from "react";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

const Label = ({ currencyType, htmlFor }) => {
  const [t] = useTranslation("global");
  return (
    <label htmlFor={htmlFor} aria-label={t("label.currency")}>
      {currencyType}
    </label>
  );
};
Label.propTypes = {
  currencyType: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
};
export default Label;
