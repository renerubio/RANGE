import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  const { "aria-label": aria, children, main } = props;
  return main ? (
    <header>
      <h1 aria-label={aria}>{children}</h1>
    </header>
  ) : (
    <h2 aria-label={aria}>{children}</h2>
  );
};

Header.propTypes = {
  children: PropTypes.string.isRequired,
  "aria-label": PropTypes.string.isRequired,
  main: PropTypes.bool,
};

export default Header;
