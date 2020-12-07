import axios from "axios";

export default {
  // Gets all saved cars
  getSavedCars: function() {
    return axios.get("/cars/saved");
  },
  // Stores an car into the database
  saveCar: function(carData) {
    return axios.post("/cars/saved", carData);
  },
  // Deletes the car with the given id
  deleteSavedCar: function(id) {
    return axios.delete("/cars/saved/" + id);
  },
  // Grabs the cars matching the given search params
  searchCars: function(make, model, city, mile) {
    return axios.get(`/cars/search/?make=${make}&model=${model}&city=${city}&mile=${mile}`);
  }
};
