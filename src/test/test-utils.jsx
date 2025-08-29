import React from "react";
import { render } from "@testing-library/react";

// For now, no global providers are required. Export a thin wrapper to allow future providers.
export function renderWithProviders(ui, options) {
  return render(ui, { ...options });
}
