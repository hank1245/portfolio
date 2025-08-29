import "@testing-library/jest-dom/vitest";

// Minimal polyfills/mocks for browser APIs used in the app
window.scrollTo = window.scrollTo || (() => {});

// Quiet React 18 act warnings in tests when needed
// (generally unnecessary with RTL, but harmless)
