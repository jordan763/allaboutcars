import React, { useContext } from "react";
import UserContext from "../content/userContent";


export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? (
        <h1>Welcome {userData.user.displayName}</h1>
      ) : (
        <>
          <h2>
          <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTuBH6VsFepjszgDInG2ZtEAeBb-ybJLBpXQ&usqp=CAU"
        />
          </h2>
        </>
      )}
    </div>
  );
}