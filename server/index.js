const express = require('express');
const app = express();

require('./router/index')(app);

const PORT = process.env.PORT || 3001; 

app.listen(PORT, () => {
  console.log('Server is up!')
})