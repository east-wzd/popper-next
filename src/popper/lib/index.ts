import Popper from './core/Popper'
import defaults from './defaults'
import { merge } from './utils'
import { defaultConfig } from '../types'

function createPopper(reference: HTMLElement | null, popper: HTMLElement | null, config?: defaultConfig) {
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

export default createPopper;