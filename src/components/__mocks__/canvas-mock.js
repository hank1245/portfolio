// Minimal r3f canvas mock if needed by future tests
export default function CanvasMock({ children }) {
  return <div data-testid="canvas-mock">{children}</div>;
}
