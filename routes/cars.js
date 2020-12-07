const router = require("express").Router();
const carsController = require("../controllers/carsController");
const search = require("../services/scrape");

// Matching with "/api/cars/search/?"
router.route("/search/?")
    .get(search)
//
router.route("/saved")
    .get(carsController.findAll)
    .post(carsController.create);

// Matches with "/api/cars/:id"
router.route("/saved/:id")
    .delete(carsController.remove);

module.exports = router;
