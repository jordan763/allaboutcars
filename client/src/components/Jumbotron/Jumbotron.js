import React from "react";
import "./Jumbotron.css";

const Jumbotron = props => (

<div className="jumbotron text-center">
  <h3 className="display-4"><i className={props.fontawesome}></i> {props.title}</h3>
  <p className="lead">{props.lead}</p>
</div>

);

export default Jumbotron;