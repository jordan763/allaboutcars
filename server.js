const express = require("express");
const bluebird = require('bluebird');
const mongoose = require('mongoose');
const logger = require('morgan')
const morganBody = require('morgan-body');


const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Morgan loggers.
app.use(logger('dev'));
morganBody(app, {
  logReqDateTime: false,
  logReqUserAgent: false
});

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/carscrape',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  console.log("Connected to MongoDB")
);

// Add routes, both API and view
const routes = require("./routes/index");
app.use(routes);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
