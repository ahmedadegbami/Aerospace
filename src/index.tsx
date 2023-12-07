import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import SpectrumStatus from "./spectrumStatus";
import SpectrumWS from "./spectrumWS";
import CommentsForImprovement from "./comments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "spectrumStatus",
    element: <SpectrumStatus />,
  },
  {
    path: "spectrumWS",
    element: <SpectrumWS />,
  },
  {
    path: "comments",
    element: <CommentsForImprovement />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
