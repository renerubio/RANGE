export const useInputValueByPosition = (IVBPprops)=> {
  const {position, maxInputValue, width, decimals} = IVBPprops;
  return decimals > 0
    ? Number(parseFloat((position * maxInputValue) / width).toFixed(decimals))
    : parseInt((position * maxInputValue) / width);
}
