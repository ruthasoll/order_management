import React from "react";
import AuthForm from "../../components/Form";
import { NavLink, useNavigate } from "react-router-dom";
import { base_url } from "../../App";
import { Spin } from "antd";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await axios.post(`${base_url}/auth/signup`, values);
      if (result.status === 201) {
        setSuccessMessage("User created successfully :). ");
        setTimeout(() => {
          navigate("/login");
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
      setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 4000);
    }
  };
  return (
    <div className="min-w-full flex p-6 items-center justify-center">
      <div className="shadow-lg rounded-sm p-6 max-w-[400px] w-[90%]">
        <AuthForm
          btnTitle={loading ? <Spin size="small" /> : "Signup"}
          isLogin={false}
          onSubmit={onFinish}
        >
          <p className="text-sm mt-3">
            Already have an account?{" "}
            <NavLink className="font-bold text-blue-700" to={"/login"}>
              Login
            </NavLink>
          </p>
        </AuthForm>
      </div>
    </div>
  );
};

export default Signup;
