import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
