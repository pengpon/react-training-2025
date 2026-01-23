import { useState } from "react";

function LoginForm({error, onSubmit}) {
  const [userData, setUserData] = useState({
    username: "",
    password: ""
  });

  const handleOnSubmit = () => {
    onSubmit(userData)
  }

  const handleOnValueChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({...prev, [name]: value}))
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-secondary-light">
        <div className="w-1/3">
          <img src="./logo-with-slogan.png" alt="logo" />
        </div>
        <form className="w-1/2 max-w-120 min-w-fit px-20 py-10 flex flex-col justify-center align-middle text-gray-600 bg-white rounded-main">
          <h1 className="mb-10 text-3xl text-center">Login</h1>
          <div className="px-5 py-16">
            <div className="mb-6">
              <label htmlFor="username" className="text-lg">
                Email:
              </label>
              <input
                className="input-base"
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
                  className="input-base"
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
            {
              error && <span className="text-sm text-status-error">{error}</span>
            }

            <div className="mt-10 text-center">
              <button title="login" type="button" className="btn-primary" onClick={handleOnSubmit}>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
