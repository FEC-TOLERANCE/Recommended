const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());

app.use(express.static(__dirname + '/../client/dist'));
app.use('/:projectId', express.static(__dirname + '/../client/dist'));


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});