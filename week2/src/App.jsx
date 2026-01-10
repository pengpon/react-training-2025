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
    const Product = ({ product }) => {
      return (
        <>
          <tr className="hover:bg-slate-50">
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">{product.title}</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">${product.price}</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">
                ${product.origin_price}
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">{product.unit}</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">
                {product.is_enabled ? "啟用" : "關閉"}
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <a
                href="#"
                data-id={product.id}
                className="block text-sm font-semibold text-slate-800"
                onClick={handleProductSelect}
              >
                查看產品詳情
              </a>
            </td>
          </tr>
        </>
      );
    };

    return (
      <>
        <div className="relative flex flex-col w-10/12 mx-auto my-5 overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    名稱
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    售價
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    原價
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    單位
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    狀態
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500"></p>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </tbody>
          </table>
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
