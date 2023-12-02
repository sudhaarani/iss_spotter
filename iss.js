const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (error, response, body) => { //url is api
    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const obj = JSON.parse(body); //to convert string into object
    const ip = obj.ip;
    callback(null, ip);
  });
};

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIP = function (ip, callback) {
  request("http://ipwho.is/" + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const obj = JSON.parse(body); //to convert string into object
    // check if "success" is true or not
    if (!obj.success) {
      const message = `Success status was ${obj.success}. Server message says: ${obj.message} when fetching for IP ${obj.ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = obj;//returns these 2 key and also values
    callback(null, { latitude, longitude });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function (coords, callback) {
  // ...
  request("https://iss-flyover.herokuapp.com/json/?lat=" + coords.latitude + "&lon=" + coords.longitude + "", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode != - 200) {
      const message = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(message), null);
      return;
    }
    const obj = JSON.parse(body); //to convert string into object
    const passes = obj.response;
    callback(null, passes);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };