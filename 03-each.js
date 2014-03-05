"use strict";

var http = require("http"),
    async = require("async");

async.each(process.argv.slice(2), function (url, done) {
  http.get(url, function (res) {
    var body = "";

    res.setEncoding("utf8");
    res.on("data", function (chunk) { body += chunk; });
    res.on("end", function () {
      done(null, body);
    });
  }).on("error", function (err) { done(err); });
}, function (err) {
  if (err) { console.log(err); }
});
