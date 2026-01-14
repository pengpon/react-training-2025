import "./App.css";
import { useState, useEffect, useCallback } from "react";
import LoginForm from "./pages/LoginForm";
import TableList from "./pages/ProductTableList";
import { checkAuth } from "./api/auth";
import { getCookie } from "./utils/cookie";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const checkToken = useCallback(async () => {
    try {
      const res = await checkAuth();
      if (res.data.success) {
        setIsAuth(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuth(true)
  }

  useEffect(() => {
    const init = async () => {
      const token = getCookie("hexEcToken");
      if (token) await checkToken();
    };
    init();
  }, [checkToken]);

  return (
    <>
      <div className="w-screen h-screen bg-secondary/60 p-10">
        {isAuth ? <TableList /> : <LoginForm  onLoginSuccess={handleLoginSuccess} />}
      </div>
    </>
  );
}

export default App;
