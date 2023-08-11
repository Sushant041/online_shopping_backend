require("dotenv").config({
  path: "/.env"
});

const mongoose = require('mongoose');


const url = "mongodb+srv://grtsushant:Yyh6mUaCLKNzrIwh@cluster0.l4lqklc.mongodb.net/?retryWrites=true&w=majority"



const connectToMongo = async () => {
  try {
       await mongoose.connect(url);
       console.log("Connected to Mongo");
  } catch (error) {
    console.error(error);
  }
};


module.exports = connectToMongo;