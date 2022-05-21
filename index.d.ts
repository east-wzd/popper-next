export interface defaultConfig {
  placement?: 'top' | 'bottom' | 'left' | 'right',
  trigger?: 'hover' | 'click' | 'contextmenu'
  offset?: number,
  animate?: boolean,
  speed?: number,
  zIndex?: number
}

export interface PopperConfig {
  defaults: defaultConfig,
  show: Function,
  hide: Function
}

export interface PopperStatic {
  (reference: HTMLElement, popper: HTMLElement, config?: defaultConfig): PopperConfig,
  defaults: defaultConfig
}

declare const createPopper: PopperStatic;

export default createPopper;