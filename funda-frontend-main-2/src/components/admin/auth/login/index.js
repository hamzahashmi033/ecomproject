import React from "react";
import Logo from "../../../../assets/kmmart-logo/favicon-dark-transparent.png";
import "./index.css";
const Login = () => {
  return (
    <div className="admin-login">
      <form>
        <div className="logo-box">
          <img src={Logo} alt="" />
        </div>
        <div className="input-group">
          <input type="email" name="email" autoFocus placeholder="UserEmail" />
        </div>
        <div className="input-group">
          <input type="password" name="password" placeholder="Password" />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
