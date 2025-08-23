import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { warmup3DAssets } from "./preload/assetsPreload.js";

// Warm up heavy assets after initial paint/idleness without blocking entry chunk
const idle = (cb) => {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(cb, { timeout: 1500 });
  } else {
    setTimeout(cb, 300);
  }
};
idle(() => {
  warmup3DAssets();
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
