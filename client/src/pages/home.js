import React, { useContext } from "react";
import UserContext from "../content/userContent";
import Join from '../components/Join/Join';
import Chat from '../components/Chat/Chat';

import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? (
        <h1>Welcome, {userData.user.displayName}</h1>,
        <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
        </Router>
                
      ) : (
        <>
          <h2>
          <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTuBH6VsFepjszgDInG2ZtEAeBb-ybJLBpXQ&usqp=CAU" alt="car"
        />
          <br></br>

          AllAboutCars App
          </h2>
        </>
      )}
    </div>
    
  );
}