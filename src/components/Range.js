import React from "react";
import PropTypes from "prop-types";
import Draggable from "react-draggable";
import { useState, useEffect } from "react";

const Range = ({ type = "€", min = 1, max = 10000, longRange = 200 }) => {
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
    //setMax from API
  }, []);

  const handleChangeMin = (event) => {
    let targetValue = event?.target?.value;
    setMinInputVal(targetValue);
    setTimeout(() => {
      if (targetValue < min) {
        setMinInputVal(min);
        setMinPosition({
          x: min,
          y: 0,
        });
      }
      if (targetValue > maxInputVal) {
        setMinInputVal(maxInputVal - 1);
        setMinPosition({
          x: (Number(maxInputVal - 1) * longRange) / max,
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
    }, 700);
  };

  const handleChangeMax = (event) => {
    let targetValue = event?.target?.value;
    let formatmaxPosition = (value)=>(Number(value) * longRange) / max;
    setMaxInputVal(targetValue);
    setTimeout(()=> {
      if (targetValue > max){
        setMaxInputVal(max);
        setMaxPosition({
          x: longRange,
          y: 0
        });
      }
      if (targetValue < minInputVal){
        setMaxInputVal(minInputVal+1);
        setMaxPosition({
          x: formatmaxPosition(minInputVal + 1),
          y: 0,
        });
      }
      if (targetValue <= max && targetValue > minInputVal) {
        setMaxInputVal(targetValue);
        setMaxPosition({
          x: formatmaxPosition(targetValue),
        });
      }
    }, 700);
  };

  const onControlledDragMin = (e, position) => {
    const { x } = position;
    if (x < maxPosition.x) {
      setMinPosition({ x, y: 0 });
      setMinInputVal(x === min ? min : parseInt((x * max) / longRange));
    }
  };

  const onControlledDragMax = (e, position) => {
    const { x } = position;
    if (x > minPosition.x) {
      setMaxPosition({ x, y: 0 });
      setMaxInputVal(x === min ? min : parseInt((x * max) / longRange));
    }
  };

  return (
    <div className="d-flex flex-row">
      <div className="currency">
        <input
          value={minInputVal}
          onChange={handleChangeMin}
          className="min"
          type="number"
          {...min}
          {...max}
        />
        <label>{type}</label>
      </div>
      <div className="slide" style={{ width: longRange }}>
        <Draggable
          axis="x"
          bounds={{ left: min, right: longRange }}
          position={minPosition}
          onDrag={onControlledDragMin}
        >
          <div className="bullet gold"></div>
        </Draggable>
        <Draggable
          axis="x"
          bounds={{ left: min, right: longRange }}
          position={maxPosition}
          onDrag={onControlledDragMax}
        >
          <div className="bullet goldenrod"></div>
        </Draggable>
      </div>
      <div className="currency">
        <input
          value={maxInputVal}
          onChange={handleChangeMax}
          className="max"
          type="number"
          {...min}
          {...max}
        />
        <label>{type}</label>
      </div>
    </div>
  );
};
Range.propTypes = {
  type: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  longRange: PropTypes.number,
};
export default Range;
