  const connectToMongo = require('./db.js');
  const express = require('express')

  connectToMongo();

  const app = express()
  const port = 5000
  
  app.use(express.json())

  //available routes
  app.use('/api/auth', require('./routes/auth'))

  
  
  app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })