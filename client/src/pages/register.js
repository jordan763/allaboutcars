import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../content/userContext";
import axios from "axios";
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
      await axios.post("/users/register", newUser).then(res => {
        let user = res.data;
        console.log(user);
      });

      const loginRes = await axios.post("/login", {
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
      <h2>Sign Up</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <br></br>
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <br></br>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <label>Password</label>
        <br></br>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <br></br>
        <label>Display name</label>
        <br></br>
        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <br></br>
        <br></br>
        <input class="btn" type="submit" value="Register" />
      </form>
    </div>
  );
}