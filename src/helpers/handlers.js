export const closeDragElement = () => {
  document.onmouseup = null;
  document.onmousemove = null;
  document.ontouchend = null;
  document.ontouchmove = null;
};
