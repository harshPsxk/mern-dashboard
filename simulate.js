const axios = require('axios');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCompanyId() {
  return `C${getRandomInt(1, 10)}`
}

function getRandomTemperature() {
  return getRandomInt(30, 100);
}


let getConfig = (deviceId) => ({
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:5000/data',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : JSON.stringify({
    "deviceId": deviceId,
    "companyId": getRandomCompanyId(),
    "temperature": getRandomTemperature(),
    "date": Date.now()
  })
});

async function devicePush(deviceId) {
  for(let i = 0; i < 1000; i++) {
    try {
      await axios.request(getConfig(deviceId));
    } catch(error) {
      console.log(error);
    }
  }
}

// Simulating 5 devices from random companies pushing data to our api
Promise.all(Array.from({ length: 5 }).map((_, index) => devicePush(`D${index+1}`)))
  .catch((err) => console.log(err));
