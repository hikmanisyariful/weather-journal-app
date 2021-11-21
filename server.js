// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const server = app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

app.get("/all", (req, res) => {
  res.send(projectData)
})

app.post("/add", (req, res) => {
  const newEntryHolder = {
    [`${req.body.date}`] : {
      date: req.body.date,
      temp: req.body.temp,
      content: req.body.content
    }
  }
  Object.assign(projectData, newEntryHolder)
  res.send({message: 'Data has been entered successfully'})
});

