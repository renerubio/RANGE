import React from "react";

import PropTypes from "prop-types";

import styles from "./Range.module.css";

import Button from "./Button";

const Slide = ({
  width,
  handleMove,
  closeDragElement,
  minPosition,
  maxPosition,
  refDraggableSlide,
  refDraggableMin,
  refDraggableMax,
}) => {

  return (
    <div
      ref={refDraggableSlide}
      className={`${styles.slide}`}
      style={{ width }}
    >
      <Button
        refDraggable={refDraggableMin}
        handleMove={handleMove}
        closeDragElement={closeDragElement}
        position={minPosition}
        type="min"
      />
      <Button
        refDraggable={refDraggableMax}
        handleMove={handleMove}
        closeDragElement={closeDragElement}
        position={maxPosition}
        type="max"
      />
    </div>
  );
};
Slide.propTypes = {
  width: PropTypes.number.isRequired,
  closeDragElement: PropTypes.func.isRequired,
  handleMove: PropTypes.func.isRequired,
  minPosition: PropTypes.object.isRequired,
  maxPosition: PropTypes.object.isRequired,
  refDraggableSlide: PropTypes.object.isRequired,
  refDraggableMin: PropTypes.object,
  refDraggableMax: PropTypes.object,
};
export default Slide;
