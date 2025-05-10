import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./pages/Cart/Cart.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import Layout from "./Layout/Menu/MenuLayout.tsx";
import Product from "./pages/Product/Product.tsx";
import axios from "axios";
import { PREFIX } from "./api/Api.ts";

const Menu = lazy(() => import('./pages/Menu/Menu.tsx'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<span>Идет загрузка...</span>}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <Product />,
        errorElement: <div>Страница не найдена</div>,
        loader: async ({ params }) => {
            
          const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          return data;
        },
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
