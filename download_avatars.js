var request = require('request');
var fs = require('fs');
var args = process.argv;
var arg1 = args[2];
var arg2 = args[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) { 
    var options = {
        url: 'https://api.github.com',
        path:  '/repos/' + repoOwner + '/' + repoName + '/contributors'
    }; 
    const auth = {
        url: options.url + options.path,
        headers: {
            'User-Agent': 'request'
        }
    };
    request(auth, function(err, result, body) {
        var info = JSON.parse(body);
        var avatarURL = info[0].avatar_url;
        // if (!err && result.statusCode === 200 ) {
            cb(err, info);
            

        // } else throw err;
        
    });
}
getRepoContributors(arg1, arg2, function(errors, result) {
    console.log("Errors:", errors);
    // console.log("Result:", result);
    
    // ****** loop to iterate over array of objects and logs avatar_url ******\\
    for (var url = 0; url < result.length; url ++) {
        downloadImageByURL(result[url].avatar_url, result[url].login);
    }
    // ================================================================================= \\
  });


function downloadImageByURL(url, fileName) {
    request.get(url).
    on('err', function(err) {
        throw err;
    })
    .on('response', function(response) {
        console.log("Ok");
    })
    .pipe(fs.createWriteStream(`avatars/${fileName}.jpg`));  // change avatars folder path to dynamic 
}