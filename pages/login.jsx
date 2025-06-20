import React, { useEffect } from "react";
import Login from "../src/container/login";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
