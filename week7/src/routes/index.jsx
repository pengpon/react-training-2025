import { lazy } from "react";
import { Navigate } from "react-router";
import AdminGuard from "../components/guard/AdminGuard";

// Layouts
const FrontLayout = lazy(() => import("../layouts/FrontLayout"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));

// Front Views
const Index = lazy(() => import("../views/front/Index"));
const ProductList = lazy(() => import("../views/front/ProductList"));
const ProductItem = lazy(() => import("../views/front/ProductItem"));
const Cart = lazy(() => import("../views/front/Cart"));
const About = lazy(() => import("../views/front/About"));
const Location = lazy(() => import("../views/front/Location"));
const Blog = lazy(() => import("../views/front/Blog"));
const Checkout = lazy(() => import("../views/front/Checkout"));
const Payment = lazy(() => import("../views/front/Payment"));
const PaymentSuccess = lazy(() => import("../views/front/Payment"));

// Admin Views
const Login = lazy(() => import("../views/Login"));
const AdminProductList = lazy(() => import("../views/admin/AdminProductList"));

// Other Views
const NotFound = lazy(() => import("../views/NotFound"));

const routes = [
  {
    path: "/",
    element: <FrontLayout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "product/:id",
        element: <ProductItem />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "location",
        element: <Location />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "payment",
        children: [
          {
            path: "thanks",
            element: <PaymentSuccess />,
          },
          {
            path: ":id",
            element: <Payment />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
      {
        path: "register",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        element: <AdminGuard />,
        children: [
          {
            path: "",
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="products" replace />,
              },
              {
                path: "products",
                element: <AdminProductList />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
