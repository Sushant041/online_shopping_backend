  const connectToMongo = require('./db.js');
  const express = require('express')

  connectToMongo();

  const app = express()
  const port = 3000
  
  //available routes
  app.use('/api/auth', require('./routes/auth'))

  
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })