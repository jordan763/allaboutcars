const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    pricepermonth: {
        type: String,
        required: false
    },
    rating: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    neworused: {
        type: String,
        required: true
    },
    mile: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
})

const Car = mongoose.model("Car", carSchema);

module.exports = Car;