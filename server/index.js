const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const database = require('../database/index.js');

app.use(cors());

app.use(express.static(__dirname + '/../client/dist'));
app.use('/:projectId', express.static(__dirname + '/../client/dist'));

app.get('/recommended/:projectId', (req, res) => {
  let id = req.params.projectId;

  database.getRelatedProjects(id)
    .then(image => {
      res.status(200).send(image);
    })
    .catch(err => {
      res.status(404).send(`Could not find image due to ${err}`);
    })
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});