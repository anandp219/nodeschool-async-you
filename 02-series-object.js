"use strict";

var fs = require("fs"),
    http = require("http"),
    async = require("async");

async.series({
  requestOne: function (done) {
    http.get(process.argv[2], function (res) {
      var body = "";

      res.setEncoding("utf8");
      res.on("data", function (chunk) { body += chunk; });
      res.on("end", function () {
        done(null, body);
      });
    });
  },
  requestTwo: function (done) {
    http.get(process.argv[3], function (res) {
      var body = "";

      res.setEncoding("utf8");
      res.on("data", function (chunk) { body += chunk; });
      res.on("end", function () {
        done(null, body);
      });
    });
  }
}, function (err, result) {
  console.log(result);
});
