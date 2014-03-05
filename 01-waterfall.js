"use strict";

var fs = require("fs"),
    http = require("http"),
    async = require("async");

async.waterfall([ readUrlFromFile, getUrl ], function (err, body) {
  console.log(body);
});

function readUrlFromFile(next) {
  fs.readFile(process.argv[2], function (err, url) {
    next(null, url.toString());
  });
}

function getUrl(url, done) {
  http.get(url, function (res) {
    var body = "";

    res.setEncoding("utf8");
    res.on("data", function (chunk) { body += chunk; });
    res.on("end", function () {
      done(null, body);
    });
  });
}
