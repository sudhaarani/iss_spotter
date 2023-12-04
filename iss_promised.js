const request = require('request-promise-native');


const fetchMyIP = function () {
  // use request to fetch IP address from JSON API
  return request("https://api.ipify.org/?format=json");
};

/*
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function (body) {
  const ip = JSON.parse(body).ip
  return request("http://ipwho.is/" + ip);
};

const fetchISSFlyOverTimes = function (body) {
  const obj = JSON.parse(body);
  const { latitude, longitude } = obj;
  return request("https://iss-flyover.herokuapp.com/json/?lat=" + latitude + "&lon=" + longitude + "");
}

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)//fetchCoordsByIP as a callback
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const obj = JSON.parse(body);
      const { response } = obj;
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };

