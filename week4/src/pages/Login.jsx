import { useState } from "react";
import { signIn } from "../api/auth";
import { setCookie } from "../utils/cookie";
import { logger } from "../utils/logger";
import LoginForm from "../components/LoginForm";

function Login({ onLoginSuccess }) {
  const [error, setError] = useState("");

  const handleSubmit = async (userData) => {
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
      <LoginForm error={error} onSubmit={handleSubmit} />
    </>
  );
}

export default Login;
