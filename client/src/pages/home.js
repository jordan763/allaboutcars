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
          <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTuBH6VsFepjszgDInG2ZtEAeBb-ybJLBpXQ&usqp=CAU" alt="car"> 
          </img>
            <h2>You are not logged in. Please register or login.</h2>
            <Link to="/login">Login</Link>
          </div>
        </>
      )}
    </div>
  );
}