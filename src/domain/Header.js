import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  const { aria, children, main } = props;
  return (
    <header>
      {main ? (
        <h1 aria-label={aria}>{children}</h1>
      ) : (
        <h2 aria-label={aria}>{children}</h2>
      )}
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.string.isRequired,
  aria: PropTypes.string.isRequired,
  main: PropTypes.bool,
};

export default Header;
