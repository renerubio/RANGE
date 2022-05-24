export const usePositionByInputValue = (PBIVprops) => {
  const { inputValue, maxInputValue, width } = PBIVprops;
  return parseInt((inputValue * width) / maxInputValue);
};
