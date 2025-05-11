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
import { AuthLayout } from "./Layout/Menu/Auth/Auth.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import RequireAuth from "./api/RequireAuth.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const Menu = lazy(() => import("./pages/Menu/Menu.tsx"));

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
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
				path: "cart",
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
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "register",
				element: <Register />,
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
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
