const express = require('express');
const app = express();
const { port } = require('./config');

app.use(require('cors')());
app.use(express.json());
require('./plugins/db')();
require('./router')(app);

app.listen(port, () => {
  console.log('http://localhost:8000');
});
