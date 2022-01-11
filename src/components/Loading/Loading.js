import React from "react";
import PropTypes from "prop-types";

export const Loading = ({ text }) => {
  return (
    <div className="d-flex flex-column range-wrapper">
      <div className="loading lds-dual-ring"></div>
      <b>{text}</b>
    </div>
  );
};
Loading.propTypes = {
  text: PropTypes.string.isRequired,
};
