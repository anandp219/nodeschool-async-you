"use strict";

var http = require("http"),
    async = require("async");

var url = process.argv[2];

var responseString = "",
    responseAttempts = 0;

async.whilst(function () { return responseString !== "meerkat"; }, runRequest, function(err) {
  if (err) {
    console.log(err);
  }
  console.log(responseAttempts);
});

function runRequest(done) {
  responseAttempts += 1;
  http.get(url, function(res) {
    var body = "";

    res.setEncoding("utf-8");
    res.on("data", function(chunk) {
      body += chunk;
    });
    res.on("end", function() {
      responseString = body;
      done(null, responseAttempts);
    });
  }).on("error", done);
}
