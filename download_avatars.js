var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) { 
    var options = {
        uri: 'https://api.github.com',
        path:  '/repos/' + repoOwner + '/' + repoName + '/contributors'
    }; 
    const auth = {
        url: options.uri + options.path,
        headers: {
            'User-Agent': 'request'
        }
    };
    request.get(auth, function(err, result) {
        cb(err, result);
    });

}

getRepoContributors('jquery', 'jquery', function(errors, result) {
    console.log("Errors:", errors);
    console.log("Result:", result);

  });

