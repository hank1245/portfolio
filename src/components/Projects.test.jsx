import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

// Mock three-related modules to avoid WebGL
vi.mock("@react-three/fiber", () => ({
  useThree: () => ({ viewport: { height: 10 } }),
  useFrame: () => {},
}));

vi.mock("@react-three/drei", () => ({
  Image: (props) => (
    <img data-testid="project-image" alt={props.title} src={props.url} />
  ),
  Text: (props) => <span data-testid="project-text">{props.children}</span>,
}));

// Mock react-spring three
vi.mock("@react-spring/three", () => ({
  a: {
    group: ({ children, ...rest }) => (
      <div data-testid="a-group" {...rest}>
        {children}
      </div>
    ),
  },
  useSpring: () => ({ position: [0, 0, 0], rotation: [0, 0, 0] }),
}));

// Mock framer-motion values used in Project
vi.mock("framer-motion", () => ({
  animate: () => ({}),
  useMotionValue: () => ({ get: () => 0.4 }),
}));

// Provide a predictable store state
vi.mock("../stores/projectStore", async () => {
  const actual = await vi.importActual("../stores/projectStore");
  const store = actual.default;
  store.setState({ currentProject: 1 });
  return { default: store };
});

import { Projects, projects as projectData } from "./Projects";

describe("Projects", () => {
  test("renders all project titles and images", () => {
    render(<Projects />);
    projectData.forEach((p) => {
      // Title text is uppercased in component
      expect(screen.getAllByText(p.title.toUpperCase())[0]).toBeInTheDocument();
    });
    // Images rendered via mocked <img>
    const imgs = screen.getAllByTestId("project-image");
    expect(imgs.length).toBe(projectData.length);
  });
});
