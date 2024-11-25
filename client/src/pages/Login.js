import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/LoginPage.css";

const Login = () => {
  const img ="expense.webp"
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // from submit
  const submitHandler = async (values) => {
    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/users/login", values);
      setLoading(false);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
      message.success("Login successfully");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  // prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
      return;
    }
  }, [navigate]);

  return (
    <>
      <div className="login-page">
        {loading && <Spinner />}
        <div className="row container">
          <h2>Expenza</h2>
          <div className="col-md-6 ">
            <img src={img} alt="login-img" width={"100%"} height="100%" />
          </div>

          <div className="col-md-4 login-form">
            <Form autoComplete="off" layout="vertical" onFinish={submitHandler}>
              <h1>Login Form</h1>

              <Form.Item label="Email" name="email">
                <Input type="email" required autoComplete="true" />
              </Form.Item>

              <Form.Item label="Password" name="password">
                <Input.Password type="password" required />
              </Form.Item>

              <div className="d-flex justify-content-between">
                <span className="mt-2 fw-normal text-dark">
                  Don't have an account?
                </span>
                <Link to="/register">Click here to Registration</Link>
                <button className="btn btn-primary">Login</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
