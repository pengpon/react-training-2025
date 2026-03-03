import { Outlet, Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logoutAsync } from "../store/slices/authSlice";
import Toast from "../utils/swal";


function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutAsync()).unwrap();
      navigate("/admin/login");
    } catch (errorMessage) {
      Toast.fire({
        position: "top",
        icon: "error",
        title: errorMessage,
        color: "#1f2937",
        iconColor: "#ef4444",
        background: "#ffffff",
      });
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      <aside className="w-40 shrink-0 bg-white shadow-md">
        <div className="p-4 font-bold text-xl border-b">Dashboard</div>
        <nav className="flex-1 flex flex-col space-y-2">
          <Link
            to="/admin"
            className="text-center block p-2 hover:bg-primary-dark/40 "
          >
            Home
          </Link>
          <Link
            to="/admin/products"
            className=" text-center block p-2 hover:bg-primary-dark/40 "
          >
            Products
          </Link>
          <button
            onClick={handleLogout}
            className="w-fit m-auto px-4 py-2 text-red-500 hover:bg-red-50 rounded-button"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-full min-w-0 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
