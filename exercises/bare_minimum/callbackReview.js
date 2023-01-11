/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('needle');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, handlerFirstLine) {

  fs.readFile(filePath, function(err, data) {
    if (err) {
      handlerFirstLine(err);
    } else {
      const text = data.toString();
      const firstLine = text.split('\n')[0];
      handlerFirstLine(null, firstLine);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, handlerStatus) {

  request.get(url, function(error, response) {
    if (error) {
      handlerStatus(error);
    } else {
      handlerStatus(null, response.statusCode);
    }
  })

};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
