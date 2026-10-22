import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Layout } from "./layouts/Layout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Lazy loading для разделения кода на чанки
const Home = lazy(() =>
  import("./pages/Home").then(module => ({ default: module.Home }))
);
const Product = lazy(() =>
  import("./pages/Product").then(module => ({ default: module.Product }))
);

// Компонент загрузки
const LoadingFallback = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    Загрузка...
  </div>
);

const basename =
  process.env.NODE_ENV === "production" ? "/boardposterapp" : "/";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/product/:id",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Product />
            </Suspense>
          ),
        },
      ],
    },
  ],
  { basename }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
