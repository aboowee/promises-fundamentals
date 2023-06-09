/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var { pluckFirstLineFromFileAsync } = require('./promiseConstructor.js');
var { getGitHubProfileAsync } = require('./promisification.js');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

  return pluckFirstLineFromFileAsync(readFilePath)
    .then(function(firstLine) {
      return getGitHubProfileAsync(firstLine);
    })
    .then(function(gitHubProfile) {
      const stringedProfile = JSON.stringify(gitHubProfile);

      return new Promise((resolve, reject) => {
        return fs.writeFile(writeFilePath, stringedProfile, (err) => {
          if (err) {
            reject(err, '   error');
          }

          resolve(stringedProfile);
        });
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
