import React from "react";
import "./CarCard.css";

const CarCard = props => (
<div className="card my-4">
  <div className="card-header">


        <span className="float-right">
        {

    	(window.location.pathname === "/search")  
    	?
    		<button 
	    		className="btn btn-primary" 
	    		disabled = {props.alreadySaved}
	    		onClick = {props.save}
    		>
	    		{(props.alreadySaved 
	    			? <i className="fas fa-bookmark"></i> 
	    			: <i className="far fa-bookmark"></i>)}
    		</button>
    	:
    		<button
	    		className="btn btn-danger"
	    		onClick = {props.delete}
    		>
    			<i className="fas fa-trash-alt"></i>
    		</button>
    	
    	}
    	</span>

    	<h3>{props.title}</h3>
    	
  </div>
  <div className="card-body p-5">
  	{props.img 
  		? <img className="float-left car-img" src={props.img} alt={props.title}/> 
  		: null}
    <p className="card-text">Sale Price: {props.price} {props.pricepermonth}</p>
	<div className="text-center">
		<p className="card-text">{props.rating}</p>
	</div>
	<div className="pt-5">
		<p className="card-text">New or Used: {props.neworused}</p>
		<p className="card-text">Mile: {props.mile}</p>
		<p className="card-text">Color: {props.color}</p>
	</div>
  </div>
</div>
);

export default CarCard;