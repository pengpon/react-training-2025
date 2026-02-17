import { signIn } from "../api/admin/auth";
import { setCookie } from "../utils/cookie";
import { logger } from "../utils/logger";
import logo from "../assets/images/logo_full.png";
import { useForm } from "react-hook-form";
import Toast from "../utils/swal";
import { useNavigate } from "react-router";
import { loginSuccess } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await signIn(data);
      setCookie("hexEcToken", res.data.token, res.data.expired);
      dispatch(loginSuccess());
      navigate("/admin/products");
    } catch (error) {
      logger.error(error.message, error);

      Toast.fire({
        position: "top",
        icon: "error",
        title: error?.response?.data?.message,
        color: "#fff",
        iconColor: "#fff",
        background: "#ef5350",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:h-screen gap-2">
        <div className="w-full max-w-3/5 lg:w-1/3">
          <img src={logo} alt="logo" />
        </div>
        <form
          className="w-full lg:w-1/2 max-w-120 min-w-fit px-2 py-6 lg:px-20 lg:py-10 flex flex-col justify-center align-middle text-gray-600 lg:bg-white rounded-main"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h1 className="mb-2 lg:mb-10 text-3xl text-center">Login</h1>
          <div className="px-5 py-6 lg:py-16">
            <div className="mb-6">
              <label htmlFor="username" className="text-xl">
                Email:
              </label>
              <input
                className="w-full block p-2 border border-gray-300 rounded-input hover:border-primary focus:border-primary focus:outline-0 placeholder:text-sm"
                type="email"
                id="username"
                placeholder="Type your email"
                {...register("username", {
                  required: "請輸入 Email",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email 格式錯誤",
                  },
                })}
              />
              <div className="h-5 text-status-error">
                {errors.username ? errors.username.message : ""}
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="text-lg">
                Password:
              </label>
              <div className="relative">
                <input
                  className="w-full block p-2 border border-gray-300 rounded-input hover:border-primary focus:border-primary focus:outline-0 placeholder:text-sm;"
                  type="password"
                  id="password"
                  placeholder="Type your password"
                  {...register("password", {
                    required: "請輸入密碼",
                    minLength: { value: 6, message: "密碼長度至少需 6 碼" },
                  })}
                />
              </div>
              <div className="h-5 text-status-error">
                {errors.password ? errors.password.message : ""}
              </div>
            </div>

            <div className="mt-10 text-center">
              <button
                type="submit"
                className="text-white bg-secondary/80 rounded-button px-4 py-2 hover:bg-secondary cursor-pointer"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
