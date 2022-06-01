import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Input = (props) => {
  const { type } = props;
  const [t] = useTranslation("global");
  return (
    <input
      {...props}
      type="number"
      name={`${type}Input`}
      data-cy={`${type}Input`}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  "aria-label": PropTypes.string.isRequired,
};

export default Input;
