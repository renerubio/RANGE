export const usePositionByInputValue = (inputValue, maxInputValue, width) => {
  return parseInt((inputValue * width)/maxInputValue);
};
