import FrontLayout from "../layouts/FrontLayout";
import Login from "../views/Login";
import NotFound from "../views/NotFound";
import Index from "../views/front/Index";
import ProductList from "../views/front/ProductList";
import ProductItem from "../views/front/ProductItem";
import Cart from "../views/front/Cart";
import About from "../views/front/About";
import Location from "../views/front/Location";
import Blog from "../views/front/Blog";
import Checkout from "../views/front/Checkout";

import AdminLayout from "../layouts/AdminLayout";
import AdminProductList from "../views/admin/AdminProductList";

const routes = [
  {
    path: "/",
    element: <FrontLayout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/products",
        element: <ProductList />,
      },
      {
        path: "/product/:id",
        element: <ProductItem />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/location",
        element: <Location />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound/>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout/>,
    children: [
      {
        path: "",
        element: <Login />
      },
      {
        path: "products",
        element: <AdminProductList />
      }
    ]
  }
];

export default routes;
