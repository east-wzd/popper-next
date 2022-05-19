/**
 * @description isObject
 */
function isObject(val: object) {
  return val !== null && typeof val === 'object';
}

/**
 * @description isArray
 */
function isArray(val: object) {
  return Array.isArray(val);
}

/**
 * @description merge
 */
function merge(...objs: any[]): any {
  const result = Object.create(null);
  function assignValue(val: any, key: string) {
    if (isObject(result[key]) && isObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * @description forEach
 */
function forEach(obj: any[], fn: any) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  if (!isObject(obj)) {
    obj = [obj];
  }

  if (isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * @description whether element is a body tag
 */
function isBody(el: HTMLElement) {
  if (!el) {
    return false;
  }
  
  if (el.nodeName === 'BODY') {
    return true;
  } else {
    return false;
  }
}

export {
  isObject,
  isArray,
  merge,
  forEach,
  isBody
}