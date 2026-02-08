import Index from "../pages/Index";
import ProductList from "../pages/ProductList";
import ProductItem from "../pages/ProductItem";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Location from "../pages/Location";
import FrontLayout from "../layouts/FrontLayout";
import Blog from "../pages/Blog";
import Login from "../pages/Login";
import Checkout from "../pages/Checkout";
import NotFound from "../pages/NotFound";

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
];

export default routes;
