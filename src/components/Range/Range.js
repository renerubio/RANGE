import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getMinFixedNumber, getMaxFixedNumber } from "../../utils";

export const Range = ({
  currencyType = "€",
  min = 1,
  max = 10000,
  width = 200,
  readOnly = false,
  rangeVal,
  axis = "x",
}) => {
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
    setoverlapMargin(refDraggableMin?.current?.offsetWidth);
    setrangePosition(refDraggableSlide?.current?.offsetLeft);

    if (!inputChanged) {
      setMinInputVal(
        minPosition.x <= min ? min : parseInt((minPosition.x * max) / width)
      );
      setMaxInputVal(
        maxPosition.x === min ? min : parseInt((maxPosition.x * max) / width)
      );
    }
    setminBounds({ left: min, right: maxPosition.x - overlapMargin });
    setmaxBounds({ left: minPosition.x + overlapMargin, right: width });
  }, [min, max, minPosition, maxPosition, inputChanged]);

  const dragMouseDownMin = (e) => {
    document.onmouseup = closeDragElement;
    document.onmousemove = (event)=>elementDrag(event, minBounds, setMinPosition);
  };

  const dragMouseDownMax = (e) => {
    document.onmouseup = closeDragElement;
    document.onmousemove = (event) => elementDrag(event, maxBounds, setMaxPosition);
  };

  const elementDrag = (e,bounds, setPosition) => {
    const { left, right } = bounds;
    const { x, y } = e;
    const xPositionFormat = x - rangePosition;
    const yPositionFormat = y - rangePosition;
    setinputChanged(false);
    if (xPositionFormat < left) {
      setPosition({
        x: left,
        y: 0,
      });
      closeDragElement;
    } else if (xPositionFormat > right) {
      setPosition({
        x: right,
        y: 0,
      });
      closeDragElement;
    } else {
      setPosition({
        x: axis === "y" ? 0 : xPositionFormat,
        y: axis === "x" ? 0 : yPositionFormat,
      });
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
    setinputChanged(true);
    setinputVal(targetValue);
    setTimeout(() => {
      let newInputVal, newPosition;
      if (inputName === "minInput") {
        if (targetValue < min) {
          newInputVal = min;
          newPosition= min
        }
        if (targetValue > inputValLimit) {
          newInputVal = inputValLimit - 200;
          newPosition = ((inputValLimit) * width) / max;
        }
        if (targetValue >= min && targetValue < inputValLimit) {
          newInputVal = targetValue;
          newPosition = ((targetValue ) * width) / max;
        }
        setinputVal(newInputVal);
        setPosition({ x: newPosition, y: 0 });
      }
      if (inputName === "maxInput") {       
        if (targetValue > max) {
          newInputVal = max;
          newPosition = width;
        }
        if (targetValue < inputValLimit) {
          newInputVal = min + 200;
          newPosition = ((inputValLimit) * width) / max;
        }
        if (targetValue <= max && targetValue > inputValLimit) {
          newInputVal = targetValue;
          newPosition = ((targetValue) * width) / max;
        }
        console.log(newInputVal);
        setinputVal(newInputVal);
        setPosition({x:newPosition, y:0});
      }
      
    }, 500);
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
    <div className="d-flex flex-row range-wrapper" data-cy="range">
      <div className="currency">
        <input
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
        <label>{currencyType}</label>
      </div>
      <div ref={refDraggableSlide} className="slide" style={{ width: width }}>
        <div
          ref={refDraggableMin}
          data-cy="draggable-min"
          className="bullet"
          onMouseDown={dragMouseDownMin}
          onMouseUp={closeDragElement}
          style={{
            transform: `translate(${minPosition.x}px, ${minPosition.y}px`,
          }}
        ></div>
        <div
          ref={refDraggableMax}
          data-cy="draggable-max"
          className="bullet"
          onMouseDown={dragMouseDownMax}
          onMouseUp={closeDragElement}
          style={{
            transform: `translate(${maxPosition.x}px, ${maxPosition.y}px`,
          }}
        ></div>
      </div>
      <div className="currency">
        <input
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
        <label>{currencyType}</label>
      </div>
    </div>
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
};
