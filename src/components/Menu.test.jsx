import React from "react";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock the lazy ForceGraph to avoid d3 and SVG complexity in tests
vi.mock("./ForceGraph", () => ({
  default: () => <div data-testid="force-graph" />,
}));

// Mock the intent prefetch hook to observe calls
const prefetchOnHover = vi.fn();
const prefetchOnOpen = vi.fn();
vi.mock("../hooks/useIntentPrefetch", () => ({
  default: () => ({ prefetchOnHover, prefetchOnOpen }),
}));

import { Menu } from "./Menu";

describe("Menu", () => {
  test("toggles aria-label and triggers prefetch on open/hover", async () => {
    const user = userEvent.setup();
    const onSectionChange = vi.fn();
    const Wrapper = () => (
      <Menu
        onSectionChange={onSectionChange}
        menuOpened={false}
        setMenuOpened={() => {}}
      />
    );
    render(<Wrapper />);

    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toBeInTheDocument();

    await user.hover(toggle);
    expect(prefetchOnHover).toHaveBeenCalledTimes(1);
  });

  test("navigates via section buttons", async () => {
    const user = userEvent.setup();
    const onSectionChange = vi.fn();
    let opened = true;
    const setMenuOpened = (v) => {
      opened = v;
    };
    const { rerender } = render(
      <Menu
        onSectionChange={onSectionChange}
        menuOpened={opened}
        setMenuOpened={setMenuOpened}
      />
    );

    // Buttons should be visible when opened
    const projectsBtn = await screen.findByRole("button", {
      name: /go to projects section/i,
    });
    await user.click(projectsBtn);
    expect(onSectionChange).toHaveBeenCalledWith(2);
  });
});
