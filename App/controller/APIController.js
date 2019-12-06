const request = require('request');

exports.getAPI = (url) => {
    return new Promise(function(resolve, reject) {
        request.get(url, { timeout: 50000, json: true }, function(err, resp, body) {
          if (err) {
            reject(err);
          } else {
            resolve(body);
          }
        })
    })
}
