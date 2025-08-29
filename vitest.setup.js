import "@testing-library/jest-dom/vitest";

// Minimal polyfills/mocks for browser APIs used in the app
window.scrollTo = window.scrollTo || (() => {});
