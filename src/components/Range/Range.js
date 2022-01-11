import React from "react";
import PropTypes from "prop-types";
import Draggable from "react-draggable";
import { useState, useEffect } from "react";

export const Range = ({
  currencyType = "€",
  min = 1,
  max = 10000,
  longRange = 200,
  fixed,
  grid = [1, 0],
  readOnly = false,
  rangeVal,
}) => {
  const [minPosition, setMinPosition] = useState({
    x: min,
    y: 0,
  });

  const [maxPosition, setMaxPosition] = useState({
    x: longRange,
    y: 0,
  });

  const [minInputVal, setMinInputVal] = useState(min);
  const [maxInputVal, setMaxInputVal] = useState(max);


  useEffect(() => {
    setMinPosition({ x: Number(min), y: 0 });
    setMaxPosition({ x: Number(longRange), y: 0 });
    setMinInputVal(Number(min));
    setMaxInputVal(Number(max));
  }, [min, max]);

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
          x: (Number(maxInputVal - 200) * longRange) / max,
          y: 0,
        });
      }
      if (targetValue >= min && targetValue < maxInputVal) {
        setMinInputVal(targetValue);
        setMinPosition({
          x: (Number(targetValue) * longRange) / max,
          y: 0,
        });
      }
    }, 500);
  };

  const handleChangeMax = (event) => {
    let targetValue = Number(event?.target?.value);
    let formatmaxPosition = (value) => (Number(value) * longRange) / max;
    setMaxInputVal(targetValue);
    setTimeout(() => {
      if (targetValue > max) {
        setMaxInputVal(max);
        setMaxPosition({
          x: longRange,
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

  const onControlledDragMin = (e, position) => {
    const { x } = position;
    if (x < maxPosition.x) {
      setMinPosition({ x, y: 0 });
      if (!rangeVal) {
        setMinInputVal(
          x === min ? min : parseFloat((x * max) / longRange).toFixed(fixed)
        );
      } else {
        let step = grid[0];
        let currentValue =
          min == x.toFixed(2)
            ? rangeVal[0]
            : step * 1 + min == x.toFixed(2)
            ? rangeVal[1]
            : step * 2 + min == x.toFixed(2)
            ? rangeVal[2]
            : step * 3 + min == x.toFixed(2)
            ? rangeVal[3]
            : rangeVal[4];
        setMinInputVal(currentValue);
      }
    }
  };

  const onControlledDragMax = (e, position) => {
    const { x } = position;
    if (x > minPosition.x) {
      setMaxPosition({ x, y: 0 });
      if (!rangeVal) {
        setMaxInputVal(
          x === min ? min : parseFloat((x * max) / longRange).toFixed(fixed)
        );
      } else {
        let step = grid[0];
        let currentValue =
          max == x.toFixed(2)
            ? rangeVal[0]
            : step * 1  == x
            ? rangeVal[1]
            : step * 2  == x
            ? rangeVal[2]
            : step * 3  == x
            ? rangeVal[3]
            : step * 4  == x
            ? rangeVal[4]
            : rangeVal[5];
            setMaxInputVal(currentValue);
      }
    }
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
      <div className="slide" style={{ width: longRange }}>
        <Draggable
          axis="x"
          bounds={{ left: min, right: longRange }}
          position={minPosition}
          onDrag={onControlledDragMin}
          grid={grid}
        >
          <div className="bullet" data-cy="draggable-min"></div>
        </Draggable>
        <Draggable
          axis="x"
          bounds={{ left: min, right: longRange }}
          position={maxPosition}
          onDrag={onControlledDragMax}
          grid={grid}
        >
          <div className="bullet" data-cy="draggable-max"></div>
        </Draggable>
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
  longRange: PropTypes.number.isRequired,
  fixed: PropTypes.number,
  grid: PropTypes.arrayOf(PropTypes.number),
  rangeVal: PropTypes.arrayOf(PropTypes.number),
  readOnly: PropTypes.bool,
};
