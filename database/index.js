const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect('mongodb://localhost/recommended', {useNewUrlParser: true});

db.on('error', function() {
  console.log('Could not connect to MongoDB');
});

db.once('open', function() {
  console.log('Connected to MongoDB');
});

const imageSchema = new mongoose.Schema({
  key: Number,
  raw: String,
  full: String,
  regular: String,
  small: String,
  thumb: String
});

const Image = mongoose.model('image', imageSchema);

const saveImages = (images => {
  const imagesSaved = [];

  for (let i = 0; i < images.length; i++) {
    const newImage = new Image({
      key: i + 1,
      raw: images[i].raw,
      full: images[i].full,
      regular: images[i].regular,
      small: images[i].small,
      thumb: images[i].thumb
    })

    const saveImage = new Promise((resolve, reject) => {
      newImage.save(err => {
        if (err) {
          reject(err);
        }
        resolve();
      })
    })
    imagesSaved.push(saveImage);
  }
  return Promise.all(imagesSaved);
})

module.exports = {
  saveImages
}