import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../components/auth/authOptions";

export default function navBar() {
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">Project-3</h1>
      </Link>
      <AuthOptions />
    </header>
  );
}