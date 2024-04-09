const { MongoClient } = require("mongodb");
let mongoose = require("mongoose");
require("dotenv").config();

/* for development use this*/
const mongoURL = process.env.MONGO_URL;

const connectToMongoDb = async () => {
  /*Connecting to database using connection string and speciying if there is any error or it was successfull*/
  mongoose.connect( mongoURL,{ 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
    }
    ).then(() => {
      console.log("Database connected");
    }).catch((err) => {
      console.log("Database connection error", err);
    });
};

exports.connection = connectToMongoDb;
  