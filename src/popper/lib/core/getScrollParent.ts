import { getStyleComputedProperty } from './getStyleComputedProperty'
import { isBody } from '../utils'

/**
 * @description get scroll parent
 */
function getScrollParent(el: HTMLElement): any {
  if (!el || ['HTML', 'BODY', '#document'].indexOf(el.nodeName) !== -1) {
    return window.document.body;
  }
  
  const { overflow, overflowX, overflowY } = getStyleComputedProperty(el);
  if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
    return el;
  }
  
  return getScrollParent(getParentNode(el));
}

/**
 * @description get scroll parent
 */
function listScrollParents(el: HTMLElement, arr = [] as any): any {
  let scrollParent = getScrollParent(getParentNode(el));

  if (isBody(getScrollParent(getParentNode(el)))) {
    return arr;
  } else {
    listScrollParents(scrollParent, arr);
  }
  
  arr.push(scrollParent);
  return arr;
}

/**
 * @description find reference parent
 */
function getParentNode(el: HTMLElement): any {
  if (el.nodeName === 'HTML') {
      return el;
  }
  return el.parentNode;
}

export {
  getScrollParent,
  listScrollParents,
  getParentNode
}