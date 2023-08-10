const mongoose = require('mongoose');

const uri = process.env.MONGOURI

const mongoURI = uri;

const connectToMongo = async () => {
  try {
       await mongoose.connect(mongoURI);
       console.log("Connected to Mongo");
  } catch (error) {
    console.error(error);
  }
};


module.exports = connectToMongo;