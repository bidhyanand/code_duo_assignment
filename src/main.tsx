import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ToastDesign from "./components/ToastDesign.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout.tsx";
import SpellsDetail from "./pages/SpellsDetail.tsx";
import FavList from "./pages/FavList.tsx";
import FavProvider from "./context/FavProvider.tsx"
;
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "spells/:id", element: <SpellsDetail /> },
      { path: "spells/fav", element: <FavList /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FavProvider>

    <ToastDesign />
    <RouterProvider router={router} />
    </FavProvider>
  </React.StrictMode>
);
