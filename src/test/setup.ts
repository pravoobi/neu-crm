import '@testing-library/jest-dom'

// jsdom does not implement ResizeObserver — stub it for Radix UI components that need it.
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
