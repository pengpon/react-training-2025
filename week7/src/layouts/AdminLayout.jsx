import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { getCookie } from "../utils/cookie";
import { logger } from "../utils/logger";
import { checkAuth } from "../api/admin/auth";
import Login from "../views/Login";
import Spinner from "../components/Spinner";

function AdminLayout() {
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
      setIsLoading(false);
    };
    init();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="absolute flex justify-center items-center w-full h-full z-10 bg-root-bg">
          <Spinner />
        </div>
      )}

      {isAuth ? <Outlet /> : <Login onLoginSuccess={() => setIsAuth(true)} />}
    </>
  );
}

export default AdminLayout;
