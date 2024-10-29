/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormNumber1 from "./pages/form-1.jsx";
import FormNumber2 from "./pages/form-2.jsx";

import NotFound from "./pages/notfound.jsx";
import MainLayout from "./layouts/Mainlayout.jsx";
import CustomizeSelectField from "./pages/select-customize.jsx";
import CheckboxCustomize from "./pages/checkbox-customize.jsx";
import ModelPopup from "./pages/Model.jsx";

const formRouting = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <FormNumber1 /> },
      {
        path: "form2",
        element: <FormNumber2 />,
      },
      {
        path: "modelpopup",
        element: <ModelPopup />,
      },

      {
        path: "cusomizeCheckbox",
        element: <CheckboxCustomize />,
      },
      {
        path: "CustomizeSelectField",
        element: <CustomizeSelectField />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={formRouting} />
  </StrictMode>
);
