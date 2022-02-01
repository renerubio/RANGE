import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { usePositionByInputValue, useInputValueByPosition } from "../../hooks";
import { useTranslation } from "react-i18next";

export const Range = ({
  currencyType = "€",
  min = 1,
  max = 10000,
  width = 200,
  readOnly = false,
  rangeVal,
  axis = "x",
  decimals = 0,
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
    } else {
    }
    setminBounds({ left: min, right: maxPosition.x - overlapMargin });
    setmaxBounds({ left: minPosition.x + overlapMargin, right: width });
  }, [min, max, minPosition, maxPosition, inputChanged]);

  const dragMouseDown = (id) => {
    document.onmouseup = closeDragElement;
    if (id === "min") {
      document.onmousemove = (ev) => {
        elementDrag(ev, minBounds, setMinPosition, setMinInputVal, "min");
      };
    } else if (id === "max") {
      document.onmousemove = (ev) => {
        elementDrag(ev, maxBounds, setMaxPosition, setMaxInputVal, "max");
      };
    }
  };

  const elementDrag = (e, bounds, setPosition, setInputVal, draggableId) => {
    const { left, right } = bounds;
    const { x, y } = e;
    const xPositionFormat = x - rangePosition;
    const yPositionFormat = y - rangePosition;

    if (rangeVal) {
      setinputChanged(false);
      let inputValue = useInputValueByPosition(xPositionFormat, max, width, 2);
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
      rangeVal.forEach((element) => {
        if (
          inputValue === element ||
          (inputValue - element > 0 && inputValue - element < 1)
        ) {
          if (draggableId === "min" && xPositionFormat < right) {
            setInputVal(element);
          }
          if (draggableId === "max" && xPositionFormat > left) {
            setInputVal(element);
          }
        }
      });
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

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  const controlHandle = (
    inputName,
    targetValue,
    inputValLimit,
    setinputVal,
    setPosition
  ) => {
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
          inputValLimit - useInputValueByPosition(overlapMargin, max, width);
        newPosition = usePositionByInputValue(newInputVal, max, width);
      }
      if (targetValue >= min && targetValue < inputValLimit) {
        newInputVal = targetValue;
        newPosition = usePositionByInputValue(targetValue, max, width);
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
          inputValLimit + useInputValueByPosition(overlapMargin, max, width);
        newPosition = usePositionByInputValue(newInputVal, max, width);
      }
      if (targetValue <= max && targetValue > inputValLimit) {
        newInputVal = targetValue;
        newPosition = usePositionByInputValue(targetValue, max, width);
      }
      setPosition({ x: newPosition, y: 0 });
      setinputVal(newInputVal);
    }
  };

  const handleChangeMin = (event) => {
    controlHandle(
      event?.target?.name,
      Number(event?.target?.value),
      maxInputVal,
      setMinInputVal,
      setMinPosition
    );
  };

  const handleChangeMax = (event) => {
    controlHandle(
      event?.target?.name,
      Number(event?.target?.value),
      minInputVal,
      setMaxInputVal,
      setMaxPosition
    );
  };

  return (
    <main className="d-flex flex-row range-wrapper" data-cy="range">
      <section className="currency">
        <input
          aria-label={
            readOnly ? t("min-input.aria-readonly") : t("min-input.aria")
          }
          id="minInput"
          name="minInput"
          value={minInputVal}
          onChange={handleChangeMin}
          className="min"
          type="number"
          readOnly={readOnly}
          min={min}
          max={max}
          data-cy="min"
        />
        <label htmlFor="minInput" aria-label={t("label.currency")}>
          {currencyType}
        </label>
      </section>
      <div ref={refDraggableSlide} className="slide" style={{ width: width }}>
        <button
          ref={refDraggableMin}
          data-cy="draggable-min"
          className="bullet bullet-min"
          onMouseDown={() => dragMouseDown("min")}
          onMouseUp={closeDragElement}
          style={{
            transform: `translate(${minPosition.x}px, ${minPosition.y}px`,
          }}
          aria-label={t("draggable.min")}
        ></button>
        <button
          ref={refDraggableMax}
          data-cy="draggable-max"
          className="bullet bullet-max"
          onMouseDown={() => dragMouseDown("max")}
          onMouseUp={closeDragElement}
          style={{
            transform: `translate(${maxPosition.x}px, ${maxPosition.y}px`,
          }}
          aria-label={t("draggable.max")}
        ></button>
      </div>
      <section className="currency">
        <input
          aria-label={
            readOnly ? t("max-input.aria-readonly") : t("max-input.aria")
          }
          id="maxInput"
          name="maxInput"
          value={maxInputVal}
          onChange={handleChangeMax}
          className="max"
          type="number"
          readOnly={readOnly}
          min={min}
          max={max}
          data-cy="max"
        />
        <label htmlFor="maxInput" aria-label={t("label.currency")}>
          {currencyType}
        </label>
      </section>
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
