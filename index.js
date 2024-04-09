const express = require("express");
const app = express();
const { connection } = require("./db/connection");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const routes = require("./routes/routes");

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
app.use( cors() );

// Connecting to database
connection();


app.use("/api", routes);

// listening backend on a port.
const port = process.env.PORT || 8080;
app.listen( port, () => console.log(`App listening on port ${port}!`) );

module.exports = app;
