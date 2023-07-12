const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/onlineshopping";

const connectToMongo = async () => {
  try {
       await mongoose.connect(mongoURI);
       console.log("Connected to Mongo");
  } catch (error) {
    res.json({error: 'Please enter a unique email'})
    console.error(error);
  }
};


module.exports = connectToMongo;