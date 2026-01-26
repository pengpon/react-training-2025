import "./App.css";
import { useEffect, useState } from "react";
import { getCookie } from "./utils/cookie";
import { logger } from "./utils/logger";
import { checkAuth } from "./api/auth";

import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import Spinner from "./components/Spinner";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await checkAuth();
        if (res.data.success) setIsAuth(true);
      } catch (error) {
        logger.error(error.message, error);
        setIsAuth(false);
      }
    };

    const init = async () => {
      const token = getCookie("hexEcToken");
      if (token) await checkToken();
      if (!token) setIsAuth(false);
      setIsLoading(false)
    };
    init();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="full-container bg-secondary">
          <Spinner />
        </div>
      )}

      {isAuth ? (
        <ProductList />
      ) : (
        <Login onLoginSuccess={() => setIsAuth(true)} />
      )}
    </>
  );
}

export default App;
