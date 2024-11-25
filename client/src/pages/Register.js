import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/RegisterPage.css";

const Register = () => {
  const img = "expense.webp"

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/v1/users/register", values);
      message.success("Registered Successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("User already exists");
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
      <div className="register-page">
        {loading && <Spinner />}
        <div className="row container">
          <h2>Expenza</h2>
          <div className="col-md-6 ">
            <img src={img} alt="login-img" width={"100%"} height="100%" />
          </div>

          <div className="col-md-4 register-form">
            <Form autoComplete="off" layout="vertical" onFinish={submitHandler}>
              <h1>Registration Form</h1>
              <Form.Item label="Name" name="name">
                <Input type="text" required />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input type="email" required />
              </Form.Item>

              <Form.Item label="Password" name="password">
                <Input.Password type="password" required />
              </Form.Item>

              <div className="d-flex justify-content-between">
                <span className="text-muted mt-2 fw-normal text-dark">
                  Already have an account?
                </span>
                <Link to="/login"> Click here to Login</Link>
                <button className="btn btn-primary">Register</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
