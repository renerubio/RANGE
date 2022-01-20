import React, { useRef } from "react";
import PropTypes from "prop-types";
//import Draggable from "react-draggable";
import { Draggable } from "./../";

import { useState, useEffect } from "react";
import { getMinFixedNumber, getMaxFixedNumber } from "../../utils";

export const Range = ({
  currencyType = "€",
  min = 1,
  max = 10000,
  width = 200,
  grid = [1, 0],
  readOnly = false,
  rangeVal,
}) => {
  const refDraggableSlide = useRef(null);
  const [rangePosition, setrangePosition] = useState(0);
  const [minPosition, setMinPosition] = useState({
    x: min,
    y: 0,
  });
  const [maxPosition, setMaxPosition] = useState({
    x: width,
    y: 0,
  });
  const [minInputVal, setMinInputVal] = useState(min);
  const [maxInputVal, setMaxInputVal] = useState(max);

  const [minBounds, setminBounds] = useState({ left: min, right: width });
  const [maxBounds, setmaxBounds] = useState({ left: min, right: width });

  const [overlapMargin, setoverlapMargin] = useState(0)
  useEffect(() => {
    setminBounds({ left: min, right: maxPosition.x - overlapMargin });
    setmaxBounds({ left: minPosition.x + overlapMargin, right: width });
    setMinInputVal(
      minPosition.x <= min ? min : parseInt((minPosition.x * max) / width)
    );
    setMaxInputVal(
      maxPosition.x === min ? min : parseInt((maxPosition.x * max) / width)
    );
    setrangePosition(refDraggableSlide.current.offsetLeft);
  }, [min, max, minPosition, maxPosition]);

  const onDragMin = (currentPosition, overlapMargin) => {
    setoverlapMargin(overlapMargin);
    setMinPosition(currentPosition);
    
    if (rangeVal) {
      //setMinInputVal(getMinFixedNumber(grid[0], rangeVal, minPosition.x, x));
    }
  };

  const onDragMax = (currentPosition, overlapMargin) => {
    setoverlapMargin(overlapMargin);
    setMaxPosition(currentPosition);
    
    if (rangeVal) {
      //setMaxInputVal(getMaxFixedNumber(grid[0], rangeVal, maxPosition.x, x));
    }
  };

  const handleChangeMin = (event) => {
    let targetValue = Number(event?.target?.value);
    setMinInputVal(Number(targetValue));
    setTimeout(() => {
      if (targetValue < min) {
        setMinInputVal(min);
        setMinPosition({
          x: min,
          y: 0,
        });
      }
      if (targetValue > maxInputVal) {
        setMinInputVal(maxInputVal - 200);
        setMinPosition({
          x: (Number(maxInputVal - 200) * width) / max,
          y: 0,
        });
      }
      if (targetValue >= min && targetValue < maxInputVal) {
        setMinInputVal(targetValue);
        setMinPosition({
          x: (Number(targetValue) * width) / max,
          y: 0,
        });
      }
    }, 500);
  };

  const handleChangeMax = (event) => {
    let targetValue = Number(event?.target?.value);
    let formatmaxPosition = (value) => (Number(value) * width) / max;
    setMaxInputVal(targetValue);
    setTimeout(() => {
      if (targetValue > max) {
        setMaxInputVal(max);
        setMaxPosition({
          x: width,
          y: 0,
        });
      }
      if (targetValue < minInputVal) {
        setMaxInputVal(minInputVal + 200);
        setMaxPosition({
          x: formatmaxPosition(minInputVal + 200),
          y: 0,
        });
      }
      if (targetValue <= max && targetValue > minInputVal) {
        setMaxInputVal(targetValue);
        setMaxPosition({
          x: formatmaxPosition(targetValue),
          y: 0,
        });
      }
    }, 500);
  };

  return (
    <div className="d-flex flex-row range-wrapper" data-cy="range">
      <div className="currency">
        <input
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
        <Draggable
          axis="x"
          bounds={minBounds}
          initialPosition={minPosition}
          onDrag={onDragMin}
          className="bullet"
          data-cy="draggable-min"
          rangePosition={rangePosition}
        ></Draggable>
        <Draggable
          axis="x"
          bounds={maxBounds}
          initialPosition={maxPosition}
          onDrag={onDragMax}
          className="bullet"
          data-cy="draggable-max"
          rangePosition={rangePosition}
        ></Draggable>
      </div>
      <div className="currency">
        <input
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
  fixed: PropTypes.number,
  grid: PropTypes.arrayOf(PropTypes.number),
  rangeVal: PropTypes.arrayOf(PropTypes.number),
  readOnly: PropTypes.bool,
};
