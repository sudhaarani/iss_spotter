const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((response) => {
    for (let element of response) {
      const date = new Date(element.risetime * 1000); // Convert from seconds to milliseconds
      const formattedDate = date.toString();// Format the date in a human-readable format
      console.log(`Next pass at ${formattedDate} for ${element.duration} seconds!`);
    }
  })