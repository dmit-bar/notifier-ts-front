import * as React from "react";
import "./Login.scss";
import Textfield from "../../Controls/Textfield";

const Login = () => {
  // TODO Add Formik

  return (
    <div className="login-root">
      <span className="logo">notifier</span>
      <div className="form">
        <Textfield name="login" id="login" type="text" placeholder="login" />
        <Textfield
          name="password"
          id="password"
          type="password"
          placeholder="password"
        />
      </div>
    </div>
  );
};

export default Login;
