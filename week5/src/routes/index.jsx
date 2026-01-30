import Index from "../pages/Index";
import ProductList from "../pages/ProductList";
import ProductItem from "../pages/ProductItem";
import Cart from "../pages/Cart";
import Layout from "../layout";

const routes = [
  {
    path: "/",
    element: <Layout />,
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
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default routes;
