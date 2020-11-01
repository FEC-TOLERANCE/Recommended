const seedImages = require('./seedImages.js');
const database = require ('./index.js');

Promise.resolve(seedImages.allImages())
  .then(images => {
    database.saveImages(images);
  })
  .then(() => {
    process.exit();
  })
  .catch(err => {
    throw new Error(err);
  })