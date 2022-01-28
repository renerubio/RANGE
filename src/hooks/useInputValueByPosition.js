export const useInputValueByPosition = (position, maxInputValue, width, decimals = 0)=> {
  return decimals > 0
    ? Number(parseFloat((position * maxInputValue) / width).toFixed(decimals))
    : parseInt((position * maxInputValue) / width);
}
