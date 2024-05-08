import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ToastDesign from "./components/ToastDesign.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout.tsx";
import SpellsDetail from "./pages/SpellsDetail.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "spells/:id", element: <SpellsDetail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastDesign />
    <RouterProvider router={router} />
  </React.StrictMode>
);
