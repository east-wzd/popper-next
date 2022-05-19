/**
 * @description The distance from the DOM element to the viewable range of the browser
 */
function getBoundingClientRect(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect;
}

export {
  getBoundingClientRect
}