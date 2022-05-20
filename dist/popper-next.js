// popper-next v1.0.1-alpha.52 Copyright (c) 2022 east-wzd
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.createPopper = factory());
})(this, (function () { 'use strict';

  /**
   * @description The distance from the DOM element to the viewable range of the browser
   */
  function getBoundingClientRect(el) {
      const rect = el.getBoundingClientRect();
      return rect;
  }

  /**
   * @description get element property
   */
  function getStyleComputedProperty(el, property) {
      if (el.nodeType !== 1) {
          return [];
      }
      const css = window.getComputedStyle(el, null);
      return property ? css[property] : css;
  }

  /**
   * @description isObject
   */
  function isObject(val) {
      return val !== null && typeof val === 'object';
  }
  /**
   * @description isArray
   */
  function isArray(val) {
      return Array.isArray(val);
  }
  /**
   * @description merge
   */
  function merge(...objs) {
      const result = Object.create(null);
      function assignValue(val, key) {
          if (isObject(result[key]) && isObject(val)) {
              result[key] = merge(result[key], val);
          }
          else if (isObject(val)) {
              result[key] = merge({}, val);
          }
          else if (isArray(val)) {
              result[key] = val.slice();
          }
          else {
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
  function forEach(obj, fn) {
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
      }
      else {
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
  function isBody(el) {
      if (!el) {
          return false;
      }
      if (el.nodeName === 'BODY') {
          return true;
      }
      else {
          return false;
      }
  }

  /**
   * @description get scroll parent
   */
  function getScrollParent(el) {
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
  function listScrollParents(el, arr = []) {
      let scrollParent = getScrollParent(getParentNode(el));
      if (isBody(getScrollParent(getParentNode(el)))) {
          return arr;
      }
      else {
          listScrollParents(scrollParent, arr);
      }
      arr.push(scrollParent);
      return arr;
  }
  /**
   * @description find reference parent
   */
  function getParentNode(el) {
      if (el.nodeName === 'HTML') {
          return el;
      }
      return el.parentNode;
  }

  /**
   * @description element set style
   */
  function setStyle(el, property) {
      if (isObject(property)) {
          forEach(property, function (val, key) {
              el.style[key] = val;
          });
      }
  }
  /**
   * @description element remove style
   */
  function removeStyle(el, property) {
      el.style.removeProperty(property);
  }

  const DEFAULT_STYLES = {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 'auto',
      right: 'auto',
      opacity: 0
  };
  const Popper = function (reference, popper, config) {
      config.placement = config.placement || 'bottom';
      this.defaults = config;
      this.reference = reference;
      this.popper = popper;
      this.popperDom = null;
      this.popperStyleDisplay = 'block';
      this.translate = {
          left: 0,
          top: 0
      };
      this.hideTimer = null;
      this.hideByDisplayTimer = null;
      this._init();
      this._elementListener();
  };
  Popper.prototype._init = function () {
      setStyle(this.popper, DEFAULT_STYLES);
      let popperStyleDisplay = getStyleComputedProperty(this.popper, 'display');
      if (popperStyleDisplay === 'none') {
          this.popper.style.display = 'block';
      }
      else {
          this.popperStyleDisplay = popperStyleDisplay || this.popperStyleDisplay;
      }
      if (!isBody(getParentNode(this.popper))) {
          this.popper.parentNode.removeChild(this.popper);
      }
      else {
          this.popperDom = 1;
      }
  };
  Popper.prototype._elementListener = function () {
      // reference addEventListener mouseenter
      this.reference.addEventListener('mouseenter', setPosition.bind(this));
      // reference addEventListener mouseleave
      this.reference.addEventListener('mouseleave', hidePopper.bind(this));
      // reference addEventListener mouseenter
      this.popper.addEventListener('mouseenter', setPosition.bind(this));
      // reference addEventListener mouseleave
      this.popper.addEventListener('mouseleave', hidePopper.bind(this));
      // window addEventListener resize
      window.addEventListener('resize', () => {
          setPosition.apply(this, ['resize']);
      });
      // scroll-parent addEventListener scrollParent
      var arr = listScrollParents(this.reference);
      forEach(arr, (val) => {
          if (val !== void 0) {
              val.addEventListener('scroll', () => {
                  if (getStyleComputedProperty(this.popper, 'display') !== 'none') {
                      hidePopper.bind(this);
                  }
                  else {
                      setPosition.apply(this, ['scroll']);
                  }
              });
          }
      });
  };
  function setPosition(type) {
      clearTimeout(this.hideTimer);
      clearTimeout(this.hideByDisplayTimer);
      let defaults = this.defaults;
      // append popper dom
      if (!this.popperDom && (type === 'resize' || type === 'scroll')) {
          return;
      }
      if (!this.popperDom) {
          document.body.appendChild(this.popper);
          this.popperDom = 1;
      }
      let popperStyleDisplay = getStyleComputedProperty(this.popper, 'display');
      if ((type === 'resize' || type === 'scroll') && popperStyleDisplay === 'none') {
          return;
      }
      setStyle(this.popper, {
          display: popperStyleDisplay === 'none' ? this.popperStyleDisplay : popperStyleDisplay,
      });
      const referenceRect = getBoundingClientRect(this.reference);
      const popperRect = getBoundingClientRect(this.popper);
      let popperRect_top = 0;
      let popperRect_left = 0;
      if (['bottom', 'top'].includes(defaults.placement)) {
          forEach(['bottom', 'top'], function () {
              popperRect_left = referenceRect.left + (referenceRect.width / 2) - (popperRect.width / 2);
          });
      }
      if (['left', 'right'].includes(defaults.placement)) {
          forEach(['left', 'right'], function () {
              popperRect_top = referenceRect.top + (referenceRect.height / 2) - (popperRect.height / 2);
          });
      }
      switch (defaults.placement) {
          case 'bottom':
              popperRect_top = referenceRect.top + referenceRect.height + (defaults.offset || 0);
              break;
          case 'top':
              popperRect_top = referenceRect.top - popperRect.height - (defaults.offset || 0);
              break;
          case 'left':
              popperRect_left = referenceRect.left - popperRect.width - (defaults.offset || 0);
              break;
          case 'right':
              popperRect_left = referenceRect.left + referenceRect.width + (defaults.offset || 0);
              break;
      }
      // window scroll distance
      popperRect_top = popperRect_top + window.pageYOffset;
      popperRect_left = popperRect_left + window.pageXOffset;
      // set popper transform property
      let translate = 'translate(' + popperRect_left + 'px,' + popperRect_top + 'px)';
      this.translate = {
          left: popperRect_left,
          top: popperRect_top
      };
      setStyle(this.popper, {
          transform: translate,
          'z-index': defaults.zIndex
      });
      if (defaults.animate) {
          setStyle(this.popper, {
              'transition': 'opacity ' + (defaults.speed ? (defaults.speed / 1000).toFixed(1) + 's' : '0s')
          });
      }
      else {
          removeStyle(this.popper, 'transition');
      }
      showPopper.apply(this);
  }
  /**
   * @description show popper
   */
  function showPopper() {
      this.popper.style.opacity = 1;
  }
  /**
   * @description hide popper
   */
  function hidePopper() {
      let defaults = this.defaults;
      this.hideTimer = setTimeout(() => {
          this.popper.style.opacity = 0;
          this.hideByDisplayTimer = setTimeout(() => {
              this.popper.style.display = 'none';
          }, defaults.animate ? this.defaults.speed - 80 : 0);
      }, 80);
  }

  const defaults = {
      placement: 'bottom',
      offset: 10,
      animate: true,
      speed: 400,
      zIndex: 2000
  };

  function createPopper(reference, popper, config) {
      if (!reference) {
          console.error('reference element cannot be empty');
          return;
      }
      if (!popper) {
          console.error('popper element cannot be empty');
          return;
      }
      var defaultConfig = merge(defaults, config || {});
      const context = new Popper(reference, popper, defaultConfig);
      return context;
  }
  createPopper.defaults = defaults;

  return createPopper;

}));
//# sourceMappingURL=popper-next.js.map
