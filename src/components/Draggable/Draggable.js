import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

export const Draggable = ({
  axis = null,
  "data-cy": dataCy,
  className,
  initialPosition,
  rangePosition,
  onDrag,
  bounds,
}) => {
  const refDraggable = useRef(null);
  const overlapMargin = refDraggable?.current?.offsetWidth;

  const [position, setPosition] = useState(initialPosition);

  const dragMouseDown = (e) => {
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };

  useEffect(() => {
    onDrag(position, overlapMargin);
    controlBounds(bounds)
  }, [position]);

  const controlBounds = (bounds)=>{
    const {left, right} = bounds;
    const {x} = position;
    
    if (x < left) {      
      setPosition({
        x: left,
        y: 0,
      });
      closeDragElement;
    }
    if (x > right) {      
      setPosition({
        x: right,
        y: 0,
      });
      closeDragElement;
    }
  }

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
      ref={refDraggable}
      data-cy={dataCy}
      className={className}
      onMouseDown={dragMouseDown}
      onMouseUp={closeDragElement}
      style={{ transform: `translate(${position.x}px, ${position.y}px` }}
    ></div>
  );
};

Draggable.propTypes = {
  axis: PropTypes.string,
  className: PropTypes.string,
  dataCy: PropTypes.string,
  initialPosition: PropTypes.objectOf(PropTypes.number),
  rangePosition: PropTypes.number,
  stopDragging: PropTypes.bool,
  bounds: PropTypes.objectOf(PropTypes.number),
};
