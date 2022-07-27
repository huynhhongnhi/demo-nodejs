// import dependencies
const express = require('express');

// set up dependencies    
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set up port number
const port = 5035;

// set up route
app.use('/api/', require('./src/Routes/api'));


// listen
app.listen(port, (request, respond) => {
  console.log(`Our server is live on ${port}. Yay!`);
});