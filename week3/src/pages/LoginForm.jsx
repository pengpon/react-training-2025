import { useState } from "react";
import { IconEye, IconEyeSlash } from "../components/Icons";
import { signIn } from "../api/auth";
import { setCookie } from "../utils/cookie";

function Login({onLoginSuccess}) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const adminSignIn = async (data) => {
    try {
      const res = await signIn(data);
      console.log(res.data.products);
      setCookie("hexEcToken", res.data.token, res.data.expired);
      onLoginSuccess()
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    // 防止提交表單時的頁面重整預設行為
    e.preventDefault();
    console.log("submit", userData);
    adminSignIn(userData);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-secondary-dark">
        <div className="w-1/3">
          <img src="/src/assets/logo-with-slogan.png" alt="logo" />
        </div>
        <form
          className="flex flex-col justify-center align-middle max-w-120 w-1/2 max-h-180 h-3/4 py-10 px-20 text-neutral-gray bg-white"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl mb-10 text-center text-neutral-gray">
            Login
          </h1>
          <div className="px-5 py-16 rounded-2xl">
            <div className="mb-6">
              <label htmlFor="username" className="text-lg">
                Email:
              </label>
              <input
                className="block w-full p-1 border border-solid border-neutral-gray-light rounded-sm hover:border-primary focus:border-primary focus:outline-0 placeholder:text-sm"
                type="email"
                id="username"
                name="username"
                required
                value={userData.username}
                onChange={handleValueChange}
                placeholder="Type your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="text-lg">
                Password:
              </label>
              <div className="relative">
                <input
                  className="block w-full p-1 border border-solid border-neutral-gray-light rounded-sm hover:border-primary focus:border-primary focus:outline-0 placeholder:text-sm"
                  type={isShowPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={userData.password}
                  onChange={handleValueChange}
                  placeholder="Type your password"
                />
                <span
                  className="size-5 text-gray-400 absolute top-1/2 right-2 -translate-y-1/2"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? <IconEye /> : <IconEyeSlash />}
                </span>
              </div>
            </div>
            <div className="mt-10 text-center">
              <button
                type="submit"
                className="text-lg rounded-sm px-4 py-2 text-white bg-primary hover:bg-primary-dark"
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
