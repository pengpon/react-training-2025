import "./App.css";
import { useState, useEffect, useCallback } from "react";
import api from "./axiosInstance";
import { setCookie } from "./utility";

const API_PATH = import.meta.env.VITE_API_PATH;

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      const res = await api.get(`/${API_PATH}/admin/products/all`);
      setProducts(Object.values(res.data.products));
    } catch (error) {
      console.error(error.message);
      if (error.status === 401) setIsAuth(false);
    }
  const Spinner = () => {
    return (
      <>
        <div className="absolute w-full h-full z-10 bg-white">
          <button
            type="button"
            className="flex absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-1/2 bg-sky-500 text-white p-2 rounded-md"
            disabled
          >
            <svg className="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </button>
        </div>
      </>
    );
  };

  const ProductList = ({ products }) => {
    const Product = ({product}) => {
      return (
        <>
          <a href="#" className="group">
            <img
              src={product.imageUrl}
              alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
              className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
            />
            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
            <p className="mt-1 text-lg font-medium ">
              <span className="text-amber-600">${product.price}</span>
              <span className="text-gray-600 line-through">
                ${product.origin_price}
              </span>
            </p>
          </a>
        </>
      );
    };

    return (
      <>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                  <Product key={product.id} product={product}/>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      signIn();
    };

    const signIn = async () => {
      try {
        const res = await api.post(`/admin/signin`, {
          username: username,
          password: password,
        });
        setCookie("hexEcToken", res.data.token, res.data.expired);
        setIsAuth(true);
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    };
    return (
      <>
        <div className="w-screen flex justify-center items-center h-screen bg-stone-200 text-gray-700">
          <form className="rounded-lg p-20 bg-gray-50" method="post">
            <h1 className="text-xl mb-10">Login</h1>
            <div className="mb-4">
              <label htmlFor="username">Username:</label>
              <input
                className="block border border-solid border-gray-300 rounded-sm hover:border-sky-700 focus:border-sky-700 focus:outline-0 p-1"
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password:</label>
              <input
                className="block border border-solid border-gray-300 rounded-sm hover:border-sky-700 focus:border-sky-700 focus:outline-0 p-1"
                type="password"
                id="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="rounded-sm px-4 py-2 text-gray-100 bg-sky-500 hover:bg-sky-700"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </>
    );
  };
  return <>{!isAuth ? <LoginForm /> : <ProductList products={products} />}</>;
};

export default App;
