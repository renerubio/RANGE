export const getPositionByInputValue = (inputValue, maxInputValue, width) => {
  return parseInt((inputValue * width)/maxInputValue);
};
