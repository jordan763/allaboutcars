const db = require("../models");

module.exports = {
  findAll: async (req, res) => {
    try {
      res.json(await db.Car.find(req.query).sort({ date: -1 }));
    } catch(err) {
      res.status(422).json(err);
    }
  },
  create: async (req, res) => {
    try {
      console.log(req.body);
      res.json(await db.Car.create(req.body));
    } catch(err) {  
      res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      const matchedCar = await db.Car.findById({ _id: req.params.id });
      res.json(await matchedCar.remove()); 
    } catch(err) {
      res.status(422).json(err);
    }
  }
}
