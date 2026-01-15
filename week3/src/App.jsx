import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { checkAuth } from "./api/auth";
import { getCookie } from "./utils/cookie";
import LoginForm from "./pages/LoginForm";
import TableList from "./pages/ProductTableList";
import Spinner from "./components/Spinner";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const checkToken = useCallback(async () => {
    try {
      const res = await checkAuth();
      if (res.data.success) {
        setIsAuth(true);
      }
    } catch (error) {
      console.error(error.message);
      setIsAuth(false);
    }
  }, []);

  const handleLoadingVisible = useCallback((status) => {
    setIsLoading(status);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuth(true);
  };

  useEffect(() => {
    const init = async () => {
      const token = getCookie("hexEcToken");
      if (token) {
        await checkToken();
      } else {
        setIsAuth(false);
      }
      handleLoadingVisible(false);
    };
    init();
  }, [checkToken, handleLoadingVisible]);

  return (
    <>
      {isLoading && (
        <div className="absolute flex justify-center items-center w-full h-full z-10 bg-white">
          <Spinner />
        </div>
      )}
      {isAuth ? (
        <TableList />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default App;
