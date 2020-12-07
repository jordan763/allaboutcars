import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import CarCard from "../../components/CarCard";

class Saved extends Component {
  state = {
    savedCars: []
  };

  componentDidMount() {
    this.getSavedCars();
  }

  getSavedCars = () => 
    API.getSavedCars()
      .then(res => this.setState({savedCars: res.data}))
      .catch(err => console.log(err))

  deleteCar = id => 
    API.deleteSavedCar(id)
      .then(res => this.getSavedCars())
      .catch(err => console.log(err));

  render() {
    return (
      <Container>
        <Jumbotron 
          title = "Saved Cars"
          lead = "Here are your saved cars..."
          fontawesome = "fas fa-bookmark"
        />
          <Row className="justify-content-center">
          <Col size="10">
            {this.state.savedCars.map((car, i) => (
              <CarCard 
                title = {car.title}
                price = {car.price}
                pricepermonth = {car.pricepermonth}
                rating = {car.rating}
                neworused = {car.neworused}
                mile = {car.mile}
                color = {car.color}
                img = {car.img}
                delete = {() => this.deleteCar(car._id)}
                alreadySaved = {true}
                key = {i}
              />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
