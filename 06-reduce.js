"use strict";

var http = require("http"),
    async = require("async");

var url = process.argv[2];

async.reduce(["one", "two", "three"], 0, runRequest, function(err, result) {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

function runRequest(memo, number, done) {
  http.get(url + "?number=" + number, function(res) {
    var body = "";

    res.setEncoding("utf-8");
    res.on("data", function(chunk) {
      body += chunk;
    });
    res.on("end", function() {
      done(null, +body + memo);
    });
  }).on("error", done);
}
