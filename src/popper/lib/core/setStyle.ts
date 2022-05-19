import { isObject, forEach } from '../utils'


/**
 * @description element set style
 */
function setStyle(el: HTMLElement, property: any) {
  if (isObject(property))  {
    forEach(property, function(val: any, key: any) {
      (el.style as any)[key] = val;
    })
  }
}

/**
 * @description element remove style
 */
 function removeStyle(el: HTMLElement, property: any) {
  el.style.removeProperty(property);
}

export {
  setStyle,
  removeStyle
}