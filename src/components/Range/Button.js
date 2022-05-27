import React from "react";
import PropTypes from "prop-types";
import styles from "./Range.module.css";
import { useTranslation } from "react-i18next";

const Button = ({
  refDraggable,
  handleMove,
  closeDragElement,
  position,
  type,
}) => {
  const [t] = useTranslation("global");
  return (
    <button
      ref={refDraggable}
      className={styles["bullet"]}
      data-cy={`draggable-${type}`}
      aria-label={t(`draggable.aria-${type}`)}
      onMouseDown={() => handleMove(type)}
      onTouchMove={() => handleMove(type)}
      onMouseUp={closeDragElement}
      onTouchEnd={closeDragElement}
      style={{
        transform: `translate(${position.x}px, ${position.y}px`,
      }}
    />
  );
};
Button.propTypes = {
  handleMove: PropTypes.func.isRequired,
  closeDragElement: PropTypes.func.isRequired,
  position: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  refDraggable: PropTypes.object.isRequired,
};

export default Button;
