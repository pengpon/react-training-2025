import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { checkAuthAsync } from "../../store/slices/authSlice"
import Spinner from "../Spinner";

function AdminGuard() {
  const dispatch = useDispatch();
  const { isAuth, isInitializing } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  if (isInitializing) {
    return (
      <div className="absolute flex justify-center items-center w-full h-full z-10 bg-root-bg">
        <Spinner />
      </div>
    );
  }

  return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;

}

export default AdminGuard;