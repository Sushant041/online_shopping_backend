const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://grtsushant:Yyh6mUaCLKNzrIwh@cluster0.l4lqklc.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = async () => {
  try {
       await mongoose.connect(mongoURI);
       console.log("Connected to Mongo");
  } catch (error) {
    console.error(error);
  }
};


module.exports = connectToMongo;