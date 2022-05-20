import { getBoundingClientRect } from './getBoundingClientRect'
import {
  getParentNode,
  listScrollParents
} from './getScrollParent'
import { getStyleComputedProperty } from './getStyleComputedProperty'
import { 
  setStyle,
  removeStyle
} from './setStyle'
import {
  forEach,
  isBody
} from '../utils'
import { defaultConfig } from '../../types'
const DEFAULT_STYLES = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 'auto',
  right: 'auto',
  opacity: 0
}

const Popper = function(reference: HTMLElement, popper: HTMLElement, config: defaultConfig) {
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
} as any

Popper.prototype._init = function() {
  setStyle(this.popper, DEFAULT_STYLES);

  let popperStyleDisplay = getStyleComputedProperty(this.popper, 'display');
  if (popperStyleDisplay === 'none') {
    this.popper.style.display = 'block';
  } else {
    this.popperStyleDisplay = popperStyleDisplay || this.popperStyleDisplay;
  }

  if (!isBody(getParentNode(this.popper))) {
    this.popper.parentNode.removeChild(this.popper);
  } else {
    this.popperDom = 1;
  }
}

Popper.prototype._elementListener = function() {
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
  forEach(arr, (val: HTMLElement) => {
    if (val !== void 0) {
      val.addEventListener('scroll', () => {
        if (getStyleComputedProperty(this.popper, 'display') !== 'none') {
          hidePopper.bind(this);
        } else {
          setPosition.apply(this, ['scroll']);
        }
      });
    }
  });
}

function setPosition(type: any) {
  clearTimeout(this.hideTimer);
  clearTimeout(this.hideByDisplayTimer);

  let defaults: defaultConfig = this.defaults;

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

  if (['bottom', 'top'].includes(defaults.placement as string)) {
    forEach(['bottom', 'top'], function() {
      popperRect_left = referenceRect.left + (referenceRect.width / 2) - (popperRect.width / 2);
    });
  }

  if (['left', 'right'].includes(defaults.placement as string)) {
    forEach(['left', 'right'], function() {
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
  }

  setStyle(this.popper, {
    transform: translate,
    'z-index': defaults.zIndex
  });
  if (defaults.animate) {
    setStyle(this.popper, {
      'transition': 'opacity ' + (defaults.speed ? ((defaults.speed as number) / 1000).toFixed(1) + 's' : '0s')
    });
  } else {
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
  let defaults: defaultConfig = this.defaults;

  this.hideTimer = setTimeout(() => {
    this.popper.style.opacity = 0;
    this.hideByDisplayTimer = setTimeout(() => {
      this.popper.style.display = 'none';
    }, defaults.animate ? this.defaults.speed - 80 : 0);
  }, 80);
}

export default Popper;