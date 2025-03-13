import React, { useState } from "react";
import AuthForm from "../../components/Form";
import { z } from "zod";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../App";
import { Spin } from "antd";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("values", values);
    setLoading(true);
    try {
      const result = await axios.post(`${base_url}/auth/login`, values);
      console.log("result", result);
      if (result.status == 200) {
        console.log("is here");

        setSuccessMessage("Wellcome again");
        localStorage.setItem("order-token", result.data.token);

        setTimeout(() => {
          navigate("/");
        }, 600);
      }
      console.log("result", result);
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again!";
      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage =
            error.response.data.message ||
            `Error: ${error.response.statusText}`;
        } else if (error.request) {
          errorMessage =
            "No response from server. Please check your connection.";
        } else {
          errorMessage = error.message;
        }
      } else {
        errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
      }
      setSuccessMessage("");
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-w-full flex p-6 items-center justify-center">
      <div className="shadow-lg rounded-sm p-6 max-w-[400px] w-[90%]">
        <AuthForm
          btnTitle={loading ? <Spin size="small" /> : "Login"}
          isLogin={true}
          onSubmit={onFinish}
        >
          <p className="text-sm mt-3">
            No account?{" "}
            <NavLink className="font-bold text-blue-700" to={"/signup"}>
              Signup
            </NavLink>
          </p>
        </AuthForm>
      </div>
    </div>
  );
};

export default Login;
