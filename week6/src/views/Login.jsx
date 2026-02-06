import { useState } from "react";
import { signIn } from "../api/admin/auth";
import { setCookie } from "../utils/cookie";
import { logger } from "../utils/logger";
import logo from "../assets/images/logo_full.png";

function Login({ onLoginSuccess }) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleOnValueChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await signIn(userData);
      setCookie("hexEcToken", res.data.token, res.data.expired);
      onLoginSuccess();
    } catch (error) {
      logger.error(error.message, error);
      if (error.response.data) {
        setError(
          `${error.response.data.message}: ${error.response.data.error.message}`,
        );
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/3">
          <img src={logo} alt="logo" />
        </div>
        <form className="w-1/2 max-w-120 min-w-fit px-20 py-10 flex flex-col justify-center align-middle text-gray-600 bg-white rounded-main">
          <h1 className="mb-10 text-3xl text-center">Login</h1>
          <div className="px-5 py-16">
            <div className="mb-6">
              <label htmlFor="username" className="text-xl">
                Email:
              </label>
              <input
                className="w-full block p-2 border border-gray-300 rounded-input hover:border-primary focus:border-primary focus:outline-0 placeholder:text-sm;"
                type="email"
                id="username"
                name="username"
                value={userData.username}
                required
                placeholder="Type your email"
                onChange={handleOnValueChange}
              />
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
                  name="password"
                  value={userData.password}
                  required
                  placeholder="Type your password"
                  onChange={handleOnValueChange}
                />
              </div>
            </div>
            {error && (
              <span className="text-sm text-status-error">{error}</span>
            )}

            <div className="mt-10 text-center">
              <button
                title="login"
                type="button"
                className="text-white bg-secondary/80 rounded-button px-4 py-2 hover:bg-secondary cursor-pointer"
                onClick={handleSubmit}
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
