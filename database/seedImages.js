const axios = require('axios');
const API = require('../config.js');

const getRandomImages = () => {
  return new Promise((resolve, reject) => {
    axios({
      url: 'https://api.unsplash.com/photos/random?count=25',
      method: 'GET',
      headers: {
        'Authorization': `Client-ID ${API.token}`
      }
    })
    .then(images => {
      resolve(images.data);
    })
    .catch(err => {
      reject(err);
    })
  })
};

const allImages = () => {
  const getAllImages = [];

  for (let i = 0; i < 4; i++) {
    getAllImages.push(getRandomImages());
  }
  return Promise.all(getAllImages)
    .then(imageResults => {
      // return imageResults;
      return parseImages(imageResults);
    })
    .catch(err => {
      throw new Error(err);
    })
};

const parseImages = (images => {
  let imageCollection = [], allImages = images.flat();

  allImages.forEach(image => {
    imageCollection.push(image.urls);
  })
  return imageCollection;
});

module.exports = {
  allImages
};