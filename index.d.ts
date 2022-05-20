export interface defaultConfig {
  placement?: 'top' | 'bottom' | 'left' | 'right',
  offset?: number,
  animate?: boolean,
  speed?: number,
  zIndex?: number
}

export interface PopperConfig {
  defaults: defaultConfig
}

export interface PopperStatic {
  (reference: HTMLElement, popper: HTMLElement, config?: defaultConfig): PopperConfig,
  defaults: defaultConfig
}

declare const createPopper: PopperStatic;

export default createPopper;