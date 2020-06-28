const mongoose = require('mongoose');
const config = require('./db');

module.exports = function() {
  mongoose.connect(config.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongoose connected');
  })
  .catch((err) => {
    console.log('Unable to connect mongoose')
    console.log(err)
  })
}