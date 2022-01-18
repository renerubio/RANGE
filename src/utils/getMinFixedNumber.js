export const getMinFixedNumber = (step, rangeVal, limitValue, currentPosition) => {
  return rangeVal.find((_e, i) => {
    let value = i > 0 ? step * i + limitValue : limitValue;
    return value === parseFloat(currentPosition.toFixed(2));
  });
};
