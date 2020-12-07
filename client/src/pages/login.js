import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../content/userContext";
import Axios from "axios";
import ErrorNotice from "./ErrorNotice";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "/users/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="page">
      <h2>Login</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label>Email</label>
        <br></br>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <label>Password</label>
        <br></br>
        <input
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        <input class="btn" type="submit" value="Login" />
      </form>
    </div>
  );
}