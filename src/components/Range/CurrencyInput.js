import React from "react";
import PropTypes from "prop-types";

import styles from "./Range.module.css";

import Label from "./Label";
import Input from "./Input";

import { useTranslation } from "react-i18next";

const CurrencyInput = ({
  currencyType,
  min,
  max,
  readOnly,
  inputVal,
  handleChange,
  type,
}) => {
  const [t] = useTranslation("global");
  return (
    <section className="currency">
      <Input
        type={type}
        className={styles[type]}
        value={inputVal}
        onChange={handleChange}
        readOnly={readOnly}
        min={min}
        max={max}
        aria-label={
          readOnly ? t(`${type}-input.aria-readonly`) : t(`${type}-input.aria`)
        }
      />
      <Label htmlFor={`${type}Input`} {...{ currencyType }} />
    </section>
  );
};

CurrencyInput.propTypes = {
  type: PropTypes.string.isRequired,
  currencyType: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  readOnly: PropTypes.bool,
  inputVal: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CurrencyInput;
