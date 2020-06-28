const mongoose = require('mongoose');
const config = require('./db');

module.exports = async () => {
  try {
    await mongoose.connect(config.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })

    console.log('Mongoose connected');
  } catch (err) {
    console.log('Unable to connect mongoose')
    console.log(err)
  }
}