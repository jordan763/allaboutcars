import React, { Component } from "react";
import Select from 'react-select';
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import CarCard from "../../components/CarCard";
import {makes, models, cities, miles} from "../../data";

class Search extends Component {
  state = {
    cars: [],
    savedCars: [],
    make: {},
    model: models.Init,
    city: {label: 'Chicago', value: 'Chicago-IL'},
    mile: {label: '+50 miles', value: '50'},
    emptySearch: false
  };

  /**
 * The options array should contain objects.
 * Required keys are "name" and "value" but you can have and use any number of key/value pairs.
 */

  componentDidMount() {
    this.getSavedCars();
  }

  checkSaved = car => {
    return this.state.savedCars.filter(elem => elem.img === car.img).length > 0;
  }

  getSavedCars = () => 
    API.getSavedCars()
      .then(res => this.setState({savedCars: res.data}))
      .catch(err => console.log(err))

  handleFormSubmit = event => {
  	event.preventDefault();
    let {make, model, city, mile} = this.state;

    API.searchCars(make ? make.value : '', model ? model.value : '', city.value, mile.value)
    .then(res => {
      let cars = res.data;
      let emptySearch = false;
      if (cars.length <= 0) {
        emptySearch = true;
      }
      this.setState({cars, emptySearch, make: {}, model: models.Init, city: {label: 'Chicago', value: 'Chicago-IL'}, mile: {label: '+50 miles', value: '50'}})
    })
    .catch(err => console.log(err));

  };

  saveCar = index => {
    API.saveCar(this.state.cars[index])
      .then(res => this.getSavedCars())
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Container>
	      <Jumbotron 
	      	title = "Carsoup Scraper"
	      	lead = "Search for and save interesting cars!"
	      	fontawesome = "fas fa-search"
	      />
	      <Row className="justify-content-center">
          <Col size="10">
            <div className="card">
              <div className="card-header">
                <h4><i className="far fa-hand-point-right"></i> Search </h4>
              </div>
              <div className="card-body">
                <form>
                  <Row className="justify-content-center m-3">
                    <Col size="5">
                      <label>Car Make</label>
                      <Select options={makes} onChange={selectedOption => {this.setState({make: selectedOption});}} placeholder="Choose your car make" />
                    </Col>
                    <Col size="5">
                      <label>Car Model</label>
                      <Select options={this.state.make && this.state.make.value ? models[this.state.make.value] : models.Init} value={this.state.model} onChange={selectedOption => {this.setState({model: selectedOption});}} placeholder="Choose your car model" />
                    </Col>
                  </Row>
                  <Row className="justify-content-center m-3">
                    <Col size="5">
                      <label>Location or City</label>
                      <Select options={cities} value={this.state.city} onChange={selectedOption => {this.setState({city: selectedOption});}} placeholder="Choose your city" />
                    </Col>
                    <Col size="5">
                      <label>Miles Range</label>
                      <Select options={miles} value={this.state.mile} onChange={selectedOption => {this.setState({mile: selectedOption});}} placeholder="Choose your car mile" />
                    </Col>
                  </Row>
                  <FormBtn
                    // disabled = {!(this.state.topic)}
                    onClick = {this.handleFormSubmit}
                    >
                    Submit
                  </FormBtn>
                </form>
              </div>
            </div>
          </Col>
	  	  </Row>
        <Row className="justify-content-center">
          <Col size="10">
            {this.state.emptySearch
            ?
            <h3 className="text-center mt-2">No results found. Please try another query.</h3>
            :
              this.state.cars.map((car, i) => (
              <CarCard 
                title = {car.title}
                price = {car.price}
                pricepermonth = {car.pricepermonth}
                rating = {car.rating}
                neworused = {car.neworused}
                mile = {car.mile}
                color = {car.color}
                img = {car.img}
                save = {() => this.saveCar(i)}
                alreadySaved = {this.checkSaved(car)}
                key = {i}
              />))
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
