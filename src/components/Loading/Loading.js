import React from "react";
import PropTypes from "prop-types";
import styles from "./Loading.module.css";

export const Loading = ({ text }) => { 
  return (
    <div className={`${styles["loading-wrapper"]} d-flex flex-column`}>
      <div className={`${styles["lds-dual-ring"]} `}></div>
      <b>{text}</b>
    </div>
  );
};
Loading.propTypes = {
  text: PropTypes.string.isRequired,
};
