const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (let element of passTimes) {
    const date = new Date(element.risetime * 1000); // Convert from seconds to milliseconds
    const formattedDate = date.toString();// Format the date in a human-readable format
    console.log(`Next pass at ${formattedDate} for ${element.duration} seconds!`);
  }
});