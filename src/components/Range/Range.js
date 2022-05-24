import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  usePositionByInputValue,
  useInputValueByPosition,
  useGetClosetNumber,
} from "hooks/";
import { useTranslation } from "react-i18next";
import styles from "./Range.module.css";

import Currency from "./Currency";
import Label from "./Label";
import Input from "./Input";

import { closeDragElement } from "../../helpers/handlers";

/**
 * Range component
 *
 * @component
 * @param {Object} prop
 * @param {number} prop.min - minimum value allowed for input and slider
 * @param {number} prop.max - maximum value allowed for input and slider
 * @param {number} prop.width - width in pixels of slider
 * @param {string} prop.currencyType - currency symbol
 * @param {boolean} prop.readOnly - readonly attribute for input
 * @param {number[]} prop.rangeVal - list of allowed values for the Range component including minimum and maximum values
 * @param {string} prop.axis - "x" for horizontal slider or "y" to vertical slider
 * @param {number} prop.decimals - number of decimals
 * @example
 * <Range min={1} max={1000} width={300} currencyType="€" axis="x" />
 *
 *
 * @example
 * <Range min={1.99} max={70.99} width={200} currencyType="€" readOnly={true}
 * rangeVal={[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]} decimals={2} axis="x" />
 *
 */

export const Range = ({
  currencyType,
  min,
  max,
  width,
  readOnly,
  rangeVal,
  axis,
  decimals,
}) => {
  const [t] = useTranslation("global");
  const refDraggableSlide = useRef(null);
  const refDraggableMin = useRef(null);
  const refDraggableMax = useRef(null);

  const [rangePosition, setrangePosition] = useState(0);
  const [minPosition, setMinPosition] = useState({
    x: min,
    y: 0,
  });
  const [maxPosition, setMaxPosition] = useState({
    x: width,
    y: 0,
  });

  const [inputChanged, setinputChanged] = useState(false);
  const [minInputVal, setMinInputVal] = useState(min);
  const [maxInputVal, setMaxInputVal] = useState(max);

  const [minBounds, setminBounds] = useState({ left: min, right: width });
  const [maxBounds, setmaxBounds] = useState({ left: min, right: width });

  const [overlapMargin, setoverlapMargin] = useState(0);

  useEffect(() => {
    setoverlapMargin(
      refDraggableMin?.current?.offsetWidth ??
        refDraggableMax?.current?.offsetWidth
    );
    setrangePosition(refDraggableSlide?.current?.offsetLeft);
    if (inputChanged) {
      let formatMinPosition =
        decimals > 0
          ? parseFloat((minPosition.x * max) / width).toFixed(decimals)
          : parseInt((minPosition.x * max) / width);
      let formatMaxPosition =
        decimals > 0
          ? parseFloat((maxPosition.x * max) / width).toFixed(decimals)
          : parseInt((maxPosition.x * max) / width);

      setMinInputVal(minPosition.x <= min ? min : formatMinPosition);
      setMaxInputVal(maxPosition.x === min ? min : formatMaxPosition);
    }
    setminBounds({ left: min, right: maxPosition.x - overlapMargin });
    setmaxBounds({ left: minPosition.x + overlapMargin, right: width });
  }, [
    min,
    max,
    minPosition,
    maxPosition,
    inputChanged,
    minInputVal,
    maxInputVal,
  ]);

  const handleMove = (id) => {
    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    if (id === "min") {
      let elementDragProps = {
        bounds: minBounds,
        setPosition: setMinPosition,
        setInputVal: setMinInputVal,
        draggableId: "min",
      };
      document.onmousemove = (ev) => {
        elementDragProps.e = ev;
        elementDrag(elementDragProps);
      };
      document.ontouchmove = (ev) => {
        elementDragProps.e = ev;
        elementDrag(elementDragProps);
      };
    } else if (id === "max") {
      let elementDragProps = {
        bounds: maxBounds,
        setPosition: setMaxPosition,
        setInputVal: setMaxInputVal,
        draggableId: "max",
      };
      document.onmousemove = (ev) => {
        elementDragProps.e = ev;
        elementDrag(elementDragProps);
      };
      document.ontouchmove = (ev) => {
        elementDragProps.e = ev;
        elementDrag(elementDragProps);
      };
    }
  };

  const elementDrag = (dragProps) => {
    const { e, bounds, setPosition, setInputVal, draggableId } = dragProps;
    const { left, right } = bounds;
    const x = e?.x ?? e?.deltaX ?? e?.changedTouches[0]?.clientX;
    const y = e?.y ?? e?.deltaY ?? e?.changedTouches[0]?.clientY;

    const xPositionFormat = x - rangePosition;
    const yPositionFormat = y - rangePosition;
    window.rangeVal = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];
    if (rangeVal) {
      setinputChanged(false);
      let inputValue = useInputValueByPosition({
        position: xPositionFormat,
        maxInputValue: max,
        width,
        decimals: 2,
      });
      if (xPositionFormat <= left) {
        setPosition({
          x: draggableId === "min" ? left : left + overlapMargin,
          y: 0,
        });
        closeDragElement;
      } else if (xPositionFormat >= right) {
        setPosition({
          x: draggableId === "max" ? right : right - overlapMargin,
          y: 0,
        });
        closeDragElement;
      } else {
        if (draggableId === "min" && xPositionFormat < maxPosition.x) {
          setPosition({
            x: axis === "y" ? 0 : xPositionFormat,
            y: axis === "x" ? 0 : yPositionFormat,
          });
          closeDragElement;
        }
        if (draggableId === "max" && xPositionFormat > minPosition.x) {
          setPosition({
            x: axis === "y" ? 0 : xPositionFormat,
            y: axis === "x" ? 0 : yPositionFormat,
          });
          closeDragElement;
        }
      }
      if (draggableId === "min") {
        let rangeValForMin = [...rangeVal];
        let findMaxInputVal = rangeValForMin.find((val) => val === maxInputVal);
        let filteredRangeMin = rangeValForMin.filter(
          (val) => val < findMaxInputVal
        );
        setInputVal(useGetClosetNumber(inputValue, filteredRangeMin));
      }
      if (draggableId === "max") {
        let rangeValForMax = [...rangeVal];
        let findMinInputVal = rangeValForMax.find((val) => val === minInputVal);
        let filteredRangeMax = rangeValForMax.filter(
          (val) => val > findMinInputVal
        );
        setInputVal(useGetClosetNumber(inputValue, filteredRangeMax));
      }
    } else {
      setinputChanged(true);
      if (xPositionFormat <= left) {
        setPosition({
          x: draggableId === "min" ? left : left + overlapMargin,
          y: 0,
        });
        closeDragElement;
      } else if (xPositionFormat >= right) {
        setPosition({
          x: draggableId === "max" ? right : right - overlapMargin,
          y: 0,
        });
        closeDragElement;
      } else {
        setPosition({
          x: axis === "y" ? 0 : xPositionFormat,
          y: axis === "x" ? 0 : yPositionFormat,
        });
        closeDragElement;
      }
    }
  };

  const controlHandle = (handleProps) => {
    const { inputName, targetValue, inputValLimit, setinputVal, setPosition } =
      handleProps;
    setinputChanged(false);
    setinputVal(targetValue);
    let newInputVal, newPosition;
    if (inputName === "minInput") {
      if (targetValue < min) {
        newInputVal = min;
        newPosition = min;
      }
      if (targetValue > inputValLimit) {
        newInputVal =
          inputValLimit -
          useInputValueByPosition({
            position: overlapMargin,
            maxInputValue: max,
            width,
            decimals: 0,
          });
        newPosition = usePositionByInputValue({
          inputValue: newInputVal,
          maxInputValue: max,
          width,
        });
      }
      if (targetValue >= min && targetValue < inputValLimit) {
        newInputVal = targetValue;
        newPosition = usePositionByInputValue({
          inputValue: targetValue,
          maxInputValue: max,
          width,
        });
      }
      setPosition({ x: newPosition, y: 0 });
      setinputVal(newInputVal);
    }
    if (inputName === "maxInput") {
      if (targetValue > max) {
        newInputVal = max;
        newPosition = width;
      }
      if (targetValue < inputValLimit) {
        newInputVal =
          inputValLimit +
          useInputValueByPosition({
            position: overlapMargin,
            maxInputValue: max,
            width,
            decimals: 0,
          });
        newPosition = usePositionByInputValue({
          inputValue: newInputVal,
          maxInputValue: max,
          width,
        });
      }
      if (targetValue <= max && targetValue > inputValLimit) {
        newInputVal = targetValue;
        newPosition = usePositionByInputValue({
          inputValue: targetValue,
          maxInputValue: max,
          width,
        });
      }
      setPosition({ x: newPosition, y: 0 });
      setinputVal(newInputVal);
    }
  };

  const handleChangeMin = (event) => {
    controlHandle({
      inputName: event?.target?.name,
      targetValue: Number(event?.target?.value),
      inputValLimit: maxInputVal,
      setinputVal: setMinInputVal,
      setPosition: setMinPosition,
    });
  };

  const handleChangeMax = (event) => {
    controlHandle({
      inputName: event?.target?.name,
      targetValue: Number(event?.target?.value),
      inputValLimit: minInputVal,
      setinputVal: setMaxInputVal,
      setPosition: setMaxPosition,
    });
  };

  return (
    <main
      className={`${styles["range-wrapper"]} d-flex flex-row`}
      data-cy="range"
    >
      <Currency>
        <Input
          id={"minInput"}
          className={`${styles.min}`}
          value={minInputVal}
          onChange={handleChangeMin}
          readOnly={readOnly}
          min={min}
          max={max}
          aria-label={
            readOnly ? t("min-input.aria-readonly") : t("min-input.aria")
          }
        />
        <Label htmlFor={"minInput"} currencyType={currencyType} />
      </Currency>
      <div
        ref={refDraggableSlide}
        className={`${styles.slide}`}
        style={{ width: width }}
      >
        <button
          ref={refDraggableMin}
          data-cy="draggable-min"
          className={`${styles.bullet} ${styles["bullet-min"]}`}
          onMouseDown={() => handleMove("min")}
          onTouchMove={() => handleMove("min")}
          onMouseUp={closeDragElement}
          onTouchEnd={closeDragElement}
          style={{
            transform: `translate(${minPosition.x}px, ${minPosition.y}px`,
          }}
          aria-label={t("draggable.aria-min")}
        ></button>
        <button
          ref={refDraggableMax}
          data-cy="draggable-max"
          className={`${styles.bullet} ${styles["bullet-max"]}`}
          onMouseDown={() => handleMove("max")}
          onTouchMove={() => handleMove("max")}
          onMouseUp={closeDragElement}
          onTouchEnd={closeDragElement}
          style={{
            transform: `translate(${maxPosition.x}px, ${maxPosition.y}px`,
          }}
          aria-label={t("draggable.aria-max")}
        ></button>
      </div>
      <Currency>
        <Input
          id={"maxInput"}
          className={`${styles.max}`}
          value={maxInputVal}
          onChange={handleChangeMax}
          readOnly={readOnly}
          min={min}
          max={max}
          aria-label={
            readOnly ? t("max-input.aria-readonly") : t("max-input.aria")
          }
        />
        {<Label htmlFor={"maxInput"} currencyType={currencyType} />}
      </Currency>
    </main>
  );
};

Range.propTypes = {
  currencyType: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  rangeVal: PropTypes.arrayOf(PropTypes.number),
  readOnly: PropTypes.bool,
  axis: PropTypes.string,
  decimals: PropTypes.number,
};
