const mongoose = require('mongoose');

// set up mongoose
const database = mongoose.connect("mongodb://root:example@localhost:27017/populations?authSource=admin").then(() => {
  console.log("DB connected")
}).catch((errror)=> {
  console.log("DB connect error")
  console.log(errror);
});

module.exports = database;