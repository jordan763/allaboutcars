import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContent from "../../content/userContent";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContent);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <nav className="auth-options">
      {userData.user ? (
         <button className="button" onClick={logout}>Log out</button>
      ) : (
        <>
          <button className="button" onClick={register}>Register</button>
          <button className="button" onClick={login}>Login</button>
        </>
      )}
    </nav>
  );
}