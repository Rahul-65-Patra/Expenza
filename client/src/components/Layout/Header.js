import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { message } from "antd";
import "../../styles/HeaderStyles.css"; 

const Header = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    } else {
      setLoginUser(null);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setLoginUser(null);
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        {/* Navbar Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Brand Link */}
        <Link className="navbar-brand" to="/">
          Expenza
        </Link>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Display User Info */}
            <li className="nav-item">
              <h6 className="nav-link d-flex align-items-center">
                <UserOutlined className="me-2" />{" "}
                {loginUser && loginUser.name}
              </h6>
            </li>

            {/* Logout Button */}
            <li className="nav-item">
              <button
                onClick={logoutHandler}
                className=" btn bg-danger text-white ms-lg-3 mt-2"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
  
export default Header;
