import React, { useState } from "react";
import PropTypes from "prop-types";

export const Draggable = ({
  axis = null,
  "data-cy": dataCy,
  className,
  initialPosition,
  rangePosition,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const dragMouseDown = (e) => {
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };

  const elementDrag = (e) => {
    setPosition({
      x: axis === "y" ? 0 : e.clientX - rangePosition,
      y: axis === "x" ? 0 : e.clientY - rangePosition,
    });
  };

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  return (
    <div
      data-cy={dataCy}
      className={className}
      onMouseDown={dragMouseDown}
      style={{ transform: `translate(${position.x}px, ${position.y}px` }}
    ></div>
  );
};

Draggable.propTypes = {
  axis: PropTypes.string,
  className: PropTypes.string,
  dataCy: PropTypes.string,
  initialPosition: PropTypes.objectOf(PropTypes.number),
  rangePosition: PropTypes.number
};
