import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../content/userContent";
import Axios from "axios";
import ErrorNotice from "./ErrorNotice";


export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post("/register", newUser);
      const loginRes = await Axios.post("/login", {
        email,
        password,
      });
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
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <br></br>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br></br>

        <label htmlFor="register-password">Password</label>
        <br></br>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br></br>

        <label htmlFor="register-password">Confirm Password</label>
        <br></br>
        <input
          type="password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <br></br>

        <label htmlFor="register-display-name">Display Name</label>
        <br></br>
        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />
         <br></br>
        <input class="btn btn-primary btn-lg active " aria-pressed="true" type="submit" value="Register" />
      </form>
    </div>
  );
}