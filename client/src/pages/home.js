import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../content/userContext";

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? (
        <div className="text-center mt-5">
          <h1>Welcome {userData.user.displayName}</h1>
          <div className="mt-5">
            <Link to="/search">Search</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mt-5">
            <h2>You are not logged in. Please register and login into here.</h2>
            <Link to="/login">Log in</Link>
          </div>
        </>
      )}
    </div>
  );
}