const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; 
const mongodb_connect = require('./config/mongodb');
const routes = require('./router/index');
const cors = require('cors');

// Init Middleware
app.use(express.json({ extended: true }));
app.use(cors());

// Include api routes
routes(app);

// Connect data base
mongodb_connect();

// Start listen server
app.listen(PORT, () => {
  console.log('Server is up!')
})
