
/**
 * @description get element property
 */
function getStyleComputedProperty(el: HTMLElement, property?: any): any {
  if (el.nodeType !== 1) {
      return [];
  }
  const css = window.getComputedStyle(el, null);
  return property ? css[property] : css;
}

export {
  getStyleComputedProperty
}