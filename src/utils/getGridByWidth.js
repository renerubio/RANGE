export const getGridByWidth = (
  width, rangeVal
) => {
  return [Number(width) / (rangeVal.length - 1), 0];
};
