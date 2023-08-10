  const connectToMongo = require('./db.js');
  const express = require('express')
  const cors = require('cors');

  connectToMongo();
 
  const app = express()
  const port = process.env.PORT || 5000
  // Enable CORS for all routes
  app.use(cors());
  
  app.use(express.json())

  //available routes
  app.use('/api/auth', require('./routes/auth'))

  
  
  app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })